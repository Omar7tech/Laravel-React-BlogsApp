import React from 'react';
import { motion as Motion } from 'framer-motion'; // Import motion for animations
// You might need to install lucide-react if you haven't already: npm install lucide-react
import { Code, BookOpen } from 'lucide-react'; // Importing relevant icons
import SplitText from '../components/ReactBits/SplitText';
import DotGrid from '../components/ReactBits/DotGrid';
import Aurora from '../components/ReactBits/Aurora';
export default function Home() {
    // Define animation variants for staggered appearance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3 // Slightly reduced stagger for a snappier feel
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        // Main container for the page, with a neutral background and fade-in animation
        <>



            <div className='absolute mt-[-60px] h-screen min-w-full'>
                <Aurora
                    colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                    blend={1}
                    amplitude={5}
                    speed={0.2}
                />
            </div>
            <Motion.div
                className="bg-base-100 text-base-content flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Hero section for prominent content */}
                <div className="hero">
                    <div className="hero-content text-center">
                        <div className="max-w-xl"> {/* Increased max-width for richer content */}
                            {/* Animated Heading with a relevant icon */}
                            <Motion.h1
                                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight flex items-center justify-center gap-3"
                                variants={itemVariants}
                            >
                                <Code className="size-10 sm:size-12 lg:size-14 text-neutral" /> {/* Code icon */}
                                The Developer's Insights Hub
                            </Motion.h1>


                            {/* Animated Paragraph */}
                            <Motion.p
                                className="py-6 text-lg sm:text-xl leading-relaxed opacity-90"
                                variants={itemVariants}
                            >
                                <SplitText delay={5} duration={0.5} text={'Dive into expertly crafted articles, discover cutting-edge techniques, and connect with a community of passionate developers. Your essential resource for continuous learning and professional growth.'} />

                            </Motion.p>

                            {/* Animated Call to Action Button */}
                            <Motion.button
                                className="btn btn-neutral btn-lg mt-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }} // Scale up slightly on hover
                                whileTap={{ scale: 0.95 }}   // Scale down slightly on tap
                            >
                                <BookOpen className="size-5" /> {/* Book icon */}
                                Explore Articles
                            </Motion.button>
                        </div>
                    </div>
                </div>
            </Motion.div>
        </>
    );
}
