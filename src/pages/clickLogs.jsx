import React, { Component } from 'react';
import DatePicker from 'react-datepicker'; 
import "react-datepicker/dist/react-datepicker.css"; 
import moment from 'moment'; 

// Fixed Data & Configuration
const TABS = [
  'Click Logs', 
  'Stats Overview', 
  'Tracking', 
  'Group By Stats', 
  'Cost Management', 
  'Campaign Timeline', 
  'Deleted Campaigns'
];

const METRICS = ['Clicks', 'Conversions', 'Revenue', 'Cost'];
const DATE_PRESETS = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days'];
const VARIABLES = ['Campaign', 'Country', 'Affiliate Network', 'Source']; // Dummy Variables list

// Dummy Data for the Table (Click Logs)
const DUMMY_LOGS_DATA = [
    { time: '14:30:15', clickId: 'a1b2c3d4e5f6', ip: '192.168.1.1', country: 'US', campaign: 'CPC Campaign 01', status: 'Approved' },
    { time: '14:30:16', clickId: 'b2c3d4e5f6a1', ip: '10.0.0.5', country: 'CA', campaign: 'PPC Promo A', status: 'Blocked' },
];


// Custom Date Input (Logic retained from previous fix)
const CustomDateInput = ({ startDate, endDate, onClick, placeholder }) => {
  let displayValue = "";
  let isDateSelected = false;

  if (startDate && endDate) {
    displayValue = `${moment(startDate).format('DD/MM/YY')} to ${moment(endDate).format('DD/MM/YY')}`;
    isDateSelected = true;
  } else if (startDate) {
    displayValue = moment(startDate).format('DD/MM/YY');
    isDateSelected = true;
  } 

  return (
    <button 
      className="text-sm py-2 px-3 border border-gray-600 rounded-md shadow-sm bg-gray-700 focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-150" 
      onClick={onClick}
      style={{ width: '100%', textAlign: 'left', minHeight: '38px' }} 
    >
      <span className={isDateSelected ? "text-white" : "text-gray-400"}>
        {isDateSelected ? displayValue : placeholder}
      </span>
    </button>
  );
};

// -----------------------------------------------------

class ReportsDashboardGrouped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'Click Logs', // Default active tab
      isMoreActionsOpen: false, 
      startDate: null, 
      endDate: null, 
      
      // State variables
      selectedMetric: 'Clicks', 
      selectedDatePreset: 'Today', 
      selectedVariable: '', // New state for Group By Stats
    };
    this.toggleMoreActions = this.toggleMoreActions.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleMetricChange = this.handleMetricChange.bind(this);
    this.handleDatePresetChange = this.handleDatePresetChange.bind(this);
    this.handleVariableChange = this.handleVariableChange.bind(this);
  }

  handleTabChange(tabName) {
      this.setState({ activeTab: tabName, isMoreActionsOpen: false, selectedVariable: '' });
  }

  toggleMoreActions() {
    this.setState(prevState => ({
      isMoreActionsOpen: !prevState.isMoreActionsOpen,
    }));
  }

  handleExport(format) {
    alert(`Exporting report as ${format}`);
    this.setState({ isMoreActionsOpen: false });
  }

  handleDateChange = (dates) => {
    const [start, end] = dates;
    this.setState({ startDate: start, endDate: end, selectedDatePreset: 'Custom' });
  };
  
  handleMetricChange = (e) => {
    this.setState({ selectedMetric: e.target.value });
  };
  
  handleDatePresetChange = (e) => {
    this.setState({ selectedDatePreset: e.target.value, startDate: null, endDate: null });
  };
  
  handleVariableChange = (e) => {
    this.setState({ selectedVariable: e.target.value });
  };

  // Renders the dynamic action button (More Actions or Print)
  renderActionControls() {
    if (this.state.activeTab === 'Click Logs' || this.state.activeTab === 'Group By Stats') {
        return (
            // More Actions Dropdown (Click Logs & Group By Stats)
            <div className="relative">
                <button 
                  onClick={this.toggleMoreActions}
                  className="flex items-center px-2 py-2 text-sm text-gray-400 hover:text-white transition duration-150"
                >
                  More Actions
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {this.state.isMoreActionsOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <a 
                        href="#" 
                        onClick={() => this.handleExport('.csv')}
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                      >
                        Export as .csv
                      </a>
                    </div>
                  </div>
                )}
            </div>
        );
    } 
    
    if (this.state.activeTab === 'Stats Overview') {
        return (
            // Print Button (Stats Overview)
            <button className="flex items-center px-2 py-2 text-sm text-gray-400 hover:text-white transition duration-150">
                <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2-1c0 1.105.895 2 2 2h2a2 2 0 002-2m-2-10h-4M7 7h10V3H7v4z" />
                </svg>
                Print
            </button>
        );
    }
    
    return null; 
  }

  // Renders the dynamic filter controls (Metric/Date Preset OR Select Variables)
  renderFilterControls() {
    const isGrouped = this.state.activeTab === 'Group By Stats' || this.state.activeTab === 'Tracking'; // Assuming Tracking also needs these fields
    const datePlaceholder = "DD/MM/YY to DD/MM/YY";

    // Common Control Elements
    const DateRangePicker = (
        <div className="flex-grow max-w-[320px]">
            <label htmlFor="date-range" className="block text-[10px] uppercase font-medium text-gray-400 mb-1">
              DATE RANGE {isGrouped && <span className="text-red-500">*</span>}
            </label>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleDateChange}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              selectsRange 
              isClearable
              dateFormat="dd/MM/yyyy"
              customInput={<CustomDateInput 
                            startDate={this.state.startDate} 
                            endDate={this.state.endDate} 
                            placeholder={datePlaceholder} 
                          />} 
              calendarClassName="border-none shadow-xl"
              popperPlacement="bottom-start"
            />
        </div>
    );
    
    const CampaignDropdown = (
        <div className="flex-grow max-w-xs">
            <label htmlFor="campaign" className="block text-[10px] uppercase font-medium text-gray-400 mb-1">
              CAMPAIGN {isGrouped && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <select
                id="campaign"
                defaultValue="Choose..."
                className="w-full text-sm py-2 px-3 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white appearance-none pr-8 focus:outline-none focus:ring-red-500 focus:border-red-500"
                style={{backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 20\' fill=\'white\'%3E%3Cpath fill-rule=\'evenodd\' d=\'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\' clip-rule=\'evenodd\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em 1em'}}
              >
                <option disabled>Choose...</option>
                <option>Campaign A</option>
                <option>Campaign B</option>
              </select>
            </div>
        </div>
    );

    // Dynamic Control Logic
    if (this.state.activeTab === 'Click Logs' || this.state.activeTab === 'Stats Overview') {
      return (
        <div className="flex items-end space-x-4">
            {/* Metric Dropdown (Click Logs / Stats Overview) */}
            <div className="flex-grow max-w-[150px]">
                <label htmlFor="metric" className="block text-[10px] uppercase font-medium text-gray-400 mb-1">METRIC</label>
                <div className="relative">
                  <select id="metric" value={this.state.selectedMetric} onChange={this.handleMetricChange} className="w-full text-sm py-2 px-3 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white appearance-none pr-8 focus:outline-none focus:ring-red-500 focus:border-red-500" style={{backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 20\' fill=\'white\'%3E%3Cpath fill-rule=\'evenodd\' d=\'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\' clip-rule=\'evenodd\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em 1em'}}>
                    {METRICS.map(metric => <option key={metric} value={metric}>{metric}</option>)}
                  </select>
                </div>
            </div>
            
            {/* Date Preset Dropdown (Click Logs / Stats Overview) */}
            <div className="flex-grow max-w-[150px]">
                <label htmlFor="date-preset" className="block text-[10px] uppercase font-medium text-gray-400 mb-1">DATE</label>
                <div className="relative">
                  <select id="date-preset" value={this.state.selectedDatePreset} onChange={this.handleDatePresetChange} className="w-full text-sm py-2 px-3 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white appearance-none pr-8 focus:outline-none focus:ring-red-500 focus:border-red-500" style={{backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 20\' fill=\'white\'%3E%3Cpath fill-rule=\'evenodd\' d=\'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\' clip-rule=\'evenodd\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em 1em'}}>
                    {DATE_PRESETS.map(preset => <option key={preset} value={preset}>{preset}</option>)}
                  </select>
                </div>
            </div>

            {DateRangePicker}
            {CampaignDropdown}
        </div>
      );
    } 
    
    if (isGrouped) { // Covers Group By Stats and Tracking
        return (
          <div className="flex items-end space-x-4">
            {DateRangePicker}
            {CampaignDropdown}
            
            {/* SELECT A VARIABLES Dropdown (Group By Stats & Tracking) */}
            <div className="flex-grow max-w-xs">
                <label htmlFor="variables" className="block text-[10px] uppercase font-medium text-gray-400 mb-1">
                  SELECT A VARIABLES <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="variables"
                    value={this.state.selectedVariable}
                    onChange={this.handleVariableChange}
                    className="w-full text-sm py-2 px-3 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white appearance-none pr-8 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    style={{backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 20 20\' fill=\'white\'%3E%3Cpath fill-rule=\'evenodd\' d=\'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\' clip-rule=\'evenodd\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em 1em'}}
                  >
                    <option value="" disabled>Please select a campaign</option>
                    {VARIABLES.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
            </div>
          </div>
        );
    }

    // Default for other tabs
    return (
      <div className="flex items-end space-x-4">
        {DateRangePicker}
        {CampaignDropdown}
      </div>
    );
  }

  // Data Table Rendering Function (Retained for Click Logs)
  renderDataTable() {
    if (this.state.activeTab !== 'Click Logs') {
        return (
             <div className="mt-8">
                <p className="text-gray-500">
                    Report data table will load here for the **{this.state.activeTab}** tab.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-6 bg-gray-800 rounded-lg shadow-xl p-4">
            <table className="min-w-full divide-y divide-gray-700">
                <thead>
                    <tr>
                        {Object.keys(DUMMY_LOGS_DATA[0]).map((key) => (
                            <th 
                                key={key}
                                className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {DUMMY_LOGS_DATA.map((log, index) => (
                        <tr key={index} className="hover:bg-gray-700 transition duration-100">
                            <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{log.time}</td>
                            <td className="px-3 py-3 whitespace-nowrap text-sm text-red-400 font-mono">{log.clickId}</td>
                            <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{log.ip}</td>
                            <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{log.country}</td>
                            <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300">{log.campaign}</td>
                            <td className="px-3 py-3 whitespace-nowrap text-sm">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.status === 'Approved' ? 'bg-green-800 text-green-300' : 'bg-red-800 text-red-300'}`}>
                                    {log.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination/Entry Count Footer */}
            <div className="mt-4 flex justify-between items-center text-sm text-gray-400 border-t border-gray-700 pt-3">
                <span>Showing 1 to {DUMMY_LOGS_DATA.length} of 100 entries</span>
                <div className="flex space-x-1">
                    <button className="px-3 py-1 border border-gray-600 rounded-md hover:bg-gray-700">Previous</button>
                    <span className="px-3 py-1 bg-red-600 rounded-md text-white">1</span>
                    <button className="px-3 py-1 border border-gray-600 rounded-md hover:bg-gray-700">2</button>
                    <button className="px-3 py-1 border border-gray-600 rounded-md hover:bg-gray-700">Next</button>
                </div>
            </div>
        </div>
    );
  }

  render() {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        
        {/* Header Section */}
        <header className="flex items-center mb-5">
          <h1 className="text-2xl font-semibold flex items-center">
            Reports and Analytics
            <svg className="ml-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.313.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.942 1.543-.826 3.313-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.942-3.313-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.942-1.543.826-3.313 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </h1>
        </header>

        {/* Sub-Navigation/Tabs Section */}
        <nav className="border-b border-gray-700 mb-6">
          <div className="flex text-sm font-medium items-baseline">
            <span className="text-gray-500 mr-2">Reporting</span>
            <span className="text-gray-500 mr-4 text-xs">{'>'}</span>
            <span className="text-gray-300 mr-4 text-xs">{this.state.activeTab}</span>

            <div className="flex space-x-6">
                {TABS.map((tab) => (
                    <a 
                        key={tab}
                        href="#" 
                        onClick={(e) => { e.preventDefault(); this.handleTabChange(tab); }}
                        className={`py-3 -mb-px transition duration-150 ${
                            this.state.activeTab === tab 
                                ? 'border-b-2 border-red-500 text-red-500' 
                                : 'text-gray-400 hover:text-gray-300'
                        }`}
                    >
                        {tab}
                    </a>
                ))}
            </div>
          </div>
        </nav>

        {/* Report Controls Section (Filtering and Actions) */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-xl flex items-end space-x-4">
          
          {/* Dynamic Filter Controls (Based on Tab) */}
          {this.renderFilterControls()}

          {/* Generate Report Button (Common to all) */}
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-sm shadow-lg transition duration-150">
            Generate Report
          </button>
          
          {/* Action Button (Dynamic Rendering: More Actions / Print) */}
          {this.renderActionControls()}

        </div>

        {/* --- */}

        {/* Data Table Section (Conditional Rendering) */}
        {this.renderDataTable()}

        {/* Fixed Position Chat Widget and Footer (Unchanged) */}
        <style jsx="true">{`
          .writing-mode-vertical {
            writing-mode: vertical-rl;
          }
        `}</style>
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-red-700 text-white p-2 rounded-l-lg shadow-xl cursor-pointer writing-mode-vertical rotate-180">
            Chat with us
        </div>
        <div className="fixed right-2 bottom-4 h-8 w-8 bg-black border border-white rounded-full flex items-center justify-center cursor-pointer">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>


        <footer className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 text-center text-xs text-gray-500 py-3">
          &copy; {new Date().getFullYear()} Trafficshield.io. All Rights Reserved
          <span className="ml-4 mr-4">|</span>
          v2.0
        </footer>
      </div>
    );
  }
}

export default ReportsDashboardGrouped;