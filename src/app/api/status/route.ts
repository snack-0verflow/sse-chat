import { NextRequest } from "next/server";
import { streams } from "../sse/streams";

export async function GET() {
  const rooms = Object.values(streams);
  const participants = rooms.reduce(
    (acc, room) => acc + Object.values(room).length,
    0
  );
  const details = rooms.map((room) => ({
    name: room.name,
    participants: Object.keys(room),
  }));
  return Response.json({
    data: {
      rooms: rooms.length,
      participants,
      details,
    },
  });
}
