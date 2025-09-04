import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real signup logic
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (email && password) {
      setError("");
      alert("Signup successful! You can now log in.");
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{background: "linear-gradient(135deg, #0a1a2f 0%, #1c2746 50%, #23395d 100%)", backgroundAttachment: "fixed"}}>
      <form className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl p-8 w-full max-w-md border border-white/10" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-white">Sign Up</h2>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <button type="submit" className="w-full py-2 rounded bg-blue-900 text-white font-semibold hover:bg-blue-700 transition-colors">Sign Up</button>
        <p className="mt-4 text-white text-center">
          Already have an account? <a href="/login" className="text-blue-400 underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
