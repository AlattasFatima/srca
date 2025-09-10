import { HashLink } from "react-router-hash-link";
import Logo from "../assets/logo.svg";

function Navbar() {
  return (
    <nav className="border-b-[6px] border-gray-300 p-4 bg-red-500" dir="rtl">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <ul className="flex flex-row-reverse items-center justify-start gap-6">
          <li>
            <HashLink to="#home" smooth className="inline-block px-4 py-2">
              الرئيسية
            </HashLink>
          </li>
        </ul>

        <div className="flex justify-center w-16 md:w-32 lg:w-48">
          <img src={Logo} alt="Logo" className="w-auto h-auto border-8 border-red-500" />
        </div>

        <ul className="flex flex-row-reverse items-center justify-end gap-6">
          <li>
            <HashLink to="#videos" smooth className="inline-block px-8 py-8">
              المحتوى المرئي
            </HashLink>
          </li>
          <li>
            <HashLink to="#articles" smooth className="inline-block px-4 py-2">
              المحتوى المقروء
            </HashLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
