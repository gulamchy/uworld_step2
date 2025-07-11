import { CalendarIcon, HomeIcon, LogoutIcon } from "./Icon.jsx";

export default function Header() {
  const iconClass = "w-4 h-4 text-[#A7B1C2]";
  return (
    <div>
      <header
        className="flex items-center justify-between px-6"
        style={{ height: 64, backgroundColor: "#FFFFFF" }}
      >
        {/* Left side */}
        <div className="font-[Open_Sans] text-3xl font-light text-[#65656A]">
          Previous Tests
        </div>

        {/* Right side */}
        <div className="flex space-x-8 text-[#A7B1C2] text-sm font-medium items-center">
          <div className="flex items-center space-x-1 cursor-pointer">
            <CalendarIcon className={iconClass} />
            <span>Test Date</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <HomeIcon className={iconClass} />
            <span>My Account</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <LogoutIcon className={iconClass} />
            <span>Log out</span>
          </div>
        </div>
      </header>

      {/* Rest of your page content */}
      <main className="p-6"> {/* example content padding */} </main>
    </div>
  );
}
