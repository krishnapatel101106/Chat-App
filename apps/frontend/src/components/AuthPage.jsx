

export function AuthPage({isSignin}){
    return (
        <div className="relative min-h-screen bg-[#000001] overflow-hidden flex items-center justify-between px-20">

      {/* Glow */}
      <div
        className="
          absolute left-1/3 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[700px] h-[700px]
          rounded-full
          blur-[150px]
          bg-[#6655ca]/50
        "
      />
      <img
        src="/ash1.png"
        alt="Astronaut"
        className="relative z-10 h-[930px] "
      />

      <div className="relative z-10 h-[600px] w-[450px] p-8 rounded-2xl bg-gray-950/80 backdrop-blur-md border border-gray-800 text-white">

        <h1 className="text-4xl font-bold">
          {isSignin ? "Sign In" : "Sign Up"}
        </h1>

        <p className="text-gray-400 mt-2">
         {isSignin ? "Welcome Back" : "Create your account"}
        </p>

        {!isSignin && (
         <input
          type="text"
          placeholder="name"
          className="w-full mt-8 px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-[#6655ca] outline-none"
        />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mt-8 px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-[#6655ca] outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-4 px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-[#6655ca] outline-none"
        />

        <button
          className="
            w-full mt-6 py-3 rounded-lg
            bg-[#6655ca]
            hover:bg-[#7564d8]
            transition
            font-semibold
          "
        >
          {isSignin ? " Sign In" : "Create Account"}
        </button>

        {!isSignin && (
       <div className="flex items-center my-6">
  <div className="flex-1 border-t border-gray-700"></div>

  <span className="px-4 text-gray-400 text-sm">
    OR
  </span>

  <div className="flex-1 border-t border-gray-700"></div>

</div>
    )}
    <div className="flex justify-center items-center gap-7">
    <img src="/google.png"  alt="google" height={40} width={40} className="hover:bg-gray-700/50 transition rounded"></img> 
    <img src="/apple.png"  alt="google" height={40} width={40} className="hover:bg-gray-700/50 transition rounded"></img> 
    <img src="/microsoft.png"  alt="google" height={40} width={40} className="hover:bg-gray-700/50 transition rounded"></img> 
    </div>

      </div>
    </div>
    )
}