import React, { useState, useRef } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const searchTimeout = useRef(null);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        // Clear previous timeout
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        // Debounce search to avoid too many API calls
        searchTimeout.current = setTimeout(() => {
            onSearch(value);
        }, 300);
    };

    const handleClear = () => {
        setSearchQuery('');
        onSearch('');
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
    };

    return (
        <div className="relative w-full">
            <div className='relative flex items-center transition-all duration-200'>
                {/* Search Icon */}
                <div className="absolute left-4 z-10">
                    <svg
                        className='w-5 h-5 transition-colors duration-200 text-off-blue-200'
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Search Input */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-12 py-3.5 bg-dark-blue-900 text-off-blue-200 rounded-2xl 
                             border border-dark-blue-900 font-semibold focus:outline-none  
                             placeholder-mid-blue-700 text-sm md:text-base
                             transition-all duration-200"
                    aria-label="Search people"
                />

                {/* Clear Button */}
                {searchQuery && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 z-10 p-1 rounded-full 
                                 transition-colors duration-200"
                        aria-label="Clear search"
                    >
                        <svg
                            className="w-4 h-4 text-off-blue-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {/* Responsive styling for different screen sizes */}
            <style jsx>{`
                @media (max-width: 640px) {
                    input {
                        font-size: 14px;
                        padding-top: 12px;
                        padding-bottom: 12px;
                    }
                }
                
                @media (min-width: 641px) and (max-width: 768px) {
                    input {
                        padding-top: 14px;
                        padding-bottom: 14px;
                    }
                }
            `}</style>
        </div>
    );
};

export default SearchBar;