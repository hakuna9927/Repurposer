import React from "react";
import { useNavigate } from "react-router-dom";

const Features = () => {
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
				<h1 className="text-3xl font-bold mb-6 text-white">Features</h1>
				<ul className="list-disc pl-6 space-y-4 text-white/90">
					<li>AI-powered content repurposing for blogs, social media, and more</li>
					<li>Automatic summarization and transcription of videos</li>
					<li>Multi-platform export: LinkedIn, Twitter, Instagram, and more</li>
					<li>Customizable templates for different content types</li>
					<li>Fast, secure, and privacy-focused</li>
				</ul>
				<p className="mt-8 text-lg text-white">Unlock the power of AI to save time and boost your content strategy!</p>
			</div>
		</div>
	);
};

export default Features;
