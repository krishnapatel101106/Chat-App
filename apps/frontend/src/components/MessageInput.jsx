import { useState } from "react";

export default function MessageInput() {
  const [text, setText] = useState("");

  return (
    <div
      className="
        p-5
        border-t
        border-purple-900
        bg-[#0c1025]
        flex
        gap-4
      "
    >
      <button
        className="
          w-12
          h-12
          rounded-full
          bg-purple-700
          text-white
          text-2xl
        "
      >
        +
      </button>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="
          flex-1
          rounded-full
          bg-[#1c2145]
          px-6
          text-white
          outline-none
        "
      />

      <button
        className="
          px-6
          rounded-full
          bg-purple-600
          text-white
          hover:bg-purple-500
          transition
        "
      >
        Send
      </button>
    </div>
  );
}