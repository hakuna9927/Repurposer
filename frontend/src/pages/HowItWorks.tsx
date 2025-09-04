import React from "react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
	const navigate = useNavigate();
	return (
		<div
			className="min-h-screen w-full flex items-center justify-center"
			style={{
				background: "linear-gradient(135deg, #0a1a2f 0%, #1c2746 50%, #23395d 100%)",
				backgroundAttachment: "fixed",
			}}
		>
			<div className="max-w-3xl w-full bg-white/5 backdrop-blur-lg rounded-xl shadow-xl py-16 px-4 border border-white/10">
				<button
					onClick={() => navigate(-1)}
					className="mb-6 px-4 py-2 rounded bg-blue-900 text-white hover:bg-blue-700 transition-colors"
				>
					← Back
				</button>
				<h1 className="text-3xl font-bold mb-6 text-white">How It Works</h1>
				<ol className="list-decimal pl-6 space-y-4 text-white/90">
					<li>Upload or paste your video link</li>
					<li>AI transcribes and summarizes the content</li>
					<li>Choose your desired output format (blog, tweet, post, etc.)</li>
					<li>Review and edit the generated content</li>
					<li>Export and share to your favorite platforms</li>
				</ol>
				<p className="mt-8 text-lg text-white">Simple, fast, and effective—let AI do the heavy lifting for your content workflow!</p>
			</div>
		</div>
	);
};

export default HowItWorks;
