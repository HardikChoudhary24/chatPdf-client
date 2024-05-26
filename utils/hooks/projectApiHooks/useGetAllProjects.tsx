import { projectApi } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const useGetAllProjects = () => {
  const query = useQuery({
    queryKey: ["all-projects"],
    queryFn: async () => {return (await projectApi.get("/allProjects")).data as {
      projects: Project[];
    };},
  });
  return { ...query, allProjects: query };
};
export default useGetAllProjects;