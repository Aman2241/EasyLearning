import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const TopicCard = ({ title, description, icon: Icon, to, color }) => {
    const getColorClass = (c) => {
        switch (c) {
            case 'orange': return 'text-orange-400';
            case 'green': return 'text-green-400';
            case 'yellow': return 'text-yellow-400';
            case 'blue': return 'text-blue-400';
            case 'purple': return 'text-purple-400';
            default: return 'text-gray-400';
        }
    };

    const getBgClass = (c) => {
        // We'll use inline styles for the blur effect background since it's dynamic
        switch (c) {
            case 'orange': return 'rgba(251, 146, 60, 0.1)';
            case 'green': return 'rgba(74, 222, 128, 0.1)';
            case 'yellow': return 'rgba(250, 204, 21, 0.1)';
            case 'blue': return 'rgba(56, 189, 248, 0.1)';
            case 'purple': return 'rgba(168, 85, 247, 0.1)';
            default: return 'rgba(148, 163, 184, 0.1)';
        }
    };

    return (
        <Link to={to} style={{ display: 'block', height: '100%' }}>
            <motion.div
                whileHover={{ y: -5 }}
                className="glass-card"
                style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}
            >
                <div style={{
                    position: 'absolute', top: 0, right: 0, width: '150px', height: '150px',
                    background: getBgClass(color), filter: 'blur(60px)', borderRadius: '50%',
                    transform: 'translate(20%, -20%)', zIndex: 0
                }}></div>

                <div style={{
                    marginBottom: '1rem', width: '3rem', height: '3rem', borderRadius: '0.5rem',
                    background: 'rgba(30, 41, 59, 1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--border-color)', position: 'relative', zIndex: 1
                }}>
                    <Icon className={getColorClass(color)} size={24} />
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-100" style={{ position: 'relative', zIndex: 1 }}>{title}</h3>
                <p className="text-gray-400 mb-6" style={{ fontSize: '0.875rem', flexGrow: 1, position: 'relative', zIndex: 1 }}>{description}</p>

                <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: 500, color: '#60a5fa', marginTop: 'auto', position: 'relative', zIndex: 1 }}>
                    Start Practicing <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
                </div>
            </motion.div>
        </Link>
    );
};

export default TopicCard;
