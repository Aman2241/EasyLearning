import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader, Code, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    python: "3.10.0",
    java: "15.0.2",
    c: "10.2.0",
    cpp: "10.2.0", // gcc
};

const CODE_SNIPPETS = {
    javascript: `console.log("Hello, World!");\n\nfunction greet(name) {\n    return "Hello, " + name;\n}\n\nconsole.log(greet("Developer"));`,
    python: `print("Hello, World!")\n\ndef greet(name):\n    return f"Hello, {name}"\n\nprint(greet("Developer"))`,
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
    c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
    cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}`
};

const CompilerPage = () => {
    const [language, setLanguage] = useState("java");
    const [code, setCode] = useState(CODE_SNIPPETS["java"]);
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const executeCode = async () => {
        setIsLoading(true);
        setIsError(false);
        setOutput(null);

        try {
            const response = await fetch("http://localhost:3001/api/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    language: language,
                    version: LANGUAGE_VERSIONS[language],
                    files: [
                        {
                            content: code,
                        },
                    ],
                }),
            });

            const result = await response.json();

            // Piston returns: { run: { stdout: "...", stderr: "...", code: 0, signal: null, output: "..." } }
            if (result.run) {
                setOutput(result.run.output); // 'output' combines stdout and stderr usually, or use run.stdout/stderr
                setIsError(result.run.code !== 0);
            } else {
                setOutput("Error: Failed to execute code.");
                setIsError(true);
            }

        } catch (error) {
            console.error("Execution error:", error);
            setOutput("Error: " + error.message + "\n\n(Network error or API might be down)");
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setCode(CODE_SNIPPETS[lang]);
        setOutput(null);
        setIsError(false);
    };

    return (
        <div className="page-container container h-[calc(100vh-100px)] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <Code className="text-blue-400" size={24} />
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Code Compiler
                    </h1>
                </div>

                <div className="flex gap-4">
                    <select
                        value={language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 transition-colors"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                    </select>

                    <button
                        onClick={executeCode}
                        disabled={isLoading}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded font-medium transition-all ${isLoading
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20"
                            }`}
                    >
                        {isLoading ? <Loader className="animate-spin" size={16} /> : <Play size={16} />}
                        {isLoading ? "Running..." : "Run Code"}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
                {/* Editor Panel */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 border border-gray-700/50 rounded-lg overflow-hidden bg-[#1e1e1e] shadow-xl relative"
                    style={{ height: "75vh", minHeight: "500px" }}
                >
                    <Editor
                        height="100%"
                        language={language === "c" || language === "cpp" ? "cpp" : language}
                        value={code}
                        theme="vs-dark"
                        onChange={(value) => setCode(value)}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                    />
                </motion.div>

                {/* Output Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 h-[40vh] md:h-auto md:w-1/3 border border-gray-700/50 rounded-lg overflow-hidden bg-gray-900 shadow-xl flex flex-col"
                >
                    <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex items-center gap-2 text-sm text-gray-400">
                        <Terminal size={14} />
                        <span>Output Console</span>
                    </div>
                    <div className={`p-4 font-mono text-sm whitespace-pre-wrap overflow-auto flex-1 ${isError ? "text-red-400" : "text-gray-300"}`}>
                        {output ? output : <span className="text-gray-600 italic">Click "Run Code" to see output here...</span>}
                    </div>
                </motion.div>
            </div>

            <div className="mt-4 text-center text-xs text-gray-600">
                Powered by Piston API via Local Proxy (Run <code>node proxy-server.js</code> if execution fails).
            </div>
        </div>
    );
};

export default CompilerPage;
