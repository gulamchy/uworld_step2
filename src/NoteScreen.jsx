// import React, { useEffect, useState, useMemo } from "react";
// import Header from "./Header";
// import { SearchIcon } from "./Icon.jsx";
// import { IoMdInformationCircleOutline } from "react-icons/io";
// import { TbAdjustmentsHorizontal } from "react-icons/tb";

// const STORAGE_KEY = "uworld_step1_checkedMap_v1";

// export default function NotesViewer() {
//   const [notes, setNotes] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const iconClass = "w-3.5 h-3.5 mx-2 text-[#212529A]";

//   // Load notes and merge checkedStatus from localStorage
//   useEffect(() => {
//     fetch(`${import.meta.env.BASE_URL}data/notes.json`)
//       .then((res) => res.json())
//       .then((data) => {
//         const savedChecked = JSON.parse(
//           localStorage.getItem(STORAGE_KEY) || "{}"
//         );
//         const merged = data.map((note) => ({
//           ...note,
//           checkedStatus: savedChecked[note.id] ?? false,
//         }));
//         setNotes(merged);
//       })
//       .catch(console.error);
//   }, []);

//   // Save checkedStatus map to localStorage whenever notes change
//   useEffect(() => {
//     const checkedMap = Object.fromEntries(
//       notes.map((note) => [note.id, note.checkedStatus])
//     );
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedMap));
//   }, [notes]);

//   const filteredNotes = useMemo(() => {
//     return notes.filter((note) =>
//       (note.title || "").toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [notes, searchTerm]);

//   const selectedNote = filteredNotes[selectedIndex] || filteredNotes[0];

//   // Reset selectedIndex if out of range
//   useEffect(() => {
//     if (selectedIndex >= filteredNotes.length) {
//       setSelectedIndex(0);
//     }
//   }, [filteredNotes, selectedIndex]);

//   const noteHtml = useMemo(() => {
//     return { __html: selectedNote?.noteText || "" };
//   }, [selectedNote]);

//   // Toggle checkbox state
//   const toggleCheck = (id) => {
//     setNotes((prevNotes) =>
//       prevNotes.map((note) =>
//         note.id === id ? { ...note, checkedStatus: !note.checkedStatus } : note
//       )
//     );
//   };

//   if (notes.length === 0)
//     return (
//       <div className="flex h-screen w-screen items-center justify-center">
//         Loading notes...
//       </div>
//     );

//   return (
//     <div style={{ backgroundColor: "#F3F3F4" }}>
//       <Header text="My Notebook" />
//       <div className="flex flex-col h-screen mt-[-48px] border-t border-gray-200">
//         <div className="flex flex-1 overflow-hidden ">
//           {/* Side bar */}
//           <div className="w-1/4 border-r border-gray-200 overflow-y-auto mt-[48px]">
//             {/* Search Bar */}
//             <div className="sticky top-0  bg-[#F3F3F4] z-10 p-4">
//               <div className="relative text-md">
//                 <SearchIcon
//                   className={`${iconClass} text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none`}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search notes"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-12 p-2 border-b-1 border-gray-300"
//                 />
//                 <IoMdInformationCircleOutline
//                   className={`${iconClass} w-5 h-5 text-gray-400 absolute right-12 top-1/2 transform -translate-y-1/2 pointer-events-none`}
//                 />
//                 <TbAdjustmentsHorizontal
//                   className={`${iconClass} w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none`}
//                 />
//               </div>
//             </div>

//             {/* Sidebar with checkboxes */}

//             {filteredNotes.length === 0 ? (
//               <p className="p-4 text-gray-500">No notes found.</p>
//             ) : (
//               filteredNotes.map((note, i) => (
//                 <div
//                   key={`${note.id}-${i}`}
//                   className={`flex items-center px-4 py-3 ${
//                     i === selectedIndex
//                       ? "bg-gray-200 text-[#2D8DE6] font-bold"
//                       : ""
//                   }`}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={note.checkedStatus}
//                     onChange={() => toggleCheck(note.id)}
//                     className={`
//                                 mr-4
//                                 appearance-none
//                                 h-5 w-5
//                                 border-2 border-gray-400
//                                 bg-[#F3F3F4]
//                                 checked:bg-[#2E4150]
//                                 checked:border-[#2E4150]
//                                 rounded
//                                 relative
//                                 transition duration-200
//                                 focus:outline-none
//                                 cursor-pointer
//                                 checked:after:content-['✓']
//                                 checked:after:absolute
//                                 checked:after:text-white
//                                 checked:after:text-sm
//                                 checked:after:font-bold
//                                 checked:after:left-[2px]
//                                 checked:after:top-[-2px]
//                             `}
//                   />
//                   <button
//                     onClick={() => setSelectedIndex(i)}
//                     className="flex-1 text-left capitalize"
//                   >
//                     {note.title}
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Note content */}
//           <div className="flex-1 px-10 py-6 overflow-y-auto bg-white">
//             {selectedNote ? (
//               <>
//                 <h2 className="text-2xl font-bold border-b-1 border-gray-200 py-4 capitalize">
//                   {selectedNote.title}
//                 </h2>
//                 <div className="flex items-center justify-between text-gray-400 text-sm mb-4 border-b-1 border-gray-200 py-4 ">
//                   <p>
//                     Created:{" "}
//                     {new Date(selectedNote.createdDate).toLocaleDateString(
//                       "en-US",
//                       {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       }
//                     )}
//                   </p>
//                   <p>
//                     Last Updated:{" "}
//                     {new Date(selectedNote.modifiedDate).toLocaleDateString(
//                       "en-US",
//                       {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       }
//                     )}
//                   </p>
//                 </div>

//                 <div
//                   className="notes-html flex flex-col items-center justify-center mb-6 text-sm leading-[1.65] font-opensans font-medium "
//                   dangerouslySetInnerHTML={noteHtml}
//                 />
//               </>
//             ) : (
//               <p className="text-gray-500">Select a note to view details.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo } from "react";
import Header from "./Header";
import { SearchIcon } from "./Icon.jsx";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

const STORAGE_KEY = "uworld_step1_checkedMap_v1";
const STORAGE_SUFFIX_KEY = "uworld_step1_titleSuffix_v1";
const TITLE_SUFFIXES = ["-Super_Important", "-Not_Required", "-Duplicate"];

function dedupeByIdKeepLatest(notes) {
  const map = new Map(); // key: id -> kept note
  const seenOrder = []; // preserve first-seen order of each id

  for (const n of notes) {
    const id = n.id;
    const prev = map.get(id);
    if (!prev) {
      map.set(id, n);
      seenOrder.push(id);
      continue;
    }
    const checked = !!(prev.checkedStatus || n.checkedStatus);
    const newer =
      new Date(n.modifiedDate).getTime() > new Date(prev.modifiedDate).getTime()
        ? n
        : prev;
    map.set(id, { ...newer, checkedStatus: checked });
  }

  // return in stable order the first time each id appeared
  return seenOrder.map((id) => map.get(id));
}

export default function NotesViewer() {
  const [notes, setNotes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedGroups, setExpandedGroups] = useState({});
  const iconClass = "w-3.5 h-3.5 mx-2 text-[#212529A]";

  // Load notes and merge checkedStatus from localStorage
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/notes.json`)
      .then((res) => res.json())
      .then((data) => {
        const savedChecked = JSON.parse(
          localStorage.getItem(STORAGE_KEY) || "{}"
        );
        const savedSuffix = JSON.parse(
          localStorage.getItem(STORAGE_SUFFIX_KEY) || "{}"
        );

        const merged = data.map((note) => ({
          ...note,
          baseTitle: note.title || "", // preserve the original
          suffix: savedSuffix[note.id] || "",
          checkedStatus: savedChecked[note.id] ?? false,
        }));
        // setNotes(merged);
        const deduped = dedupeByIdKeepLatest(merged);

        setNotes(deduped);
      })
      .catch(console.error);
  }, []);

  // Save checkedStatus map to localStorage whenever notes change
  useEffect(() => {
    const checkedMap = Object.fromEntries(
      notes.map((note) => [note.id, note.checkedStatus])
    );
    const suffixMap = Object.fromEntries(
      notes.map((n) => [n.id, n.suffix || ""])
    );
    localStorage.setItem(STORAGE_SUFFIX_KEY, JSON.stringify(suffixMap));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedMap));
  }, [notes]);

  // Filter notes by search term
  const displayTitle = (n) => `${n.baseTitle || ""}${n.suffix || ""}`;
  const hasPercentPrefix = (n) =>
    /^\s*\d+(?:\.\d+)?%\s+/i.test(displayTitle(n));

  const filteredNotes = useMemo(() => {
    // const filtered = notes.filter((note) =>
    //   (note.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const q = searchTerm.toLowerCase();
    const filtered = notes.filter((n) =>
      displayTitle(n).toLowerCase().includes(q)
    );
    return dedupeByIdKeepLatest(filtered);
  }, [notes, searchTerm]);

  // Group notes into chunks of 50 with labels
  const chunkNotes = (notesArray, chunkSize = 50) => {
    const groups = {};
    notesArray.forEach((note, i) => {
      const groupIndex = Math.floor(i / chunkSize);
      const start = groupIndex * chunkSize + 1;
      // const end = (groupIndex + 1) * chunkSize;
      const end = Math.min((groupIndex + 1) * chunkSize, notesArray.length);
      const label = `${start} - ${end}`;
      if (!groups[label]) groups[label] = [];
      groups[label].push({ ...note, originalIndex: i });
    });
    return groups;
  };

  // Memoized grouped notes object { "1 - 50": [...], "51 - 100": [...] }
  const groupedNotes = useMemo(
    () => chunkNotes(filteredNotes),
    [filteredNotes]
  );

  const toggleSuffix = (id, suffix) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, suffix: n.suffix === suffix ? "" : suffix } : n
      )
    );
  };

  // Toggle collapse state for groups
  const toggleGroup = (groupLabel) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupLabel]: !prev[groupLabel],
    }));
  };

  // Selected note based on filtered notes and selectedIndex
  const selectedNote = filteredNotes[selectedIndex] || filteredNotes[0];

  // Reset selectedIndex if filteredNotes length changed and index is out of range
  useEffect(() => {
    if (selectedIndex >= filteredNotes.length) {
      setSelectedIndex(0);
    }
  }, [filteredNotes, selectedIndex]);

  // Auto expand first group when groups change
  useEffect(() => {
    const firstGroup = Object.keys(groupedNotes)[0];
    if (firstGroup) {
      setExpandedGroups((prev) => ({ ...prev, [firstGroup]: true }));
    }
  }, [groupedNotes]);

  const noteHtml = useMemo(() => {
    return { __html: selectedNote?.noteText || "" };
  }, [selectedNote]);

  // Toggle checkbox status for a note
  const toggleCheck = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, checkedStatus: !note.checkedStatus } : note
      )
    );
  };

  if (notes.length === 0)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        Loading notes...
      </div>
    );

  return (
    <div style={{ backgroundColor: "#F3F3F4" }}>
      <Header text="My Notebook" />
      <div className="flex flex-col h-screen mt-[-48px] border-t border-gray-200">
        <div className="flex flex-1 overflow-hidden ">
          {/* Side bar */}
          <div className="w-1/4 border-r border-gray-200 overflow-y-auto mt-[48px]">
            {/* Search Bar */}
            <div className="sticky top-0  bg-[#F3F3F4] z-10 p-4">
              <div className="relative text-md">
                <SearchIcon
                  className={`${iconClass} text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none`}
                />
                <input
                  type="text"
                  placeholder="Search notes"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 p-2 border-b-1 border-gray-300"
                />
                <IoMdInformationCircleOutline
                  className={`${iconClass} w-5 h-5 text-gray-400 absolute right-12 top-1/2 transform -translate-y-1/2 pointer-events-none`}
                />
                <TbAdjustmentsHorizontal
                  className={`${iconClass} w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none`}
                />
              </div>
            </div>

            {/* Grouped and collapsible notes */}
            {Object.entries(groupedNotes).length === 0 ? (
              <p className="p-4 text-gray-500">No notes found.</p>
            ) : (
              Object.entries(groupedNotes).map(([groupLabel, groupNotes]) => (
                <div key={groupLabel}>
                  {/* Group header with toggle */}
                  <button
                    onClick={() => toggleGroup(groupLabel)}
                    className="w-full text-left text-gray-700 text-sm px-4 py-2 font-bold hover:bg-gray-200 border-b border-gray-200 flex justify-between items-center "
                  >
                    <span>{groupLabel}</span>
                    <span>
                      {expandedGroups[groupLabel] ? (
                        <FaCaretDown className={`${iconClass} text-gray-700`} />
                      ) : (
                        <FaCaretRight
                          className={`${iconClass} text-gray-400`}
                        />
                      )}
                    </span>
                  </button>

                  {/* Notes inside group (conditionally rendered) */}
                  {expandedGroups[groupLabel] &&
                    groupNotes.map((note) => (
                      <div
                        key={`${note.id}-${note.originalIndex}`}
                        className={`flex items-center px-4 py-3 ${
                          note.originalIndex === selectedIndex
                            ? "bg-gray-200 text-[#2D8DE6] font-bold"
                            : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={note.checkedStatus}
                          onChange={() => toggleCheck(note.id)}
                          className="mr-4 appearance-none h-5 w-5 border-2 border-gray-400 bg-[#F3F3F4] checked:bg-[#2E4150] checked:border-[#2E4150] rounded relative transition duration-200 focus:outline-none cursor-pointer checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:left-[2px] checked:after:top-[-2px]"
                        />
                        <button
                          onClick={() => setSelectedIndex(note.originalIndex)}
                          // className={`flex-1 text-left capitalize ${
                          //   (note.suffix || "").toLowerCase() === "-super_important"
                          //     ? "text-red-900"
                          //     : (note.suffix || "").toLowerCase() ===
                          //       "-duplicate"
                          //     ? "text-gray-400"
                          //     : ""
                          // }`}
                          className={`flex-1 text-left capitalize ${
                            hasPercentPrefix(note)
                              ? "text-red-600" // <-- percent-prefixed titles become red
                              : (note.suffix || "").toLowerCase() ===
                                "-super_important"
                              ? "text-red-900"
                              : (note.suffix || "").toLowerCase() ===
                                "-duplicate"
                              ? "text-gray-400"
                              : ""
                          }`}
                          title={displayTitle(note)}
                        >
                          {/* {note.title} */}
                          {displayTitle(note)}
                        </button>
                      </div>
                    ))}
                </div>
              ))
            )}
          </div>

          {/* Note content */}
          <div className="flex-1 px-10 py-6 overflow-y-auto bg-white">
            {selectedNote ? (
              <>
                <div className="flex items-center justify-between w-full border-b-1 border-gray-200 py-4">
                  <h2 className="text-2xl font-bold capitalize">
                    {/* {selectedNote.title} */}
                    {displayTitle(selectedNote)}
                  </h2>

                  <div className="flex items-center gap-2 mb-4">
                    {TITLE_SUFFIXES.map((sfx) => (
                      <button
                        key={sfx}
                        onClick={() => toggleSuffix(selectedNote.id, sfx)}
                        className={`rounded px-4 py-2 text-sm font-bold border
        ${
          selectedNote.suffix === sfx
            ? "border-blue-500 text-blue-600"
            : "border-gray-300 text-gray-500 hover:border-gray-400"
        }`}
                      >
                        {sfx.trim()}
                      </button>
                    ))}

                    {selectedNote.suffix && (
                      <button
                        onClick={() =>
                          toggleSuffix(selectedNote.id, selectedNote.suffix)
                        }
                        className="ml-1 rounded px-4 py-2 text-sm border border-gray-200 font-bold text-red-500 hover:border-gray-400"
                      >
                        X
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between text-gray-400 text-sm mb-4 border-b-1 border-gray-200 py-4 ">
                  <p>
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
                  <p>
                    Last Updated:{" "}
                    {new Date(selectedNote.modifiedDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div
                  className="notes-html flex flex-col items-center justify-center mb-6 text-sm leading-[1.65] font-opensans font-medium "
                  dangerouslySetInnerHTML={noteHtml}
                />
              </>
            ) : (
              <p className="text-gray-500">Select a note to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
