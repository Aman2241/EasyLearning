import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Clock, Briefcase, Star } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';
import interviewQuestions from '../data/interview-questions.json';

const InterviewQuestionsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('recently-asked');
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 10;
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    useEffect(() => {
        if (!interviewQuestions) return;

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
                (q.question && q.question.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (q.answer && q.answer.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredQuestions(questions);
        setCurrentPage(1);
    }, [activeTab, searchTerm]);

    if (!interviewQuestions) {
        return <div className="text-white p-8">Loading or Error: Data not found.</div>;
    }

    // Pagination Logic
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button onClick={() => setActiveTab('recently-asked')} className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'recently-asked' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Recently Asked</button>
                    <button onClick={() => setActiveTab('1-3')} className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === '1-3' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'}`}>1-3 Years</button>
                    <button onClick={() => setActiveTab('3-5')} className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === '3-5' ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-400'}`}>3-5 Years</button>
                    <button onClick={() => setActiveTab('5-8+')} className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === '5-8+' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'}`}>5-8+ Years</button>
                    <button onClick={() => setActiveTab('System Design')} className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'System Design' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'}`}>System Design</button>
                </div>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="mb-4 text-gray-400 text-sm">
                    Showing {indexOfFirstQuestion + 1}-{Math.min(indexOfLastQuestion, filteredQuestions.length)} of {filteredQuestions.length} questions
                </div>

                {currentQuestions.map((q) => (
                    <div key={q.id}>
                        <QuestionCard questionData={q} />
                    </div>
                ))}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8 pb-8">
                        <button onClick={() => paginate(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-3 py-1 rounded bg-gray-800 text-gray-400 disabled:opacity-50">Prev</button>
                        <span className="text-gray-400 text-sm">Page {currentPage} of {totalPages}</span>
                        <button onClick={() => paginate(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-3 py-1 rounded bg-gray-800 text-gray-400 disabled:opacity-50">Next</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InterviewQuestionsPage;
