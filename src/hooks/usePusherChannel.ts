import { useEffect, useRef } from 'react';
import type { Channel } from 'pusher-js';
import { getPusher } from '@/services/pusherService';

type Handlers = Record<string, (data: unknown) => void>;

/**
 * Souscrit à un canal Pusher et lie les événements fournis.
 * Se désabonne automatiquement au démontage.
 * Silencieux si Pusher n'est pas configuré (VITE_PUSHER_APP_KEY absent).
 */
export function usePusherChannel(
  channelName: string | null | undefined,
  handlers: Handlers,
  enabled = true,
) {
  const handlersRef = useRef<Handlers>(handlers);
  handlersRef.current = handlers;

  const channelRef = useRef<Channel | null>(null);

  useEffect(() => {
    if (!enabled || !channelName) return;
    const pusher = getPusher();
    if (!pusher) return;

    const channel = pusher.subscribe(channelName);
    channelRef.current = channel;

    const bound = Object.keys(handlersRef.current);
    bound.forEach(ev => channel.bind(ev, handlersRef.current[ev]));

    return () => {
      bound.forEach(ev => channel.unbind(ev));
      pusher.unsubscribe(channelName);
      channelRef.current = null;
    };
    // channelName et enabled sont les seules vraies dépendances — les handlers
    // sont lus via ref pour éviter de re-souscrire à chaque render.
  }, [channelName, enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return channelRef;
}
