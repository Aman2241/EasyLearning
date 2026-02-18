import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Layers, Zap, Database, Code } from 'lucide-react';
import TopicCard from '../components/TopicCard';

const topics = [
    {
        id: 'java',
        title: 'Java Core',
        description: 'Master the fundamentals of Java, including OOP, multithreading, and collections.',
        icon: Coffee,
        color: 'orange',
        path: '/topic/java'
    },
    {
        id: 'spring',
        title: 'Spring Framework',
        description: 'Deep dive into Dependency Injection, AOP, and the Spring ecosystem.',
        icon: Layers,
        color: 'green',
        path: '/topic/spring'
    },
    {
        id: 'springboot',
        title: 'Spring Boot',
        description: 'Learn about auto-configuration, starters, and building production-ready apps.',
        icon: Zap,
        color: 'yellow',
        path: '/topic/springboot'
    },
    {
        id: 'mysql',
        title: 'MySQL & Database',
        description: 'Understand SQL queries, normalization, indexing, and transactions.',
        icon: Database,
        color: 'blue',
        path: '/topic/mysql'
    },
    {
        id: 'coding',
        title: 'Coding Challenges',
        description: 'Practice algorithmic problems with solutions in Java, Python, and C++.',
        icon: Code,
        color: 'purple',
        path: '/topic/coding'
    }
];

const Home = () => {
    return (
        <div className="page-container container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <h1 className="text-5xl font-bold mb-6">
                    <span className="text-white">Master Your </span>
                    <span className="text-gradient">Tech Interview</span>
                </h1>
                <p className="text-xl text-gray-400" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Comprehensive resource for Java developers. Practice questions, review concepts, and track your progress.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ justifyContent: 'center' }}>
                {topics.map((topic, index) => (
                    <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        style={{ height: '100%' }}
                    >
                        <TopicCard
                            title={topic.title}
                            description={topic.description}
                            icon={topic.icon}
                            to={topic.path}
                            color={topic.color}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Home;
