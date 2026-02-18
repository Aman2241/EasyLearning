import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import QuestionCard from '../components/QuestionCard';

import javaQuestions from '../data/java-questions.json';
import springQuestions from '../data/spring-questions.json';
import springBootQuestions from '../data/springboot-questions.json';
import mysqlQuestions from '../data/mysql-questions.json';
import codingQuestions from '../data/coding-questions.json';

const dataMap = {
    java: { title: 'Java Core', data: javaQuestions, color: 'orange' },
    spring: { title: 'Spring Framework', data: springQuestions, color: 'green' },
    springboot: { title: 'Spring Boot', data: springBootQuestions, color: 'yellow' },
    mysql: { title: 'MySQL & Database', data: mysqlQuestions, color: 'blue' },
    coding: { title: 'Coding Challenges', data: codingQuestions, color: 'purple' }
};

const TopicPage = () => {
    const { topicId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [topicData, setTopicData] = useState(null);

    useEffect(() => {
        if (topicId && dataMap[topicId]) {
            setTopicData(dataMap[topicId]);
        }
    }, [topicId]);

    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 10;

    // Reset to first page when search changes or topic changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, topicId]);

    if (!topicData) {
        return <div className="page-container text-center text-white">Topic not found</div>;
    }

    const filteredQuestions = topicData.data.filter(q =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="page-container container">
            <div className="mb-8">
                <Link to="/" className="flex items-center text-gray-400 hover:text-white transition-colors mb-6" style={{ textDecoration: 'none' }}>
                    <ArrowLeft size={16} className="mr-2" style={{ marginRight: '0.5rem' }} /> Back to Topics
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className={`text-3xl md:text-4xl font-bold mb-2 text-${topicData.color}-400`}>
                            {topicData.title}
                        </h1>
                        <p className="text-gray-400">
                            {topicData.data.length} Questions Available
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
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {currentQuestions.length > 0 ? (
                    <>
                        {currentQuestions.map((q, index) => (
                            <motion.div
                                key={q.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <QuestionCard questionData={q} />
                            </motion.div>
                        ))}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-8 mb-12">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${currentPage === 1
                                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                >
                                    Prev
                                </button>

                                <span className="text-gray-400 text-sm">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${currentPage === totalPages
                                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        No questions found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </div>
    );
};
export default TopicPage;
