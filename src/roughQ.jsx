// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function QuestionScreen() {
//   const { file } = useParams(); // file = "79.json"
//   const decodedFile = decodeURIComponent(file); // "79.json"
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     const loadData = async () => {
//       const res = await import(`./data/${decodedFile}`);
//       setQuestions(res.default);
//     };
//     loadData();
//   }, [decodedFile]);

//   return (
//     <div>
//       <h1>Questions for {decodedFile}</h1>
//       <pre>{JSON.stringify(questions, null, 2)}</pre>
//     </div>
//   );
// }

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function QuestionScreen() {
//   const { file } = useParams(); // file = "79.json"
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

//   useEffect(() => {
//     const loadData = async () => {
//       const res = await import(`./data/${decodeURIComponent(file)}`);
//       setQuestions(res.default.questionList || []);
//     };
//     loadData();
//   }, [file]);

//   const handleSelect = (index) => {
//     setSelectedQuestionIndex(index);
//   };

//   return (
//     <div className="p-4 font-sans">
//       <h1 className="text-xl font-semibold mb-4">Questions</h1>

//       {/* Table of clickable question numbers */}
//       <div className="flex flex-wrap gap-2 mb-6">
//         {questions.map((q, index) => (
//           <button
//             key={q.sequenceId}
//             className={`w-10 h-10 border rounded-full ${
//               selectedQuestionIndex === index
//                 ? "bg-blue-500 text-white"
//                 : "bg-white text-blue-600"
//             } hover:bg-blue-100 transition`}
//             onClick={() => handleSelect(index)}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>

//       {/* Display selected question */}
//       {selectedQuestionIndex !== null && (
//         <div className="border p-4 rounded shadow bg-white">
//           <div
//             className="mb-4 text-md"
//             dangerouslySetInnerHTML={{
//               __html: questions[selectedQuestionIndex].questionText,
//             }}
//           />
//           <hr className="my-4" />
//           <div
//             className="text-sm text-gray-700"
//             dangerouslySetInnerHTML={{
//               __html: questions[selectedQuestionIndex].explanationText,
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function QuestionScreen() {
//   const { file } = useParams(); // e.g., "79.json"
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

//   useEffect(() => {
//     const loadData = async () => {
//       const res = await import(`./data/${decodeURIComponent(file)}`);
//       setQuestions(res.default.questionList || []);
//     };
//     loadData();
//   }, [file]);

//   const handleSelect = (index) => {
//     setSelectedQuestionIndex(index);
//   };

//   return (
//     <div className="p-4 font-sans">
//       <h1 className="text-xl font-semibold mb-4">Questions</h1>

//       {/* Question number buttons with ✓ or ✗ */}
//       <div className="flex flex-wrap gap-2 mb-6">
//         {questions.map((q, index) => {
//           const isCorrect = q.userAnswer === q.correctAnswer;
//           return (
//             <button
//               key={q.sequenceId}
//               onClick={() => handleSelect(index)}
//               className={`w-10 h-10 border rounded-full flex items-center justify-center relative ${
//                 selectedQuestionIndex === index
//                   ? "bg-blue-500 text-white"
//                   : "bg-white text-blue-600"
//               }`}
//             >
//               {index + 1}
//               <span
//                 className={`absolute -top-2 -right-2 text-xs font-bold ${
//                   isCorrect ? "text-green-500" : "text-red-500"
//                 }`}
//               >
//                 {q.userAnswer
//                   ? isCorrect
//                     ? "✓"
//                     : "✗"
//                   : ""}
//               </span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Question Content */}
//       {selectedQuestionIndex !== null && (
//         <div className="border p-4 rounded shadow bg-white">
//           {/* Question Text */}
//           <div
//             className="mb-4 text-md"
//             dangerouslySetInnerHTML={{
//               __html: questions[selectedQuestionIndex].questionText,
//             }}
//           />

//           {/* Answer Choices as radio buttons */}
//           <div className="mb-4 space-y-2">
//             {questions[selectedQuestionIndex].answerChoiceList.map((choice) => {
//               const isUserAnswer =
//                 questions[selectedQuestionIndex].userAnswer ===
//                 String(choice.choiceNumber);
//               const isCorrectAnswer =
//                 questions[selectedQuestionIndex].correctAnswer ===
//                 String(choice.choiceNumber);

//               return (
//                 <label
//                   key={choice.choiceNumber}
//                   className={`block p-2 border rounded cursor-pointer ${
//                     isUserAnswer
//                       ? isCorrectAnswer
//                         ? "bg-green-100 border-green-400"
//                         : "bg-red-100 border-red-400"
//                       : "border-gray-200"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="choice"
//                     value={choice.choiceNumber}
//                     checked={isUserAnswer}
//                     readOnly
//                     className="mr-2"
//                   />
//                   <span
//                     dangerouslySetInnerHTML={{ __html: choice.choice }}
//                   />
//                 </label>
//               );
//             })}
//           </div>

//           {/* Explanation */}
//           <hr className="my-4" />
//           <div
//             className="text-sm text-gray-700"
//             dangerouslySetInnerHTML={{
//               __html: questions[selectedQuestionIndex].explanationText,
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }