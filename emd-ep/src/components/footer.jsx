import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";

function Footer() {
  return (
    <footer id="footer" dir="ltr" className="w-full bg-red-900 text-white p-6 ">
      <div className="container mx-auto flex flex-row justify-between items-center px-4">
        <p className="mb-0 text-right">
          &copy; {new Date().getFullYear()} جميع الحقوق محفوظة
        </p>
        <div className="flex space-x-6 text-2xl">
          <a
            href="mailto:EMD.660@srca.org.sa?subject=استفسار&body=السلام عليكم،"
            className="hover:text-blue-400 transition-colors"
          ><FaEnvelope /></a>
          <a
            href="tel:0112805555,22381" 
            className="hover:text-green-400 transition-colors"
          ><FaPhone /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
