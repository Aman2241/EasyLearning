import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Clock, Briefcase, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import QuestionCard from '../components/QuestionCard';
import interviewQuestions from '../data/interview-questions.json';

const InterviewQuestionsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('recently-asked'); // 'recently-asked', '1-3', '3-5', '5-8+'
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    useEffect(() => {
        let questions = interviewQuestions;

        // Filter by Tab
        if (activeTab === 'recently-asked') {
            questions = questions.filter(q => q.tags && q.tags.includes('recently-asked'));
        } else {
            questions = questions.filter(q => q.experienceLevel === activeTab);
        }

        // Filter by Search Term
        if (searchTerm) {
            questions = questions.filter(q =>
                q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredQuestions(questions);
    }, [activeTab, searchTerm]);

    return (
        <div className="page-container container">
            <div className="mb-8">
                <Link to="/" className="flex items-center text-gray-400 hover:text-white transition-colors mb-6" style={{ textDecoration: 'none' }}>
                    <ArrowLeft size={16} className="mr-2" style={{ marginRight: '0.5rem' }} /> Back to Home
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                            Interview Questions
                        </h1>
                        <p className="text-gray-400">
                            Curated questions by experience level
                        </p>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field"
                            style={{ width: '100%', minWidth: '250px' }}
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setActiveTab('recently-asked')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'recently-asked'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <Clock size={14} className="inline mr-2" />
                        Recently Asked
                    </button>
                    <button
                        onClick={() => setActiveTab('1-3')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === '1-3'
                                ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <Briefcase size={14} className="inline mr-2" />
                        1-3 Years
                    </button>
                    <button
                        onClick={() => setActiveTab('3-5')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === '3-5'
                                ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <Briefcase size={14} className="inline mr-2" />
                        3-5 Years
                    </button>
                    <button
                        onClick={() => setActiveTab('5-8+')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === '5-8+'
                                ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <Star size={14} className="inline mr-2" />
                        5-8+ Years
                    </button>
                </div>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q, index) => (
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <QuestionCard questionData={q} />
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        No questions found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default InterviewQuestionsPage;
