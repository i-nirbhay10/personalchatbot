import React from "react";

const WelcomeComponent = (prop) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <div className="rounded-xl md:p-8 max-w-2xl">
        <h2 className="text-2xl font-bold text-[#8E7F85] mb-4">{prop.title}</h2>
        <p className="text-white mb-4">
          I'm here to help you with anything you'd like to know. You can ask me
          about:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-white">
          <div className="bg-[#444444] p-4 rounded-lg shadow-sm">
            <span className="text-blue-500">💡</span> General knowledge
          </div>
          <div className="bg-[#444444] p-4 rounded-lg shadow-sm">
            <span className="text-blue-500">🔧</span> Technical questions
          </div>
          <div className="bg-[#444444] p-4 rounded-lg shadow-sm">
            <span className="text-blue-500">📝</span> Writing assistance
          </div>
          <div className="bg-[#444444] p-4 rounded-lg shadow-sm">
            <span className="text-blue-500">🤔</span> Problem solving
          </div>
        </div>

        <p className="text-white mt-6 text-sm">
          Just type your question below and press Enter or click Send!
        </p>

        {/* Social Icons */}
        <div className="mt-8 flex justify-center gap-6 text-white">
          <a
            href="https://github.com/i-nirbhay10"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.4 7.86 10.94.58.1.79-.25.79-.56v-1.96c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.26-1.7-1.26-1.7-1.03-.7.08-.68.08-.68 1.15.08 1.76 1.2 1.76 1.2 1.02 1.74 2.68 1.23 3.33.94.1-.74.4-1.23.72-1.51-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.52.12-3.17 0 0 .97-.31 3.2 1.18a11.04 11.04 0 012.92-.4c.99 0 1.99.13 2.92.4 2.22-1.49 3.2-1.18 3.2-1.18.64 1.65.24 2.87.12 3.17.75.8 1.2 1.82 1.2 3.08 0 4.44-2.7 5.41-5.28 5.7.41.35.77 1.03.77 2.08v3.08c0 .31.21.67.8.56A10.52 10.52 0 0023.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/nirbhay-verma-441695217/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.75 0 5-2.24 5-5v-14c0-2.76-2.25-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.5c-.97 0-1.5-.78-1.5-1.5s.53-1.5 1.5-1.5 1.5.78 1.5 1.5-.53 1.5-1.5 1.5zm13.5 11.5h-3v-5c0-1.21-.79-2-1.85-2s-1.85.79-1.85 2v5h-3v-10h3v1.44c.5-.75 1.38-1.44 2.85-1.44 2.21 0 4 1.79 4 4v6z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WelcomeComponent;
