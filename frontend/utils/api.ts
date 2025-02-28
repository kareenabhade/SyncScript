import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});
interface ExecuteResponse {
  run: {
    output: string;
  };
  stderr?: string;
}

export const executeCode = async (
  language: keyof typeof LANGUAGE_VERSIONS, 
  sourceCode: string
): Promise<ExecuteResponse> => {
  try {
    const response = await API.post<ExecuteResponse>("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [{ content: sourceCode }],
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error executing code:", error.message);
    }
    throw error;
  }
};