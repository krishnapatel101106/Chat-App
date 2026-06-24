export default function Sidebar() {
  const chats = [
    { name: "Krishna", msg: "Hey! How are you?" },
    { name: "Alice", msg: "Let's catch up later." },
    { name: "Study Group", msg: "New assignment is out!" },
    { name: "Neha", msg: "Okay, thanks!" },
  ];

  return (
    <div className="
      w-80
      bg-[#0c1025]/90
      backdrop-blur-xl
      border border-purple-900
      rounded-3xl
      shadow-2xl
      text-white
      overflow-hidden
    ">
      <div className="p-6 text-4xl font-bold flex gap-2">
        <img src="/logo.PNG" alt="logo" ></img> Chats
      </div>

      <div className="px-4">
        <input
          placeholder="Search chats..."
          className="
            w-full
            bg-[#1c2145]
            rounded-2xl
            px-4
            py-3
            outline-none
            text-gray-300
          "
        />
      </div>

      <div className="p-4 space-y-3">
        {chats.map((chat, index) => (
          <div
            key={index}
            className="
              p-4
              rounded-2xl
              hover:bg-[#1a1f3c]
              transition
              cursor-pointer
            "
          >
            <h3 className="font-semibold text-lg">
              {chat.name}
            </h3>

            <p className="text-gray-400 text-sm">
              {chat.msg}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}