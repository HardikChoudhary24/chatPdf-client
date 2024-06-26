interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

interface CreateProjectPayload {
  name: string;
  pdfUrl: string;
  file: File;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface User {
  user_id: number;
  name: string;
  email: string;
}

interface Project {
  project_id: number;
  project_name: string;
  pdfurl: string;
  user_id: number;
  status: string;
}

interface MessageHistoryInterface {
  role: "User" | "AI";
  message: string;
  created_at?: Date;
  id:number;
}
interface ProjectDetailsResponse {
  projectDetails: Project;
  chatHistory: MessageHistoryInterface[];
}
interface CreateUserResponse {
  success: boolean;
  user: User;
}

interface CreateProjectResponse {
  project: Project;
}

interface LoginResponse {
  token: string;
  user: User;
}
