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

const DateRangePicker = ({ customRequired = false }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="flex-grow max-w-xs min-w-s">
      <label
        className="block text-[10px] uppercase font-medium text-gray-400 mb-1"
      >
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

const CampaignDropdown = ({ campaigns }) => {
  return (
    <div className="flex-grow max-w-xs">
      <label className="block text-[10px] uppercase font-medium text-gray-400 mb-1">
        CAMPAIGN <span className="text-red-500">*</span>
      </label>

      <div className="relative">
        <select
          id="campaign"
          defaultValue=""
          className="w-full text-sm py-2 px-3 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white appearance-none pr-8"
          style={dropdownStyle}
        >
          <option value="" disabled>Choose...</option>

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
  const [campaigns, setCampaigns] = useState([]);
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

  return (
    <>
      <h1 className="text-white">campaigns</h1>

      <div className="flex flex-row border border-rounded p-5 m-5">
       <DateRangePicker customRequired={false} />

      <CampaignDropdown campaigns={campaigns} />

      </div>
    </>
  );
};

export default Clicklogs;
