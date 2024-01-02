"use client";

import { DOMAttributes, useMemo, useRef } from "react";
import { randSuperheroName } from "@ngneat/falso";
import { useChatContext } from "@/contexts/ChatContext";

export function RoomInput() {
  const chat = useChatContext();
  const roomNameRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);

  const initialRoomName = useMemo(() => randSuperheroName(), []);
  const initialUserName = useMemo(() => randSuperheroName(), []);

  const onEnter: DOMAttributes<HTMLButtonElement>["onClick"] = (e) => {
    e.preventDefault();
    if (!roomNameRef.current?.value || !displayNameRef.current?.value) {
      throw new Error("Display name and room name are required");
    }
    chat.onUpdateDisplayName(displayNameRef.current.value);
    chat.onEnterRoom(roomNameRef.current.value);
  };
  return (
    <div className="mt-6 flex max-w-md gap-x-4 flex flex-col gap-y-4">
      <label>Chat room</label>
      <input
        ref={roomNameRef}
        name="room-name"
        type="text"
        defaultValue={initialRoomName}
        className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        placeholder="e.g chat-room-a"
      />

      <label>Username</label>
      <input
        ref={displayNameRef}
        name="display-name"
        type="text"
        defaultValue={initialUserName}
        className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        placeholder="e.g John"
      />

      <button
        type="submit"
        className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        onClick={onEnter}
      >
        Confirm
      </button>
    </div>
  );
}
