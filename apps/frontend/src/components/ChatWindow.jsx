import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatWindow() {
  return (
    <div className="flex-1 rounded-3xl overflow-hidden border border-purple-900 bg-[#080b1c] flex flex-col shadow-2xl relative">
      
      {/* Header */}
      <div className="h-20 border-b border-purple-900 px-8 flex items-center text-white text-2xl font-semibold z-10">
        Krishna
      </div>

      {/* Message Area */}
      <div className="flex-1 p-8 overflow-y-auto relative z-10 bg-[radial-gradient(circle_at_center,_#442266,_#080b1c)]">
        
        {/* Cleaned up and properly scaled background image */}
        <img 
          src="/galaxy.png" 
          alt="Astronaut Background" 
          className="absolute inset-0 w-full h-full object-cover object-right opacity-40 pointer-events-none select-none z-0"
        />

        {/* Wrap your list in a relative div to sit above the image */}
        <div className="relative z-10">
          <MessageList />
        </div>
      </div>

      <MessageInput />
    </div>
  );
}