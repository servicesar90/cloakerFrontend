import React from "react";
import PropTypes from "prop-types";

const WebAnalyticsPage = ({
  analyticsData = [],
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
  // --- Icons ---
  const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  );

  const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4 4a8 8 0 1111.31 6.9l1.39 1.39a1 1 0 01-1.42 1.42l-2.83-2.83A1 1 0 0113 9h3a6 6 0 10-6 6v-2a1 1 0 012 0v3a1 1 0 01-1 1H8a8 8 0 01-4-13z"
        clipRule="evenodd"
      />
    </svg>
  );

  const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </svg>
  );

  const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414L13.414 10l-4.707 4.707a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z"
        clipRule="evenodd"
      />
    </svg>
  );

  // --- Reusable Button Component ---
  const Button = ({ children, variant, icon: Icon, onClick, className = "" }) => {
    let baseClasses =
      "px-4 py-2 rounded-xl font-medium transition-all duration-200 inline-flex items-center gap-2 focus:outline-none";

    if (variant === "primary") {
      baseClasses += " bg-blue-600 hover:bg-blue-700 text-white shadow-md";
    } else if (variant === "secondary") {
      baseClasses += " bg-gray-700 text-gray-100 hover:bg-gray-600 border border-gray-600";
    } else if (variant === "pagination") {
      baseClasses += " bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700";
    } else if (variant === "icon") {
      baseClasses = "p-2 rounded-lg bg-transparent hover:bg-[#25344E] transition-all duration-200";
    }

    return (
      <button className={`${baseClasses} ${className}`} onClick={onClick}>
        {Icon && <Icon />}
        {children}
      </button>
    );
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400 }} className="min-h-screen bg-[#0F172B] text-gray-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Web Analytics</h1>
            <p className="text-sm text-gray-400 mt-2">
              Track your URLs and monitor real-time visitor data
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" icon={PlusIcon} onClick={onAddNewUrl}>
              Add New URL
            </Button>
            <Button variant="secondary" icon={RefreshIcon} onClick={onRefresh}>
              Refresh
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#1E293B] rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          <div className="grid grid-cols-8 gap-4 px-6 py-4 bg-[#2B3B58] text-gray-300 text-xs font-semibold uppercase tracking-wider">
            <div>SN</div>
            <div>Name</div>
            <div>URL</div>
            <div>Total Visitors</div>
            <div>View</div>
            <div>Code</div>
            <div>Created</div>
            <div>Actions</div>
          </div>

          {analyticsData.length === 0 ? (
            <div className="py-20 text-center text-gray-500 text-sm border-t border-gray-700">
              No analytics data found.
            </div>
          ) : (
            analyticsData.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-8 gap-4 px-6 py-3 text-sm text-gray-200 border-t border-gray-700 hover:bg-[#25344E] transition-colors"
              >
                <div>{startItem + index}</div>
                <div>{item.name}</div>
                <div className="truncate">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {item.url}
                  </a>
                </div>
                <div>{item.totalVisitors}</div>
                <div>
                  <Button variant="icon" icon={ChartBarIcon} onClick={() => onViewClick(item.id)} />
                </div>
                <div>
                  <Button variant="icon" icon={CodeIcon} onClick={() => onCodeClick(item.id)} />
                </div>
                <div>{item.createdDateTime}</div>
                <div>
                  <Button variant="icon" icon={TrashIcon} onClick={() => onDeleteClick(item.id)} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400 gap-4">
          <span>
            {startItem}–{endItem} of {totalItems} items —{" "}
            <button onClick={onViewAll} className="text-blue-500 hover:underline">
              View all
            </button>
          </span>

          <div className="flex gap-2">
            <Button variant="pagination" onClick={onPrevious}>
              Previous
            </Button>
            <Button variant="pagination" onClick={onNext}>
              Next
            </Button>
          </div>
        </div>
      </div>
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

export default WebAnalyticsPage;
