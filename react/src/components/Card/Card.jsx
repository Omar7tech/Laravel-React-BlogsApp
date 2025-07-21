import { Link } from "react-router-dom";
import React from 'react';
import { motion as Motion } from 'framer-motion';

export default function Card({ blog, onCategoryClick }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    function hasUrlParameter(paramName = 'category') {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        return params.has(paramName);
    }

    // Default values in case blog is undefined
    const title = blog?.title || "Medium Card";
    const author = blog?.user?.name || "Ahmad Kamal";
    const email = blog?.user?.email || "omar@gmail.com";
    const createdAt = blog?.created_at || "2020/34/3";
    // This is your original content prop, and a longer default to ensure visual truncation
    const content = blog?.content || "Beatae a ullam exercitationem sed mollitia natus. Aliquid asperiores eius atque quia animi saepe distinctio corporis. Atque ratione omnis officiis ad aut quo ratione totam. Neque quos placeat ipsum nihil incidunt perspiciatis ut. This additional text makes sure the visual truncation and fade are always apparent, as requested.";
    const slug = blog?.slug || "#";
    const categoryName = blog?.category?.name || "";
    const categorySlug = blog?.category?.slug || "";

    // Handler for clicking the category badge
    const handleCategoryBadgeClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (onCategoryClick && categorySlug) {
            onCategoryClick(categorySlug);
        }
    };

    return (
        <Motion.div
            className="card w-full bg-base-200/60 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
        >
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center space-x-3">
                        <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                                <img
                                    src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                                    alt={`${author} avatar`}
                                />
                            </div>
                        </div>
                        <div className="space-y-[-4px]">
                            <p className="text-lg">{author}</p>
                            <p className="text-sm text-gray-500">{email}</p>
                        </div>
                    </div>
                    
                </div>
                <div className="divider my-[-3px]"></div>
                <h2 className="card-title">{title}</h2>

                {/* === MODIFIED CONTENT SECTION START === */}
                {/* Apply fixed height and overflow directly to a container around the <p> */}
                <div className="relative overflow-hidden max-h-24"> {/* max-h-24 limits the content to about 3-4 lines */}
                    <p className="text-justify">
                        {content}
                    </p>
                    {/* The fading overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-base-200/60 to-transparent pointer-events-none"></div>
                </div>
                {/* === MODIFIED CONTENT SECTION END === */}

                <div className={`py-3 flex items-center font-semibold ${hasUrlParameter() ? '' : 'text-blue-500 transition-transform duration-200 hover:scale-102 cursor-pointer' }`}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3">
                            <path fillRule="evenodd" d="M9.493 2.852a.75.75 0 0 0-1.486-.204L7.545 6H4.198a.75.75 0 0 0 0 1.5h3.14l-.69 5H3.302a.75.75 0 0 0 0 1.5h3.14l-.435 3.148a.75.75 0 0 0 1.486.204L7.955 14h2.986l-.434 3.148a.75.75 0 0 0 1.486.204L12.456 14h3.346a.75.75 0 0 0 0-1.5h-3.14l.69-5h3.346a.75.75 0 0 0 0-1.5h-3.14l.435-3.148a.75.75 0 0 0-1.486-.204L12.045 6H9.059l.434-3.148ZM8.852 7.5l-.69 5h2.986l.69-5H8.852Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {/* The category name, now with click handler and hover animation */}
                    {categoryName && (
                        <div
                            className=""
                            onClick={handleCategoryBadgeClick}
                            aria-label={`Filter by category: ${categoryName}`}
                        >
                            {categoryName}
                        </div>
                    )}
                </div>
                <div>

                </div>
                <div className="flex justify-between items-end">

                    <div className="flex items-center text-gray-500 text-xs">
                        <div>
                            <p>{formatDate(createdAt)}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>

                    <div>
                        {/* Link for comments/likes (still works independently) */}
                        <Link to={`/blogs/${slug}`} >
                            <div className="indicator">
                                <span className="indicator-item badge badge-soft badge-xs badge-accent">12</span>
                                <button className="btn btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                        <path d="M3.505 2.365A41.369 41.369 0 0 1 9 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 0 0-.577-.069 43.141 43.141 0 0 0-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 0 1 5 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914Z" />
                                        <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 0 0 1.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0 0 14 6Z" />
                                    </svg>
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Motion.div>
    );
}
