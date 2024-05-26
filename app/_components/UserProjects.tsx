"use client";
import { colors } from "@/lib/templateColors";
import useGetAllProjects from "@/utils/hooks/projectApiHooks/useGetAllProjects";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const UserProjects = () => {
  const { allProjects } = useGetAllProjects();
  const router = useRouter();
  useEffect(() => {
    console.log(allProjects.data);
  }, [allProjects]);

  
  return (
    <div className="w-[65%] h-full overflow-y-auto rounded-lg bg-zinc-100 customScrollbar relative">
      <p className="font-semibold text-lg sticky top-0 left-0 right-0 w-full bg-zinc-100 border-b py-2 px-5 shadow-sm">
        My Projects
      </p>
      <div className="grid grid-cols-3 gap-3 w-full mt-4 py-3 px-5">
        {allProjects &&
          allProjects.data &&
          allProjects.data?.projects.map((project, index) => (
            <div
              key={project.project_id}
              className="col-span-1 bg-white rounded-lg shadow-md flex flex-col justify-start items-center h-fit hover:shadow-xl transition-all ease-in border overflow-hidden"
            >
              <div
                className={`w-full flex flex-col justify-center items-center border-b h-full py-5 bg-[${
                  colors[index % 20]
                }]`}
                style={{
                  backgroundColor: colors[index % 20].light,
                  color: colors[index % 20].dark,
                }}
              >
                <FaFilePdf size={65} />
              </div>
              <div className="py-1 flex justify-start items-center w-full px-4">
                <div className="flex flex-col justify-start items-start gap-y-2 w-full">
                  <span className="text-sm font-semibold">
                    {project.project_name}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      project.status === "creating"
                        ? "text-yellow-500"
                        : project.status === "created"
                        ? "text-green-600"
                        : "text-red-500"
                    } `}
                  >
                    <span className="text-black">Status: </span>
                    {project.status}
                  </span>
                </div>
                <div className="text-zinc-800 hover:text-black p-1 hover:bg-zinc-200 rounded-lg hover:cursor-pointer" onClick={()=>{router.push(`/dashboard/chat/${project.project_id}`)}}>
                  <HiOutlineArrowNarrowRight size={20} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserProjects;
