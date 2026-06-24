import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function ChatLayout() {
  return (
    <div className="h-screen bg-[#050816] p-4 flex gap-4 overflow-hidden">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}