import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Trash2, RefreshCw, Activity } from "lucide-react";

export default function Campaign() {
  const campaignName = "bagwala";

  const [data, setData] = useState([
    {
      id: "1",
      url: "https://bagwala.org/",
      status: "Active",
      type: "JAVASCRIPT",
      firstInstalled: "2025-December-09 23:13:05",
      lastUpdated: "01/17/2023 04:11:42 pm",
      selected: true,
    },
    {
      id: "2",
      url: "https://example.com/",
      status: "Active",
      type: "JAVASCRIPT",
      firstInstalled: "2025-December-08 15:45:22",
      lastUpdated: "01/16/2023 02:30:15 pm",
      selected: false,
    },
    {
      id: "3",
      url: "https://test.com/",
      status: "Inactive",
      type: "HTML",
      firstInstalled: "2025-December-07 10:20:00",
      lastUpdated: "01/15/2023 08:22:50 am",
      selected: false,
    },
  ]);

  const handleSelectAll = (checked) => {
    setData(data.map((row) => ({ ...row, selected: checked })));
  };

  const handleSelectRow = (id, checked) => {
    setData(data.map((row) => (row.id === id ? { ...row, selected: checked } : row)));
  };

  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  const handleRefresh = (id) => {
    console.log("Refreshing row:", id);
  };

  const handleTestUrl = (url) => {
    window.open(url, "_blank");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-900/20 text-green-400 border border-green-700/50";
      case "Inactive":
        return "bg-red-900/20 text-red-400 border border-red-700/50";
      case "Pending":
        return "bg-yellow-900/20 text-yellow-400 border border-yellow-700/50";
      default:
        return "bg-gray-900/20 text-gray-400";
    }
  };

  const selectedCount = data.filter((row) => row.selected).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Campaign Name
            </h1>
            <span className="text-xl sm:text-2xl font-semibold text-emerald-400">
              [{campaignName}]
            </span>
          </div>

           <button className="btn btn-sm btn-primary mx-1">
                   <i className="fa-solid fa-pen-to-square me-2"></i>
                   Edit Campaign
            </button>
        </div>

        {/* Table */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/80 border-b border-slate-700/50">
                <tr>
                  <th className="px-4 py-4 text-left text-sm text-slate-300">Select</th>
                  <th className="px-6 py-4 text-left text-sm text-slate-300">URL</th>
                  <th className="px-6 py-4 text-left text-sm text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm text-slate-300">Type</th>
                  <th className="px-6 py-4 text-left text-sm text-slate-300">First Installed</th>
                  <th className="px-6 py-4 text-left text-sm text-slate-300">Last Upgrade</th>
                  <th className="px-6 py-4 text-center text-sm text-slate-300">Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-b border-slate-700/30 hover:bg-slate-700/20 ${
                      index === data.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                          type="checkbox"
                          className="form-check-input"
                          value={'campaignId'}
                        />
                    </td>

                    <td className="px-6 py-4">
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-blue-400 underline"
                      >
                        {row.url}
                      </a>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(row.status)}`}>
                        {row.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-300 text-sm">{row.type}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{row.firstInstalled}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{row.lastUpdated}</td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => handleTestUrl(row.url)} className="btn-blue">
                          <Activity className="w-4 h-4" /> Test
                        </button>
                        <button onClick={() => handleDelete(row.id)} className="btn-red">
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                        <button onClick={() => handleRefresh(row.id)} className="btn-gray">
                          <RefreshCw className="w-4 h-4" /> Refresh
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="mt-8 p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg flex items-center gap-3 text-slate-300">
            <AlertCircle className="w-5 h-5" />
            <p>No campaigns found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
