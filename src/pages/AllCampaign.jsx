import React, { useState, useEffect, useCallback, useRef } from "react";
import { createCampaignApi, getAllCampaign, ipClicks } from "../api/Apis";
import { apiFunction, createApiFunction } from "../api/ApiFunction";
import { useNavigate } from "react-router-dom";
import { showInfoToast } from "../components/toast/toast";

// Note: TABS definition is kept here for reference
const TABS = [
  { name: "All", count: 1 },
  { name: "Active", count: 1 },
  { name: "Allow All", count: 0 },
  { name: "Block All", count: 0 },
];

function AllCampaignsDashboard() {
  // --- Existing State ---
  const [activeStatusTab, setActiveStatusTab] = useState("All");
  const [dateRange, setDateRange] = useState("d/m/y to d/m/y");
  const [searchTerm, setSearchTerm] = useState("");
  const [chartData, setChartData] = useState([]);

  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
   const [loading, setLoading] = useState(true);
   const [clickSummary, setClickSummary] = useState({
      totalClicks: 0,
      safeClicks: 0,
      moneyClicks: 0,
    });

  // ⭐ NEW STATE for Dropdown
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // ⭐ useRef for Click Outside logic
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // --- API Fetch Function (Unchanged, except for the console.log) ---
  const fetchCampaigns = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiFunction("get", getAllCampaign, null, null);
      console.log(response.data);

      // Assume total items is available in response.data.total or we use array length
      const dataRows = response.data.data || [];

      setCampaigns(dataRows);
      setTotalItems(response.data.total || dataRows.length);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to load campaign data.";
      setError(errorMessage); // Updated to show actual error if available
      setIsLoading(false);
      setCampaigns([]);
      setTotalItems(0);
    }
  }, []);


    const fetchIpClicks = async () => {
      try {
        setLoading(true);
  
        const res = await apiFunction("get", ipClicks);
        const rawData = res?.data?.data || [];
  
        const formattedData = rawData.map((item) => ({
          date: new Date(item.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          }),
          Safe: Number(item.total_s_clicks || 0),
          Money: Number(item.total_m_clicks || 0),
          Total: Number(item.total_t_clicks || 0),
        }));
  
        setChartData(formattedData);
  
        const totals = rawData.reduce(
          (acc, item) => {
            acc.totalClicks += Number(item.total_t_clicks || 0);
            acc.safeClicks += Number(item.total_s_clicks || 0);
            acc.moneyClicks += Number(item.total_m_clicks || 0);
            return acc;
          },
          { totalClicks: 0, safeClicks: 0, moneyClicks: 0 }
        );
  
        setClickSummary(totals);
      } catch (err) {
        console.error("IP Click API Error:", err);
        setChartData([]);
        setClickSummary({ totalClicks: 0, safeClicks: 0, moneyClicks: 0 });
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCampaigns();
    fetchIpClicks();
  }, [fetchCampaigns]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array means this runs once

  // --- NEW Handlers for Dropdown ---
  const handleActionClick = (campaignId) => {
    // ड्रॉपडाउन को टॉगल (toggle) करता है
    setOpenDropdownId(openDropdownId === campaignId ? null : campaignId);
  };

  const handleActionSelect = async (action, campaignId,row) => {
    setOpenDropdownId(null); // मेनू बंद करें
    switch (action) {
      case "edit":
        alert(`Editing campaign ID: ${campaignId}`);
        navigate("/Dashboard/create-campaign", {
          state: {
            mode: "edit",
            data: row, // campaign data from db
          },
        });
        // TODO: Navigate to Edit screen or open a modal
        break;
      case "duplicate":
        alert(`Duplicating campaign ID: ${campaignId}`);
        // TODO: Call API to duplicate campaign
        break;
      case "delete":
        if (
          window.confirm(
            `Are you sure you want to delete campaign ID: ${campaignId}?`
          )
        ) {
          // TODO: Call API to delete campaign and then fetchCampaigns() to refresh
          const res = await apiFunction(
            "delete",
            createCampaignApi,
            campaignId,
            null
          );
          if (res) return alert(`Deleting campaign ID: ${campaignId}`);
        }
        break;
      default:
        break;
    }
  };

  // --- Existing Handlers ---
  const handleRefresh = () => {
    alert("Refreshing campaign list...");
    fetchCampaigns();
  };

  const handleApplyFilter = () => {
    alert(
      `Applying filter: Search='${searchTerm}', Date='${dateRange}'. Refetching data...`
    );
  };

  const handleStatusTabChange = (tab) => setActiveStatusTab(tab);
  const handleAddNewCampaign = () => {
   

    showInfoToast("Redirecting to Creating New Campaign");
    navigate("/Dashboard/create-campaign");
  };

  // --- Render Functions ---

  const renderStatusTabs = () => (
    // ... (Status Tabs rendering logic - Unchanged)
    <div className="flex space-x-6 text-sm">
      {TABS.map((tab) => (
        <button
          key={tab.name}
          onClick={() => handleStatusTabChange(tab.name)}
          className={`font-medium py-1 transition duration-150 ${
            activeStatusTab === tab.name
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          {tab.name} ({tab.count})
        </button>
      ))}
    </div>
  );

  // ⭐ NEW Render Function: Action Dropdown Menu
  const renderActionDropdown = (campaignId,row) => (
    // ref को सीधे dropdownRef के बजाय किसी wrapper div को दें ताकि click outside काम करे
    <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-20">
      <div className="py-1">
        <button
          onClick={() => handleActionSelect("edit", campaignId,row)}
          className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white transition duration-100"
        >
          Edit Campaign
        </button>
        <button
          onClick={() => handleActionSelect("duplicate", campaignId,null)}
          className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white transition duration-100"
        >
          Duplicate Campaign
        </button>
        <button
          onClick={() => handleActionSelect("delete", campaignId,null)}
          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600 hover:text-red-300 transition duration-100"
        >
          Delete Campaign
        </button>
      </div>
    </div>
  );

    const renderTableContent = () => {
    // ... (Loading/Error/Empty Data checks)
    if (isLoading) {
      /* ... loading JSX ... */ return (
        <tr>
          <td colSpan="10" className="text-center py-10 text-blue-400 text-xl">
            <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent rounded-full"></div>
            <p className="mt-4">Loading Campaigns...</p>
          </td>
        </tr>
      );
    }
    if (error) {
      /* ... error JSX ... */ return (
        <tr>
          <td colSpan="10" className="text-center py-10 text-gray-400">
            No campaigns found.
          </td>
        </tr>
      );
    }
    if (campaigns.length === 0) {
      /* ... empty JSX ... */ return (
        <span className="flex justify-center items-center">
          <div className=" py-10 text-gray-500 text-md">
            No campaigns found.
          </div>
        </span>
      );
    }

    // --- Actual Table Body Rendering ---
    return (
      <tbody className="bg-gray-900 divide-y divide-gray-800">
        {campaigns.map((item, index) => {
          const campaignId = item.campaign_info?.campaign_id || index;
          const isDropdownOpen = openDropdownId === item?.uid;
          console.log(openDropdownId, campaignId);

          return (
            <tr key={campaignId}>
              <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300 text-left w-12">
                {index + 1}
              </td>
              <td className="px-3 py-3 whitespace-nowrap text-sm text-blue-400 text-left hover:text-blue-300 cursor-pointer w-40">
                {item.campaign_info?.campaignName || "Not Provided"}
              </td>
              <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300 text-left w-24">
                {item.campaign_info?.trafficSource || "Not Provided"}
              </td>
              <td className="px-3 py-3 whitespace-nowrap text-sm text-left w-24">
                <span
                  className={`font-semibold ${
                    item.status === "Active"
                      ? "text-green-500"
                      : item.status === "Block"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {item.status || "Active"}
                </span>
              </td>
              <td className="px-3 py-3 whitespace-nowrap text-sm text-center w-32">
                {item.integration ? (
                  <div className="relative group flex justify-center">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    {/* ⭐ Tooltip container */}
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-gray-200 text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap z-50">
                      {item.integrationUrl || "No URL Found"}
                    </div>
                  </div>
                ) : (
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </td>

              <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300 text-left w-20">
                {clickSummary.totalClicks || "No Clicks"}
              </td>
              <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300 text-left w-16">
  <div className="flex items-center space-x-1 relative group">

    {/* i Icon */}
    <svg
      className="h-4 w-4 text-blue-400 cursor-pointer"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
    </svg>

    {/* Value */}
    <span>{clickSummary?.safeClicks || 0}</span>

    {/* Tooltip */}
    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block 
        bg-gray-800 text-gray-200 text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap z-50">
      {item?.safe_page || "No URL Found"}
    </div>
  </div>
</td>

              <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300 text-left w-20">
  <div className="flex items-center space-x-1 relative group">

    {/* i Icon */}
    <svg
      className="h-4 w-4 text-blue-400 cursor-pointer"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
    </svg>

    {/* Value */}
    <span>{clickSummary?.moneyClicks || 0}</span>

    {/* Tooltip */}
    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block 
        bg-gray-800 text-gray-200 text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap z-50">
      {item?.money_page[0]?.url || "No URL Found"}
    </div>
  </div>
</td>

              <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300 text-left w-48">
                {new Date(item.date_time).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              {/* ⭐ UPDATED ACTION COLUMN */}
              <td
                ref={isDropdownOpen ? dropdownRef : null}
                className="px-3 py-3 whitespace-nowrap text-sm text-gray-400 w-20 text-left relative"
              >
                <button
                  onClick={() => handleActionClick(item?.uid)}
                  className={`text-2xl leading-none font-bold p-1 rounded-full cursor-pointer ${
                    isDropdownOpen
                      ? "bg-gray-600 text-white"
                      : "hover:bg-gray-700"
                  }`}
                >
                  ⋯ {/* Vertical three dots */}
                </button>
                {isDropdownOpen && renderActionDropdown(item?.uid, item)}
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header Section (Unchanged) */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">All Campaigns ({totalItems})</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleAddNewCampaign}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-sm shadow-lg transition duration-150 cursor-pointer"
          >
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Campaign
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md font-medium text-sm shadow-lg transition duration-150"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </header>

      <h2 className="text-lg text-gray-400 mb-4">
        Create/Edit/Delete Campaigns
      </h2>

      {/* Filter and Control Bar (Unchanged) */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-xl mb-6">
        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
          {renderStatusTabs()}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-grow max-w-sm">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="d/m/y to d/m/y"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="py-2 px-3 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm max-w-[200px]"
          />
          <button
            onClick={handleApplyFilter}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium cursor-pointer text-sm shadow-lg transition duration-150"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Campaign Table Container (Unchanged) */}
      <div className="mt-4 overflow-y-auto  ">
        <table className="min-w-full divide-y divide-gray-700 table-fixed">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-12">
                Sn <span className="text-sm">⇅</span>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-40">
                Campaign Name <span className="text-sm">⇅</span>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-24">
                Source <span className="text-sm">⇅</span>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-24">
                Status <span className="text-sm">⇅</span>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-32">
                Intergration <span className="text-sm">⇅</span>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-20">
                Clicks <span className="text-sm">⇅</span>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-16">
                Safe <span className="text-sm">⇅</span>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-20">
                Money <span className="text-sm">⇅</span>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-48">
                Created on <span className="text-sm">⇅</span>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-20">
                Action <span className="text-sm">...</span>
              </th>
            </tr>
          </thead>
          {/* Dynamic Table Body (Handles Loading/Error/Data) */}
          {renderTableContent()}
        </table>
      </div>

      {/* Pagination/Summary Section (Unchanged) */}
      {/* <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
        <div>
          {campaigns.length > 0
            ? `1 to ${campaigns.length} Items of ${totalItems}`
            : `0 Items of 0`}
          —{" "}
          <a href="#" className="text-blue-500 hover:text-blue-400">
            View all
          </a>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-sm transition duration-150">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-sm transition duration-150">
            Next
          </button>
        </div>
      </div> */}

      {/* Fixed Components */}
    </div>
  );
}

export default AllCampaignsDashboard;
