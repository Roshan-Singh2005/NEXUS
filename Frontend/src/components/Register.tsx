import { useState } from "react";
import { register } from "../api/auth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await register({ name, email, password });
    console.log(response);
    return response;
  };

  return (
    <div>
      <input onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default Register;