import { StreamNotFoundError } from "./errors";
import { getStreamKeyForUser, getStreamParticipantsForRoom } from "./streams";

type BroadcastMessage = {
  sender: string;
  text: string;
  receivedAt: number;
};

type BroadcastMessageInRoomProps = {
  roomId: string;
  from: string;
  message: string;
};

export async function broadcastMessageInRoom(
  props: BroadcastMessageInRoomProps
) {
  const { roomId, from, message } = props;
  const room = getStreamParticipantsForRoom(roomId);
  if (!room) {
    const key = getStreamKeyForUser({ roomId, name: from });
    throw new StreamNotFoundError(key);
  }

  const participantIds = Object.keys(room);
  console.log("broadcast to", {
    keys: Object.keys(room),
  });
  for (const id in participantIds) {
    const data: BroadcastMessage = {
      sender: from,
      text: message,
      receivedAt: Date.now(),
    };
    await room[participantIds[id]].writer.write(`event: message\n`);
    await room[participantIds[id]].writer.write(
      `data: ${JSON.stringify(data)}\n\n`
    );
  }
}
