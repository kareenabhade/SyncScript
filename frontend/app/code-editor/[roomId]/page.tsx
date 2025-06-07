'use client';

import { useState, useRef, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { LANGUAGE_VERSIONS, CODE_SNIPPETS } from '@/utils/constants';
import { Output } from '@/components/output';


export default function CodeEditor() {
  const [language, setLanguage] = useState<keyof typeof CODE_SNIPPETS>('javascript');
  const [code, setCode] = useState<string>(CODE_SNIPPETS[language]);
  const editorRef = useRef<any>(null);


  const handleEditorDidMount = (editor:any) => {
    editorRef.current = editor;
  };
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-900 via-[#0f1729] to-gray-900 flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 relative">
          <div className="absolute top-4 right-30 z-20">
            <select
              value={language}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const newLang = e.target.value as keyof typeof CODE_SNIPPETS;
                setLanguage(newLang);
                setCode(CODE_SNIPPETS[newLang]);
              }}
              className="w-36 bg-gray-800/90 text-indigo-200 px-3 py-1.5 rounded-lg border border-indigo-500/20 
              focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:bg-gray-800 
              transition-all duration-200 backdrop-blur-sm text-sm font-medium"
            >
              {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
                <option key={lang} value={lang} className="bg-gray-900">
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5" />
          <Editor
            height="calc(100vh - 4rem)"
            language={language}
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value || '')}
            onMount={handleEditorDidMount}
            options={{
              fontSize: 16,
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              padding: { top: 20, bottom: 20 },
              lineHeight: 1.6,
              fontFamily: 'var(--font-geist-mono)',
              fontLigatures: true,
              renderLineHighlight: 'all',
              cursorBlinking: 'smooth',
              smoothScrolling: true,
              cursorSmoothCaretAnimation: 'on',
              formatOnPaste: true,
              formatOnType: true,
            }}
            className="border-r border-indigo-500/20 relative z-10"
          />
        </div>
        <Output editorRef={editorRef} language={language} />
      </div>
    </main>
  );
}