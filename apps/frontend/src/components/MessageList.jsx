import MessageBubble from "./MessageBubble";

export default function MessageList() {
  const messages = [
    {
      text: "Hey!",
      sender: "other",
    },
    {
      text: "Hey 👋",
      sender: "me",
    },
    {
      text: "How are you doing?",
      sender: "other",
    },
    {
      text: "I'm doing good!",
      sender: "me",
    },
  ];

  return (
    <div>
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          message={msg}
        />
      ))}
    </div>
  );
}