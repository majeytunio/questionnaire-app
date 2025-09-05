// // // 'use client'

// // // import { useState, useEffect } from 'react';
// // // import { useRouter } from 'next/navigation'; // <-- Correct import

// // // import Navbar from '../components/Navbar';
// // // import Footer from '../components/Footer';
// // // import { useAuth } from '../providers/authProvider';

// // // export default function Questionnaire() {
// // //   const router = useRouter();
// // //   const { user, loading } = useAuth();

// // //   useEffect(() => {
// // //     if (!loading && !user) {
// // //       router.push('/auth/login'); // Use absolute path
// // //     }
// // //   }, [loading, user, router]);
  
// // //   if(user){
// // //       return (
// // //         <>
// // //           <Navbar currentUser={user} />
// // //           <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">
            
// // //             <section className='justify-center max-w-6xl center-items mx-auto'>
    
// // //               {/* Hero Section */}
// // //               <h1 className="text-4xl text-[var(--text-primary)] sm:text-5xl font-bold tracking-tight text-center">
// // //                 AI Questionnaire Platform
// // //               </h1>
// // //               <p className="text-lg text-[var(--white)] mt-2 text-center">
// // //                 Create, share, and analyze AI-powered questionnaires in minutes. 
// // //                 Let artificial intelligence do the heavy lifting while you focus on insights.
// // //               </p>
    
// // //               {/* Call to Action */}
// // //               <div className="flex justify-center gap-4 mt-8">
// // //                 <a
// // //                   href="#get-started"
// // //                   className="px-6 py-3 rounded-2xl bg-[var(--button-primary)] text-white font-medium hover:bg-[var(--button-secondary)] transition"
// // //                 >
// // //                   Get Started
// // //                 </a>
// // //                 <a
// // //                   href="#learn-more"
// // //                   className="px-6 py-3 rounded-2xl border border-[var(--border-secondary)] text-[var(--white)] hover:text-[var(--text-primary)] hover:bg-[var(--white)] transition"
// // //                 >
// // //                   Learn More
// // //                 </a>
// // //               </div>
    
// // //               {/* Feature Highlight */}
// // //               <section className="mt-12 grid sm:grid-cols-3 gap-8 text-gray-700">
// // //                 <div className="p-6 rounded-2xl shadow bg-[var(--block-secondary)] text-white">
// // //                   <h3 className="text-xl font-semibold">Smart Surveys</h3>
// // //                   <p className="mt-2 text-sm">
// // //                     Build dynamic questionnaires that adapt to user responses.
// // //                   </p>
// // //                 </div>
    
// // //                 <div className="p-6 rounded-2xl shadow bg-[var(--block-secondary)] text-white">
// // //                   <h3 className="text-xl font-semibold">Instant Insights</h3>
// // //                   <p className="mt-2 text-sm">
// // //                     AI analyzes responses and gives you actionable results instantly.
// // //                   </p>
// // //                 </div>
// // //                 <div className="p-6 rounded-2xl shadow bg-[var(--block-secondary)] text-white">
// // //                   <h3 className="text-xl font-semibold">Seamless Sharing</h3>
// // //                   <p className="mt-2 text-sm">
// // //                     Share questionnaires with a link and track responses in real time.
// // //                   </p>
// // //                 </div>
// // //               </section>
    
// // //             </section>
    
    
    
// // //           </main>
// // //           <Footer currentUser={user} />
// // //         </>
// // //       );
// // //   }

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
// //       model: "gpt-3.5-turbo", // or another model like gpt-4
// //       messages: [{ role: "user", content: prompt }],
// //     };
// //   const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; // Canvas will provide this key at runtime
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

// //     const questionText = predefinedQuestions[currentStep];
// //     const prompt = `The user answered the question "${questionText}" with "${userMessage.text}". Acknowledge their response and prepare them for the next question. Your response should be brief and encouraging.`;

// //     const botResponseText = await callOpenAIAPI(prompt);

// //     setIsLoading(false);
// //     setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponseText }]);

// //     // Move to the next question step
// //     setTimeout(() => {
// //       const nextStep = currentStep + 1;
// //       if (predefinedQuestions[nextStep]) {
// //         setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: predefinedQuestions[nextStep] }]);
// //         setCurrentStep(nextStep);
// //       } else {
// //         setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: "Thank you for answering all the questions! Have a great day." }]);
// //         setCurrentStep(-1); // End the conversation
// //       }
// //     }, 1000); // Small delay to make it feel more natural
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
//   const [currentStep, setCurrentStep] = useState(0);
//   const messagesEndRef = useRef(null);

//   // Pre-defined questions for the guided flow
//   const predefinedQuestions = [
//     "What is your name?",
//     "How old are you?",
//     "What is your favorite hobby?",
//     "Is there anything else you'd like to share?",
//   ];

//   // Effect to automatically ask the first question when the app loads
//   useEffect(() => {
//     if (predefinedQuestions[currentStep]) {
//       setMessages([{ sender: 'bot', text: predefinedQuestions[currentStep] }]);
//     }
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
//     };
//    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
//     const apiUrl = `https://api.openai.com/v1/chat/completions`;

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
//       return "Sorry, I couldn't generate a response.";
//     } catch (error) {
//       console.error("Error calling OpenAI API:", error);
//       return "An error occurred while getting a response.";
//     }
//   };

//   // Handler for sending a message
//   const handleSendMessage = async () => {
//     if (input.trim() === '') return;

//     const userMessage = { sender: 'user', text: input };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     // Create a prompt that includes the conversation history and asks for the next question
//     let prompt = `You are conducting a questionnaire with the user. Here's the conversation so far:\n\n`;
    
//     // Add all previous messages to the prompt
//     messages.forEach(msg => {
//       prompt += `${msg.sender === 'bot' ? 'Assistant' : 'User'}: ${msg.text}\n`;
//     });
    
//     // Add the current user response
//     prompt += `User: ${userMessage.text}\n\n`;
    
//     // Ask for the next question or appropriate response
//     prompt += `The user just answered your question. Please respond to their answer and ask the next question from the questionnaire. `;
//     prompt += `The next question should be: "${predefinedQuestions[currentStep + 1] || 'Thank the user for completing the questionnaire'}"`;
//     prompt += `Keep your response concise and natural.`;

//     const botResponseText = await callOpenAIAPI(prompt);

//     setIsLoading(false);
//     setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponseText }]);
    
//     // Move to the next step if we're not at the end
//     if (currentStep < predefinedQuestions.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       setCurrentStep(-1); // End the conversation
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
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

//   return (
//     <div className="flex flex-col h-screen bg-gray-950 text-white font-sans overflow-hidden">
//       {/* Header */}
//       <div className="w-full flex justify-between items-center p-4 bg-gray-900 shadow-md">
//         <div className="flex items-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
//           </svg>
//           <h1 className="text-xl font-bold tracking-tight">AI Questionnaire</h1>
//         </div>
//         <div className="flex space-x-2">
//           <button className="text-gray-400 hover:text-white transition duration-200">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Main chat area */}
//       <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 flex flex-col items-center">
//         <div className="w-full max-w-3xl flex flex-col space-y-4">
//           {messages.map((msg, index) => (
//             <ChatBubble key={index} sender={msg.sender} text={msg.text} />
//           ))}
//           {isLoading && (
//             <ChatBubble sender="bot" text="Thinking..." />
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
//             placeholder={currentStep === -1 ? "Conversation ended." : "Type your message..."}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             disabled={isLoading || currentStep === -1}
//           />
//           <button
//             onClick={handleSendMessage}
//             className="p-4 text-indigo-400 hover:text-indigo-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={isLoading || currentStep === -1}
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
  const messagesEndRef = useRef(null);

  // Questionnaire structure
  const questionnaire = [
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
  ];

  // Effect to automatically ask the first question when the app loads
  useEffect(() => {
    const firstQuestion = questionnaire[currentSectionIndex].questions[currentQuestionIndex];
    setMessages([{ sender: 'bot', text: `Welcome to the comprehensive assessment. Let's start with the first section: ${questionnaire[currentSectionIndex].title}. ${firstQuestion}` }]);
  }, []);

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
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; // The API Key Has Been Changes;
    const apiUrl = `https://api.openai.com/v1/chat/completions`;

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
      return "Thank you for sharing. Let's continue with the next question.";
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      return "I appreciate your response. Let's move to the next question.";
    }
  };

  // Function to move to the next question
  const nextQuestion = () => {
    // Save the current response
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
          text: `Thank you for completing that section. Now let's move to: ${nextSection.title}. ${nextQuestion}` 
        }]);
      } else {
        // All questions completed
        setMessages(prevMessages => [...prevMessages, { 
          sender: 'bot', 
          text: "Thank you for completing the entire assessment! Your responses have been recorded. Have a great day!" 
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
          <h1 className="text-xl font-bold tracking-tight">Comprehensive Assessment</h1>
        </div>
        <div className="text-sm text-gray-400">
          Section {currentSectionIndex + 1} of {questionnaire.length} • Question {currentQuestionIndex + 1} of {questionnaire[currentSectionIndex].questions.length}
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
                <span className="text-base leading-relaxed">Thinking...</span>
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
            placeholder={allQuestionsCompleted ? "Assessment completed. Thank you!" : "Type your response..."}
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