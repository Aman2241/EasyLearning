import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Edit3, Save, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CodeTabs = ({ snippets }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="mt-4 border border-gray-700 rounded-lg overflow-hidden bg-[#0f172a]">
            <div className="flex border-b border-gray-700 bg-gray-800/50">
                {snippets.map((snippet, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === index
                            ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-400/10'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                            }`}
                    >
                        {snippet.lang}
                    </button>
                ))}
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-gray-300">
                    <code>{snippets[activeTab].code}</code>
                </pre>
            </div>
        </div>
    );
};

const QuestionCard = ({ questionData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [note, setNote] = useState('');
    const [isNoteOpen, setIsNoteOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedNote = localStorage.getItem(`note_${questionData.id}`);
        if (savedNote) {
            setNote(savedNote);
        }
    }, [questionData.id]);

    const handleSaveNote = () => {
        localStorage.setItem(`note_${questionData.id}`, note);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const handleOpenCompiler = () => {
        let initialCode = "";
        let lang = "java"; // Default

        if (questionData.codeSnippets && questionData.codeSnippets.length > 0) {
            initialCode = questionData.codeSnippets[0].code;
            lang = questionData.codeSnippets[0].lang.toLowerCase();
        } else if (questionData.codeSnippet) {
            initialCode = questionData.codeSnippet;
        }

        navigate('/compiler', { state: { initialCode, language: lang } });
    };

    const getDifficultyColorClass = (diff) => {
        if (diff === 'Basic') return 'bg-green-500/10 text-green-400';
        if (diff === 'Intermediate') return 'bg-yellow-500/10 text-yellow-400';
        return 'bg-red-500/20 text-red-400';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card mb-6"
        >
            <div className="p-6" style={{ padding: '1.5rem' }}>
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <span className={`difficulty-badge ${getDifficultyColorClass(questionData.difficulty)}`}>
                            {questionData.difficulty}
                        </span>
                        <span className="text-gray-500 text-sm">#{questionData.id}</span>
                        {(questionData.category === "Coding" || questionData.codeSnippets || questionData.codeSnippet) && (
                            <button
                                onClick={handleOpenCompiler}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full hover:bg-blue-500/20 transition-colors text-xs font-medium border border-blue-500/30"
                            >
                                <Code size={14} />
                                Open in Compiler
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => setIsNoteOpen(!isNoteOpen)}
                        className="btn-outline"
                        style={{ padding: '0.5rem', borderRadius: '50%', border: 'none', color: note ? '#60a5fa' : '#94a3b8' }}
                        title="Take a note"
                    >
                        <Edit3 size={18} />
                    </button>
                </div>

                <h3 className="text-lg font-medium text-gray-100 mb-6 leading-relaxed">
                    {questionData.question}
                </h3>

                <AnimatePresence>
                    {isNoteOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mb-4 overflow-hidden"
                        >
                            <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Write your notes here..."
                                    style={{ width: '100%', background: 'transparent', border: 'none', color: '#cbd5e1', outline: 'none', minHeight: '80px', resize: 'vertical' }}
                                />
                                <div className="flex" style={{ justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                                    <button
                                        onClick={handleSaveNote}
                                        style={{ background: 'transparent', border: 'none', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontSize: '0.875rem' }}
                                    >
                                        <Save size={14} />
                                        {isSaved ? 'Saved!' : 'Save Note'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="btn-reveal"
                >
                    <span className="font-medium">
                        {isOpen ? 'Hide Answer' : 'Reveal Answer'}
                    </span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div style={{ paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {questionData.answer}
                                </p>

                                {questionData.detailedSolution && (
                                    <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                        <h4 className="text-md font-semibold text-blue-400 mb-2">Detailed Solution:</h4>
                                        <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                                            {questionData.detailedSolution}
                                        </div>
                                    </div>
                                )}

                                {questionData.diagram && (
                                    <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                        <h4 className="text-md font-semibold text-purple-400 mb-2">Diagram:</h4>
                                        <div className="overflow-x-auto">
                                            <pre className="text-xs text-gray-400 whitespace-pre">{questionData.diagram}</pre>
                                        </div>
                                    </div>
                                )}

                                {questionData.codeSnippets ? (
                                    <CodeTabs snippets={questionData.codeSnippets} />
                                ) : questionData.codeSnippet ? (
                                    <div className="code-block mt-4">
                                        <pre>
                                            <code>{questionData.codeSnippet}</code>
                                        </pre>
                                    </div>
                                ) : null}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default QuestionCard;
