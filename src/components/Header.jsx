import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal } from 'lucide-react';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="header">
            <div className="container flex items-center justify-between h-full w-full">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105" style={{ background: 'linear-gradient(to bottom right, #60a5fa, #a855f7)' }}>
                        <Terminal size={20} color="white" />
                    </div>
                    <span className="text-xl font-bold text-gradient">NextGen Dev</span>
                </Link>

                <nav className="flex items-center gap-4 md:gap-8">
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/concepts"
                        className={`nav-link ${isActive('/concepts') ? 'active' : ''}`}
                    >
                        Concepts
                    </Link>
                    <Link
                        to="/interview-questions"
                        className={`nav-link ${isActive('/interview-questions') ? 'active' : ''}`}
                    >
                        Interview Questions
                    </Link>
                    <Link
                        to="/contact"
                        className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                    >
                        Contact
                    </Link>
                    <Link
                        to="/compiler"
                        className={`nav-link ${isActive('/compiler') ? 'active' : ''}`}
                    >
                        Compiler
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
