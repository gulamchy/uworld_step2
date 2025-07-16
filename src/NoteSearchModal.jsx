// import { useEffect, useState, useMemo } from "react";
// import Draggable from "react-draggable";

// export default function NoteSearchModal({ onClose }) {
//   const [notes, setNotes] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetch(`${import.meta.env.BASE_URL}data/notes_all.json`)
//       .then((res) => res.json())
//       .then(setNotes)
//       .catch(console.error);
//   }, []);

//   const filteredNotes = useMemo(() => {
//     return notes.filter((note) =>
//       (note.title || "").toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [notes, searchTerm]);

//   // Adjust selected index if filteredNotes changes (optional)
//   const selectedNote = filteredNotes[selectedIndex] || filteredNotes[0];

//   // If current selectedIndex is out of range because filter changed, reset it to 0
//   useEffect(() => {
//     if (selectedIndex >= filteredNotes.length) {
//       setSelectedIndex(0);
//     }
//   }, [filteredNotes, selectedIndex]);

//   const noteHtml = useMemo(() => {
//     return { __html: selectedNote?.noteText || "" };
//   }, [selectedNote]);

//   return (
//     <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
//       <div className="bg-white w-[700px] max-h-[80vh] rounded shadow-lg overflow-auto p-6">
//         {notes.length === 0 ? (
//           <p className="text-gray-600">Loading notes...</p>
//         ) : (
//           <>
//             <div className="flex justify-between items-center border-b pb-3 mb-4">
//               <h2 className="text-xl font-bold text-gray-800">Search Notes</h2>
//               <button
//                 onClick={onClose}
//                 className="text-red-500 text-2xl font-semibold"
//                 aria-label="Close search modal"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="flex flex-col h-[60vh]">
//               {/* Search Bar */}
//               <div className="p-4 border-b">
//                 <input
//                   type="text"
//                   placeholder="Search notes..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               <div className="flex flex-1 overflow-hidden">
//                 {/* Sidebar with filtered notes */}
//                 <div className="w-1/3 border-r overflow-y-auto">
//                   {filteredNotes.length === 0 ? (
//                     <p className="p-4 text-gray-500">No notes found.</p>
//                   ) : (
//                     filteredNotes.map((note, i) => (
//                       <button
//                         key={`${note.id}-${i}`}
//                         onClick={() => setSelectedIndex(i)}
//                         className={`block w-full text-left px-4 py-2 border-b ${
//                           i === selectedIndex ? "bg-blue-100 font-bold" : ""
//                         }`}
//                       >
//                         {note.title}
//                       </button>
//                     ))
//                   )}
//                 </div>

//                 {/* Note content */}
//                 <div className="flex-1 p-6 overflow-y-auto">
//                   {selectedNote ? (
//                     <>
//                       <h2 className="text-xl font-bold">
//                         {selectedNote.title}
//                       </h2>
//                       <p className="text-gray-500 text-sm mb-4">
//                         Created: {selectedNote.createdDate}
//                       </p>
//                       <div
//                         className="notes-html flex flex-col items-center justify-center mb-6 text-sm leading-[1.65] font-opensans font-medium "
//                         dangerouslySetInnerHTML={noteHtml}
//                       />
//                     </>
//                   ) : (
//                     <p className="text-gray-500">
//                       Select a note to view details.
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function NoteSearchModal({ onClose }) {
  const [notes, setNotes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Persisted position
  // const [position, setPosition] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: window.innerWidth / 2 -450, y: window.innerHeight / 2 - 300 });


  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/notes_all.json`)
      .then((res) => res.json())
      .then(setNotes)
      .catch(console.error);
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      (note.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notes, searchTerm]);

  const selectedNote = filteredNotes[selectedIndex] || filteredNotes[0];

  useEffect(() => {
    if (selectedIndex >= filteredNotes.length) {
      setSelectedIndex(0);
    }
  }, [filteredNotes, selectedIndex]);

  const noteHtml = useMemo(() => {
    return { __html: selectedNote?.noteText || "" };
  }, [selectedNote]);

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] z-50">
      <motion.div
        drag
        dragMomentum={false} // optional: disables slide-off
        onDragEnd={(event, info) => {
          setPosition((prev) => ({
            x: prev.x + info.offset.x,
            y: prev.y + info.offset.y,
          }));
        }}
        initial={position}
        animate={position}
        className="absolute bg-white w-[900px] max-h-[80vh] rounded shadow-lg overflow-auto p-6"
         // initial visual offset
      >
        {notes.length === 0 ? (
          <p className="text-gray-600">Loading notes...</p>
        ) : (
          <>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4 cursor-move">
              <h2 className="text-xl font-bold text-gray-800">Search Notes</h2>
              <button
                onClick={onClose}
                className="text-red-500 text-2xl font-semibold cursor-pointer"
                aria-label="Close search modal"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col h-[60vh]">
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                />
              </div>

              <div className="flex flex-1 overflow-hidden">
                <div className="w-1/4 border-r border-gray-200 overflow-y-auto text-sm pt-2">
                  {filteredNotes.length === 0 ? (
                    <p className="p-4 text-gray-500">No notes found.</p>
                  ) : (
                    filteredNotes.map((note, i) => (
                      <button
                        key={`${note.id}-${i}`}
                        onClick={() => setSelectedIndex(i)}
                        className={`block w-full text-left px-4 py-2 border-b border-gray-200 capitalize ${
                          i === selectedIndex ? "bg-gray-200 font-bold" : ""
                        }`}
                      >
                        {note.title}
                      </button>
                    ))
                  )}
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                  {selectedNote ? (
                    <>
                      <h2 className="text-xl font-bold border-b border-gray-200 capitalize py-2">
                        {selectedNote.title}
                      </h2>
                      <p className="text-gray-500 text-sm mb-4 border-b border-gray-200 py-2">
                        Created:{" "}
                        {new Date(selectedNote.createdDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <div
                        className="notes-html flex flex-col items-center justify-center mb-6 text-sm leading-[1.65] font-opensans font-medium"
                        dangerouslySetInnerHTML={noteHtml}
                      />
                    </>
                  ) : (
                    <p className="text-gray-500">
                      Select a note to view details.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
