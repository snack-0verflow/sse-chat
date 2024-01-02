import { createStreamForUser, getStreamForUser, streams } from "./streams";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url || "");
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  if (!id || !name) {
    throw new Error("Missing id or name");
  }

  createStreamForUser({ roomId: id, name });

  let stream = getStreamForUser({ roomId: id, name })!;
  const encoder = new TextEncoder();

  console.log("[sse] create stream", {
    id,
    name,
    rooms: Object.keys(streams).length,
  });

  setTimeout(async () => {
    await stream.writer.write(encoder.encode(`Stream open!\n\n`));
    await stream.writer.write(encoder.encode(`Welcome ${name}!\n\n`));
    setTimeout(async () => {
      await stream.writer.write(encoder.encode(`Entered room: ${id}...\r\r`));
    }, 2000);
  }, 2000);

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}