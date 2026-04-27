package com.assurance.sante.connect.controller;

import com.assurance.sante.connect.dto.ApiResponse;
import com.assurance.sante.connect.entity.Message;
import com.assurance.sante.connect.entity.User;
import com.assurance.sante.connect.repository.MessageRepository;
import com.assurance.sante.connect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageRepository messageRepository;
    private final UserRepository    userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    /** Envoie un message via WebSocket et le persiste */
    @MessageMapping("/chat.send")
    public void sendMessage(@Payload Map<String, Object> payload) {
        Long senderId   = Long.valueOf(payload.get("senderId").toString());
        Long receiverId = Long.valueOf(payload.get("receiverId").toString());
        String content  = payload.get("content").toString();
        String senderName = payload.getOrDefault("senderName", "Utilisateur").toString();

        Message message = Message.builder()
                .senderId(senderId)
                .receiverId(receiverId)
                .content(content)
                .senderName(senderName)
                .createdAt(LocalDateTime.now())
                .build();
        message = messageRepository.save(message);

        // Notifier le destinataire en temps réel
        messagingTemplate.convertAndSendToUser(
                receiverId.toString(), "/queue/messages", message);
    }

    /** Historique de conversation entre deux utilisateurs */
    @GetMapping("/conversation/{userId1}/{userId2}")
    public ResponseEntity<ApiResponse<List<Message>>> getConversation(
            @PathVariable Long userId1, @PathVariable Long userId2) {
        List<Message> messages = messageRepository.findConversation(userId1, userId2);
        // Marquer comme lus
        messages.stream()
                .filter(m -> m.getReceiverId().equals(userId1) && !m.isRead())
                .forEach(m -> { m.setRead(true); messageRepository.save(m); });
        return ResponseEntity.ok(ApiResponse.success(messages));
    }

    /** Liste des contacts avec qui l'utilisateur a échangé */
    @GetMapping("/contacts/{userId}")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getContacts(
            @PathVariable Long userId) {
        List<Long> contactIds = messageRepository.findContactIds(userId);
        List<Map<String, Object>> contacts = userRepository.findAllById(contactIds).stream()
                .map(u -> {
                    Map<String, Object> c = new HashMap<>();
                    c.put("id",       u.getId());
                    c.put("fullName", u.getFullName());
                    c.put("email",    u.getEmail());
                    c.put("role",     u.getRole().name());
                    List<Message> conv = messageRepository.findConversation(userId, u.getId());
                    if (!conv.isEmpty()) {
                        Message last = conv.get(conv.size() - 1);
                        c.put("lastMessage", last.getContent());
                        c.put("lastTime",    last.getCreatedAt().toString());
                    }
                    long unread = messageRepository.findUnreadByReceiver(userId).stream()
                            .filter(m -> m.getSenderId().equals(u.getId())).count();
                    c.put("unread", unread);
                    return c;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(contacts));
    }

    /** Envoie un message via REST (fallback sans WebSocket) */
    @PostMapping("/send")
    public ResponseEntity<ApiResponse<Message>> sendRest(@RequestBody Map<String, Object> body) {
        Long senderId   = Long.valueOf(body.get("senderId").toString());
        Long receiverId = Long.valueOf(body.get("receiverId").toString());
        String content  = body.get("content").toString();
        String senderName = body.getOrDefault("senderName", "Utilisateur").toString();

        Message message = Message.builder()
                .senderId(senderId).receiverId(receiverId)
                .content(content).senderName(senderName)
                .createdAt(LocalDateTime.now()).build();
        message = messageRepository.save(message);
        messagingTemplate.convertAndSendToUser(
                receiverId.toString(), "/queue/messages", message);
        return ResponseEntity.ok(ApiResponse.success(message));
    }

    /** Tous les utilisateurs disponibles pour démarrer une conversation */
    @GetMapping("/users/{excludeId}")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAllUsers(
            @PathVariable Long excludeId) {
        List<Map<String, Object>> users = userRepository.findAll().stream()
                .filter(u -> !u.getId().equals(excludeId) && u.getStatus() == User.UserStatus.ACTIVE)
                .map(u -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id",       u.getId());
                    m.put("fullName", u.getFullName());
                    m.put("email",    u.getEmail());
                    m.put("role",     u.getRole().name());
                    return m;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(users));
    }
}
