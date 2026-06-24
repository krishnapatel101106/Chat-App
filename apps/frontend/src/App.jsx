
//import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import ChatPage from "./pages/ChatPage"
import SignUpPage from "./pages/Signup"
import SignInPage from "./pages/Signin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage></ChatPage>}></Route>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/signin" element={<SignInPage></SignInPage>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
