import { useParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAddressBook, faContactBook } from '@fortawesome/free-regular-svg-icons'
import { faBars, faSquare } from "@fortawesome/free-solid-svg-icons";
import {
  WhiteFlagIcon,
  PreviousIcon,
  NextIcon,
  StopIcon,
  LabsIcon,
  WriteIcon,
  CalcIcon,
  InvertIcon,
  ZoomIcon,
} from "./Icon";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { RxEnterFullScreen } from "react-icons/rx";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa6";
import { LuBookText } from "react-icons/lu";
import { HiOutlineBolt } from "react-icons/hi2";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { TbExternalLink } from "react-icons/tb";
import NoteSearchModal from "./NoteSearchModal.jsx";
import { GrNotes } from "react-icons/gr";

export default function QuestionScreen() {
  const { file } = useParams();
  const [questions, setQuestions] = useState([]);
  const [fileData, setFileData] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [tempSelectedAnswer, setTempSelectedAnswer] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.BASE_URL}data/${decodeURIComponent(file)}`
        );
        const json = await res.json();
        setFileData(json);
        setQuestions(json.questionList || []);
      } catch (err) {
        console.error("Error loading file:", err);
      }
    };
    loadData();
  }, [file]);

  useEffect(() => {
    setTempSelectedAnswer(null);
    setShowAnswers(false); // optional: auto-hide answers on new question
  }, [selectedQuestionIndex]);

  const handleSelect = (index) => {
    setSelectedQuestionIndex(index);
  };

  const selectedQuestion = questions[selectedQuestionIndex];
  if (!fileData) return <div>Loading...</div>;

  return (
    <div className="flex h-screen font-sans">
      <div className="w-[110px] flex-shrink-0 border-r border-[#DDDDDD] overflow-y-auto">
        <div className="flex flex-col">
          {questions.map((q, index) => {
            const isCorrect = q.userAnswer === q.correctAnswer;
            const answered = !!q.userAnswer;

            const isSelected = selectedQuestionIndex === index;

            const baseBg = index % 2 === 0 ? "bg-white" : "bg-[#E3E3E3]";

            return (
              <button
                key={q.sequenceId}
                onClick={() => handleSelect(index)}
                className={`text-sm h-[25px] pl-[12px] flex items-center justify-start gap-4
            ${isSelected ? "bg-[#5590CC] text-white" : `${baseBg} text-black`}`}
              >
                {answered && (
                  <span
                    className={`text-xs font-bold
                ${isCorrect ? "text-green-500" : "text-red-500"}`}
                  >
                    {isCorrect ? "✓" : "✗"}
                  </span>
                )}
                <div className="">{index + 1}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col h-screen w-full">
        {/* Top Panel: Headers */}
        <div className="h-[52px] bg-[#3852a4] flex items-center justify-between flex-shrink-0">
          {selectedQuestion && (
            <>
              <div className="flex items-center justify-between w-[294px] text-left">
                <FontAwesomeIcon
                  icon={faBars}
                  className="text-white text-3xl pl-[5px] mr-3"
                />
                <div className="text-white text-left flex flex-col items-start justify-start gap-1 w-[140px]">
                  <span className="text-[15px] font-bold">
                    Item {selectedQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-xs font-bold">
                    Question Id: {selectedQuestion.questionIndex}
                  </span>
                </div>

                <div className="flex items-center px-[9px] py-[6px]">
                  <FontAwesomeIcon
                    icon={faSquare}
                    className="text-white border-[#767676]"
                  />
                  <WhiteFlagIcon className="w-[32px] h-[28px]" />
                  <span className="text-white">Mark</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col items-center justify-center  w-[64px] mx-[4px] py-[1px] px-[3px]">
                  <PreviousIcon className="w-7 h-7" />
                  <span className="text-xs text-white">Previous</span>
                </div>
                <div className="flex flex-col items-center justify-center w-[64px] mx-[4px] py-[1px] px-[3px]">
                  <NextIcon className="w-7 h-7" />
                  <span className="text-xs text-white">Next</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-1 pr-[4px]">
                {/* <div >
                  <button onClick={() => setShowNoteModal(true)}
                    className="flex flex-col items-center justify-center mx-[4px] py-[1px] px-[3px] cursor-pointer"
                    >
                    <GrNotes className="w-4 h-6 text-white" />
                    <span className="text-xs text-white">Notes</span>
                  </button>
                </div> */}

                <div className="flex flex-col items-center justify-center mx-[4px] py-[1px] px-[3px]">
                  <RxEnterFullScreen className="w-6 h-6 text-white" />
                  <span className="text-xs text-white">Full Screen</span>
                </div>

                <div className="flex flex-col items-center justify-center mx-[4px] py-[1px] px-[3px]">
                  <FaRegQuestionCircle className="w-6 h-6 text-white" />
                  <span className="text-xs text-white">Tutorial</span>
                </div>
                <div className="flex flex-col items-center justify-center mx-[4px] py-[1px] px-[3px]">
                  <LabsIcon className="w-8 h-6 text-white" />
                  <span className="text-xs text-white">Lab Values</span>
                </div>

                <button
                  onClick={() => setShowNoteModal(true)}
                  className="flex flex-col items-center justify-center mx-[4px] py-[1px] px-[3px] cursor-pointer"
                >
                  <WriteIcon className="w-8 h-6 " />
                  <span className="text-xs text-white">Notes</span>
                </button>

                <div className="flex flex-col items-center justify-center mx-[4px] py-[1px] px-[3px]">
                  <CalcIcon className="w-8 h-6 text-white" />
                  <span className="text-xs text-white">Calculator</span>
                </div>
                <div className="flex flex-col items-center justify-center mx-[4px] py-[1px] px-[3px]">
                  <InvertIcon className="w-8 h-6 text-white" />
                  <span className="text-xs text-white">Reverse Color</span>
                </div>
                <div className="flex flex-col items-center justify-center mx-[4px] py-[1px] px-[3px]">
                  <ZoomIcon className="w-10 h-6 text-white" />
                  <span className="text-xs text-white">Text Zoom</span>
                </div>
                <div className="flex flex-col items-center justify-center mx-[4px] py-[1px] px-[3px]">
                  {/* <FontAwesomeIcon icon={faContactBook}/> */}
                  <HiOutlineCog6Tooth className="w-8 h-6 text-white" />

                  <span className="text-xs text-white">Settings</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Middle Panel: Middle */}
        <div className="flex flex-1 bg-linear-to-t from-[#d7dced] to-[#fcfcfc] overflow-auto ">
          {/* Middle Panel: Left */}
          <div
            className="flex-1 p-6 overflow-y-auto bg-linear-to-t from-[#d7dced] to-[#fcfcfc] border-r border-[#DDDDDD] text-black "
            // className={`flex-1 p-6 overflow-y-auto bg-gradient-to-t from-[#d7dced] to-[#fcfcfc] text-black ${
            //   showAnswers ? "" : "max-w-4xl"
            // }  ${showAnswers ? "border-r" : ""} ${
            //   showAnswers ? "border-[#DDDDDD]" : ""
            // }`}
          >
            {selectedQuestion && (
              <>
                <div
                  className="explanation-html  mb-6 text-sm leading-[1.65] font-opensans font-medium"
                  dangerouslySetInnerHTML={{
                    __html: selectedQuestion.questionText,
                  }}
                />

                <div className="border border-b-6 border-[#5590cc]">
                  {selectedQuestion.answerChoiceList.map((choice) => {
                    // const isUserAnswer =
                    //   selectedQuestion.userAnswer ===
                    //   String(choice.choiceNumber);
                    const isUserAnswer = showAnswers
                      ? selectedQuestion.userAnswer ===
                        String(choice.choiceNumber)
                      : tempSelectedAnswer === String(choice.choiceNumber);

                    const isCorrectAnswer =
                      selectedQuestion.correctAnswer ===
                      String(choice.choiceNumber);

                    const totalAttempts =
                      selectedQuestion.answerChoiceList.reduce(
                        (acc, c) => acc + (c.correctTaken || 0),
                        0
                      );
                    const percentage = totalAttempts
                      ? Math.round((choice.correctTaken / totalAttempts) * 100)
                      : 0;

                    const choiceLetter = String.fromCharCode(
                      64 + choice.choiceNumber
                    );

                    const showCorrectIcon =
                      isCorrectAnswer &&
                      selectedQuestion.userAnswer !==
                        selectedQuestion.correctAnswer;

                    const showOnlyCorrectIcon = isCorrectAnswer && isUserAnswer;

                    const showWrongIcon = isUserAnswer && !isCorrectAnswer;

                    return (
                      <label
                        key={choice.choiceNumber}
                        className="flex items-start gap-2 mx-2 py-3 text-sm cursor-pointer transition-all font-opensans font-medium"
                      >
                        <div className="flex items-center justify-center">
                          {/* Tick / Cross on the far left */}
                          <div className="w-6 text-lg flex items-start justify-start">
                            {showAnswers && showOnlyCorrectIcon && (
                              <IoCheckmarkOutline className="text-green-500 w-6 h-6" />
                            )}
                            {showAnswers && showWrongIcon && (
                              <IoCloseOutline className="text-red-500 w-6 h-6" />
                            )}
                            {showAnswers && showCorrectIcon && (
                              <IoCheckmarkOutline className="text-green-500 w-6 h-6" />
                            )}
                          </div>

                          <label className="w-6 mr-1 flex items-start gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="choice"
                              // value={choice.choiceNumber}
                              // checked={isUserAnswer}
                              // readOnly
                              value={choice.choiceNumber}
                              checked={isUserAnswer}
                              onChange={() => {
                                if (!showAnswers) {
                                  setTempSelectedAnswer(
                                    String(choice.choiceNumber)
                                  );
                                }
                              }}
                              readOnly={showAnswers}
                              className="sr-only"
                            />
                            <span
                              className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center
      ${isUserAnswer ? "border-blue-500" : ""}`}
                            >
                              {isUserAnswer && (
                                <span className="w-2.5 h-2.5 rounded-full bg-[#92C3F5]"></span>
                              )}
                            </span>
                          </label>

                          {/* Choice text and percentage */}
                          <span className="text-sm font-normal">
                            {choiceLetter}.{" "}
                          </span>
                        </div>

                        <div>
                          <span
                            dangerouslySetInnerHTML={{ __html: choice.choice }}
                          />
                        </div>
                        {showAnswers && (
                          <span className="ml-2 font-opensans font-medium">
                            ({percentage}%)
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </>
            )}

            <div className="mt-12 shadow-md border-x-6 border-[#5590cc]">
              <div
                onClick={() => setShowAnswers(!showAnswers)}
                className="flex flex-1 text-[#5590cc]  items-center justify-center font-bold text-sm px-4 py-6 hover:bg-[#5590cc] hover:text-white transition"
              >
                {showAnswers ? "Answers Shown" : "Show Answers"}
              </div>
            </div>
          </div>

          {/* Middle Panel: Right */}
          <div className="flex-1 p-6 overflow-y-auto bg-linear-to-t from-[#d7dced] to-[#fcfcfc] leading-[1.65] font-opensans font-medium text-balck">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Explanation
            </h2>
            <div
              className="explanation-html text-sm text-gray-700 leading-[1.75] font-medium"
              dangerouslySetInnerHTML={{
                __html: selectedQuestion?.explanationText || "",
              }}
            />
            {selectedQuestion?.questionMappingReferencesList && (
              <div className="my-6">
                <span className="text-md font-semibold text-gray-800">
                  References
                </span>
                <ul className="space-y-3 list-none text-sm text-blue-500 mt-2">
                  {selectedQuestion?.questionMappingReferencesList.map(
                    (reference) => (
                      <li
                        key={reference.referenceId}
                        className="flex items-center gap-2"
                      >
                        <TbExternalLink className="w-6 h-6" />
                        <a
                          href={reference.referenceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {reference.title}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-start border-t border-[#cccccc] font-opensans text-balck py-6 pr-3">
              <div className="flex flex-col text-left items-start justify-start gap-2 pr-12">
                <span className="text-sm">{selectedQuestion?.subject}</span>
                <span className="text-xs text-[#6A6A6A]">Subject</span>
              </div>
              <div className="flex flex-col text-left items-start justify-start gap-2 pr-12">
                <span className="text-sm">{selectedQuestion?.system}</span>
                <span className="text-xs text-[#6A6A6A]">System</span>
              </div>
              <div className="flex flex-col text-left items-start justify-start gap-2 pr-12">
                <span className="text-sm">{selectedQuestion?.topic}</span>
                <span className="text-xs text-[#6A6A6A]">Topic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel: Footer */}
        <div className="h-[52px] bg-[#3852a4] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center justify-between text-left">
            <div className="text-white text-left flex flex-col items-start justify-start gap-1 pl-[5px]">
              <span className="text-sm font-normal">
                Test Id: {fileData?.testId}
              </span>
              <span className="text-sm font-normal uppercase">Review</span>
            </div>
            <div className="w-[64px] flex items-center justify-center">
              <FaBarsProgress className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center justify-end gap-1 pr-[4px]">
            <div className="flex flex-col items-center justify-center mx-[4px] py-[1px] px-[3px]">
              <FaRegNewspaper className="w-6 h-6 text-white" />
              <span className="text-[11.5px] text-white">Medical Library</span>
            </div>
            <button
              onClick={() => setShowNoteModal(true)}
              className="flex flex-col items-center justify-center mx-[4px] py-[1px] px-[3px] cursor-pointer"
            >
              <LuBookText className="w-6 h-6 text-white" />
              <span className="text-[11.5px] text-white">My Notebook</span>
            </button>
            <div className="flex flex-col items-center justify-center mx-[4px] py-[1px] px-[3px]">
              <HiOutlineBolt className="w-6 h-6 text-white" />
              <span className="text-[11.5px] text-white">Flaskcards</span>
            </div>
            <div className="flex flex-col items-center justify-center mx-[4px] py-[1px] px-[3px]">
              <FaRegCommentAlt className="w-6 h-6 text-white" />
              <span className="text-[11.5px] text-white">Feedback</span>
            </div>
            <div className="flex flex-col items-center justify-center mx-[4px] py-[1px] px-[3px]">
              <StopIcon className="w-6 h-6" />
              <span className="text-[11.5px] text-white">End Block</span>
            </div>
          </div>
        </div>
      </div>
      {showNoteModal && (
        <NoteSearchModal onClose={() => setShowNoteModal(false)} />
      )}
    </div>
  );
}
