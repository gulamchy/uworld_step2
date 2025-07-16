import { Link } from "react-router-dom";
import { CalendarIcon, HomeIcon, LogoutIcon } from "./Icon.jsx";
import { GrNotes } from "react-icons/gr";
import { GrTest } from "react-icons/gr";


export default function Header({ text }) {
  const iconClass = "w-4 h-4";
  return (
    <div>
      <header
        className="flex items-center justify-between px-6"
        style={{ height: 64, backgroundColor: "#FFFFFF" }}
      >
        {/* Left side */}
        <div className="font-[Open_Sans] text-3xl font-light text-[#65656A]">
          {text}
        </div>

        {/* Right side */}
        <div className="flex space-x-8 text-[#A7B1C2] text-sm font-medium items-center">
          <Link
            to={`/`}
            className="flex items-center space-x-1 cursor-pointer text-black hover:text-[#3852a4]"
          >
            <GrTest className={`${iconClass}`}/>
            <span>Previous Tests</span>
          </Link>


          <Link
            to={`/note`}
            className="flex items-center space-x-1 cursor-pointer text-black hover:text-[#3852a4]"
          >
            <GrNotes className={`${iconClass}`}/>
            <span>Notes</span>
          </Link>

          <div className="flex items-center space-x-1 cursor-pointer">
            <CalendarIcon className={`${iconClass} text-[#A7B1C2]`} />
            <span>Test Date</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <HomeIcon className={`${iconClass} text-[#A7B1C2]`} />
            <span>My Account</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <LogoutIcon className={`${iconClass} text-[#A7B1C2]`} />
            <span>Log out</span>
          </div>
        </div>
      </header>

      {/* Rest of your page content */}
      <main className="p-6"> {/* example content padding */} </main>
    </div>
  );
}
