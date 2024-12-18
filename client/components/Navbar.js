"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUsers, FaCommentDots } from "react-icons/fa"; // Import React Icons

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-16 bg-gray-900 text-white fixed flex flex-col items-center py-4">
      <ul className="space-y-4">
        <li>
          <Link
            href="/pages"
            className={`block p-2 rounded ${
              pathname === "/" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            <FaUsers className="text-xl" /> {/* User Icon */}
          </Link>
        </li>
        <li>
          <Link
            href="/pages/feedback"
            className={`block p-2 rounded ${
              pathname === "/feedback" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            <FaCommentDots className="text-xl" /> {/* Feedback Icon */}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
