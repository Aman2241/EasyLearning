import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const IntroScreen = ({ onComplete }) => {
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        // Start fading out after 4 seconds
        const fadeTimer = setTimeout(() => {
            setIsFadingOut(true);
        }, 4000);

        // Complete the intro after 5 seconds
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 5000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[100] bg-[#0f172a] transition-opacity duration-1000 ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="px-4"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
            >
                <h1
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-blue-100 text-center leading-[1.6] tracking-widest whitespace-nowrap"
                    style={{ textShadow: '0 4px 20px rgba(59, 130, 246, 0.4)' }}
                >
                    ॐ कृष्णाय वासुदेवाय हरये परमात्मने,<br />प्रणतः क्लेशनाशाय गोविन्दाय नमो नमः।
                </h1>
            </motion.div>
        </div>
    );
};

export default IntroScreen;
