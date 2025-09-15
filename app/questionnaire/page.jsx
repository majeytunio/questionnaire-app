// // // // 'use client'

// // // // import { useState, useEffect } from 'react';
// // // // import { useRouter } from 'next/navigation'; // <-- Correct import

// // // // import Navbar from '../components/Navbar';
// // // // import Footer from '../components/Footer';
// // // // import { useAuth } from '../providers/authProvider';

// // // // export default function Questionnaire() {
// // // //   const router = useRouter();
// // // //   const { user, loading } = useAuth();

// // // //   useEffect(() => {
// // // //     if (!loading && !user) {
// // // //       router.push('/auth/login'); // Use absolute path
// // // //     }
// // // //   }, [loading, user, router]);
  
// // // //   if(user){
// // // //       return (
// // // //         <>
// // // //           <Navbar currentUser={user} />
// // // //           <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">
            
// // // //             <section className='justify-center max-w-6xl center-items mx-auto'>
    
// // // //               {/* Hero Section */}
// // // //               <h1 className="text-4xl text-[var(--text-primary)] sm:text-5xl font-bold tracking-tight text-center">
// // // //                 AI Questionnaire Platform
// // // //               </h1>
// // // //               <p className="text-lg text-[var(--white)] mt-2 text-center">
// // // //                 Create, share, and analyze AI-powered questionnaires in minutes. 
// // // //                 Let artificial intelligence do the heavy lifting while you focus on insights.
// // // //               </p>
    
// // // //               {/* Call to Action */}
// // // //               <div className="flex justify-center gap-4 mt-8">
// // // //                 <a
// // // //                   href="#get-started"
// // // //                   className="px-6 py-3 rounded-2xl bg-[var(--button-primary)] text-white font-medium hover:bg-[var(--button-secondary)] transition"
// // // //                 >
// // // //                   Get Started
// // // //                 </a>
// // // //                 <a
// // // //                   href="#learn-more"
// // // //                   className="px-6 py-3 rounded-2xl border border-[var(--border-secondary)] text-[var(--white)] hover:text-[var(--text-primary)] hover:bg-[var(--white)] transition"
// // // //                 >
// // // //                   Learn More
// // // //                 </a>
// // // //               </div>
    
// // // //               {/* Feature Highlight */}
// // // //               <section className="mt-12 grid sm:grid-cols-3 gap-8 text-gray-700">
// // // //                 <div className="p-6 rounded-2xl shadow bg-[var(--block-secondary)] text-white">
// // // //                   <h3 className="text-xl font-semibold">Smart Surveys</h3>
// // // //                   <p className="mt-2 text-sm">
// // // //                     Build dynamic questionnaires that adapt to user responses.
// // // //                   </p>
// // // //                 </div>
    
// // // //                 <div className="p-6 rounded-2xl shadow bg-[var(--block-secondary)] text-white">
// // // //                   <h3 className="text-xl font-semibold">Instant Insights</h3>
// // // //                   <p className="mt-2 text-sm">
// // // //                     AI analyzes responses and gives you actionable results instantly.
// // // //                   </p>
// // // //                 </div>
// // // //                 <div className="p-6 rounded-2xl shadow bg-[var(--block-secondary)] text-white">
// // // //                   <h3 className="text-xl font-semibold">Seamless Sharing</h3>
// // // //                   <p className="mt-2 text-sm">
// // // //                     Share questionnaires with a link and track responses in real time.
// // // //                   </p>
// // // //                 </div>
// // // //               </section>
    
// // // //             </section>
    
    
    
// // // //           </main>
// // // //           <Footer currentUser={user} />
// // // //         </>
// // // //       );
// // // //   }

// // // // }



// // // 'use client'


// // // import React, { useState, useEffect, useRef } from 'react';

// // // // Main App component
// // // export default function App() {
// // //   const [messages, setMessages] = useState([]);
// // //   const [input, setInput] = useState('');
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [currentStep, setCurrentStep] = useState(0);
// // //   const messagesEndRef = useRef(null);

// // //   // Pre-defined questions for the guided flow
// // //   const predefinedQuestions = [
// // //     "What is your name?",
// // //     "How old are you?",
// // //     "What is your favorite hobby?",
// // //     "Is there anything else you'd like to share?",
// // //   ];

// // //   // Effect to automatically ask the first question when the app loads
// // //   useEffect(() => {
// // //     if (predefinedQuestions[currentStep]) {
// // //       setMessages([{ sender: 'bot', text: predefinedQuestions[currentStep] }]);
// // //     }
// // //   }, []);

// // //   // Effect to scroll to the bottom of the chat window on new messages
// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, [messages]);

// // //   // Function to call the OpenAI API for text generation
// // //   const callOpenAIAPI = async (prompt) => {
// // //     const payload = {
// // //       model: "gpt-3.5-turbo", // or another model like gpt-4
// // //       messages: [{ role: "user", content: prompt }],
// // //     };
// // //   const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; // Canvas will provide this key at runtime
// // //     const apiUrl = `https://api.openai.com/v1/chat/completions`;

// // //     let response;
// // //     try {
// // //       response = await fetch(apiUrl, {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Authorization': `Bearer ${apiKey}`
// // //         },
// // //         body: JSON.stringify(payload)
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error(`API error: ${response.statusText}`);
// // //       }

// // //       const result = await response.json();
// // //       if (result.choices && result.choices.length > 0 && result.choices[0].message && result.choices[0].message.content) {
// // //         return result.choices[0].message.content;
// // //       }
// // //       return "Sorry, I couldn't generate a response.";
// // //     } catch (error) {
// // //       console.error("Error calling OpenAI API:", error);
// // //       return "An error occurred while getting a response.";
// // //     }
// // //   };

// // //   // Handler for sending a message
// // //   const handleSendMessage = async () => {
// // //     if (input.trim() === '') return;

// // //     const userMessage = { sender: 'user', text: input };
// // //     setMessages(prevMessages => [...prevMessages, userMessage]);
// // //     setInput('');
// // //     setIsLoading(true);

// // //     const questionText = predefinedQuestions[currentStep];
// // //     const prompt = `The user answered the question "${questionText}" with "${userMessage.text}". Acknowledge their response and prepare them for the next question. Your response should be brief and encouraging.`;

// // //     const botResponseText = await callOpenAIAPI(prompt);

// // //     setIsLoading(false);
// // //     setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponseText }]);

// // //     // Move to the next question step
// // //     setTimeout(() => {
// // //       const nextStep = currentStep + 1;
// // //       if (predefinedQuestions[nextStep]) {
// // //         setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: predefinedQuestions[nextStep] }]);
// // //         setCurrentStep(nextStep);
// // //       } else {
// // //         setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: "Thank you for answering all the questions! Have a great day." }]);
// // //         setCurrentStep(-1); // End the conversation
// // //       }
// // //     }, 1000); // Small delay to make it feel more natural
// // //   };

// // //   const handleKeyDown = (event) => {
// // //     if (event.key === 'Enter') {
// // //       handleSendMessage();
// // //     }
// // //   };

// // //   // Component for a single chat bubble
// // //   const ChatBubble = ({ sender, text }) => (
// // //     <div className={`p-4 rounded-3xl max-w-2/3 shadow-lg my-2 ${sender === 'user' ? 'bg-indigo-600 text-white self-end rounded-br-none' : 'bg-gray-700 text-white self-start rounded-bl-none'}`}>
// // //       <div className="flex items-center">
// // //         <span className="mr-2">
// // //           {sender === 'user' ? (
// // //             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
// // //               <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// // //             </svg>
// // //           ) : (
// // //             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
// // //               <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
// // //             </svg>
// // //           )}
// // //         </span>
// // //         <span className="text-base leading-relaxed">{text}</span>
// // //       </div>
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
// // //       {/* Header */}
// // //       <div className="w-full flex justify-between items-center p-4 bg-gray-900 shadow-md">
// // //         <div className="flex items-center">
// // //           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
// // //             <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
// // //           </svg>
// // //           <h1 className="text-xl font-bold tracking-tight">AI Questionnaire</h1>
// // //         </div>
// // //         <div className="flex space-x-2">
// // //           <button className="text-gray-400 hover:text-white transition duration-200">
// // //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
// // //             </svg>
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Main chat area */}
// // //       <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 flex flex-col items-center">
// // //         <div className="w-full max-w-3xl flex flex-col space-y-4">
// // //           {messages.map((msg, index) => (
// // //             <ChatBubble key={index} sender={msg.sender} text={msg.text} />
// // //           ))}
// // //           {isLoading && (
// // //             <ChatBubble sender="bot" text="Thinking..." />
// // //           )}
// // //           <div ref={messagesEndRef} />
// // //         </div>
// // //       </div>
      
// // //       {/* Input area */}
// // //       <div className="w-full p-4 bg-gray-900 shadow-lg flex justify-center">
// // //         <div className="flex w-full max-w-3xl rounded-full border border-gray-700 bg-gray-800 focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-300">
// // //           <input
// // //             type="text"
// // //             className="flex-1 p-4 bg-transparent text-white placeholder-gray-500 rounded-full focus:outline-none"
// // //             placeholder={currentStep === -1 ? "Conversation ended." : "Type your message..."}
// // //             value={input}
// // //             onChange={(e) => setInput(e.target.value)}
// // //             onKeyDown={handleKeyDown}
// // //             disabled={isLoading || currentStep === -1}
// // //           />
// // //           <button
// // //             onClick={handleSendMessage}
// // //             className="p-4 text-indigo-400 hover:text-indigo-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
// // //             disabled={isLoading || currentStep === -1}
// // //           >
// // //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
// // //               <path d="M5 12h14M12 5l7 7-7 7" />
// // //             </svg>
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
















// // 'use client'

// // import React, { useState, useEffect, useRef } from 'react';

// // // Main App component
// // export default function App() {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [currentStep, setCurrentStep] = useState(0);
// //   const messagesEndRef = useRef(null);

// //   // Pre-defined questions for the guided flow
// //   const predefinedQuestions = [
// //     "What is your name?",
// //     "How old are you?",
// //     "What is your favorite hobby?",
// //     "Is there anything else you'd like to share?",
// //   ];

// //   // Effect to automatically ask the first question when the app loads
// //   useEffect(() => {
// //     if (predefinedQuestions[currentStep]) {
// //       setMessages([{ sender: 'bot', text: predefinedQuestions[currentStep] }]);
// //     }
// //   }, []);

// //   // Effect to scroll to the bottom of the chat window on new messages
// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   // Function to call the OpenAI API for text generation
// //   const callOpenAIAPI = async (prompt) => {
// //     const payload = {
// //       model: "gpt-3.5-turbo",
// //       messages: [{ role: "user", content: prompt }],
// //     };
// //    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
// //     const apiUrl = `https://api.openai.com/v1/chat/completions`;

// //     let response;
// //     try {
// //       response = await fetch(apiUrl, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${apiKey}`
// //         },
// //         body: JSON.stringify(payload)
// //       });

// //       if (!response.ok) {
// //         throw new Error(`API error: ${response.statusText}`);
// //       }

// //       const result = await response.json();
// //       if (result.choices && result.choices.length > 0 && result.choices[0].message && result.choices[0].message.content) {
// //         return result.choices[0].message.content;
// //       }
// //       return "Sorry, I couldn't generate a response.";
// //     } catch (error) {
// //       console.error("Error calling OpenAI API:", error);
// //       return "An error occurred while getting a response.";
// //     }
// //   };

// //   // Handler for sending a message
// //   const handleSendMessage = async () => {
// //     if (input.trim() === '') return;

// //     const userMessage = { sender: 'user', text: input };
// //     setMessages(prevMessages => [...prevMessages, userMessage]);
// //     setInput('');
// //     setIsLoading(true);

// //     // Create a prompt that includes the conversation history and asks for the next question
// //     let prompt = `You are conducting a questionnaire with the user. Here's the conversation so far:\n\n`;
    
// //     // Add all previous messages to the prompt
// //     messages.forEach(msg => {
// //       prompt += `${msg.sender === 'bot' ? 'Assistant' : 'User'}: ${msg.text}\n`;
// //     });
    
// //     // Add the current user response
// //     prompt += `User: ${userMessage.text}\n\n`;
    
// //     // Ask for the next question or appropriate response
// //     prompt += `The user just answered your question. Please respond to their answer and ask the next question from the questionnaire. `;
// //     prompt += `The next question should be: "${predefinedQuestions[currentStep + 1] || 'Thank the user for completing the questionnaire'}"`;
// //     prompt += `Keep your response concise and natural.`;

// //     const botResponseText = await callOpenAIAPI(prompt);

// //     setIsLoading(false);
// //     setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponseText }]);
    
// //     // Move to the next step if we're not at the end
// //     if (currentStep < predefinedQuestions.length - 1) {
// //       setCurrentStep(currentStep + 1);
// //     } else {
// //       setCurrentStep(-1); // End the conversation
// //     }
// //   };

// //   const handleKeyDown = (event) => {
// //     if (event.key === 'Enter') {
// //       handleSendMessage();
// //     }
// //   };

// //   // Component for a single chat bubble
// //   const ChatBubble = ({ sender, text }) => (
// //     <div className={`p-4 rounded-3xl max-w-2/3 shadow-lg my-2 ${sender === 'user' ? 'bg-indigo-600 text-white self-end rounded-br-none' : 'bg-gray-700 text-white self-start rounded-bl-none'}`}>
// //       <div className="flex items-center">
// //         <span className="mr-2">
// //           {sender === 'user' ? (
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
// //               <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //             </svg>
// //           ) : (
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
// //               <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
// //             </svg>
// //           )}
// //         </span>
// //         <span className="text-base leading-relaxed">{text}</span>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
// //       {/* Header */}
// //       <div className="w-full flex justify-between items-center p-4 bg-gray-900 shadow-md">
// //         <div className="flex items-center">
// //           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
// //             <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
// //           </svg>
// //           <h1 className="text-xl font-bold tracking-tight">AI Questionnaire</h1>
// //         </div>
// //         <div className="flex space-x-2">
// //           <button className="text-gray-400 hover:text-white transition duration-200">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
// //             </svg>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Main chat area */}
// //       <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 flex flex-col items-center">
// //         <div className="w-full max-w-3xl flex flex-col space-y-4">
// //           {messages.map((msg, index) => (
// //             <ChatBubble key={index} sender={msg.sender} text={msg.text} />
// //           ))}
// //           {isLoading && (
// //             <ChatBubble sender="bot" text="Thinking..." />
// //           )}
// //           <div ref={messagesEndRef} />
// //         </div>
// //       </div>
      
// //       {/* Input area */}
// //       <div className="w-full p-4 bg-gray-900 shadow-lg flex justify-center">
// //         <div className="flex w-full max-w-3xl rounded-full border border-gray-700 bg-gray-800 focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-300">
// //           <input
// //             type="text"
// //             className="flex-1 p-4 bg-transparent text-white placeholder-gray-500 rounded-full focus:outline-none"
// //             placeholder={currentStep === -1 ? "Conversation ended." : "Type your message..."}
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyDown={handleKeyDown}
// //             disabled={isLoading || currentStep === -1}
// //           />
// //           <button
// //             onClick={handleSendMessage}
// //             className="p-4 text-indigo-400 hover:text-indigo-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
// //             disabled={isLoading || currentStep === -1}
// //           >
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
// //               <path d="M5 12h14M12 5l7 7-7 7" />
// //             </svg>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

























































// 'use client'

// import React, { useState, useEffect, useRef } from 'react';

// // Main App component
// export default function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userResponses, setUserResponses] = useState({});
//   const messagesEndRef = useRef(null);

//   // Questionnaire structure
//   const questionnaire = [
//     {
//       title: "Aging Perspectives & Planning Ahead",
//       questions: [
//         "How comfortable are you asking for help with daily tasks if needed?",
//         "How do you feel about making changes to your daily life if aging or health made it necessary?",
//         "If you began to struggle with something important—like managing money, getting around, or cooking—how likely are you to tell someone?",
//         "How willing are you to assign someone to manage tasks if you could no longer do them?",
//         "In the event of an unexpected situation (e.g., health emergency, sudden need for help), how well have you prepared in terms of what to do and who to contact?",
//         "How do you feel about future care options?"
//       ]
//     },
//     {
//       title: "Physical Health, Pain & Nutrition",
//       questions: [
//         "How would you describe your appetite and ability to eat meals regularly?",
//         "Do you have chronic pain or health conditions that limit your daily activities?",
//         "How often do you feel fatigued or physically unable to do what you'd like?",
//         "Are you able to maintain a balanced diet without help?",
//         "How often do you engage in physical activity?"
//       ]
//     },
//     {
//       title: "Daily Living & Functional Abilities",
//       questions: [
//         "Can you perform daily self-care without assistance?",
//         "How well do you manage medications?",
//         "Do you feel overwhelmed by household tasks?",
//         "Do you need mobility aids to move safely?",
//         "How much difficulty do you have with your eyesight?",
//         "How much difficulty do you have hearing?"
//       ]
//     },
//     {
//       title: "Mental Health & Social Connection",
//       questions: [
//         "How often do you feel lonely or isolated?",
//         "How would you describe your interactions with friends, family, or caregivers?",
//         "Do you engage in hobbies or activities that bring you joy?",
//         "On a typical day, how many hours do you spend alone doing passive activities?",
//         "Do you feel anxious or depressed about aging?"
//       ]
//     },
//     {
//       title: "Cognition & Decision-Making",
//       questions: [
//         "How often do you forget important information like appointments or names?",
//         "How often do you forget what you planned to do during the day?",
//         "How well can you plan and follow through with tasks that involve multiple steps?",
//         "How confident are you when faced with new or unexpected situations?"
//       ]
//     },
//     {
//       title: "Technology, Home Environment & Safety",
//       questions: [
//         "How comfortable are you managing basic home appliances?",
//         "How comfortable are you using digital devices?",
//         "What is your general attitude toward learning and using new technology?",
//         "How easy is it for you to get out of the house?",
//         "How comfortable and safe do you feel managing everyday tasks at home?",
//         "If something in your home breaks, how do you typically manage it?"
//       ]
//     },
//     {
//       title: "Couple Dynamics (for partner or spouse)",
//       questions: [
//         "How would you describe the current balance of responsibilities between you and your partner?",
//         "If your partner is becoming more dependent on you, how would you describe the impact this has on your own life and well-being?",
//         "Would you say your time as a couple is more often enjoyable or tense?",
//         "How do you and your partner handle disagreements or moments of frustration?",
//         "What's one activity or shared experience that still brings you joy or connection as a couple?"
//       ]
//     },
//     {
//       title: "Caregiver Dynamics (for primary caregiver)",
//       questions: [
//         "How easy or difficult is it for you to provide the help your loved one needs?",
//         "Do you feel appreciated or valued in your role as a caregiver?",
//         "Do you ever feel overwhelmed by your caregiving responsibilities?",
//         "Do you believe more help or support is needed?",
//         "How worried are you about the future of your loved one's care?",
//         "How fairly are caregiving responsibilities shared (if multiple people involved)?",
//         "Do you feel aligned with other caregivers in care decisions and communication?"
//       ]
//     }
//   ];

//   // Effect to automatically ask the first question when the app loads
//   useEffect(() => {
//     const firstQuestion = questionnaire[currentSectionIndex].questions[currentQuestionIndex];
//     setMessages([{ sender: 'bot', text: `Welcome to the comprehensive assessment. Let's start with the first section: ${questionnaire[currentSectionIndex].title}. ${firstQuestion}` }]);
//   }, []);

//   // Effect to scroll to the bottom of the chat window on new messages
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Function to call the OpenAI API for text generation
//   const callOpenAIAPI = async (prompt) => {
//     const payload = {
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 150,
//       temperature: 0.7
//     };
    
//     // IMPORTANT: In a real application, you should never expose your API key in client-side code.
//     // This should be handled through a server-side endpoint.
//     const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; // The API Key Has Been Changes;
//     const apiUrl = `https://api.openai.com/v1/chat/completions`;

//     // Check if API key is available
//     if (!apiKey) {
//       console.error('OpenAI API key is missing!');
//       return "Thank you for sharing. Let's continue with the next question.";
//     }

//     let response;
//     try {
//       response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${apiKey}`
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         throw new Error(`API error: ${response.statusText}`);
//       }

//       const result = await response.json();
//       if (result.choices && result.choices.length > 0 && result.choices[0].message && result.choices[0].message.content) {
//         return result.choices[0].message.content;
//       }
//       return "Thank you for sharing. Let's continue with the next question.";
//     } catch (error) {
//       console.error("Error calling OpenAI API:", error);
//       return "I appreciate your response. Let's move to the next question.";
//     }
//   };

//   // Function to move to the next question
//   const nextQuestion = () => {
//     // Save the current response
//     const currentSection = questionnaire[currentSectionIndex];
//     const currentQuestion = currentSection.questions[currentQuestionIndex];
    
//     // Check if there are more questions in the current section
//     if (currentQuestionIndex < currentSection.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       const nextQuestion = currentSection.questions[currentQuestionIndex + 1];
//       setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: nextQuestion }]);
//     } else {
//       // Move to the next section
//       if (currentSectionIndex < questionnaire.length - 1) {
//         setCurrentSectionIndex(currentSectionIndex + 1);
//         setCurrentQuestionIndex(0);
//         const nextSection = questionnaire[currentSectionIndex + 1];
//         const nextQuestion = nextSection.questions[0];
//         setMessages(prevMessages => [...prevMessages, { 
//           sender: 'bot', 
//           text: `Thank you for completing that section. Now let's move to: ${nextSection.title}. ${nextQuestion}` 
//         }]);
//       } else {
//         // All questions completed
//         setMessages(prevMessages => [...prevMessages, { 
//           sender: 'bot', 
//           text: "Thank you for completing the entire assessment! Your responses have been recorded. Have a great day!" 
//         }]);
//       }
//     }
//   };

//   // Handler for sending a message
//   const handleSendMessage = async () => {
//     if (input.trim() === '') return;

//     const userMessage = { sender: 'user', text: input };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     // Store the user's response
//     const currentSection = questionnaire[currentSectionIndex].title;
//     const currentQuestion = questionnaire[currentSectionIndex].questions[currentQuestionIndex];
    
//     setUserResponses(prev => ({
//       ...prev,
//       [currentSection]: {
//         ...prev[currentSection],
//         [currentQuestion]: input
//       }
//     }));

//     // Create a prompt for OpenAI
//     const prompt = `You are conducting a comprehensive assessment. The user just answered the question: "${currentQuestion}" with: "${input}". 
//     Provide a brief, empathetic, and encouraging response (1-2 sentences) and then prepare to ask the next question. 
//     Do not repeat the user's answer verbatim. Keep it natural and conversational.`;

//     const botResponseText = await callOpenAIAPI(prompt);

//     setIsLoading(false);
//     setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponseText }]);

//     // Move to the next question after a short delay
//     setTimeout(() => {
//       nextQuestion();
//     }, 1500);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter' && !isLoading) {
//       handleSendMessage();
//     }
//   };

//   // Component for a single chat bubble
//   const ChatBubble = ({ sender, text }) => (
//     <div className={`p-4 rounded-3xl max-w-2/3 shadow-lg my-2 ${sender === 'user' ? 'bg-indigo-600 text-white self-end rounded-br-none' : 'bg-gray-700 text-white self-start rounded-bl-none'}`}>
//       <div className="flex items-center">
//         <span className="mr-2">
//           {sender === 'user' ? (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//             </svg>
//           ) : (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
//             </svg>
//           )}
//         </span>
//         <span className="text-base leading-relaxed">{text}</span>
//       </div>
//     </div>
//   );

//   // Check if all questions are completed
//   const allQuestionsCompleted = currentSectionIndex === questionnaire.length - 1 && 
//                                currentQuestionIndex === questionnaire[questionnaire.length - 1].questions.length - 1;

//   return (
//     <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
//       {/* Header */}
//       <div className="w-full flex justify-between items-center p-4 bg-gray-900 shadow-md">
//         <div className="flex items-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
//           </svg>
//           <h1 className="text-xl font-bold tracking-tight">Comprehensive Assessment</h1>
//         </div>
//         <div className="text-sm text-gray-400">
//           Section {currentSectionIndex + 1} of {questionnaire.length} • Question {currentQuestionIndex + 1} of {questionnaire[currentSectionIndex].questions.length}
//         </div>
//       </div>

//       {/* Progress bar */}
//       <div className="w-full bg-gray-800 h-2">
//         <div 
//           className="bg-indigo-500 h-2 transition-all duration-500" 
//           style={{ 
//             width: `${((currentSectionIndex * 100 + (currentQuestionIndex / questionnaire[currentSectionIndex].questions.length) * 100) / questionnaire.length)}%` 
//           }}
//         ></div>
//       </div>

//       {/* Main chat area */}
//       <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 flex flex-col items-center">
//         <div className="w-full max-w-3xl flex flex-col space-y-4">
//           {messages.map((msg, index) => (
//             <ChatBubble key={index} sender={msg.sender} text={msg.text} />
//           ))}
//           {isLoading && (
//             <div className="p-4 rounded-3xl max-w-2/3 shadow-lg my-2 bg-gray-700 text-white self-start rounded-bl-none">
//               <div className="flex items-center">
//                 <span className="mr-2">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                   </svg>
//                 </span>
//                 <span className="text-base leading-relaxed">Thinking...</span>
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>
      
//       {/* Input area */}
//       <div className="w-full p-4 bg-gray-900 shadow-lg flex justify-center">
//         <div className="flex w-full max-w-3xl rounded-full border border-gray-700 bg-gray-800 focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-300">
//           <input
//             type="text"
//             className="flex-1 p-4 bg-transparent text-white placeholder-gray-500 rounded-full focus:outline-none"
//             placeholder={allQuestionsCompleted ? "Assessment completed. Thank you!" : "Type your response..."}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             disabled={isLoading || allQuestionsCompleted}
//           />
//           <button
//             onClick={handleSendMessage}
//             className="p-4 text-indigo-400 hover:text-indigo-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={isLoading || allQuestionsCompleted || input.trim() === ''}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }










































'use client'

import React, { useState, useEffect, useRef } from 'react';

// Main App component
export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [language, setLanguage] = useState('English'); // Default language
  const messagesEndRef = useRef(null);

  // Translations for all text in the application
  const translations = {
    English: {
      welcome: "Welcome to the comprehensive assessment. Let's start with the first section: ",
      nextSection: "Thank you for completing that section. Now let's move to: ",
      completion: "Thank you for completing the entire assessment! Your responses have been recorded. Have a great day!",
      section: "Section",
      of: "of",
      question: "Question",
      thinking: "Thinking...",
      placeholder: "Type your response...",
      completedPlaceholder: "Assessment completed. Thank you!",
      title: "Comprehensive Assessment",
      sendButton: "Send",
      questionnaire: [
        {
          title: "Aging Perspectives & Planning Ahead",
          questions: [
            "How comfortable are you asking for help with daily tasks if needed?",
            "How do you feel about making changes to your daily life if aging or health made it necessary?",
            "If you began to struggle with something important—like managing money, getting around, or cooking—how likely are you to tell someone?",
            "How willing are you to assign someone to manage tasks if you could no longer do them?",
            "In the event of an unexpected situation (e.g., health emergency, sudden need for help), how well have you prepared in terms of what to do and who to contact?",
            "How do you feel about future care options?"
          ]
        },
        {
          title: "Physical Health, Pain & Nutrition",
          questions: [
            "How would you describe your appetite and ability to eat meals regularly?",
            "Do you have chronic pain or health conditions that limit your daily activities?",
            "How often do you feel fatigued or physically unable to do what you'd like?",
            "Are you able to maintain a balanced diet without help?",
            "How often do you engage in physical activity?"
          ]
        },
        {
          title: "Daily Living & Functional Abilities",
          questions: [
            "Can you perform daily self-care without assistance?",
            "How well do you manage medications?",
            "Do you feel overwhelmed by household tasks?",
            "Do you need mobility aids to move safely?",
            "How much difficulty do you have with your eyesight?",
            "How much difficulty do you have hearing?"
          ]
        },
        {
          title: "Mental Health & Social Connection",
          questions: [
            "How often do you feel lonely or isolated?",
            "How would you describe your interactions with friends, family, or caregivers?",
            "Do you engage in hobbies or activities that bring you joy?",
            "On a typical day, how many hours do you spend alone doing passive activities?",
            "Do you feel anxious or depressed about aging?"
          ]
        },
        {
          title: "Cognition & Decision-Making",
          questions: [
            "How often do you forget important information like appointments or names?",
            "How often do you forget what you planned to do during the day?",
            "How well can you plan and follow through with tasks that involve multiple steps?",
            "How confident are you when faced with new or unexpected situations?"
          ]
        },
        {
          title: "Technology, Home Environment & Safety",
          questions: [
            "How comfortable are you managing basic home appliances?",
            "How comfortable are you using digital devices?",
            "What is your general attitude toward learning and using new technology?",
            "How easy is it for you to get out of the house?",
            "How comfortable and safe do you feel managing everyday tasks at home?",
            "If something in your home breaks, how do you typically manage it?"
          ]
        },
        {
          title: "Couple Dynamics (for partner or spouse)",
          questions: [
            "How would you describe the current balance of responsibilities between you and your partner?",
            "If your partner is becoming more dependent on you, how would you describe the impact this has on your own life and well-being?",
            "Would you say your time as a couple is more often enjoyable or tense?",
            "How do you and your partner handle disagreements or moments of frustration?",
            "What's one activity or shared experience that still brings you joy or connection as a couple?"
          ]
        },
        {
          title: "Caregiver Dynamics (for primary caregiver)",
          questions: [
            "How easy or difficult is it for you to provide the help your loved one needs?",
            "Do you feel appreciated or valued in your role as a caregiver?",
            "Do you ever feel overwhelmed by your caregiving responsibilities?",
            "Do you believe more help or support is needed?",
            "How worried are you about the future of your loved one's care?",
            "How fairly are caregiving responsibilities shared (if multiple people involved)?",
            "Do you feel aligned with other caregivers in care decisions and communication?"
          ]
        }
      ]
    },
    Italian: {
      welcome: "Benvenuto alla valutazione completa. Iniziamo con la prima sezione: ",
      nextSection: "Grazie per aver completato quella sezione. Ora passiamo a: ",
      completion: "Grazie per aver completato l'intera valutazione! Le tue risposte sono state registrate. Buona giornata!",
      section: "Sezione",
      of: "di",
      question: "Domanda",
      thinking: "Pensando...",
      placeholder: "Scrivi la tua risposta...",
      completedPlaceholder: "Valutazione completata. Grazie!",
      title: "Valutazione Completa",
      sendButton: "Invia",
      questionnaire: [
        {
          title: "Prospettive sull'Invecchiamento e Pianificazione Futura",
          questions: [
            "Quanto ti senti a tuo agio nel chiedere aiuto per le attività quotidiane, se necessario?",
            "Come ti senti riguardo al dover apportare cambiamenti alla tua vita quotidiana se l'invecchiamento o la salute lo rendessero necessario?",
            "Se iniziassi ad avere difficoltà con qualcosa di importante - come gestire il denaro, muoverti o cucinare - quanto saresti propenso a dirlo a qualcuno?",
            "Quanto sei disposto ad assegnare a qualcuno la gestione di compiti se non fossi più in grado di svolgerli?",
            "In caso di una situazione imprevista (ad esempio, un'emergenza sanitaria, un bisogno improvviso di aiuto), quanto sei preparato in termini di cosa fare e chi contattare?",
            "Come ti senti riguardo alle opzioni di assistenza future?"
          ]
        },
        {
          title: "Salute Fisica, Dolore e Nutrizione",
          questions: [
            "Come descriveresti il tuo appetito e la tua capacità di mangiare regolarmente?",
            "Hai dolori cronici o condizioni di salute che limitano le tue attività quotidiane?",
            "Quanto spesso ti senti affaticato o fisicamente incapace di fare ciò che vorresti?",
            "Sei in grado di mantenere una dieta equilibrata senza aiuto?",
            "Quanto spesso ti impegni in attività fisiche?"
          ]
        },
        {
          title: "Vita Quotidiana e Abilità Funzionali",
          questions: [
            "Riesci a svolgere le cure personali quotidiane senza assistenza?",
            "Quanto bene gestisci i farmaci?",
            "Ti senti sopraffatto dalle faccende domestiche?",
            "Hai bisogno di ausili per la mobilità per muoverti in sicurezza?",
            "Quante difficoltà hai con la vista?",
            "Quante difficoltà hai con l'udito?"
          ]
        },
        {
          title: "Salute Mentale e Connessione Sociale",
          questions: [
            "Quanto spesso ti senti solo o isolato?",
            "Come descriveresti le tue interazioni con amici, familiari o assistenti?",
            "Ti dedichi a hobby o attività che ti portano gioia?",
            "In una giornata tipica, quante ore passi da solo facendo attività passive?",
            "Ti senti ansioso o depresso per l'invecchiamento?"
          ]
        },
        {
          title: "Cognizione e Processo Decisionale",
          questions: [
            "Quanto spesso dimentichi informazioni importanti come appuntamenti o nomi?",
            "Quanto spesso dimentichi ciò che avevi pianificato di fare durante il giorno?",
            "Quanto bene puoi pianificare e portare a termine compiti che coinvolgono più passaggi?",
            "Quanto sei sicuro di te quando affronti situazioni nuove o impreviste?"
          ]
        },
        {
          title: "Tecnologia, Ambiente Domestico e Sicurezza",
          questions: [
            "Quanto ti senti a tuo agio nel gestire gli elettrodomestici di base?",
            "Quanto ti senti a tuo agio nell'usare dispositivi digitali?",
            "Qual è il tuo atteggiamento generale verso l'apprendimento e l'uso di nuove tecnologie?",
            "Quanto è facile per te uscire di casa?",
            "Quanto ti senti a tuo agio e al sicuro nel gestire le attività quotidiane a casa?",
            "Se qualcosa in casa si rompe, come gestisci la situazione?"
          ]
        },
        {
          title: "Dinamiche di Coppia (per partner o coniuge)",
          questions: [
            "Come descriveresti l'attuale equilibrio delle responsabilità tra te e il tuo partner?",
            "Se il tuo partner sta diventando più dipendente da te, come descriveresti l'impatto che questo ha sulla tua vita e sul tuo benessere?",
            "Diresti che il vostro tempo come coppia è più spesso piacevole o teso?",
            "Come tu e il tuo partner gestite i disaccordi o i momenti di frustrazione?",
            "Qual è un'attività o un'esperienza condivisa che vi porta ancora gioia o connessione come coppia?"
          ]
        },
        {
          title: "Dinamiche del Caregiver (per il caregiver primario)",
          questions: [
            "Quanto è facile o difficile per te fornire l'aiuto di cui il tuo caro ha bisogno?",
            "Ti senti apprezzato o valorizzato nel tuo ruolo di caregiver?",
            "Ti senti mai sopraffatto dalle tue responsabilità di assistenza?",
            "Credi che sia necessario più aiuto o supporto?",
            "Quanto sei preoccupato per il futuro delle cure del tuo caro?",
            "Quanto equamente sono condivise le responsabilità di cura (se sono coinvolte più persone)?",
            "Ti senti allineato con altri caregiver nelle decisioni e nella comunicazione sulle cure?"
          ]
        }
      ]
    },
    German: {
      welcome: "Willkommen zur umfassenden Bewertung. Beginnen wir mit dem ersten Abschnitt: ",
      nextSection: "Vielen Dank für das Abschließen dieses Abschnitts. Kommen wir nun zu: ",
      completion: "Vielen Dank für das Abschließen der gesamten Bewertung! Ihre Antworten wurden aufgezeichnet. Einen schönen Tag noch!",
      section: "Abschnitt",
      of: "von",
      question: "Frage",
      thinking: "Denke nach...",
      placeholder: "Geben Sie Ihre Antwort ein...",
      completedPlaceholder: "Bewertung abgeschlossen. Vielen Dank!",
      title: "Umfassende Bewertung",
      sendButton: "Senden",
      questionnaire: [
        {
          title: "Alterungsperspektiven & Vorausplanung",
          questions: [
            "Wie wohl fühlen Sie sich dabei, bei Bedarf um Hilfe bei täglichen Aufgaben zu bitten?",
            "Wie stehen Sie dazu, Änderungen an Ihrem täglichen Leben vorzunehmen, wenn das Alter oder die Gesundheit dies erforderlich machen?",
            "Wenn Sie bei etwas Wichtigem Schwierigkeiten hätten – wie Geldverwaltung, Fortbewegung oder Kochen – wie wahrscheinlich ist es, dass Sie es jemandem mitteilen?",
            "Wie bereit sind Sie, jemanden mit der Verwaltung von Aufgaben zu beauftragen, wenn Sie diese nicht mehr ausführen könnten?",
            "Wie gut sind Sie im Falle einer unerwarteten Situation (z.B. Gesundheitsnotfall, plötzlicher Hilfebedarf) darauf vorbereitet, was zu tun ist und wen zu kontaktieren?",
            "Wie stehen Sie zu zukünftigen Betreuungsoptionen?"
          ]
        },
        {
          title: "Körperliche Gesundheit, Schmerzen & Ernährung",
          questions: [
            "Wie würden Sie Ihren Appetit und Ihre Fähigkeit beschreiben, regelmäßig Mahlzeiten zu sich zu nehmen?",
            "Haben Sie chronische Schmerzen oder Gesundheitsprobleme, die Ihre täglichen Aktivitäten einschränken?",
            "Wie oft fühlen Sie sich müde oder körperlich nicht in der Lage, das zu tun, was Sie möchten?",
            "Können Sie ohne Hilfe eine ausgewogene Ernährung beibehalten?",
            "Wie oft betätigen Sie sich körperlich?"
          ]
        },
        {
          title: "Alltagsleben & Funktionale Fähigkeiten",
          questions: [
            "Können Sie die tägliche Selbstfürsorge ohne Hilfe durchführen?",
            "Wie gut verwalten Sie Ihre Medikamente?",
            "Fühlen Sie sich von Haushaltsaufgaben überfordert?",
            "Benötigen Sie Mobilitätshilfen, um sich sicher zu bewegen?",
            "Wie große Schwierigkeiten haben Sie mit Ihrem Sehvermögen?",
            "Wie große Schwierigkeiten haben Sie mit Ihrem Hörvermögen?"
          ]
        },
        {
          title: "Psychische Gesundheit & Soziale Verbindung",
          questions: [
            "Wie oft fühlen Sie sich einsam oder isoliert?",
            "Wie würden Sie Ihre Interaktionen mit Freunden, Familie oder Pflegepersonen beschreiben?",
            "Beschäftigen Sie sich mit Hobbys oder Aktivitäten, die Ihnen Freude bereiten?",
            "Wie viele Stunden verbringen Sie an einem typischen Tag allein mit passiven Aktivitäten?",
            "Fühlen Sie sich ängstlich oder deprimiert wegen des Alterns?"
          ]
        },
        {
          title: "Kognition & Entscheidungsfindung",
          questions: [
            "Wie oft vergessen Sie wichtige Informationen wie Termine oder Namen?",
            "Wie oft vergessen Sie, was Sie tagsüber geplant hatten?",
            "Wie gut können Sie Aufgaben planen und durchführen, die mehrere Schritte umfassen?",
            "Wie selbstbewusst sind Sie, wenn Sie mit neuen oder unerwarteten Situationen konfrontiert werden?"
          ]
        },
        {
          title: "Technologie, Wohnumgebung & Sicherheit",
          questions: [
            "Wie wohl fühlen Sie sich beim Umgang mit grundlegenden Haushaltsgeräten?",
            "Wie wohl fühlen Sie sich bei der Verwendung digitaler Geräte?",
            "Wie ist Ihre allgemeine Einstellung zum Erlernen und Verwenden neuer Technologien?",
            "Wie einfach ist es für Sie, das Haus zu verlassen?",
            "Wie wohl und sicher fühlen Sie sich bei der Bewältigung alltäglicher Aufgaben zu Hause?",
            "Wenn etwas in Ihrem Haus kaputt geht, wie gehen Sie typischerweise damit um?"
          ]
        },
        {
          title: "Paardynamik (für Partner oder Ehepartner)",
          questions: [
            "Wie würden Sie die aktuelle Aufgabenteilung zwischen Ihnen und Ihrem Partner beschreiben?",
            "Wenn Ihr Partner zunehmend von Ihnen abhängig wird, wie würden Sie die Auswirkungen auf Ihr eigenes Leben und Wohlbefinden beschreiben?",
            "Würden Sie sagen, dass Ihre Zeit als Paar häufiger angenehm oder angespannt ist?",
            "Wie gehen Sie und Ihr Partner mit Meinungsverschiedenheiten oder Momenten der Frustration um?",
            "Was ist eine Aktivität oder gemeinsame Erfahrung, die Ihnen als Paar immer noch Freude oder Verbundenheit bringt?"
          ]
        },
        {
          title: "Pflegedynamik (für die primäre Pflegeperson)",
          questions: [
            "Wie einfach oder schwierig ist es für Sie, die Hilfe zu leisten, die Ihr Angehöriger benötigt?",
            "Fühlen Sie sich in Ihrer Rolle als Pflegeperson geschätzt oder wertgeschätzt?",
            "Fühlen Sie sich jemals von Ihren Pflegeverantwortlichkeiten überfordert?",
            "Glauben Sie, dass mehr Hilfe oder Unterstützung benötigt wird?",
            "Wie besorgt sind Sie über die Zukunft der Pflege Ihres Angehörigen?",
            "Wie fair werden die Pflegeverantwortlichkeiten geteilt (wenn mehrere Personen beteiligt sind)?",
            "Fühlen Sie sich mit anderen Pflegepersonen in Pflegeentscheidungen und Kommunikation abgestimmt?"
          ]
        }
      ]
    },
    Spanish: {
      welcome: "Bienvenido a la evaluación integral. Comencemos con la primera sección: ",
      nextSection: "Gracias por completar esa sección. Ahora pasemos a: ",
      completion: "¡Gracias por completar toda la evaluación! Sus respuestas han sido registradas. ¡Que tenga un buen día!",
      section: "Sección",
      of: "de",
      question: "Pregunta",
      thinking: "Pensando...",
      placeholder: "Escribe tu respuesta...",
      completedPlaceholder: "Evaluación completada. ¡Gracias!",
      title: "Evaluación Integral",
      sendButton: "Enviar",
      questionnaire: [
        {
          title: "Perspectivas del Envejecimiento y Planificación Futura",
          questions: [
            "¿Qué tan cómodo se siente pidiendo ayuda con las tareas diarias si es necesario?",
            "¿Cómo se siente acerca de hacer cambios en su vida diaria si el envejecimiento o la salud lo hicieran necesario?",
            "Si comenzara a tener dificultades con algo importante (como administrar dinero, moverse o cocinar), ¿qué probabilidades hay de que se lo diga a alguien?",
            "¿Qué tan dispuesto está a asignar a alguien para que maneje tareas si usted ya no pudiera hacerlas?",
            "En caso de una situación inesperada (por ejemplo, una emergencia de salud, una necesidad repentina de ayuda), ¿qué tan preparado está en términos de qué hacer y a quién contactar?",
            "¿Cómo se siente acerca de las opciones de cuidado futuro?"
          ]
        },
        {
          title: "Salud Física, Dolor y Nutrición",
          questions: [
            "¿Cómo describiría su apetito y capacidad para comer comidas con regularidad?",
            "¿Tiene dolor crónico o condiciones de salud que limitan sus actividades diarias?",
            "¿Con qué frecuencia se siente fatigado o físicamente incapaz de hacer lo que le gustaría?",
            "¿Es capaz de mantener una dieta equilibrada sin ayuda?",
            "¿Con qué frecuencia realiza actividad física?"
          ]
        },
        {
          title: "Vida Diaria y Habilidades Funcionales",
          questions: [
            "¿Puede realizar el cuidado personal diario sin asistencia?",
            "¿Qué tan bien maneja sus medicamentos?",
            "¿Se siente abrumado por las tareas del hogar?",
            "¿Necesita ayudas para la movilidad para moverse con seguridad?",
            "¿Cuánta dificultad tiene con su vista?",
            "¿Cuánta dificultad tiene con su audición?"
          ]
        },
        {
          title: "Salud Mental y Conexión Social",
          questions: [
            "¿Con qué frecuencia se siente solo o aislado?",
            "¿Cómo describiría sus interacciones con amigos, familiares o cuidadores?",
            "¿Participa en pasatiempos o actividades que le brindan alegría?",
            "En un día típico, ¿cuántas horas pasa solo haciendo actividades pasivas?",
            "¿Se siente ansioso o deprimido por el envejecimiento?"
          ]
        },
        {
          title: "Cognición y Toma de Decisiones",
          questions: [
            "¿Con qué frecuencia olvida información importante como citas o nombres?",
            "¿Con qué frecuencia olvida lo que planeó hacer durante el día?",
            "¿Qué tan bien puede planificar y llevar a cabo tareas que involucran múltiples pasos?",
            "¿Qué tan seguro se siente cuando se enfrenta a situaciones nuevas o inesperadas?"
          ]
        },
        {
          title: "Tecnología, Entorno del Hogar y Seguridad",
          questions: [
            "¿Qué tan cómodo se siente manejando electrodomésticos básicos del hogar?",
            "¿Qué tan cómodo se siente usando dispositivos digitales?",
            "¿Cuál es su actitud general hacia aprender y usar nueva tecnología?",
            "¿Qué tan fácil es para usted salir de casa?",
            "¿Qué tan cómodo y seguro se siente manejando las tareas cotidianas en casa?",
            "Si algo en su hogar se rompe, ¿cómo suele manejarlo?"
          ]
        },
        {
          title: "Dinámica de Pareja (para pareja o cónyuge)",
          questions: [
            "¿Cómo describiría el equilibrio actual de responsabilidades entre usted y su pareja?",
            "Si su pareja se está volviendo más dependiente de usted, ¿cómo describiría el impacto que esto tiene en su propia vida y bienestar?",
            "¿Diría que su tiempo como pareja es más a menudo agradable o tenso?",
            "¿Cómo manejan usted y su pareja los desacuerdos o momentos de frustración?",
            "¿Cuál es una actividad o experiencia compartida que todavía les trae alegría o conexión como pareja?"
          ]
        },
        {
          title: "Dinámica del Cuidador (para el cuidador principal)",
          questions: [
            "¿Qué tan fácil o difícil es para usted proporcionar la ayuda que su ser querido necesita?",
            "¿Se siente apreciado o valorado en su papel como cuidador?",
            "¿Alguna vez se siente abrumado por sus responsabilidades de cuidado?",
            "¿Cree que se necesita más ayuda o apoyo?",
            "¿Qué tan preocupado está sobre el futuro del cuidado de su ser querido?",
            "¿Qué tan justamente se comparten las responsabilidades de cuidado (si hay varias personas involucradas)?",
            "¿Se siente alineado con otros cuidadores en las decisiones de cuidado y la comunicación?"
          ]
        }
      ]
    },
    French: {
      welcome: "Bienvenue à l'évaluation complète. Commençons par la première section: ",
      nextSection: "Merci d'avoir complété cette section. Passons maintenant à: ",
      completion: "Merci d'avoir complété l'évaluation entière! Vos réponses ont été enregistrées. Passez une bonne journée!",
      section: "Section",
      of: "de",
      question: "Question",
      thinking: "Réflexion...",
      placeholder: "Tapez votre réponse...",
      completedPlaceholder: "Évaluation terminée. Merci!",
      title: "Évaluation Complète",
      sendButton: "Envoyer",
      questionnaire: [
        {
          title: "Perspectives de Vieillissement et Planification Future",
          questions: [
            "Dans quelle mesure êtes-vous à l'aise de demander de l'aide pour les tâches quotidiennes si nécessaire?",
            "Comment vous sentez-vous à propos des changements à apporter à votre vie quotidienne si le vieillissement ou la santé le rendait nécessaire?",
            "Si vous commenciez à avoir des difficultés avec quelque chose d'important - comme gérer de l'argent, vous déplacer ou cuisiner - quelle est la probabilité que vous en informiez quelqu'un?",
            "Dans quelle mesure êtes-vous disposé à désigner quelqu'un pour gérer des tâches si vous ne pouviez plus les faire?",
            "En cas de situation inattendue (par exemple, une urgence sanitaire, un besoin soudain d'aide), dans quelle mesure êtes-vous préparé en termes de quoi faire et qui contacter?",
            "Comment vous sentez-vous concernant les options de soins futurs?"
          ]
        },
        {
          title: "Santé Physique, Douleur et Nutrition",
          questions: [
            "Comment décririez-vous votre appétit et votre capacité à prendre des repas régulièrement?",
            "Avez-vous des douleurs chroniques ou des problèmes de santé qui limitent vos activités quotidiennes?",
            "À quelle fréquence vous sentez-vous fatigué ou physiquement incapable de faire ce que vous aimeriez?",
            "Êtes-vous capable de maintenir une alimentation équilibrée sans aide?",
            "À quelle fréquence pratiquez-vous une activité physique?"
          ]
        },
        {
          title: "Vie Quotidienne et Capacités Fonctionnelles",
          questions: [
            "Pouvez-vous effectuer les soins personnels quotidiens sans assistance?",
            "Comment gérez-vous vos médicaments?",
            "Vous sentez-vous submergé par les tâches ménagères?",
            "Avez-vous besoin d'aides à la mobilité pour vous déplacer en toute sécurité?",
            "Quelle difficulté avez-vous avec votre vue?",
            "Quelle difficulté avez-vous avec votre audition?"
          ]
        },
        {
          title: "Santé Mentale et Lien Social",
          questions: [
            "À quelle fréquence vous sentez-vous seul ou isolé?",
            "Comment décririez-vous vos interactions avec vos amis, votre famille ou vos aidants?",
            "Pratiquez-vous des loisirs ou des activités qui vous apportent de la joie?",
            "Lors d'une journée typique, combien d'heures passez-vous seul à faire des activités passives?",
            "Vous sentez-vous anxieux ou déprimé face au vieillissement?"
          ]
        },
        {
          title: "Cognition et Prise de Décision",
          questions: [
            "À quelle fréquence oubliez-vous des informations importantes comme des rendez-vous ou des noms?",
            "À quelle fréquence oubliez-vous ce que vous aviez prévu de faire pendant la journée?",
            "Dans quelle mesure pouvez-vous planifier et mener à bien des tâches qui impliquent plusieurs étapes?",
            "À quel point êtes-vous confiant lorsque vous êtes confronté à des situations nouvelles ou inattendues?"
          ]
        },
        {
          title: "Technologie, Environnement Domestique et Sécurité",
          questions: [
            "Dans quelle mesure êtes-vous à l'aise pour gérer les appareils ménagers de base?",
            "Dans quelle mesure êtes-vous à l'aise pour utiliser des appareils numériques?",
            "Quelle est votre attitude générale envers l'apprentissage et l'utilisation de nouvelles technologies?",
            "Est-il facile pour vous de sortir de chez vous?",
            "Dans quelle mesure vous sentez-vous à l'aise et en sécurité pour gérer les tâches quotidiennes à la maison?",
            "Si quelque chose se casse chez vous, comment gérez-vous généralement la situation?"
          ]
        },
        {
          title: "Dynamique de Couple (pour partenaire ou conjoint)",
          questions: [
            "Comment décririez-vous l'équilibre actuel des responsabilités entre vous et votre partenaire?",
            "Si votre partenaire devient plus dépendant de vous, comment décririez-vous l'impact que cela a sur votre propre vie et votre bien-être?",
            "Diriez-vous que votre temps en couple est le plus souvent agréable ou tendu?",
            "Comment vous et votre partenaire gérez-vous les désaccords ou les moments de frustration?",
            "Quelle est une activité ou une expérience partagée qui vous apporte encore de la joie ou de la connexion en tant que couple?"
          ]
        },
        {
          title: "Dynamique de l'Aidant (pour l'aidant principal)",
          questions: [
            "À quel point est-il facile ou difficile pour vous de fournir l'aide dont votre proche a besoin?",
            "Vous sentez-vous apprécié ou valorisé dans votre rôle d'aidant?",
            "Vous sentez-vous parfois submergé par vos responsabilités d'aidant?",
            "Pensez-vous que plus d'aide ou de soutien est nécessaire?",
            "À quel point êtes-vous inquiet pour l'avenir des soins de votre proche?",
            "Dans quelle mesure les responsabilités d'aidant sont-elles partagées équitablement (si plusieurs personnes sont impliquées)?",
            "Vous sentez-vous aligné avec les autres aidants dans les décisions de soins et la communication?"
          ]
        }
      ]
    },
    Catalan: {
      welcome: "Benvingut/da a l'avaluació completa. Comencem amb la primera secció: ",
      nextSection: "Gràcies per completar aquella secció. Ara passem a: ",
      completion: "Gràcies per completar tota l'avaluació! Les teves respostes han estat enregistrades. Que tinguis un bon dia!",
      section: "Secció",
      of: "de",
      question: "Pregunta",
      thinking: "Pensant...",
      placeholder: "Escriu la teva resposta...",
      completedPlaceholder: "Avaluació completada. Gràcies!",
      title: "Avaluació Completa",
      sendButton: "Enviar",
      questionnaire: [
        {
          title: "Perspectives d'Envelliment i Planificació Futura",
          questions: [
            "Com et sents demanant ajuda per a tasques diàries si és necessari?",
            "Com et sents sobre fer canvis a la teva vida diària si l'envelliment o la salut ho fessin necessari?",
            "Si comencessis a tenir dificultats amb alguna cosa important - com gestionar diners, moure't o cuinar - quines probabilitats hi ha que ho diguessis a algú?",
            "Quan disposat/esta estàs a assignar algú per gestionar tasques si ja no les poguessis fer?",
            "En cas d'una situació inesperada (per exemple, una emergència de salut, una necessitat sobtada d'ajuda), quina preparació tens en termes de què fer i a qui contactar?",
            "Com et sents sobre les opcions de cura futures?"
          ]
        },
        {
          title: "Salut Física, Dolor i Nutrició",
          questions: [
            "Com descriuries el teu apetit i capacitat per menjar regularment?",
            "Tens dolor crònic o condicions de salut que limiten les teves activitats diàries?",
            "Amb quina freqüència et sents fatigançat o físicament incapaç de fer el que t'agradaria?",
            "Ets capaç de mantenir una dieta equilibrada sense ajuda?",
            "Amb quina freqüència realitzes activitat física?"
          ]
        },
        {
          title: "Vida Diària i Habilitats Funcionals",
          questions: [
            "Pots realitzar la cura personal diària sense assistència?",
            "Com de bé gestiones els teus medicaments?",
            "Et sents aclaparat per les tasques domèstiques?",
            "Necessites ajudes per a la mobilitat per moure't amb seguretat?",
            "Quina dificultat tens amb la teva vista?",
            "Quina dificultat tens amb la teva audició?"
          ]
        },
        {
          title: "Salut Mental i Connexió Social",
          questions: [
            "Amb quina freqüència et sents sol o aïllat?",
            "Com descriuries les teves interaccions amb amics, família o cuidadors?",
            "Practiques aficions o activitats que et porten alegria?",
            "En un dia típic, quantes hores passes sol fent activitats passives?",
            "Et sents ansiós o deprimit per l'envelliment?"
          ]
        },
        {
          title: "Cognició i Presa de Decisions",
          questions: [
            "Amb quina freqüència oblides informació important com cites o noms?",
            "Amb quina freqüència oblides el que havies planejat fer durant el dia?",
            "Com de bé pots planificar i dur a terme tasques que impliquen múltiples passos?",
            "Com de confiat et sents quan t'enfrontes a situacions noves o inesperades?"
          ]
        },
        {
          title: "Tecnologia, Entorn de la Llar i Seguretat",
          questions: [
            "Com et sents gestionant electrodomèstics bàsics de la llar?",
            "Com et sents utilitzant dispositius digitals?",
            "Quina és la teva actitud general cap a aprendre i utilitzar nova tecnologia?",
            "Com de fàcil és per a tu sortir de casa?",
            "Com de còmode i segur et sents gestionant les tasques quotidianes a casa?",
            "Si alguna cosa a casa teva es trenca, com ho solucionas normalment?"
          ]
        },
        {
          title: "Dinàmica de Parella (per a parella o cònjuge)",
          questions: [
            "Com descriuries l'equilibri actual de responsabilitats entre tu i la teva parella?",
            "Si la teva parella es torna més dependent de tu, com descriuries l'impacte que això té en la teva pròpia vida i benestar?",
            "Diries que el vostre temps com a parella és més sovint agradable o tens?",
            "Com tu i la teva parella manegeu els desacords o moments de frustració?",
            "Quina és una activitat o experiència compartida que encara us porta alegria o connexió com a parella?"
          ]
        },
        {
          title: "Dinàmica del Cuidador (per al cuidador principal)",
          questions: [
            "Com de fàcil o difícil és per a tu proporcionar l'ajuda que el teu ésser estimat necessita?",
            "Et sents apreciat o valorat en el teu paper com a cuidador?",
            "Alguna vegada et sents aclaparat per les teves responsabilitats com a cuidador?",
            "Creus que es necessita més ajuda o suport?",
            "Com de preocupat estàs pel futur de la cura del teu ésser estimat?",
            "Com de justament es comparteixen les responsabilitats de cura (si hi ha diverses persones involucrades)?",
            "Et sents alineat amb altres cuidadors en les decisions de cura i la comunicació?"
          ]
        }
      ]
    }
  };
  // Get the current questionnaire based on selected language
  const getQuestionnaire = () => translations[language]?.questionnaire || translations.English.questionnaire;

  // Effect to automatically ask the first question when the app loads or language changes
  useEffect(() => {
    const questionnaire = getQuestionnaire();
    const firstQuestion = questionnaire[currentSectionIndex].questions[currentQuestionIndex];
    setMessages([{ 
      sender: 'bot', 
      text: `${translations[language].welcome}${questionnaire[currentSectionIndex].title}. ${firstQuestion}` 
    }]);
  }, [language]);

  // Effect to scroll to the bottom of the chat window on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to call the OpenAI API for text generation
  const callOpenAIAPI = async (prompt) => {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7
    };
    
    // IMPORTANT: In a real application, you should never expose your API key in client-side code.
    // This should be handled through a server-side endpoint.
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const apiUrl = `https://api.openai.com/v1/chat/completions`;

    // Check if API key is available
    if (!apiKey) {
      console.error('OpenAI API key is missing!');
      return translations[language].thinking;
    }

    let response;
    try {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.choices && result.choices.length > 0 && result.choices[0].message && result.choices[0].message.content) {
        return result.choices[0].message.content;
      }
      return translations[language].thinking;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      return translations[language].thinking;
    }
  };

  // Function to move to the next question
  const nextQuestion = () => {
    const questionnaire = getQuestionnaire();
    const currentSection = questionnaire[currentSectionIndex];
    const currentQuestion = currentSection.questions[currentQuestionIndex];
    
    // Check if there are more questions in the current section
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const nextQuestion = currentSection.questions[currentQuestionIndex + 1];
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: nextQuestion }]);
    } else {
      // Move to the next section
      if (currentSectionIndex < questionnaire.length - 1) {
        setCurrentSectionIndex(currentSectionIndex + 1);
        setCurrentQuestionIndex(0);
        const nextSection = questionnaire[currentSectionIndex + 1];
        const nextQuestion = nextSection.questions[0];
        setMessages(prevMessages => [...prevMessages, { 
          sender: 'bot', 
          text: `${translations[language].nextSection}${nextSection.title}. ${nextQuestion}` 
        }]);
      } else {
        // All questions completed
        setMessages(prevMessages => [...prevMessages, { 
          sender: 'bot', 
          text: translations[language].completion
        }]);
      }
    }
  };

  // Handler for sending a message
  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Store the user's response
    const questionnaire = getQuestionnaire();
    const currentSection = questionnaire[currentSectionIndex].title;
    const currentQuestion = questionnaire[currentSectionIndex].questions[currentQuestionIndex];
    
    setUserResponses(prev => ({
      ...prev,
      [currentSection]: {
        ...prev[currentSection],
        [currentQuestion]: input
      }
    }));

    // Create a prompt for OpenAI
    const prompt = `You are conducting a comprehensive assessment. The user just answered the question: "${currentQuestion}" with: "${input}". 
    Provide a brief, empathetic, and encouraging response (1-2 sentences) and then prepare to ask the next question. 
    Do not repeat the user's answer verbatim. Keep it natural and conversational.`;

    const botResponseText = await callOpenAIAPI(prompt);

    setIsLoading(false);
    setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponseText }]);

    // Move to the next question after a short delay
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  // Component for a single chat bubble
  const ChatBubble = ({ sender, text }) => (
    <div className={`p-4 rounded-3xl max-w-2/3 shadow-lg my-2 ${sender === 'user' ? 'bg-indigo-600 text-white self-end rounded-br-none' : 'bg-gray-700 text-white self-start rounded-bl-none'}`}>
      <div className="flex items-center">
        <span className="mr-2">
          {sender === 'user' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          )}
        </span>
        <span className="text-base leading-relaxed">{text}</span>
      </div>
    </div>
  );

  // Check if all questions are completed
  const questionnaire = getQuestionnaire();
  const allQuestionsCompleted = currentSectionIndex === questionnaire.length - 1 && 
                               currentQuestionIndex === questionnaire[questionnaire.length - 1].questions.length - 1;

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
      {/* Header */}
      <div className="w-full flex justify-between items-center p-4 bg-gray-900 shadow-md">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <h1 className="text-xl font-bold tracking-tight">{translations[language].title}</h1>
        </div>
        <div className="flex items-center">
          <div className="text-sm text-gray-400 mr-4">
            {translations[language].section} {currentSectionIndex + 1} {translations[language].of} {questionnaire.length} • {translations[language].question} {currentQuestionIndex + 1} {translations[language].of} {questionnaire[currentSectionIndex].questions.length}
          </div>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 text-white rounded-md p-1 text-sm"
          >
            <option value="English">English</option>
            <option value="Italian">Italian</option>
            <option value="German">German</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Catalan">Catalan</option>
          </select>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-800 h-2">
        <div 
          className="bg-indigo-500 h-2 transition-all duration-500" 
          style={{ 
            width: `${((currentSectionIndex * 100 + (currentQuestionIndex / questionnaire[currentSectionIndex].questions.length) * 100) / questionnaire.length)}%` 
          }}
        ></div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 flex flex-col items-center">
        <div className="w-full max-w-3xl flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <ChatBubble key={index} sender={msg.sender} text={msg.text} />
          ))}
          {isLoading && (
            <div className="p-4 rounded-3xl max-w-2/3 shadow-lg my-2 bg-gray-700 text-white self-start rounded-bl-none">
              <div className="flex items-center">
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="text-base leading-relaxed">{translations[language].thinking}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <div className="w-full p-4 bg-gray-900 shadow-lg flex justify-center">
        <div className="flex w-full max-w-3xl rounded-full border border-gray-700 bg-gray-800 focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-300">
          <input
            type="text"
            className="flex-1 p-4 bg-transparent text-white placeholder-gray-500 rounded-full focus:outline-none"
            placeholder={allQuestionsCompleted ? translations[language].completedPlaceholder : translations[language].placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || allQuestionsCompleted}
          />
          <button
            onClick={handleSendMessage}
            className="p-4 text-indigo-400 hover:text-indigo-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || allQuestionsCompleted || input.trim() === ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}