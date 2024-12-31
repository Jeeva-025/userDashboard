"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaLightbulb } from "react-icons/fa";
import { BiSolidPieChartAlt } from "react-icons/bi";
import { BsChatRightText } from "react-icons/bs";
import Link from "next/link";
import { IoClose } from 'react-icons/io5';
import useUserStore from "@/store";


const PAGE_SIZE = 5;

const Page = () => {
  const pathname = usePathname();
  const id = Number(pathname.split("/").pop());

  const tasks = useUserStore((state) => state.tasks);
  const getAllTasks = useUserStore((state) => state.getAllTasks);
  const deleteTask = useUserStore((state) => state.deleteTask);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchInitialTasks = async () => {
      await getAllTasks();
    };
    fetchInitialTasks();
  }, []);

  const fetchPaginatedTasks = (pageNumber) => {
    const filteredTasks = tasks.filter((task) => task.projectid === id);
    const startIndex = (pageNumber - 1) * PAGE_SIZE;
    const endIndex = pageNumber * PAGE_SIZE;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    setHasMore(filteredTasks.length > endIndex);
    return paginatedTasks;
  };

  const handleLoadMore = () => {
    setLoading(true);
    const newTasks = fetchPaginatedTasks(page + 1);
    setData((prevData) => {
      const taskIds = new Set(prevData.map((task) => task.id));
      const uniqueTasks = newTasks.filter((task) => !taskIds.has(task.id));
      return [...prevData, ...uniqueTasks];
    });
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setData((prevData) => prevData.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      alert(err.message);
    }
  };

  useEffect(() => {
    const initialTasks = fetchPaginatedTasks(1);
    setData(initialTasks);
  }, [tasks, id]);

  const activeTasks = data.filter((task) => task.status === "Active");

  return (
    <div className="p-6 h-screen bg-blue-50">
    <div className="flex justify-between mb-6">
      <h1 className="text-3xl font-bold">Addodle</h1>
      <div className="flex space-x-3">
        <Link href={`/pages/task/${id}`}>
          <button className="bg-blue-600 border border-blue-600 rounded-xl px-4 py-1">
            Assign Task
          </button>
        </Link>

        <div className="flex flex-col items-center space-y-2">
          <h3>Time Spent</h3>
          <div className="flex items-center space-x-2 px-2 rounded-xl bg-green-200 border border-green-200 text-green-600 font-semibold">
            <BiSolidPieChartAlt /> <p>00 : 30 : 00</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <h3>Deadline</h3>
          <div className="flex items-center space-x-2 px-2 rounded-xl bg-green-200 border border-green-200 text-green-600 font-semibold">
            <BiSolidPieChartAlt /> <p>00 : 30 : 00</p>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col mb-10 space-y-5">
      {activeTasks.length > 0 ? (
        activeTasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between py-3 border shadow-md bg-[#f8fafc] rounded-lg"
          >
            <div className="flex items-center space-x-3 p-4">
              <FaLightbulb size={29} />
              <div className="flex flex-col space-y-2">
                <p>{task.title}</p>
                <div className="flex space-x-2">
                  <button className="px-4 border rounded-xl bg-red-100 text-red-500">
                    Canceled
                  </button>
                  <button className="px-4 border border-green-100 rounded-xl bg-green-100 text-green-500">
                    Completed
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-20 mr-20">
              <div className="flex items-center space-x-2 px-2 rounded-xl bg-green-200 border border-green-200 text-green-600 font-semibold">
                <BiSolidPieChartAlt /> <p>00 : 30 : 00</p>
              </div>
              <img
                src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
                className="w-12 h-12 rounded-full object-cover"
                alt="Profile"
              />
              <BsChatRightText size={34} />
               <IoClose onClick={()=> handleDelete(task.id)}
                          size={34} className="text-red-500 hover:text-red-700" />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks available for this project.</p>
      )}
        {hasMore && (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
