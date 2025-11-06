import React from 'react';
import PropTypes from 'prop-types';

const WebAnalyticsPage = ({
    analyticsData=[],
    totalItems,
    currentPage,
    itemsPerPage,
    onViewAll,
    onPrevious,
    onNext,
    onAddNewUrl,
    onRefresh,
    onViewClick, 
    onCodeClick, 
    onDeleteClick, 
}) => {
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

    const ChartBarIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
    );

    const CodeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.316 3.051A1 1 0 0113 2v2.483a1 1 0 01-1.447.894L7.004 7.726a1 1 0 00-.553.894V12.08c0 .416.324.757.74.832l4.473 1.094a1 1 0 01.553.894V18a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2.483a1 1 0 011.447-.894l5.55-4.243a1 1 0 00.553-.894V7.92c0-.416-.324-.757-.74-.832L9 6h-.003zM5.553 4.274A1 1 0 016 3v2.483a1 1 0 01-1.447.894L.553 7.726A1 1 0 000 8.62V12.08c0 .416.324.757.74.832l4.473 1.094a1 1 0 01.553.894V18a1 1 0 01-1 1H3a1 1 0 01-1-1v-2.483a1 1 0 011.447-.894L9 11.274A1 1 0 009.553 10.38V6.92c0-.416-.324-.757-.74-.832L4.5 5h-.003z" clipRule="evenodd" />
        </svg>
    );

    const TrashIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
        </svg>
    );

    // --- Reusable Button Component ---
    const Button = ({ children, variant, icon: Icon, onClick, className = '' }) => {
        let baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2';

        if (variant === 'primary') {
            baseClasses += ' bg-blue-600 text-white hover:bg-blue-700';
        } else if (variant === 'secondary') {
            baseClasses += ' bg-gray-700 text-gray-100 border border-gray-600 hover:bg-gray-600';
        } else if (variant === 'pagination') {
            baseClasses += ' bg-gray-700 text-gray-100 hover:bg-gray-600';
        } else if (variant === 'icon-action') {
            baseClasses = 'p-2 rounded-md hover:bg-gray-700 transition-colors duration-200'; // Smaller for icons
        }

        return (
            <button className={`${baseClasses} ${className}`} onClick={onClick}>
                {Icon && <Icon />}
                {children}
            </button>
        );
    };

    Button.propTypes = {
        children: PropTypes.node, // Children can be optional for icon-only buttons
        variant: PropTypes.oneOf(['primary', 'secondary', 'pagination', 'icon-action']),
        icon: PropTypes.elementType,
        onClick: PropTypes.func,
        className: PropTypes.string,
    };

    Button.defaultProps = {
        variant: 'secondary',
        onClick: () => {},
    };

    // --- Chat Widget Component ---
  

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="min-h-screen bg-[#0F172B] text-gray-100 p-8 font-sans">
            <div className="container mx-auto max-w-7xl">
                {/* --- Header Section --- */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">Web Analytics</h1>
                        <p className="text-sm text-gray-400 mt-1">Get detailed analytics for your URL's</p>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        <Button variant="primary" icon={PlusIcon} onClick={onAddNewUrl}>Add New Url</Button>
                        <Button variant="secondary" icon={RefreshIcon} onClick={onRefresh}>Refresh</Button>
                    </div>
                </header>

                {/* --- Table Container --- */}
                <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    {/* Table Header Row */}
                    <div className="flex flex-row gap-4 justify-between  px-6 py-4 bg-gray-700 text-gray-400 font-semibold text-xs uppercase tracking-wider">
                        <div>Sn</div>
                        <div>Name</div>
                        <div>Url</div>
                        <div>Total Visitors</div>
                        <div>View</div>
                        <div>Code</div>
                        <div>Created Date & Time</div>
                        <div>Actions</div>
                    </div>
                    {/* Table Body */}
                    {analyticsData.length > 0 ? (
                        analyticsData.map((item, index) => (
                            <div key={item.id} className="flex flex-row gap-4 justify-between px-6 py-4 border-t border-gray-700 text-sm items-center">
                                <div>{startItem + index}</div>
                                <div>{item.name}</div>
                                <div className="truncate"><a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{item.url}</a></div>
                                <div>{item.totalVisitors}</div>
                                <div>
                                    <Button variant="icon-action" icon={ChartBarIcon} onClick={() => onViewClick(item.id)} />
                                </div>
                                <div>
                                    <Button variant="icon-action" icon={CodeIcon} onClick={() => onCodeClick(item.id)} />
                                </div>
                                <div>{item.createdDateTime}</div>
                                <div>
                                    <Button variant="icon-action" icon={TrashIcon} onClick={() => onDeleteClick(item.id)} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-24 text-center text-gray-500 text-sm">
                            No web analytics data found.
                        </div>
                    )}
                </div>

                {/* --- Footer and Pagination --- */}
                
            </div>
            {/* --- Chat Widget --- */}
          
        </div>
    );
};

WebAnalyticsPage.propTypes = {
    analyticsData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            totalVisitors: PropTypes.number.isRequired,
            createdDateTime: PropTypes.string.isRequired,
        })
    ),
    totalItems: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onViewAll: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onAddNewUrl: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onViewClick: PropTypes.func.isRequired,
    onCodeClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

WebAnalyticsPage.defaultProps = {
    analyticsData: [],
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 5,
    onViewAll: () => console.log('View All clicked'),
    onPrevious: () => console.log('Previous clicked'),
    onNext: () => console.log('Next clicked'),
    onAddNewUrl: () => console.log('Add New URL clicked'),
    onRefresh: () => console.log('Refresh clicked'),
    onViewClick: (id) => console.log(`View clicked for ID: ${id}`),
    onCodeClick: (id) => console.log(`Code clicked for ID: ${id}`),
    onDeleteClick: (id) => console.log(`Delete clicked for ID: ${id}`),
};

export default WebAnalyticsPage;