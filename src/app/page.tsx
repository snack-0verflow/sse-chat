import { RoomInput } from "@/components/RoomInput";

export default function Index() {
  return (
    <div className="max-w-xl lg:max-w-lg">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Welcome to Inbox.
      </h2>
      <p className="mt-4 text-lg leading-8 text-gray-300">
        Please provide your name before seeing the conversations.
      </p>
      <RoomInput />
    </div>
  );
}
