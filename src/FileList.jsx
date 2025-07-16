import { Link } from "react-router-dom";
import Header from "./Header.jsx";
import {
  CaretDownIcon,
  SearchIcon,
  ListDoneIcon,
  PlayIcon,
  ChartIcon,
} from "./Icon.jsx";
import { useEffect, useState } from "react";

export default function FileList() {
  const [testIndex, setTestIndex] = useState([]);
  const iconClass = "w-3.5 h-3.5 mx-2 text-[#212529A]";

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/testIndex.json`)
      .then((res) => res.json())
      .then(setTestIndex)
      .catch((err) => console.error("Failed to load testIndex.json:", err));
  }, []);

  const files = testIndex.map((test) => ({
    ...test,
    key: encodeURIComponent(`${test.testName}.json`),
  }));

  return (
    <div style={{ backgroundColor: "#F3F3F4" }}>
      <Header text="Previous Tests" />
      <div className="mx-[16px]">
        <div className="flex items-center font-[Open_Sans] text-xl gap-1">
          <div className="px-[24px] py-[12px] text-[#8A8B92]">Shelf Review</div>
          <div className="px-[24px] py-[12px] rounded-t-lg text-[#2196f3] bg-white">
            <Link to={`/`}>Step 2 Review</Link>
          </div>
          <div className="px-[24px] py-[12px] rounded-t-lg text-[#2196f3] hover:bg-white">
            <Link to={`/note`}>Notes</Link>
          </div>
        </div>

        <div className="min-h-screen bg-white">
          <div className="flex px-[32px] py-[32px] items-center justify-between">
            <div className="flex text-[#979797] text-sm">
              <span className="pr-[10px]">Show:</span>
              <div className="w-[180px] border-b-1 border-gray-200 flex items-center justify-between pb-[4px]">
                Columns <CaretDownIcon className={iconClass} />
              </div>
            </div>
            <div className="text-[#979797] text-sm font-light">
              <div className="w-[345.5px] border-b-1 border-gray-200 flex items-center justify-between pb-[4px]">
                Search <SearchIcon className={iconClass} />
              </div>
            </div>
          </div>

          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-[#979797] uppercase font-[Open_Sans] text-sm font-light border-b border-gray-200">
                <th className="px-[32px] py-[24px] text-left font-normal w-[84px]">
                  Score
                </th>
                <th className="px-[32px] py-[24px] text-left font-normal w-[314px]">
                  Name
                </th>
                <th className="px-[32px] py-[24px] text-left font-normal w-[124px]">
                  Date
                </th>
                <th className="px-[32px] py-[24px] text-left font-normal w-[144px]">
                  Mode
                </th>
                <th className="px-[32px] py-[24px] text-left font-normal w-[124px]">
                  Q.Pool
                </th>
                <th className="px-[32px] py-[24px] text-left font-normal w-[314px]">
                  Subject
                </th>
                <th className="px-[32px] py-[24px] text-left font-normal w-[314px]">
                  System
                </th>
                <th className="px-[32px] py-[24px] text-left font-normal w-[84px]">
                  #QS
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-[32px] py-[20px] text-left font-normal w-[84px]">
                    <div className="flex bg-gray-200 w-14 h-14 rounded-full items-center justify-center">
                      {file.percentile}%
                    </div>
                  </td>
                  <td className="px-[32px] py-[20px] text-left font-normal w-[254px]">
                    {file.testName}
                  </td>
                  <td className="px-[32px] py-[20px] text-left font-normal w-[184px]">
                    {file.dateCreated.split(" ").slice(0, 3).join(" ")}
                  </td>
                  <td className="px-[32px] py-[20px] text-left font-normal w-[184px]">
                    {file.testMode === "Timed"
                      ? "Untutored, Timed"
                      : "Tutored, Untimed"}
                  </td>
                  <td className="px-[32px] py-[20px] text-left font-normal w-[124px]">
                    {file.questionMode === "All" ? "Unused" : "Custom"}
                  </td>
                  <td className="px-[32px] py-[20px] text-left font-normal w-[164px]">
                    {file.superDivisionName}
                  </td>
                  <td className="px-[32px] py-[20px] text-left font-normal w-[344px]">
                    {file.subDivisionName}
                  </td>
                  <td className="px-[32px] py-[20px] text-left font-normal w-[84px]">
                    {file.totalQuestions}
                  </td>
                  <td className="px-[32px] py-[20px] text-right text-[#2196f3]">
                    <div className="flex items-center justify-center">
                      <PlayIcon className={iconClass} />
                      <Link
                        to={`/question/${file.key}`}
                        className="text-[#2196f3] font-bold"
                      >
                        <ListDoneIcon className={iconClass} />
                      </Link>
                      <ChartIcon className={iconClass} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
