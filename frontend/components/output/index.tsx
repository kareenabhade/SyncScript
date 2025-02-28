'use client';

import { useState } from "react";
import { executeCode } from "@/utils/api";
import { toast } from "sonner";
import { LANGUAGE_VERSIONS } from "@/utils/constants";

interface OutputProps {
  editorRef: {
    current: {
      getValue: () => string;
    } | null;
  };
  language: string;
}

export function Output({ editorRef, language }:OutputProps) {
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async (): Promise<void> => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) {
      toast.warning("Please enter some code to execute.");
      return;
    }

    try {
      setIsLoading(true);
      setIsError(false);

      const result = await executeCode(language as keyof typeof LANGUAGE_VERSIONS, sourceCode);
      const { run, stderr } = result;

      if (stderr) {
        setIsError(true);
        setOutput(stderr.split("\n"));
        toast.error("Compilation Error");
      } else {
        setIsError(false);
        setOutput(run.output.split("\n"));
        toast.success(run.output ? "Code executed successfully" : "No output generated");
      }
    } catch (error: unknown) {
      console.error("Execution Error:", error);
      setIsError(true);
      setOutput(["Execution failed."]);
      
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unable to run code");
      }
    } finally {
      setIsLoading(false);
    }
  };

    return (
    <div className="w-[400px] bg-gray-900/50 border-l border-indigo-500/20 backdrop-blur-sm">
      <div className="p-4 border-b border-indigo-500/20 bg-indigo-500/5">
        <div className="flex justify-between items-center">
          <h2 className="text-indigo-200 font-medium">Output</h2>
                    <button
            onClick={runCode}
            disabled={isLoading}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 
            hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-1.5 rounded-lg 
            transition-all duration-300 disabled:opacity-50 text-sm font-medium shadow-lg 
            shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span>Executing...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Run Code</span>
              </>
            )}
          </button>
        </div>
      </div>
        <div className="p-4 flex-1">
        <div className={`font-mono text-sm ${isError ? 'text-red-400' : 'text-emerald-400'} 
          bg-gray-950/50 p-4 rounded-lg h-[calc(100vh-14rem)] overflow-y-auto border border-indigo-500/10
          [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-indigo-500/20
          hover:[&::-webkit-scrollbar-thumb]:bg-indigo-500/40`}
        >
          {output ? (
            output.map((line: string, i: number) => (
              <div key={i} className="whitespace-pre-wrap mb-1 leading-relaxed">
                {line}
              </div>
            ))
          ) : (
            <div className="text-indigo-300/50 italic">
              Click "Run Code" to see the output here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}