// import { GenerativeAIClient } from "@google/generative-ai";
// import { useState } from "react";
// const apiKey = import.meta.env.GOOGLE_API_KEY;
// const client = new GenerativeAIClient({ apiKey });

// const GoogleAI = () => {
//     const [prompt, setPrompt] = useState("");
//     const [response, setResponse] = useState(null);

//     async function callGemini(prompt) {
//         const request = {
//             inputPrompt: prompt,
//         };

//         try {
//             const response = await client.predict(request);
//             return response.textOutputs[0].text;
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     async function handleSubmit(event) {
//         event.preventDefault();
//         const generatedText = await callGemini(prompt);
//         setResponse(generatedText);
//     }
//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={prompt}
//                     onChange={(e) => setPrompt(e.target.value)}
//                 />
//                 <button type="submit">Ask Gemini</button>
//             </form>
//             {response && <p>Gemini's Response: {response}</p>}
//         </div>
//     );
// };

// export default GoogleAI;
