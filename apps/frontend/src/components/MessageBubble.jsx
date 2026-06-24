export default function MessageBubble({ message }) {
  const isMe = message.sender === "me";

  return (
    <div
      className={`flex mb-4 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          px-6 py-4
          rounded-3xl
          max-w-sm
          text-white
          shadow-lg
          ${
            isMe
              ? "bg-purple-600"
              : "bg-[#1b2244]"
          }
        `}
      >
        {message.text}
      </div>
    </div>
  );
}