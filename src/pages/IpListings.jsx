import React from 'react';
import PropTypes from 'prop-types';

const BlacklistedIPsPage = ({
    ips=[],
    totalItems,
    currentPage,
    itemsPerPage,
    onViewAll,
    onPrevious,
    onNext,
    onAddIp,
    onRefresh
}) => {
    // --- Icons (using SVG for high-quality rendering with Tailwind) ---
    const PlusIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
    );

    const RefreshIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0116 0V3a1 1 0 11-2 0v2.101A5.002 5.002 0 005.101 7H5a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V8a3 3 0 013-3h.101A7.002 7.002 0 014 2zM12 2a1 1 0 00-1 1v2.101a7.002 7.002 0 00-16 0V3a1 1 0 102 0v2.101A5.002 5.002 0 0114.899 7H15a1 1 0 101-1V4a3 3 0 00-3-3h-.101z" clipRule="evenodd" />
        </svg>
    );

    const ChatIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.564 12.832 2 11.411 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
    );

    // --- Reusable Button Component ---
    const Button = ({ children, variant, icon: Icon, onClick }) => {
        let classes = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2';

        if (variant === 'primary') {
            classes += ' bg-blue-600 text-white hover:bg-blue-700';
        } else if (variant === 'secondary') {
            classes += ' bg-gray-700 text-gray-100 border border-gray-600 hover:bg-gray-600';
        } else if (variant === 'pagination') {
            classes += ' bg-gray-700 text-gray-100 hover:bg-gray-600';
        }

        return (
            <button className={classes} onClick={onClick}>
                {Icon && <Icon />}
                {children}
            </button>
        );
    };

    Button.propTypes = {
        children: PropTypes.node.isRequired,
        variant: PropTypes.oneOf(['primary', 'secondary', 'pagination']),
        icon: PropTypes.elementType,
        onClick: PropTypes.func,
    };

    Button.defaultProps = {
        variant: 'secondary',
        onClick: () => {},
    };

    // --- Chat Widget Component ---
    const ChatWidget = () => (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col items-center bg-red-600 text-white py-4 px-1 rounded-l-lg shadow-lg z-50">
            <div className="[writing-mode:vertical-lr] [transform:rotate(180deg)] whitespace-nowrap mb-4 text-sm font-medium">
                Chat with us
            </div>
            <div className="bg-black bg-opacity-20 p-2 rounded-full flex items-center justify-center cursor-pointer">
                <ChatIcon />
            </div>
        </div>
    );

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="min-h-screen bg-[#0F172B  ] text-gray-100 p-8 font-sans">
            <div className="container mx-auto max-w-7xl">
                {/* --- Header Section --- */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">Blacklisted IPs</h1>
                        <p className="text-sm text-gray-400 mt-1">Add or Remove Blacklisted IPs</p>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        <Button variant="primary" icon={PlusIcon} onClick={onAddIp}>Add New Ip</Button>
                        <Button variant="secondary" icon={RefreshIcon} onClick={onRefresh}>Refresh</Button>
                    </div>
                </header>

                {/* --- Table Container --- */}
                <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    {/* Table Header Row */}
                    <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-700 text-gray-400 font-semibold text-xs uppercase tracking-wider">
                        <div className="col-span-1">Sn</div>
                        <div className="col-span-1">IP</div>
                        <div className="col-span-1">Added on</div>
                        <div className="col-span-1">Actions</div>
                    </div>
                    {/* Table Body (Empty as per the image) */}
                    {ips.length === 0 && (
                        <div className="py-24 text-center text-gray-500 text-sm">
                            No IP addresses found.
                        </div>
                    )}
                </div>

                {/* --- Footer and Pagination --- */}
                <footer className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400 gap-4">
                    <span className="order-2 md:order-1">
                        {startItem} to {endItem} Items of {totalItems} &mdash; <a href="#" onClick={onViewAll} className="text-blue-600 hover:underline">View all</a>
                    </span>
                    <div className="flex gap-2 order-1 md:order-2">
                        <Button variant="pagination" onClick={onPrevious}>Previous</Button>
                        <Button variant="pagination" onClick={onNext}>Next</Button>
                    </div>
                </footer>
            </div>
            {/* --- Chat Widget --- */}
           
        </div>
    );
};

BlacklistedIPsPage.propTypes = {
    ips: PropTypes.arrayOf(
        PropTypes.shape({
            sn: PropTypes.number.isRequired,
            ip: PropTypes.string.isRequired,
            addedOn: PropTypes.string.isRequired,
            actions: PropTypes.node,
        })
    ),
    totalItems: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onViewAll: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onAddIp: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
};

BlacklistedIPsPage.defaultProps = {
    ips: [],
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 5,
    onViewAll: () => {},
    onPrevious: () => {},
    onNext: () => {},
    onAddIp: () => {},
    onRefresh: () => {},
};

export default BlacklistedIPsPage;