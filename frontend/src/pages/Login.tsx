import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real authentication logic
    if (email === "demo@demo.com" && password === "demo123") {
      setError("");
      alert("Login successful!");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{background: "linear-gradient(135deg, #0a1a2f 0%, #1c2746 50%, #23395d 100%)", backgroundAttachment: "fixed"}}>
      <form className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl p-8 w-full max-w-md border border-white/10" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <button type="submit" className="w-full py-2 rounded bg-blue-900 text-white font-semibold hover:bg-blue-700 transition-colors">Login</button>
        <p className="mt-4 text-white text-center">
          Don't have an account? <a href="/signup" className="text-blue-400 underline">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
