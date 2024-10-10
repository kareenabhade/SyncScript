import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import axios from 'axios';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const executeCode = async () => {
    try {
      const response = await axios.post('https://api.judge0.com/submissions', {
        source_code: code,
        language_id: getLanguageId(language), // Function to map language to API ID
      });
      
      const result = await axios.get(`https://api.judge0.com/submissions/${response.data.token}`);
      
      if (result.data.stderr) {
        setError(result.data.stderr);
        setOutput('');
      } else {
        setOutput(result.data.stdout);
        setError('');
      }
    } catch (err) {
      setError('Error occurred while executing code.');
    }
  };

  const getLanguageId = (language) => {
    const languageMap = {
      python: 71, // Language ID for Python
      c_cpp: 52,  // Language ID for C++
      javascript: 63, // Language ID for JavaScript
      // Add more language mappings
    };
    return languageMap[language];
  };

  return (
    <div>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="python">Python</option>
        <option value="c_cpp">C++</option>
        <option value="javascript">JavaScript</option>
        {/* Add more languages */}
      </select>
      
      <AceEditor
        mode={language}
        theme="monokai"
        value={code}
        onChange={(newCode) => setCode(newCode)}
        name="code_editor"
        editorProps={{ $blockScrolling: true }}
      />
      
      <button onClick={executeCode}>Run</button>
      
      {output && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      )}
      
      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
