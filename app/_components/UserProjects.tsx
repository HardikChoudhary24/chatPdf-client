"use client";
import { colors } from "@/lib/templateColors";
import useGetAllProjects from "@/utils/hooks/projectApiHooks/useGetAllProjects";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import UploadModal from "./UploadModal";
import { IoReloadCircle } from "react-icons/io5";
import "rsuite/dist/rsuite-no-reset.min.css";
import { Loader } from "rsuite";
import { cn } from "@/lib/utils";

const UserProjects = () => {
  const { allProjects, refetch, isLoading, status } = useGetAllProjects();
  const [userProjects, setUserProjects] = useState<Project[] | []>([]);
  const router = useRouter();
  useEffect(() => {
    if (allProjects.data && allProjects.data.projects)
      setUserProjects(allProjects.data.projects);
  }, [allProjects]);

  return (
    <div
      className={cn(
        "w-[65%] h-full overflow-y-auto rounded-lg bg-zinc-100 customScrollbar relative",
        {
          "overflow-y-hidden": isLoading,
        }
      )}
    >
      <div className=" sticky top-0 left-0 right-0 w-full bg-zinc-100 border-b py-2 px-5 shadow-sm flex justify-between items-center gap-x-2">
        <span className="font-semibold text-lg">My Projects 📑</span>
        <div
          className="cursor-pointer hover:text-blue-950"
          onClick={() => refetch()}
        >
          <IoReloadCircle size={25} />
        </div>
      </div>
      {isLoading ? (
        <div
          className={cn(
            "h-full w-full flex justify-center items-center gap-x-2 overflow-hidden"
          )}
        >
          <Loader />
          <span className="text-sm font-semibold">Loading</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 w-full mt-4 py-3 px-5">
            {userProjects.map((project, index) => (
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
                  {project.status === "created" && (
                    <div
                      className="text-zinc-800 hover:text-black p-1 hover:bg-zinc-200 rounded-lg hover:cursor-pointer"
                      onClick={() => {
                        router.push(`/dashboard/chat/${project.project_id}`);
                      }}
                    >
                      <HiOutlineArrowNarrowRight size={20} />
                    </div>
                  )}
                  {project.status === "failed" && (
                    <div
                      className="text-green-600 hover:text-white p-1 hover:bg-green-500 rounded-lg hover:cursor-pointer flex justify-center items-center"
                      onClick={() => {
                        router.push(`/dashboard/chat/${project.project_id}`);
                      }}
                    >
                      {/* <HiOutlineArrowNarrowRight size={20} /> */}
                      <span className="font-semibold text-xs text-nowrap">
                        Retry
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {userProjects.length === 0 && (
            <div className="w-full flex flex-col justify-center items-center pt-10 gap-y-2">
              <Image
                src={"/empty-state-illustration.svg"}
                alt="empty"
                height={250}
                width={250}
              />
              <p className="text-lg font-semibold">No Projects Available!</p>
              <UploadModal />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserProjects;
