import { useEffect, useState } from "react";
import { apiFunction } from "../api/ApiFunction";
import { getAllCampNames } from "../api/Apis";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const dropdownStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0.75rem center",
  backgroundSize: "1em 1em",
};

const DateRangePicker = ({
  dateRange,
  setDateRange,
  customRequired = false,
}) => {
  const [startDate, endDate] = dateRange;

  return (
    <div className="flex-grow max-w-xs min-w-s">
      <label className="block text-[10px] uppercase font-medium text-gray-400 mb-1">
        DATE RANGE {customRequired && <span className="text-red-500">*</span>}
      </label>

      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => setDateRange(update)}
        isClearable
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/MM/yyyy to dd/MM/yyyy"
        className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
      />
    </div>
  );
};

const CampaignDropdown = ({ campId, setCampId, campaigns }) => {
  return (
    <div className="flex-grow max-w-xs">
      <label className="block text-[10px] uppercase font-medium text-gray-400 mb-1">
        CAMPAIGN <span className="text-red-500">*</span>
      </label>

      <div className="relative">
        <select
          id="campaign"
          value={campId || ""} // controlled component
          onChange={(e) => setCampId(e.target.value)} // update parent
          className="w-full text-sm py-2 px-3 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white appearance-none pr-8"
          style={dropdownStyle}
        >
          <option value="" disabled>
            Choose...
          </option>

          {campaigns.map((camp) => (
            <option key={camp.uid} value={camp.uid}>
              {camp?.campaign_info?.campaignName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const Clicklogs = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [campaigns, setCampaigns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [campId, setCampId] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await apiFunction("get", getAllCampNames, null, null);
        setCampaigns(res?.data?.data || []); // store campaigns
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      }
    };

    fetchCampaigns();
  }, []);

  //   FETCHING TABLE CONTENT
  const fetchData = async () => {
    const [start, end] = dateRange;

    if (!start || !end) {
      alert("Please select a date range");
      return;
    }

    const startDate = start.toISOString().split("T")[0]; // "2025-11-09"
    const endDate = end.toISOString().split("T")[0]; // "2025-11-13"

    console.log(startDate, endDate, campId);

    setLoading(true);

    try {
      const payload = {
        startDate: start.toISOString().split("T")[0],
        endDate: end.toISOString().split("T")[0],
      };

      const res = await apiFunction(
        "get",
        `http://localhost:2000/api/v2/campaign/clicksbycamp?startdate=${startDate}&&enddate=${endDate}&&campId=${campId}`,
        null,
        null
      );
      console.log(res.data);

      setTableData(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-white">campaigns</h1>

      <div className="flex flex-row border border-rounded p-5 m-5">
        <DateRangePicker
          dateRange={dateRange}
          setDateRange={setDateRange}
          customRequired={false}
        />

        <CampaignDropdown
          campId={campId}
          setCampId={setCampId}
          campaigns={campaigns}
        />

        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 py-2 rounded h-[40px] mt-5"
        >
          Search
        </button>
      </div>

      <div className="p-5">
        <div className="mt-8 overflow-x-auto bg-gray-800 rounded-lg shadow-xl M-5">
        {/* Outer container with flex to separate header and body */}
        <div className="flex flex-col">
          {/* Sticky Table Header */}

          {/* Scrollable Table Body Container */}
          <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
            <table className="min-w-full divide-y divide-gray-700 table-fixed">
              <thead className="bg-gray-800 sticky top-0 z-7">
                <tr>
                  {/* NOTE: px-6 padding और width/min-width properties का उपयोग अलाइनमेंट को ठीक करने के लिए किया गया है */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-16">
                    S No. <span className="text-red-500">*</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-100">
                    Date&Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Result
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-32">
                    Log
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-24">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    IP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider min-w-30">
                    IP Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    PROXY
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider ">
                    ISP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider ">
                    ASN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider min-w-48">
                    REFERRER
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider min-w-48">
                    USER-AGENT
                  </th>
                </tr>
              </thead>
              {/* </table>{" "}
            {/* Max-height सेट किया गया है */}
              {/* <table className="min-w-full divide-y divide-gray-800 table-fixed">  */}
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {loading ? (
                  <p className="text-white">Loading...</p>
                ) : (
                  tableData.map((item, index) => (
                    <tr key={item.cid}>
                      {/* NOTE: हेडर के साथ अलाइन करने के लिए cell properties को दोहराएँ */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 w-16">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 min-w-40">
                        {new Date(item.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-left text-gray-300">
                        safe
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 w-32">
                        icons
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 w-24">
                        {item.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-left text-gray-300">
                        {item.ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-300">
                        {item.risk}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 ">
                        {item.proxy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-left text-gray-300">
                        {item.isp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-left text-gray-300">
                        {item.asn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-left text-gray-300 min-w-48">
                        {item.referrer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-left text-gray-300 min-w-48">
                        {item.user_agent}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination (Unchanged) */}
        <div className="flex items-center justify-center pt-4 pb-4 bg-gray-800 rounded-b-lg">
          <button className="h-8 w-8 text-gray-600 hover:text-white">
            &lt;
          </button>
          <button className="h-8 w-8 mx-1 bg-blue-600 text-white rounded-full text-sm">
            1
          </button>
          <button className="h-8 w-8 mx-1 text-gray-400 hover:text-white text-sm">
            2
          </button>
          <button className="h-8 w-8 text-gray-600 hover:text-white">
            &gt;
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Clicklogs;
