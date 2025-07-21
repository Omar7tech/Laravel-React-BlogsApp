import { useEffect, useState, useCallback } from "react";
import Card from "../../components/Card/Card";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all"); // 'all', 'newest', 'oldest'
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [categories, setCategories] = useState([]); // State for categories
    const [selectedCategory, setSelectedCategory] = useState("all"); // State for selected category
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
        from: 0,
        to: 0
    });






    const updateUrlParams = useCallback((newFilter, newSearchTerm, newCategory, newPage) => {
        const params = new URLSearchParams(window.location.search);

        if (newFilter && newFilter !== "all") {
            params.set("filter", newFilter);
        } else {
            params.delete("filter");
        }

        if (newSearchTerm) {
            params.set("search", newSearchTerm);
        } else {
            params.delete("search");
        }

        if (newCategory && newCategory !== "all") {
            params.set("category", newCategory);
        } else {
            params.delete("category");
        }

        if (newPage && newPage > 1) {
            params.set("page", newPage.toString());
        } else {
            params.delete("page");
        }

        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    }, []);

    // Effect to read initial state from URL on mount
    useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        const urlFilter = params.get("filter") || "all";
        const urlSearch = params.get("search") || "";
        const urlCategory = params.get("category") || "all";
        const urlPage = parseInt(params.get("page") || "1", 10);

        setFilter(urlFilter);
        setSearchTerm(urlSearch);
        setDebouncedSearchTerm(urlSearch);
        setSelectedCategory(urlCategory);
        setPagination(prev => ({ ...prev, current_page: urlPage }));

        // Fetch categories and then blogs with initial URL parameters
        fetchCategories();
        // The fetchBlogs will be triggered by the second useEffect after initial state is set
        // A direct call might be needed here if the first useEffect needs to ensure
        // data is present before other effects depend on it. Let's keep it clean
        // by ensuring the second useEffect handles the fetch on state change.
    }, []);

    // Debounce effect for search term
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Effect to fetch blogs whenever filter, debouncedSearchTerm, category, or page changes
    useEffect(() => {
        // This condition prevents double-fetching on initial mount
        // by allowing the initial values from URL params to settle before triggering
        // Removed `loading === false` to ensure it always fetches on param changes.
        // The first `useEffect` sets initial state, this one acts on changes.
        fetchBlogs(pagination.current_page, filter, debouncedSearchTerm, selectedCategory);
        updateUrlParams(filter, debouncedSearchTerm, selectedCategory, pagination.current_page);
    }, [filter, debouncedSearchTerm, selectedCategory, pagination.current_page, updateUrlParams]);


    const fetchBlogs = async (page, filterType, searchQuery, categorySlug) => {
        try {
            setLoading(true);

            let url = `http://127.0.0.1:8000/api/blogs?page=${page}`;

            if (filterType === "newest") {
                url += "&sort=-created_at";
            } else if (filterType === "oldest") {
                url += "&sort=created_at";
            }

            if (searchQuery) {
                url += `&search=${encodeURIComponent(searchQuery)}`;
            }

            if (categorySlug && categorySlug !== "all") {
                url += `&category=${encodeURIComponent(categorySlug)}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setBlogs(data.data || []);
            setPagination({
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                per_page: data.meta.per_page,
                total: data.meta.total,
                from: data.meta.from,
                to: data.meta.to
            });
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching blogs:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/categories');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCategories(data.data || []);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setPagination(prev => ({ ...prev, current_page: 1 }));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPagination(prev => ({ ...prev, current_page: 1 }));
    };

    const handleCategoryChange = (categorySlug) => {
        setSelectedCategory(categorySlug);
        setPagination(prev => ({ ...prev, current_page: 1 }));
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.last_page && page !== pagination.current_page) {
            setPagination(prev => ({ ...prev, current_page: page }));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const { current_page, last_page } = pagination;
        const maxVisiblePages = 5;

        let startPage = Math.max(1, current_page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(last_page, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        buttons.push(
            <button
                key="prev"
                className={`join-item btn ${current_page === 1 ? 'btn-disabled' : ''}`}
                onClick={() => handlePageChange(current_page - 1)}
                disabled={current_page === 1}
            >
                «
            </button>
        );

        if (startPage > 1) {
            buttons.push(
                <button
                    key={1}
                    className="join-item btn"
                    onClick={() => handlePageChange(1)}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                buttons.push(
                    <button key="ellipsis1" className="join-item btn btn-disabled">
                        ...
                    </button>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`join-item btn ${i === current_page ? 'btn-active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        if (endPage < last_page) {
            if (endPage < last_page - 1) {
                buttons.push(
                    <button key="ellipsis2" className="join-item btn btn-disabled">
                        ...
                    </button>
                );
            }
            buttons.push(
                <button
                    key={last_page}
                    className="join-item btn"
                    onClick={() => handlePageChange(last_page)}
                >
                    {last_page}
                </button>
            );
        }

        buttons.push(
            <button
                key="next"
                className={`join-item btn ${current_page === last_page ? 'btn-disabled' : ''}`}
                onClick={() => handlePageChange(current_page + 1)}
                disabled={current_page === last_page}
            >
                »
            </button>
        );

        return buttons;
    };

    function renderFiltersAndSearchBar() {
        return (
            <div className="flex flex-col gap-4 sm:flex-col lg:flex-row items-center sm:justify-center lg:justify-between p-4">
                {/* Filter Buttons */}
                <div className="join flex flex-wrap justify-center gap-2">
                    <input
                        disabled={loading}
                        className="join-item btn"
                        type="radio"
                        name="filter"
                        aria-label="All"
                        checked={filter === "all"}
                        onChange={() => handleFilterChange("all")}
                    />
                    <input
                        disabled={loading}
                        className="join-item btn"
                        type="radio"
                        name="filter"
                        aria-label="Newest"
                        checked={filter === "newest"}
                        onChange={() => handleFilterChange("newest")}
                    />
                    <input
                        disabled={loading}
                        className="join-item btn"
                        type="radio"
                        name="filter"
                        aria-label="Oldest"
                        checked={filter === "oldest"}
                        onChange={() => handleFilterChange("oldest")}
                    />
                </div>

                {/* Search Input */}
                <label className="input input-bordered flex items-center gap-2 w-full max-w-sm">
                    <svg
                        className="h-5 w-5 opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        disabled={loading}
                        type="search"
                        className="grow"
                        placeholder="Search by title, content, or URL"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd>
                </label>
            </div>
        );
    }

    function renderCategoriesFilters() {
        return (
            <div className="filter space-y-1 overflow-x-auto flex flex-nowrap">
                <input
                    className="btn btn-sm filter-reset btn-soft btn-error"
                    type="radio"
                    name="category-filter"
                    aria-label="All"
                    checked={selectedCategory === "all"}
                    onChange={() => handleCategoryChange("all")}
                />
                {categories.map((category) => (

                    <input
                        key={category.slug}
                        className="btn btn-sm"
                        type="radio"
                        name="category-filter"
                        aria-label={category.name}
                        checked={selectedCategory === category.slug}
                        onChange={() => handleCategoryChange(category.slug)}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 p-5 pt-5">
            {/* Filters and Search Bar - Always visible */}
            {renderFiltersAndSearchBar()}
            {renderCategoriesFilters()}
            {/* Error Message */}
            {error && (
                <div className="w-full">
                    <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Error: {error}</span>
                    </div>
                </div>
            )}

            {/* Blogs Grid or Loading Skeleton */}
            {loading ? (
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="card w-full bg-base-100 shadow-sm animate-pulse">
                                <div className="card-body">
                                    <div className="flex justify-between items-center">
                                        <div className="flex justify-start items-center space-x-3">
                                            <div className="avatar">
                                                <div className="w-8 rounded-full bg-base-300"></div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-4 bg-base-300 rounded w-20"></div>
                                                <div className="h-3 bg-base-300 rounded w-24"></div>
                                            </div>
                                        </div>
                                        <div className="h-6 w-6 bg-base-300 rounded"></div>
                                    </div>
                                    <div className="divider my-[-3px]"></div>
                                    <div className="h-6 bg-base-300 rounded w-32"></div>
                                    <div className="h-4 bg-base-300 rounded w-full"></div>
                                    <div className="h-4 bg-base-300 rounded w-3/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <Card
                                key={blog.slug}
                                blog={blog}
                                onCategoryClick={handleCategoryChange} // Make sure this prop is passed!
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p className="text-base-content/60 text-lg">No blogs available</p>
                        </div>
                    )}
                </div>
            )}


            {/* Pagination */}
            {pagination.last_page > 1 && (
                <div className="flex flex-col items-center space-y-4">
                    {/* Pagination Info */}
                    <div className="text-sm text-base-content/60">
                        Showing {pagination.from || 0} to {pagination.to || 0} of {pagination.total} results
                    </div>

                    {/* Pagination Controls */}
                    <div className="join">
                        {renderPaginationButtons()}
                    </div>
                </div>
            )}
        </div>
    );
}
