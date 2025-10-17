import React, { useState } from "react";
// In a real project, you would install and import react-hook-form
// npm install react-hook-form
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Delete } from "lucide-react";
import { createApiFunction } from "../api/ApiFunction";
import { createCampaignApi } from "../api/Apis";
import Tooltip from "@mui/material/Tooltip";

// --- ICONS ---
// We're using SVG placeholders for icons. In a real project, you'd use a library like lucide-react.
const ListChecks = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 17 2 2 4-4" />
    <path d="m3 7 2 2 4-4" />
    <path d="M13 6h8" />
    <path d="M13 12h8" />
    <path d="M13 18h8" />
  </svg>
);
const DollarSign = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const ShieldCheck = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const GitMerge = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <path d="M6 21V9a9 9 0 0 1 9 9" />
  </svg>
);
const Filter = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const Bot = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);
const Info = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);
const Play = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const Zap = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const CircleSlash = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="9" x2="15" y1="15" y2="9" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);
const CalendarDays = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);
const ChevronDown = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const MessageCircle = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const Plus = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);
const X = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
const FilterIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M18 18h-4" />
    <path d="M18 12h-4" />
    <path d="M18 15h-4" />
    <path d="M10 15h-4" />
    <path d="M10 12h-4" />
    <path d="M10 18h-4" />
  </svg>
);
const AutomationIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l-8 14h16l-8-14z" />
    <path d="M12 2v10" />
    <path d="M16 18h-8" />
    <path d="M18 18c0-2-2-4-4-4s-4 2-4 4h8z" />
    <path d="M12 18v4" />
  </svg>
);

// Custom Alert Modal Component
const CustomAlertModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl max-w-sm w-full border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4">Information</h3>
        <p className="text-slate-300 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const adPlatforms = [
  "Google Adwords",
  "Binge Ads",
  "Yahoo Gemini",
  "Taboola",
  "Facebook Adverts",
  "TikTok Ads",
  "50onRed",
  "ADAMO",
  "AdRoll",
  "AdSupply",
  "Adblade",
  "Adcash",
  "Admob",
  "Adnium",
  "Adsterra",
  "Advertise.com",
  "Airpush",
  "Amazon Ads",
  "Bidvertiser",
  "Blindclick",
  "CNET",
  "CPMOZ",
  "DNTX",
  "Dianomi",
  "DoublePimp",
  "Earnify",
  "EPOM Market",
  "Etrag.ru",
  "Exoclicks",
  "Flix Media",
  "Go2Mobi",
  "Gravity",
  "Gunggo Ads",
  "InMobi",
  "Instagram",
  "Juicy Ads",
  "Lead Impact",
  "LeadBolt",
  "LeadSense",
  "Ligatus",
  "Linkedin",
  "MGID",
  "MarketGid",
  "Media Traffic",
  "Millennial Media",
  "MoPub",
  "MobiAds",
  "NTENT",
  "Native Ads",
  "NewsCred",
  "Octobird",
  "OpenX",
  "Others",
  "Outbrain",
  "Pinterest Ads",
  "Plista",
  "Plugrush",
  "PocketMath",
  "PopAds",
  "PopCash",
  "PopMyAds",
  "Popwin",
  "Popunder.net",
  "PropelMedia",
  "Propeller Ads",
  "Qwaya Ads",
  "Rapsio",
  "RealGravity",
  "Redirect.com",
  "Recontent",
  "Revenue Hits",
  "Simple Reach",
  "Skyword",
  "SiteScout (Basis)",
  "StackAdapt",
  "StartApp",
  "SynupMedia",
  "TapSense",
  "Traffic Broker",
  "Target.my.com",
  "Traffic Factory",
  "Traffic Force",
  "Traffic Holder",
  "Traffic Junky",
  "Traffic Hunt",
  "Traflow",
  "Trellian",
  "Twitter",
  "Unity Ads",
  "Vk.com",
  "WebCollage",
  "Widget Media",
  "Yandex",
  "Zemanta",
  "ZeroPark",
  "MaxVisits",
  "Revisitors",
  "Snapchat Ads",
  "Organic Traffic",
  "Galaksion",
  "Traffic Stars",
  "Snackvideo"];

// Main component for the entire screen
const NewCampaignScreen = () => {
  const [moneyPages, setMoneyPages] = useState([
    { description: "", url: "", weight: 100 },
  ]);

  // const [conditions, setConditions] = useState([
  //   { type: "", operator: "", value: "" },
  // ]);

  const [step, setStep] = useState(1);
  const [appendUrl, setAppendUrl] = useState(false);
  const [dynamicVariables, setDynamicVariables] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [safePageUrl, setSafePageUrl] = useState("https://www.youtube.com");
  const [showInputs, setShowInputs] = useState({
    activateAfterX: false,
    frequencyCap: false,
    zeroRedirect: false,
    pageGuard: false,
  });

  const showCustomAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideCustomAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const [activeStatus, setActiveStatus] = useState("Active");

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    trigger,
    clearErrors,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      campaignName: null,
      comment: null,
      epc: null,
      cpc: null,
      trafficSource: null,
      money_page: [{ description: "", url: "", weight: "" }],
      safe_page: null,
      // conditions: [{ type: "", operator: "", value: "" }],
      conditions: [],
      filters: [],
      automate: {
        activateAfterX: { value: "" }, // first toggle
        frequencyCap: { value: "" }, // second toggle
        zeroRedirect: { curl: false, iframe: false }, // third toggle
        gclid: false, // fourth toggle
        ipCap: false, // fifth toggle
      },
      // Step 6 → Page guard
      page_guard: { key: "", url: "", second: "" },
      // Step 6 → HTTP code
      http_code: "301",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "conditions",
  });

  const selectedTypes = watch("conditions").map((c) => c.type);

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);

      const response = await createApiFunction(
        "post", // type
        createCampaignApi, // api url
        null, // params (id/slug agar ho toh)
        data // body data
      );

      console.log("API Response:", response.data);

      // agar successful ho toh aap redirect / toast kar sakte ho
      alert("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Something went wrong while creating campaign!");
    }
  };

  

  const fixedOptions = [
    { id: 1, label: "BUSINESS" },
    { id: 2, label: "GOVERNMENT" },
    { id: 3, label: "Wireless" },
    { id: 4, label: "ASN TS" },
    { id: 5, label: "BIPS" },
    { id: 6, label: "BOT" },
    { id: 7, label: "DATA CENTER" },
    { id: 8, label: "HRIP" },
    { id: 9, label: "ISP TS" },
    { id: 10, label: "LRIP" },
    { id: 11, label: "PROXY/VPN" },
    { id: 12, label: "TIME ZONE" },
    { id: 13, label: "TSIF" },
  ];

  const OPTIONS = [
    { value: "country", label: "Country" },
    { value: "state", label: "State" },
    { value: "zip", label: "Zip Code" },
    { value: "browser", label: "Browser" },
    { value: "Device", label: "Device" },
    { value: "ASN", label: "ASN" },
    { value: "referrer", label: "Referrer" },
    { value: "IP", label: "IP" },
    { value: "userAgent", label: "User Agent" },
    { value: "isp", label: "ISP" },
  ];

  const steps = [
    { id: 1, name: "Campaign info", icon: ListChecks, status: "current" },
    { id: 2, name: "Money Pages", icon: DollarSign, status: "upcoming" },
    { id: 3, name: "Safe Page", icon: ShieldCheck, status: "upcoming" },
    { id: 4, name: "Conditions", icon: GitMerge, status: "upcoming" },
    { id: 5, name: "Campaign Filters", icon: Filter, status: "upcoming" },
    { id: 6, name: "Automate", icon: Bot, status: "upcoming" },
  ];

  const statusOptions = [
    { name: "Active", icon: Play },
    { name: "Allow All", icon: Zap },
    { name: "Block All", icon: CircleSlash },
    { name: "Schedule", icon: CalendarDays },
  ];

  const addMoneyPage = () => {
    setMoneyPages([...moneyPages, { description: "", url: "", weight: 100 }]);
  };

  const removeMoneyPage = (index) => {
    const newMoneyPages = moneyPages.filter((_, i) => i !== index);
    setMoneyPages(newMoneyPages);
    // Also update react-hook-form values
    setValue("money_page", newMoneyPages);
  };

  const addDynamicVariable = () => {
    setDynamicVariables([...dynamicVariables, { name: "", value: "" }]);
  };

  const removeDynamicVariable = (index) => {
    const newDynamicVariables = dynamicVariables.filter((_, i) => i !== index);
    setDynamicVariables(newDynamicVariables);
  };

  const handleAddCondition = (type) => {
    append({
      type,
      mode: "allow",
      values: [],
    });
  };

  const handleNext = async () => {
    const fieldsToValidate = [
      "campaignName",
      "trafficSource",
      ...moneyPages.map((_, index) => `money_page.${index}.url`),
      "safe_page",
    ];

    const valid = await trigger(fieldsToValidate);

    if (valid) {
      nextStep();
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-slate-900 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold text-white">New Campaign</h1>

        {/*Main Heading of First Page */}
        <p className="mt-2 text-slate-400">
          Transform your traffic into a success story with our cutting-edge AI
          based Cloaking platform!
        </p>
        {/* Steps Line with Icon  */}
        <div className="mt-6">
          <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
              {steps.map((e, stepIdx) => (
                <li key={e.name} className="relative flex-1">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`flex h-10  w-10 items-center justify-center rounded-full ${
                        stepIdx + 1 <= step ? "bg-blue-600" : "bg-slate-700"
                      }`}
                      aria-current={stepIdx + 1 === step ? "step" : undefined}
                    >
                      <e.icon
                        className={`h-6 w-6 ${
                          stepIdx + 1 <= step ? "text-white" : "text-slate-400"
                        }`}
                      />
                    </div>
                    <div
                      className={`mt-2 text-sm font-medium ${
                        stepIdx + 1 <= step ? "text-white" : "text-slate-400"
                      }`}
                    >
                      {e.name}
                    </div>
                  </div>

                  {stepIdx !== steps.length - 1 && (
                    <div className="absolute top-5 left-1/2 w-full -translate-y-1/2 translate-x-5">
                      <div
                        className={`h-0.5 ${
                          stepIdx + 1 < step ? "bg-blue-600" : "bg-slate-700"
                        }`}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
          {step === 1 && (
            <>
              <div className="flex flex-col h-full bg-zinc-900 text-gray-100 p-8 rounded-2xl shadow-xl border border-zinc-800">
                {/* Form Content */}
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-12">
                  {/* Left Column: Main Inputs */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-200">
                      Campaign Details
                    </h2>
                    <InputField
                      label="Campaign Name"
                      name="campaignName"
                      register={register}
                      error={errors.campaignName}
                      tooltip="Enter Desired Campaign Name to identify it"
                      required
                      placeholder="Enter a unique name"
                    />
                    <InputField
                      label="Comment"
                      name="comment"
                      register={register}
                      error={errors.comment}
                      tooltip="Comment for this campaign"
                      placeholder="Add a brief description"
                    />
                    <SelectField
                      label="Traffic Source"
                      name="trafficSource"
                      register={register}
                      error={errors.trafficSource}
                      tooltip="Traffic Source from where you are getting traffic like (google ads, binge ads)"
                      required
                    />
                  </div>

                  {/* Right Column: Financial & Status */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-200">
                      Financials & Status
                    </h2>

                    <div className="grid grid-cols-2 gap-6">
                      <InputField
                        label="EPC (Earnings Per Click)"
                        name="epc"
                        register={register}
                        error={errors.epc}
                        placeholder="0.00"
                        type="number"
                        tooltip="Earning Per Click"
                        icon="$"
                      />
                      <InputField
                        label="CPC (Cost Per Click)"
                        name="cpc"
                        register={(name) =>
                          register(name, {
                            min: {
                              value: 0,
                              message: "CPC cannot be negative",
                            },
                          })
                        }
                        error={errors.cpc}
                        placeholder="0.00"
                        type="number"
                        tooltip="Cost Per Click"
                        icon="$"
                       
                        step="0.1"
                      />
                    </div>

                    <div className="bg-zinc-800 p-3 rounded-lg border border-zinc-700">
                      <label className="flex items-center text-sm font-medium text-gray-300 mb-4">
                        Campaign Status
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-2 py-2">
                        {statusOptions.map((option) => (
                          <StatusButton
                            key={option.name}
                            label={option.name}
                            Icon={option.icon}
                            isActive={activeStatus === option.name}
                            onClick={() => setActiveStatus(option.name)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Button */}
                <div className="flex justify-end mt-12">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200 flex items-center shadow-lg"
                  >
                    Proceed{" "}
                    <span className="ml-2 font-mono text-xl">&rarr;</span>
                  </button>
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="p-4 sm:p-6 md:p-8 bg-slate-900 text-white min-h-screen font-sans">
                <div className="max-w-7xl mx-auto">
                  {/* Append URL Section */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <label
                        htmlFor="append-url"
                        className="flex items-center text-sm font-medium text-slate-300"
                      >
                        Append Url
                        <Tooltip title="Add the parameters in moneypage URL">
                          <span className="cursor-pointer">
                            <Info className="w-3.5 h-3.5 ml-1.5 text-slate-500 cursor-pointer  " />
                          </span>
                        </Tooltip>
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          id="append-url"
                          className="sr-only peer"
                          checked={appendUrl}
                          onChange={() => setAppendUrl(!appendUrl)}
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    {appendUrl && (
                      <InputField
                        label="APPEND URL VALUE"
                        name="append_url"
                        register={register}
                        placeholder="Enter URL to append"
                        title="Enter the value for append to money page URL"
                        type="text"
                      />
                    )}
                  </div>

                  {/* Money Pages Section */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-white mb-4">
                      Where do we send legit visitors (money page)?
                    </h3>
                    {moneyPages.map((page, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end"
                      >
                        <InputField
                          label="Description"
                          name={`money_page.${index}.description`}
                          register={register}
                          placeholder="Enter description"
                          tooltip="Enter short name for URL which you can see in your reports"
                          defaultValue={page.description}
                        />
                        <InputField
                          label="Money Page Url"
                          name={`money_page.${index}.url`}
                          register={register}
                          error={errors.money_page?.[index]?.url}
                          tooltip="Money page you can send all real visistor. Apart from VPN, Proxies, Bots, Reviewe n more."
                          required
                          placeholder="https://www.google.com"
                          defaultValue={page.url}
                          pattern={{
                            value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                            message: "Enter a valid URL ",
                          }}
                        />

                        <InputField
                          label="WEIGHT"
                          name={`money_page.${index}.weight`}
                          register={register}
                          error={errors.money_page?.[index]?.weight}
                          placeholder="100"
                          type="number"
                          tooltip="Weight works on setting up priority for multiple money page."
                          defaultValue={page.weight}
                        />
                        <div className="flex justify-end md:justify-start">
                          {moneyPages.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeMoneyPage(index)}
                              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                          {index === moneyPages.length - 1 && (
                            <button
                              type="button"
                              onClick={addMoneyPage}
                              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                            >
                              <Plus className="w-5 h-5 mr-1" /> Add more
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Variables Section */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      Dynamic variables
                      <Tooltip title="Dynamic variables are used to track custom parameters of money page">
                        <span className="cursor-pointer">
                          {" "}
                          <Info className="w-3.5 h-3.5 ml-1.5 text-slate-500 cursor-pointer" />
                        </span>
                      </Tooltip>
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">
                      Define your dynamic variables. You can pass them to your
                      Money pages using [[variable name]] placeholder.
                    </p>
                    {dynamicVariables.map((variable, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end"
                      >
                        <InputField
                          label="VARIABLE NAME"
                          name={`money_variable.${index}.name`}
                          register={register}
                          placeholder="Enter variable name"
                          tooltip="Name of the variable to track"
                          defaultValue={variable.name}
                        />
                        <InputField
                          label="VARIABLE VALUE"
                          name={`money_variable.${index}.value`}
                          register={register}
                          placeholder="Enter variable value"
                          tooltip="value of the variable to track"
                          defaultValue={variable.value}
                        />
                        <div className="flex justify-end md:justify-start">
                          <button
                            type="button"
                            onClick={() => removeDynamicVariable(index)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addDynamicVariable}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                    >
                      <Plus className="w-5 h-5 mr-1" />
                      Add variables
                    </button>
                  </div>

                  <div className="mt-12 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep} // Go back to Campaign Info
                      className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center"
                    >
                      &lt; Previous
                    </button>
                    <button
                      onClick={handleNext}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center"
                    >
                      Next <span className="ml-2 font-mono">&gt;</span>
                    </button>
                  </div>
                </div>

                {/* Custom Alert Modal */}
                {showAlert && (
                  <CustomAlertModal
                    message={alertMessage}
                    onClose={hideCustomAlert}
                  />
                )}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="p-4 sm:p-6 md:p-8 bg-slate-900 text-white min-h-screen font-sans">
                <div className="max-w-7xl mx-auto">
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-white mb-4">
                      Where do we send human reviewers, bots, crawlers and spy
                      tools (safe page)?
                    </h3>
                    <InputField
                      label="Safe Page Url"
                      name="safe_page"
                      register={register}
                      error={errors.safe_page}
                      required
                      placeholder="https://www.youtube.com"
                      defaultValue={safePageUrl}
                      tooltip="Safe page where you wil redirect all bots, reviewers, and unwanted traffic"
                      pattern={{
                        value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                        message: "Enter a valid URL ",
                      }}
                    />
                  </div>

                  {/* Dynamic Variables Section (reused from MoneyPagesScreen) */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      Dynamic variables
                      <Tooltip title="Dynamic variables are used to track custom parameters of safe page.">
                        <span className="cursor-pointer">
                          {" "}
                          <Info className="w-3.5 h-3.5 ml-1.5 text-slate-500 cursor-pointer" />
                        </span>
                      </Tooltip>
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">
                      Define your dynamic variables. You can pass them to your
                      Safe pages using [variable name] placeholder.
                    </p>
                    {dynamicVariables.map((variable, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end"
                      >
                        <InputField
                          label="VARIABLE NAME"
                          name={`safe_page_variable.${index}.name`}
                          register={register}
                          placeholder="Enter variable name"
                          tooltip="Name of the variable to track"
                          defaultValue={variable.name}
                        />
                        <InputField
                          label="VARIABLE VALUE"
                          name={`safe_page_variable.${index}.value`}
                          register={register}
                          placeholder="Enter variable value"
                          v
                          tooltip="Value of the variable to track"
                          defaultValue={variable.value}
                        />
                        <div className="flex justify-end md:justify-start">
                          <button
                            type="button"
                            onClick={() => removeDynamicVariable(index)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addDynamicVariable}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                    >
                      <Plus className="w-5 h-5 mr-1" /> Add variables
                    </button>
                  </div>

                  <div className="mt-12 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep} // Go back to Money Pages
                      className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center"
                    >
                      &lt; Previous
                    </button>
                    <button
                      onClick={handleNext}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center"
                    >
                      Next <span className="ml-2 font-mono">&gt;</span>
                    </button>
                  </div>
                </div>

                {/* Custom Alert Modal */}
                {showAlert && (
                  <CustomAlertModal
                    message={alertMessage}
                    onClose={hideCustomAlert}
                  />
                )}
              </div>
            </>
          )}
          {step === 4 && (
            <>
              {/* Condition Selector */}
              <div className="flex items-center gap-3">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddCondition(e.target.value);
                      e.target.value = "";
                    }
                  }}
                  className="w-56 bg-gray-50 text-gray-900 text-sm px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">+ Add condition</option>
                  {OPTIONS.filter((o) => !selectedTypes.includes(o.value)).map(
                    (opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    )
                  )}
                </select>

                {fields.length > 0 && (
                  <button
                    type="button"
                    onClick={() => reset({ conditions: [] })}
                    className="text-sm text-gray-500 hover:text-red-600 transition"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Conditions List */}
              <div className="mt-6 space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
                  >
                    {/* Condition Header */}
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-gray-800">
                        {field.type.toUpperCase()}
                      </h4>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-xs text-gray-400 hover:text-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Allow / Block Toggle */}
                    <Controller
                      control={control}
                      name={`conditions.${index}.mode`}
                      render={({ field }) => (
                        <div className="flex gap-2 mb-4">
                          {["allow", "block"].map((mode) => (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => field.onChange(mode)}
                              className={`px-3 py-1.5 text-sm rounded-md border transition ${
                                field.value === mode
                                  ? mode === "allow"
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-red-600 text-white border-red-600"
                                  : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                              }`}
                            >
                              {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            </button>
                          ))}
                        </div>
                      )}
                    />

                    {/* Values Input */}
                    <Controller
                      control={control}
                      name={`conditions.${index}.values`}
                      render={({ field }) => (
                        <div>
                          {/* Chips */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {field.value.map((val, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center bg-gray-100 text-gray-800 px-2.5 py-1 text-xs rounded-full border border-gray-300"
                              >
                                {val}
                                <button
                                  type="button"
                                  onClick={() =>
                                    field.onChange(
                                      field.value.filter((_, idx) => idx !== i)
                                    )
                                  }
                                  className="ml-1 text-gray-400 hover:text-gray-600"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>

                          {/* Input */}
                          <input
                            type="text"
                            placeholder={`Enter ${field.type}...`}
                            className="w-full text-sm bg-gray-50 text-gray-900 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && e.target.value.trim()) {
                                e.preventDefault();
                                field.onChange([
                                  ...field.value,
                                  e.target.value.trim(),
                                ]);
                                e.target.value = "";
                              }
                            }}
                          />
                        </div>
                      )}
                    />
                  </div>
                ))}
              </div>

              {/* Prev / Next Buttons */}
              {fields.length > 0 && (
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-2 px-5 rounded-md border border-gray-300"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded-md shadow-sm"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
          {step === 5 && (
            <>
              <Controller
                name="filters"
                control={control}
                render={({ field }) => {
                  // 🟢 Local state step 5 ke andar
                  const [availableOptions, setAvailableOptions] =
                    React.useState(
                      fixedOptions.filter(
                        (opt) =>
                          !(field.value || []).some((sel) => sel.id === opt.id)
                      )
                    );
                  const [selectedOptions, setSelectedOptions] = React.useState(
                    field.value || []
                  );

                  // 🟢 Single / Multi select ke liye local state
                  const [selectedLeft, setSelectedLeft] = React.useState([]);
                  const [selectedRight, setSelectedRight] = React.useState([]);

                  // 👉 Functions
                  const moveRight = () => {
                    const moved = availableOptions.filter((o) =>
                      selectedLeft.includes(o.id.toString())
                    );
                    const updatedSelected = [...selectedOptions, ...moved];
                    setSelectedOptions(updatedSelected);
                    setAvailableOptions(
                      availableOptions.filter(
                        (o) => !selectedLeft.includes(o.id.toString())
                      )
                    );
                    setSelectedLeft([]);
                    setValue("filters", updatedSelected);
                  };

                  const moveLeft = () => {
                    const moved = selectedOptions.filter((o) =>
                      selectedRight.includes(o.id.toString())
                    );
                    const updatedAvailable = [...availableOptions, ...moved];
                    const updatedSelected = selectedOptions.filter(
                      (o) => !selectedRight.includes(o.id.toString())
                    );
                    setAvailableOptions(updatedAvailable);
                    setSelectedOptions(updatedSelected);
                    setSelectedRight([]);
                    setValue("filters", updatedSelected);
                  };

                  const moveAllRight = () => {
                    const updatedSelected = [
                      ...selectedOptions,
                      ...availableOptions,
                    ];
                    setSelectedOptions(updatedSelected);
                    setAvailableOptions([]);
                    setSelectedLeft([]);
                    setValue("filters", updatedSelected);
                  };

                  const moveAllLeft = () => {
                    const updatedAvailable = [
                      ...availableOptions,
                      ...selectedOptions,
                    ];
                    setAvailableOptions(updatedAvailable);
                    setSelectedOptions([]);
                    setSelectedRight([]);
                    setValue("filters", []);
                  };

                  return (
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      {/* Left Box */}
                      <select
                        multiple
                        size="8"
                        style={{ width: "200px" }}
                        value={selectedLeft}
                        onChange={(e) =>
                          setSelectedLeft(
                            Array.from(
                              e.target.selectedOptions,
                              (opt) => opt.value
                            )
                          )
                        }
                      >
                        {availableOptions.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.label}
                          </option>
                        ))}
                      </select>

                      {/* Middle Buttons */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <button type="button" onClick={moveRight}>
                          {">"}
                        </button>
                        <button type="button" onClick={moveLeft}>
                          {"<"}
                        </button>
                        <button type="button" onClick={moveAllRight}>
                          {">>"}
                        </button>
                        <button type="button" onClick={moveAllLeft}>
                          {"<<"}
                        </button>
                      </div>

                      {/* Right Box */}
                      <select
                        multiple
                        size="8"
                        style={{ width: "200px" }}
                        value={selectedRight}
                        onChange={(e) =>
                          setSelectedRight(
                            Array.from(
                              e.target.selectedOptions,
                              (opt) => opt.value
                            )
                          )
                        }
                      >
                        {selectedOptions.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                      <div className="mt-12 flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep} // Go back to Money Pages
                          className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center"
                        >
                          &lt; Previous
                        </button>
                        <button
                          // type='submit'
                          onClick={nextStep}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center"
                        >
                          Next <span className="ml-2 font-mono">&gt;</span>
                        </button>
                      </div>
                    </div>
                  );
                }}
              />
            </>
          )}
          {step === 6 && (
            <>
              <div className="p-4 sm:p-6 md:p-8 bg-slate-900 text-white min-h-screen font-sans">
                <div className="max-w-7xl mx-auto space-y-6">
                  {/* 1️⃣ Activate after X unique real visitors */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={showInputs.activateAfterX}
                        onChange={() =>
                          setShowInputs((prev) => ({
                            ...prev,
                            activateAfterX: !prev.activateAfterX,
                          }))
                        }
                      />
                      <span className="ml-2">
                        Activate after X unique real visitors
                      </span>
                    </label>
                    {showInputs.activateAfterX && (
                      <InputField
                        label="Enter value"
                        name="automate.activateAfterX.value"
                        register={register}
                        placeholder="Enter number of visitors"
                        type="number"
                      />
                    )}
                  </div>

                  {/* 2️⃣ Frequency Cap */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={showInputs.frequencyCap}
                        onChange={() =>
                          setShowInputs((prev) => ({
                            ...prev,
                            frequencyCap: !prev.frequencyCap,
                          }))
                        }
                      />
                      <span className="ml-2">Frequency Cap</span>
                    </label>
                    {showInputs.frequencyCap && (
                      <InputField
                        label="Enter value"
                        name="automate.frequencyCap.value"
                        register={register}
                        placeholder="Enter frequency value"
                        type="number"
                      />
                    )}
                  </div>

                  {/* 3️⃣ Zero Redirect Cloaking */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={showInputs.zeroRedirect}
                        onChange={() =>
                          setShowInputs((prev) => ({
                            ...prev,
                            zeroRedirect: !prev.zeroRedirect,
                          }))
                        }
                      />
                      <span className="ml-2">Zero Redirect Cloaking</span>
                    </label>
                    {showInputs.zeroRedirect && (
                      <div className="flex gap-4 mt-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={watch("automate.zeroRedirect.curl")}
                            onChange={(e) => {
                              setValue(
                                "automate.zeroRedirect.curl",
                                e.target.checked
                              );
                              if (e.target.checked)
                                setValue("automate.zeroRedirect.iframe", false);
                            }}
                          />
                          <span className="ml-2">CURL</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={watch("automate.zeroRedirect.iframe")}
                            onChange={(e) => {
                              setValue(
                                "automate.zeroRedirect.iframe",
                                e.target.checked
                              );
                              if (e.target.checked)
                                setValue("automate.zeroRedirect.curl", false);
                            }}
                          />
                          <span className="ml-2">IFRAME</span>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* 4️⃣ GCLID Toggle */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <label className="flex items-center">
                      <input type="checkbox" {...register("automate.gclid")} />
                      <span className="ml-2">
                        GCLID (Google Click ID parameter)
                      </span>
                    </label>
                  </div>

                  {/* 5️⃣ IP Cap Toggle */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <label className="flex items-center">
                      <input type="checkbox" {...register("automate.ipCap")} />
                      <span className="ml-2">IP Cap</span>
                    </label>
                  </div>

                  {/* 6️⃣ Page Guard Key */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={showInputs.pageGuard}
                        onChange={() =>
                          setShowInputs((prev) => ({
                            ...prev,
                            pageGuard: !prev.pageGuard,
                          }))
                        }
                      />
                      <span className="ml-2">Page Guard Key</span>
                    </label>
                    {showInputs.pageGuard && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        <InputField
                          label="Key"
                          name="page_guard.key"
                          register={register}
                          placeholder="Enter key"
                        />
                        <InputField
                          label="URL"
                          name="page_guard.url"
                          register={register}
                          error={errors.page_guard?.url}
                          placeholder="Enter URL"
                          pattern={{
                            value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                            message: "Enter a valid URL ",
                          }}
                        />
                        <InputField
                          label="Second"
                          name="page_guard.second"
                          register={register}
                          placeholder="Enter second field"
                        />
                      </div>
                    )}
                  </div>

                  {/* 7️⃣ HTTP Code Selector */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <label className="flex items-center mr-4">
                      <input
                        type="radio"
                        value="301"
                        {...register("http_code")}
                      />
                      <span className="ml-2">301</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="302"
                        {...register("http_code")}
                      />
                      <span className="ml-2">302</span>
                    </label>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-12 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg"
                    >
                      &lt; Previous
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
                    >
                      Next &gt;
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

// --- Reusable Form Components (Adapted for react-hook-form) ---

const InputField = ({
  label,
  name,
  register,
  error,
  required,
  placeholder,
  type = "text",
  icon,
  defaultValue,
  tooltip,
  pattern,
}) => (
  <div>
    <label className="flex items-center text-xs font-semibold text-slate-400 tracking-wider mb-2">
      {label} {required && <span className="text-red-500 ml-1">*</span>}
      {tooltip && (
        <Tooltip title={tooltip} placement="top-end">
          <span className="cursor-pointer">
            <Info className="w-3.5 h-3.5 ml-1.5 text-slate-500 cusror-pointer" />
          </span>
        </Tooltip>
      )}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full bg-slate-800 border text-sm rounded-lg py-1 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          icon ? "pl-8" : "px-4"
        } ${error ? "border-red-500" : "border-slate-700"}`}
        {...register(name, {
          required: required ? `${label} is required.` : false,
          pattern: pattern || undefined,
        })}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
  </div>
);

const SelectField = ({
  label,
  name,
  register,
  error,
  required,
  children,
  tooltip,
}) => (
  <div>
    <label className="flex items-center text-xs font-semibold text-slate-400 tracking-wider mb-2">
      {label} {required && <span className="text-red-500 ml-1">*</span>}
      {tooltip && (
        <Tooltip title={tooltip}>
          <span className="cursor-pointer">
            {" "}
            <Info className="w-3.5 h-3.5 ml-1.5 text-slate-500 cursor-pointer" />
          </span>
        </Tooltip>
      )}
    </label>
    <div className="relative">
      <select
        className={`w-full appearance-none bg-slate-800 border rounded-lg py-1 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          error ? "border-red-500" : "border-slate-700"
        }`}
        {...register(name, { required: required && `${label} is required.` })}
      >
        {adPlatforms.map((platform, index)=>(
          <option key={index} value={platform}>{platform}</option>
        ))}
        {/* {children} */}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
    </div>
    {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
  </div>
);

const StatusButton = ({ label, Icon, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-2 p-4 rounded-lg border-2 transition-all duration-200 h-24 ${
      isActive
        ? "border-blue-500 bg-blue-500/10"
        : "border-slate-700 bg-slate-800 hover:bg-slate-700/50"
    }`}
  >
    <Icon
      className={`w-6 h-6 ${isActive ? "text-blue-400" : "text-slate-400"}`}
    />
    <span
      className={`text-sm font-medium ${
        isActive ? "text-white" : "text-slate-300"
      }`}
    >
      {label}
    </span>
  </button>
);

const DashboardLayout = ({ children }) => (
  <div className="flex bg-slate-950">
    <main className="flex-1">{children}</main>
    <div className="fixed bottom-8 right-8 transform -rotate-90 origin-bottom-right">
      <button className="bg-orange-600 text-white py-2 px-4 rounded-t-lg flex items-center space-x-2 shadow-lg">
        <span>Chat with us</span>
        <MessageCircle className="w-5 h-5 transform rotate-90" />
      </button>
    </div>
  </div>
);

export default function App() {
  const [campaignData, setCampaignData] = useState({});
  const [currentStep, setCurrentStep] = useState(0); // 0 for Campaign Info, 1 for Money Pages, 2 for Safe Page, 3 for Conditions

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <NewCampaignScreen
            setAllCampaignData={setCampaignData}
            setStep={setCurrentStep}
            currentStepIndex={0}
          />
        );
      case 1:
        return (
          <MoneyPagesScreen
            setAllCampaignData={setCampaignData}
            setStep={setCurrentStep}
            currentStepIndex={1}
          />
        );
      case 2:
        return (
          <SafePagesScreen
            setAllCampaignData={setCampaignData}
            setStep={setCurrentStep}
            currentStepIndex={2}
          />
        );
      case 3:
        return (
          <ConditionsScreen
            setAllCampaignData={setCampaignData}
            a
            setStep={setCurrentStep}
            currentStepIndex={3}
          />
        );
      default:
        return (
          <NewCampaignScreen
            setAllCampaignData={setCampaignData}
            setStep={setCurrentStep}
            currentStepIndex={0}
          />
        );
    }
  };

  return <DashboardLayout>{renderStep()}</DashboardLayout>;
}
