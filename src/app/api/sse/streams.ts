import { StreamAlreadyExistsError } from "./errors";

type InMemoryStream = {
  stream: TransformStream;
  readable: ReadableStream;
  writer: WritableStreamDefaultWriter;
};

type Participants = Record<string, InMemoryStream>;

export const streams: Record<string, Participants> = {};

export type StreamIdentifierArgs = {
  roomId: string;
  name: string;
};

export function getStreamKeyForUser(args: StreamIdentifierArgs) {
  return `${args.roomId}::${args.name}`;
}

export function getStreamParticipantsForRoom(
  roomId: string
): Participants | undefined {
  return streams[roomId];
}

export function getStreamForUser(
  args: StreamIdentifierArgs
): InMemoryStream | undefined {
  const room = getStreamParticipantsForRoom(args.roomId);
  return room?.[args.name];
}

export function createStreamForUser(
  args: StreamIdentifierArgs
): InMemoryStream {
  const room = getStreamParticipantsForRoom(args.roomId);
  let stream = new TransformStream();
  let inMemoryStream: InMemoryStream = {
    stream,
    readable: stream.readable,
    writer: stream.writable.getWriter(),
  };
  if (room) {
    const existingStream = getStreamForUser(args);
    if (existingStream) {
      const key = getStreamKeyForUser(args);
      // throw new StreamAlreadyExistsError(key);
    }
    room[args.name] = inMemoryStream;
  } else {
    streams[args.roomId] = {
      [args.name]: inMemoryStream,
    };
  }
  return inMemoryStream;
}

export function removeStreamForUser(args: { roomId: string; name: string }) {}
