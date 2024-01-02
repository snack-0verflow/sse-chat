import { NextRequest } from "next/server";
import {
  StreamNotFoundError,
  StreamUnidentifiableMissingRequirementsError,
} from "../sse/errors";
import { getStreamForUser, getStreamKeyForUser, streams } from "../sse/streams";
import { broadcastMessageInRoom } from "../sse/broadcast";

export async function POST(request: NextRequest) {
  const { id, name, message } = await request.json();
  if (!id || !name || !message) {
    throw new StreamUnidentifiableMissingRequirementsError();
  }

  console.log("[api] message received", {
    id,
    name,
    message,
    availableRooms: Object.keys(streams),
  });

  let stream = getStreamForUser({ roomId: id, name });

  if (!stream) {
    const key = getStreamKeyForUser({ roomId: id, name });
    const error = new StreamNotFoundError(key);
    return Response.json(
      {
        data: {
          message: error.message,
        },
      },
      { status: 404 }
    );
  }

  await broadcastMessageInRoom({ roomId: id, from: name, message });

  return Response.json({
    data: {
      message: "Message sent",
    },
  });
}
