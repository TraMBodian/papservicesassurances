import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, ChevronLeft, Loader2, WifiOff, Users } from "@/components/ui/Icons";
import { useAuth } from "@/context/AuthContext";
import { usePusherChannel } from "@/hooks/usePusherChannel";
import { CH, EV, type ChatMessage } from "@/services/pusherService";
import { apiClient } from "@/services/apiClient";

// ─── Persistance localStorage ─────────────────────────────────────────────────

const MSG_KEY   = (roomId: string) => `chat_msgs_${roomId}`;
const ROOMS_KEY = "chat_active_rooms";

interface ChatRoom {
  userId: string;
  userName: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
}

function loadMessages(roomId: string): ChatMessage[] {
  try { return JSON.parse(localStorage.getItem(MSG_KEY(roomId)) ?? "[]"); }
  catch { return []; }
}

function saveMessages(roomId: string, msgs: ChatMessage[]) {
  try { localStorage.setItem(MSG_KEY(roomId), JSON.stringify(msgs.slice(-150))); }
  catch { /* storage plein */ }
}

function loadRooms(): ChatRoom[] {
  try { return JSON.parse(localStorage.getItem(ROOMS_KEY) ?? "[]"); }
  catch { return []; }
}

function saveRooms(rooms: ChatRoom[]) {
  try { localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms)); }
  catch { /* storage plein */ }
}

function upsertRoom(r: Omit<ChatRoom, "unread"> & { unread?: number }) {
  const rooms = loadRooms();
  const idx   = rooms.findIndex(x => x.userId === r.userId);
  if (idx >= 0) {
    rooms[idx] = { ...rooms[idx], ...r, unread: r.unread ?? rooms[idx].unread };
  } else {
    rooms.unshift({ unread: 0, ...r });
  }
  saveRooms(rooms);
  window.dispatchEvent(new CustomEvent("chat_rooms_update"));
}

function timeLabel(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

// ─── Composant ────────────────────────────────────────────────────────────────

export function LiveChat() {
  const { user } = useAuth();
  const isAdmin  = user?.role === "admin";

  const [open,         setOpen]         = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages,     setMessages]     = useState<ChatMessage[]>([]);
  const [rooms,        setRooms]        = useState<ChatRoom[]>([]);
  const [text,         setText]         = useState("");
  const [sending,      setSending]      = useState(false);
  const [sendError,    setSendError]    = useState(false);
  const [totalUnread,  setTotalUnread]  = useState(0);

  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  // roomId actif : admin → room sélectionnée ; client → son propre userId
  const activeRoomId = isAdmin ? selectedRoom : (user?.id ?? null);

  // ── Chargement des messages quand la room change ──────────────────────────
  useEffect(() => {
    if (!activeRoomId) { setMessages([]); return; }
    setMessages(loadMessages(activeRoomId));
  }, [activeRoomId]);

  // ── Chargement/abonnement de la liste des rooms (admin) ──────────────────
  useEffect(() => {
    if (!isAdmin) return;
    const refresh = () => {
      const r = loadRooms();
      setRooms(r);
      setTotalUnread(r.reduce((s, x) => s + x.unread, 0));
    };
    refresh();
    window.addEventListener("chat_rooms_update", refresh);
    return () => window.removeEventListener("chat_rooms_update", refresh);
  }, [isAdmin]);

  // ── Scroll automatique ────────────────────────────────────────────────────
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // ── Focus input à l'ouverture ─────────────────────────────────────────────
  useEffect(() => {
    if (open && activeRoomId) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open, activeRoomId]);

  // ── Réception de messages Pusher ──────────────────────────────────────────
  const handleIncoming = useCallback((data: unknown, event: string) => {
    const msg = data as ChatMessage;
    const roomId = msg.roomId;

    setMessages(prev => {
      if (prev.find(m => m.id === msg.id)) return prev;
      const next = [...prev, msg];
      saveMessages(roomId, next);
      return next;
    });

    // Admin : mise à jour de la liste des rooms
    if (isAdmin && event === EV.clientMessage) {
      const isActive = open && selectedRoom === msg.senderId;
      upsertRoom({
        userId:      msg.senderId,
        userName:    msg.senderName,
        lastMessage: msg.message,
        lastTime:    msg.timestamp,
        unread:      isActive ? 0 : 1,
      });
      if (!isActive) setTotalUnread(n => n + 1);
    }

    // Client : badge non-lu quand le panneau est fermé
    if (!isAdmin && !open) setTotalUnread(n => n + 1);
  }, [isAdmin, open, selectedRoom]);

  // Canal admin : reçoit tous les messages clients
  usePusherChannel(
    isAdmin ? CH.chatAdmin : null,
    { [EV.clientMessage]: (d) => handleIncoming(d, EV.clientMessage) },
    isAdmin,
  );

  // Canal client : reçoit les réponses de l'admin
  usePusherChannel(
    !isAdmin && user?.id ? CH.chatClient(user.id) : null,
    { [EV.adminReply]: (d) => handleIncoming(d, EV.adminReply) },
    !isAdmin && !!user?.id,
  );

  // ── Envoi d'un message ────────────────────────────────────────────────────
  const sendMessage = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed || !activeRoomId || !user) return;
    setText("");
    setSending(true);
    setSendError(false);

    const optimistic: ChatMessage = {
      id:         `local-${Date.now()}`,
      roomId:     activeRoomId,
      senderId:   user.id,
      senderName: user.full_name ?? user.email ?? "Utilisateur",
      senderRole: user.role ?? "client",
      message:    trimmed,
      timestamp:  new Date().toISOString(),
    };

    setMessages(prev => {
      const next = [...prev, optimistic];
      saveMessages(activeRoomId, next);
      return next;
    });

    try {
      await apiClient.request("/chat/messages", {
        method: "POST",
        body: JSON.stringify({
          roomId:     activeRoomId,
          message:    trimmed,
          senderId:   user.id,
          senderName: user.full_name ?? user.email,
          senderRole: user.role,
        }),
      });
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }, [text, activeRoomId, user]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  // ── Ouvrir le panneau + reset unread ─────────────────────────────────────
  const openPanel = () => {
    setOpen(true);
    setTotalUnread(0);
    if (!isAdmin && user?.id) {
      const rooms = loadRooms();
      const idx   = rooms.findIndex(r => r.userId === user.id);
      if (idx >= 0) { rooms[idx].unread = 0; saveRooms(rooms); }
    }
  };

  // ── Sélection d'une room (admin) ──────────────────────────────────────────
  const selectRoom = (room: ChatRoom) => {
    setSelectedRoom(room.userId);
    setMessages(loadMessages(room.userId));
    setRooms(prev => prev.map(r =>
      r.userId === room.userId ? { ...r, unread: 0 } : r
    ));
    const all = loadRooms().map(r =>
      r.userId === room.userId ? { ...r, unread: 0 } : r
    );
    saveRooms(all);
    setTotalUnread(all.reduce((s, r) => s + r.unread, 0));
  };

  if (!user) return null;

  // ─── Rendu ─────────────────────────────────────────────────────────────────
  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-2">

      {/* ── Panneau chat ────────────────────────────────────────────────── */}
      {open && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
          style={{ height: 480 }}>

          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ background: "#1B5299" }}>
            {isAdmin && selectedRoom && (
              <button onClick={() => setSelectedRoom(null)}
                className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                <ChevronLeft size={16} />
              </button>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm truncate">
                {isAdmin
                  ? selectedRoom
                    ? (rooms.find(r => r.userId === selectedRoom)?.userName ?? "Client")
                    : "Support — conversations"
                  : "Support Papy Services"}
              </p>
              <p className="text-white/60 text-[10px]">
                {isAdmin ? "Administration" : "Nous répondons dès que possible"}
              </p>
            </div>
            <button onClick={() => setOpen(false)}
              className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Corps */}
          <div className="flex-1 overflow-hidden flex flex-col">

            {/* ── Vue liste rooms (admin sans room sélectionnée) ── */}
            {isAdmin && !selectedRoom ? (
              <div className="flex-1 overflow-y-auto">
                {rooms.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
                    <Users size={32} className="opacity-20" />
                    <p className="text-sm">Aucune conversation active</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-border">
                    {rooms.map(room => (
                      <li key={room.userId}
                        onClick={() => selectRoom(room)}
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/40 transition-colors">
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                          {(room.userName[0] ?? "?").toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{room.userName}</p>
                          <p className="text-xs text-muted-foreground truncate">{room.lastMessage}</p>
                        </div>
                        {room.unread > 0 && (
                          <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                            {room.unread > 9 ? "9+" : room.unread}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              /* ── Vue conversation ── */
              <>
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                  {messages.length === 0 && (
                    <p className="text-center text-xs text-muted-foreground pt-8">
                      {isAdmin ? "Aucun message dans cette conversation." : "Bonjour ! Comment pouvons-nous vous aider ?"}
                    </p>
                  )}
                  {messages.map(msg => {
                    const isMine = msg.senderId === user.id;
                    return (
                      <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-snug ${
                          isMine
                            ? "bg-[#1B5299] text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-900 rounded-bl-sm"
                        }`}>
                          {!isMine && (
                            <p className="text-[10px] font-semibold mb-0.5 opacity-60">{msg.senderName}</p>
                          )}
                          <p className="break-words">{msg.message}</p>
                          <p className={`text-[9px] mt-0.5 text-right ${isMine ? "text-white/50" : "text-gray-400"}`}>
                            {timeLabel(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="px-3 pb-3 pt-2 border-t border-border">
                  {sendError && (
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-600 bg-amber-50 rounded px-2 py-1 mb-1.5">
                      <WifiOff size={10} />
                      Message enregistré localement (serveur indisponible)
                    </div>
                  )}
                  <div className="flex gap-2 items-end">
                    <input
                      ref={inputRef}
                      value={text}
                      onChange={e => setText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Votre message…"
                      className="flex-1 text-sm px-3 py-2 rounded-xl border border-border bg-muted/40 outline-none focus:border-[#1B5299]/60 resize-none"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!text.trim() || sending}
                      className="p-2 rounded-xl text-white transition-colors disabled:opacity-40"
                      style={{ background: "#1B5299" }}
                    >
                      {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Bouton flottant ──────────────────────────────────────────────── */}
      <button
        onClick={open ? () => setOpen(false) : openPanel}
        className="w-13 h-13 rounded-full shadow-lg flex items-center justify-center relative transition-transform hover:scale-105 active:scale-95"
        style={{ background: "#1B5299", width: 52, height: 52 }}
        aria-label="Support chat"
      >
        {open
          ? <X size={22} className="text-white" />
          : <MessageCircle size={22} className="text-white" />
        }
        {!open && totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {totalUnread > 9 ? "9+" : totalUnread}
          </span>
        )}
      </button>
    </div>
  );
}
