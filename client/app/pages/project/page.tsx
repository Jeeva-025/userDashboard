"use client"
import React, { useState, useEffect } from 'react';
import { IoCreate } from 'react-icons/io5';
import { FaHourglassStart } from 'react-icons/fa';
import { IoDocumentTextOutline, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import useUserStore from '@/store';
import Editproject from '../../../components/Editproject.js';

const PAGE_SIZE = 5;

const ProjectPage = () => {
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [editContent, setEditContent] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedProjects, setPaginatedProjects] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    const data = useUserStore((state) => state.projects);
    const getAllProjects = useUserStore((state) => state.getAllProject);
    const deleteProject = useUserStore((state) => state.deleteProject);


   

    useEffect(() => {
      const fetchProjects = async () => {
        await getAllProjects();  // Await the API call to get projects
    };

    fetchProjects();
    
    }, []);

    

    // Function to filter and format projects
    
        const activeProjects = data.filter((item) => item.status === "Active");

        // Format the start and end date for each project
        const formattedProjects = activeProjects.map((item) => {
            const startDateStr = item.startDate;
            const endDateStr = item.endDate;
            const options = { day: '2-digit', month: 'long', year: 'numeric' };
            const formattedStartDate = new Date(startDateStr).toLocaleDateString('en-GB', options);
            const formattedEndDate = new Date(endDateStr).toLocaleDateString('en-GB', options);

            return {
                ...item,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
            };
        });

        useEffect(()=>{
          handleMoreData();
        },[data, currentPage])



        console.log(data);

        const handleMoreData=()=>{
          const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = currentPage * PAGE_SIZE;
        setPaginatedProjects(formattedProjects.slice(0, endIndex));
        setHasMore(formattedProjects.length > endIndex);
        }
        

    

    const handleDelete = async (id) => {
        await deleteProject(id);
        await getAllProjects();
    };

    const handleEdit = (id) => {
        setIsShowEdit(true);
        const newArr = data.find((item) => item.id === id);
        setEditContent(newArr);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-6">Projects</h1>
                <Link href="project/createproject">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300">
                        Create Project
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedProjects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col justify-start relative overflow-hidden"
                    >
                        <div className="flex p-2 justify-between">
                            <div className="flex justify-center items-center space-x-2">
                                <Link href={`/pages/project/${project.id}`}>
                                    <h2 className="text-lg font-semibold">{project.title}</h2>
                                </Link>
                                <button
                                    onClick={() => handleEdit(project.id)}
                                    className="text-gray-500 hover:text-gray-700 transition mb-1 hover:scale-110"
                                >
                                    <IoCreate size={34} />
                                </button>
                            </div>

                            <div className="flex flex-wrap space-x-2 items-center">
                                <div className="py-1 px-2 border text-red-600 border-red-100 rounded-md bg-red-200">
                                    Offtrack
                                </div>
                                <button onClick={() => handleDelete(project.id)} className="hover:scale-105">
                                    <IoClose size={34} />
                                </button>
                            </div>
                        </div>
                        <hr className="border-t-3 border-gray-500 my-2" />
                        <p className="text-sm px-2 text-gray-600">{project.description}</p>
                        <span className="text-red-400 mt-5 flex justify-start space-x-1">
                            <FaHourglassStart size={34} />
                            <p className="text-lg">{project.startDate}</p>
                        </span>
                        <span className="text-gray-500 mt-5 flex justify-end items-center space-x-1">
                            <IoDocumentTextOutline size={34} />
                            <p className="text-md">{project.issues} issues</p>
                        </span>
                    </div>
                ))}
            </div>

            {hasMore && (
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    Load More
                </button>
            )}

            {isShowEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <Editproject
                    
                        editContent={editContent}
                        setEditContent={setEditContent}
                        setIsShowEdit={setIsShowEdit}
                    />
                </div>
            )}
        </div>
    );
};

export default ProjectPage;
