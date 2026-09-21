import { useState } from "react";
import { sendMessage } from "../api/chat";

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await sendMessage(prompt);
    console.log(response);
    setMessages(response);
    console.log(messages);
    return response;
  };

  return (
    <div>
      <input
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Send a message"
      ></input>
      <button onClick={handleSubmit}>Send</button>
      <div>{messages}</div>
    </div>
  );
}

export default Chat;