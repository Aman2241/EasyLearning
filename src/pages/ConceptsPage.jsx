import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle } from 'lucide-react';
import conceptsData from '../data/concepts.json';

const ConceptsPage = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('all');

    const categories = [
        { id: 'all', label: 'All Concepts' },
        { id: 'java', label: 'Java Core' },
        { id: 'spring', label: 'Spring' },
        { id: 'springboot', label: 'Spring Boot' },
        { id: 'mysql', label: 'MySQL' },
        { id: 'coding', label: 'Coding' }
    ];

    const filteredConcepts = selectedCategory === 'all'
        ? conceptsData
        : conceptsData.filter(c => c.category === selectedCategory);

    return (
        <div className="page-container container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.1)', marginBottom: '1rem' }}>
                    <Lightbulb className="text-yellow-400" size={32} />
                </div>
                <h1 className="text-4xl font-bold mb-4">
                    <span className="text-white">Core </span>
                    <span className="text-gradient">Concepts</span>
                </h1>
                <p className="text-xl text-gray-400" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Brush up on the fundamental theories and principles behind the technologies.
                </p>
            </motion.div>

            {/* Category Filter Tabs */}
            <div className="flex justify-center flex-wrap gap-4 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8" style={{ maxWidth: '900px', margin: '0 auto' }}>
                {filteredConcepts.map((concept, index) => (
                    <motion.div
                        key={concept.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card"
                        style={{ padding: '2rem', borderLeft: '4px solid #3b82f6', position: 'relative' }}
                    >
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '50%', filter: 'blur(60px)', transform: 'translate(50%, -50%)' }}></div>

                        <div className="mb-2">
                            <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${concept.category === 'java' ? 'text-orange-400 bg-orange-500/10' :
                                    concept.category === 'spring' ? 'text-green-400 bg-green-500/10' :
                                        concept.category === 'springboot' ? 'text-yellow-400 bg-yellow-500/10' :
                                            concept.category === 'mysql' ? 'text-blue-400 bg-blue-500/10' :
                                                'text-purple-400 bg-purple-500/10'
                                }`}>
                                {concept.category}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center" style={{ position: 'relative', zIndex: 1 }}>
                            {concept.title}
                        </h2>

                        <p className="text-gray-300 mb-6 text-2xl leading-relaxed" style={{ fontSize: '1.125rem', position: 'relative', zIndex: 1 }}>
                            {concept.description}
                        </p>

                        <div className="gap-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', zIndex: 1 }}>
                            {concept.points.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle className="text-blue-400" size={18} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                                    <span className="text-gray-400">{point}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ConceptsPage;
