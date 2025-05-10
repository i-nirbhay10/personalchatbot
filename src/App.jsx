import { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Switch } from "@mui/material";
const apiUrl = import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT;
import { systemPrompt } from "./systemPrompt";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [checked, setchecked] = useState(false);

  console.log(checked, "checked");

  const handleChange = () => {
    setchecked(!checked);
    setChatHistory("");
  };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); // Clear input immediately after sending

    // Add user question to chat history
    setChatHistory((prev) => [
      ...prev,
      { type: "question", content: currentQuestion },
    ]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiUrl}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: checked
                    ? `  ${currentQuestion}`
                    : ` ${systemPrompt}\n\nUser: ${currentQuestion}`,
                },
              ],
            },
          ],
        },
      });
      console.log(response);

      const aiResponse =
        response["data"]["candidates"][0]["content"]["parts"][0]["text"];
      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: aiResponse },
      ]);
      setAnswer(aiResponse);

      console.log(answer, "answer");
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
    setGeneratingAnswer(false);
  }

  return (
    <div className="fixed inset-0 bg-[#323232]">
      <div className="flex text-lg md:text-2xl absolute items-center">
        <Switch checked={checked} onChange={handleChange} color="warning" />
        <h1 className=" font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200  to-blue-500 transition-colors">
          Switch To Smart AI Mode
        </h1>
      </div>
      <div className="h-full max-w-4xl  mx-auto flex flex-col p-3">
        {/* Fixed Header */}
        <header className="text-center py-4">
          <a
            // href="https://github.com/Vishesh-Pandey/chat-ai"
            href="https://github.com/i-nirbhay10"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <h1 className="text-lg md:text-2xl pt-5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-red-600 hover:from-red-600 hover:to-purple-700 transition-colors">
              Welcome to Nirbhay's Portfolio Chatbot! 👋
            </h1>
          </a>
        </header>

        {/* Scrollable Chat Container - Updated className */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-x-auto w-full mb-4 rounded-lg bg-[#1F2123] shadow-lg p-4 hide-scrollbar "
        >
          {chatHistory.length === 0 ? (
            <>
              {checked ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="rounded-xl md:p-8 max-w-2xl">
                    <h2 className="text-xl md:text-2xl font-bold text-[#8E7F85]   mb-4">
                      Welcome to ChatBot AI! 👋
                    </h2>
                    <p className="text-white mb-4">
                      I'm here to help you with anything you'd like to know. You
                      can ask me about:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-white">
                      <div className="bg-[#444444] p-4 rounded-lg shadow-sm">
                        <span className="text-blue-500">💡</span> General
                        knowledge
                      </div>
                      <div className="bg-[#444444] p-4 rounded-lg shadow-sm">
                        <span className="text-blue-500">🔧</span> Technical
                        questions
                      </div>
                      <div className="bg-[#444444] p-4 rounded-lg shadow-sm">
                        <span className="text-blue-500">📝</span> Writing
                        assistance
                      </div>
                      <div className="bg-[#444444] p-4 rounded-lg shadow-sm">
                        <span className="text-blue-500">🤔</span> Problem
                        solving
                      </div>
                    </div>

                    <p className="text-white mt-6 text-sm">
                      Just type your question below and press Enter or click
                      Send!
                    </p>

                    {/* Social Icons */}
                    <div className="mt-8 flex justify-center gap-6 text-white">
                      <a
                        href="https://github.com/i-nirbhay10"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400 transition"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.4 7.86 10.94.58.1.79-.25.79-.56v-1.96c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.26-1.7-1.26-1.7-1.03-.7.08-.68.08-.68 1.15.08 1.76 1.2 1.76 1.2 1.02 1.74 2.68 1.23 3.33.94.1-.74.4-1.23.72-1.51-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.52.12-3.17 0 0 .97-.31 3.2 1.18a11.04 11.04 0 012.92-.4c.99 0 1.99.13 2.92.4 2.22-1.49 3.2-1.18 3.2-1.18.64 1.65.24 2.87.12 3.17.75.8 1.2 1.82 1.2 3.08 0 4.44-2.7 5.41-5.28 5.7.41.35.77 1.03.77 2.08v3.08c0 .31.21.67.8.56A10.52 10.52 0 0023.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/nirbhay-verma-441695217/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400 transition"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.75 0 5-2.24 5-5v-14c0-2.76-2.25-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.5c-.97 0-1.5-.78-1.5-1.5s.53-1.5 1.5-1.5 1.5.78 1.5 1.5-.53 1.5-1.5 1.5zm13.5 11.5h-3v-5c0-1.21-.79-2-1.85-2s-1.85.79-1.85 2v5h-3v-10h3v1.44c.5-.75 1.38-1.44 2.85-1.44 2.21 0 4 1.79 4 4v6z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="rounded-xl md:p-8 max-w-2xl">
                    <h2 className="text-xl md:text-2xl font-bold text-[#8E7F85]   mb-4">
                      Welcome to Nirbhay's Portfolio Chatbot! 👋
                    </h2>
                    <p className="text-white mb-4">
                      Hi there! I'm Nirbhay's AI assistant. Feel free to ask me
                      anything about his skills, experience, projects, or how to
                      get in touch with him.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-left">
                      <div className="bg-[#444444] p-4 rounded-lg shadow-sm">
                        <span className="text-blue-500">👨‍💻</span> Full Stack
                        Skills
                      </div>
                      <div className="bg-[#444444] p-4 rounded-lg shadow-sm">
                        <span className="text-blue-500">📱</span> React Native
                        Experience
                      </div>
                      <div className="bg-[#444444] p-4 rounded-lg shadow-sm">
                        <span className="text-blue-500">📊</span> Project
                        Portfolio
                      </div>
                      <div className="bg-[#444444] p-4 rounded-lg shadow-sm">
                        <span className="text-blue-500">📬</span> Contact
                        Information
                      </div>
                    </div>

                    <p className="text-white mt-6 text-sm">
                      Just type your question below and press Enter or click
                      Send to start chatting!
                    </p>

                    {/* Social Icons */}
                    <div className="mt-8 flex justify-center gap-6 text-white">
                      <a
                        href="https://github.com/i-nirbhay10"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400 transition"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.4 7.86 10.94.58.1.79-.25.79-.56v-1.96c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.26-1.7-1.26-1.7-1.03-.7.08-.68.08-.68 1.15.08 1.76 1.2 1.76 1.2 1.02 1.74 2.68 1.23 3.33.94.1-.74.4-1.23.72-1.51-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.52.12-3.17 0 0 .97-.31 3.2 1.18a11.04 11.04 0 012.92-.4c.99 0 1.99.13 2.92.4 2.22-1.49 3.2-1.18 3.2-1.18.64 1.65.24 2.87.12 3.17.75.8 1.2 1.82 1.2 3.08 0 4.44-2.7 5.41-5.28 5.7.41.35.77 1.03.77 2.08v3.08c0 .31.21.67.8.56A10.52 10.52 0 0023.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/nirbhay-verma-441695217/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400 transition"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.75 0 5-2.24 5-5v-14c0-2.76-2.25-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.5c-.97 0-1.5-.78-1.5-1.5s.53-1.5 1.5-1.5 1.5.78 1.5 1.5-.53 1.5-1.5 1.5zm13.5 11.5h-3v-5c0-1.21-.79-2-1.85-2s-1.85.79-1.85 2v5h-3v-10h3v1.44c.5-.75 1.38-1.44 2.85-1.44 2.21 0 4 1.79 4 4v6z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    chat.type === "question" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block max-w-[80%] p-3 rounded-lg overflow-auto hide-scrollbar ${
                      chat.type === "question"
                        ? "bg-gray-600 text-white rounded-br-none"
                        : "bg-[#3E58E0] text-white rounded-bl-none"
                    }`}
                  >
                    <ReactMarkdown className="overflow-auto hide-scrollbar">
                      {chat.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
            </>
          )}
          {generatingAnswer && (
            <div className="text-left">
              <div className="inline-block bg-gray-100 p-3 rounded-lg animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Fixed Input Form */}
        <form
          onSubmit={generateAnswer}
          className="bg-white bg-gradient-to-r from-[#17171A]  to-[#1F2123] rounded-lg shadow-lg p-4"
        >
          <div className="flex md:flex-1 sm:w-auto border border-gray-300 rounded p-2  focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none h-auto gap-2">
            <input
              required
              className="flex-1 pl-3 bg-transparent text-gray-300 focus:outline-none focus:ring-0 focus:border-transparent"
              // className="flex-1 pl-3 bg-transparent "
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={
                checked ? "Ask anything..." : "Ask anything abut me..."
              }
              rows="2"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(e);
                }
              }}
            />

            {/* <textarea
              required
              className="flex-1 border border-gray-300 rounded p-3 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything..."
              rows="2"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(e);
                }
              }}
            ></textarea> */}
            <button
              type="submit"
              className={`flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-[#1F2123] to-red-400 text-white rounded-md hover:bg-blue-600 transition-colors ${
                generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={generatingAnswer}
            >
              Ask
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
