import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ShowBlogs() {
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    let params = useParams();

    const fetchBlog = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`http://127.0.0.1:8000/api/blogs/${params.slug}`);

            if (!response.ok) {
                if (response.status === 404) {
                    setError('Blog not found');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return;
            }

            const data = await response.json();
            setBlog(data.data || null);
        } catch (err) {
            console.error('Error fetching blog:', err);
            setError('Failed to load blog. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [params.slug]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-base-100">
                <div className="max-w-4xl mx-auto px-6 py-16">
                    <div className="animate-pulse">
                        <div className="h-8 bg-base-300 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-base-300 rounded w-1/2 mb-8"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-base-300 rounded"></div>
                            <div className="h-4 bg-base-300 rounded w-5/6"></div>
                            <div className="h-4 bg-base-300 rounded w-4/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2 border-base-300 rounded-full">
                        <svg className="w-8 h-8 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold text-base-content mb-2">Article Not Found</h1>
                    <p className="text-base-content/60 mb-6">The article you're looking for doesn't exist or has been moved.</p>
                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-neutral btn-sm"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-base-content/60">No article data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100">
            <article className="max-w-4xl mx-auto px-6 py-16">
                {/* Header */}
                <header className="mb-12 pb-8 border-b border-base-300">
                    <h1 className="text-4xl font-bold text-base-content mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex items-center justify-between text-sm text-base-content/60">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="avatar placeholder">
                                    <div className="w-8 h-8 bg-base-200 text-base-content rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium">
                                            {blog.user.name.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                                <span className="font-medium text-base-content">{blog.user.name}</span>
                            </div>
                        </div>
                        <time className="text-base-content/50">
                            {formatDate(blog.created_at)}
                        </time>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    <div className="text-base-content/80 leading-relaxed text-lg">
                        {blog.content.split('\n').map((paragraph, index) => (
                            paragraph.trim() && (
                                <p key={index} className="mb-6">
                                    {paragraph}
                                </p>
                            )
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t border-base-300">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-base-content/50">
                            {blog.updated_at !== blog.created_at && (
                                <span>Last updated {formatDate(blog.updated_at)}</span>
                            )}
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="btn btn-outline btn-sm">
                                Share
                            </button>
                            <button
                                onClick={() => window.history.back()}
                                className="btn btn-neutral btn-sm"
                            >
                                Back to Articles
                            </button>
                        </div>
                    </div>
                </footer>
            </article>
        </div>
    );


}
