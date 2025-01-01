"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUsers, FaCommentDots, FaProjectDiagram } from "react-icons/fa"; // Import React Icons
import { AiOutlineUnorderedList, AiOutlineBarChart } from "react-icons/ai";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-17 bg-gray-900 text-white fixed flex flex-col items-center py-4">
      <ul className="space-y-4">
        <li className="flex flex-col items-center justify-center">
          <Link
            href="/pages"
            className={`flex p-2 rounded  flex-col items-center justify-center ${
              pathname === "/" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            <FaUsers className="text-xl" /> {/* User Icon */} <p  className="text-xs">User</p>
          </Link>
        </li>
        <li>
          <Link
            href="/pages/feedback"
            className={`flex p-2 rounded flex-col items-center justify-center ${
              pathname === "/feedback" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            <FaCommentDots className="text-xl" /> {/* Feedback Icon */} <p className="text-xs">Feedback</p>
          </Link>
        </li>
        <li>
          <Link
            href="/pages/project"
            className={`flex p-2 rounded flex-col items-center justify-center ${
              pathname === "/feedback" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            <FaProjectDiagram className="text-xl" /> {/* Feedback Icon */} <p className="text-xs">Project</p>
          </Link>
        </li>
        <li>
          <Link
            href="/pages/task"
            className={`flex p-2 rounded flex-col items-center justify-center ${
              pathname === "/feedback" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            <AiOutlineUnorderedList className="text-xl" /> {/* Feedback Icon */} <p className="text-xs">Task</p>
          </Link>
        </li> 
        <li>
          <Link
            href="/pages/analytics"
            className={"flex p-2 rounded flex-col items-center justify-center hover:bg-gray-800"
            }
          >
            <AiOutlineBarChart className="text-xl" /> {/* Feedback Icon */} <p className="text-xs">Task</p>
          </Link>
        </li> 
      </ul>
    </div>
  );
};

export default Navbar;
