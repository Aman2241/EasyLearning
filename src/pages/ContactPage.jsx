import React from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MapPin } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="page-container container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="text-white">Get in </span>
                        <span className="text-gradient">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Have questions or suggestions? I'd love to hear from you.
                    </p>
                </div>

                <div className="glass-card p-8 md:p-12">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                <User className="text-blue-400" size={32} />
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-1">Name</h3>
                                <p className="text-2xl text-white font-medium">Aman Raj</p>
                            </div>
                        </div>

                        <div className="h-px bg-gray-800"></div>

                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                                <Mail className="text-purple-400" size={32} />
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-1">Email</h3>
                                <a href="mailto:aman25722@gmail.com" className="text-2xl text-white font-medium hover:text-blue-400 transition-colors">
                                    aman25722@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="h-px bg-gray-800"></div>

                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                                <MapPin className="text-orange-400" size={32} />
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-1">Location</h3>
                                <p className="text-2xl text-white font-medium">India</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactPage;
