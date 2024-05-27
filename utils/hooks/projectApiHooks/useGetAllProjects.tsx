import { projectApi } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";

const useGetAllProjects = () => {
  const cookies = new Cookies();
  const query = useQuery({
    queryKey: ["all-projects"],
    queryFn: async () => {
      return (
        await projectApi.get("/allProjects", {
          headers: {
            Authorization: `Bearer ${cookies.get("chatpdf_token")}`,
          },
        })
      ).data as {
        projects: Project[];
      };
    },
  });
  return { ...query, allProjects: query };
};
export default useGetAllProjects;
