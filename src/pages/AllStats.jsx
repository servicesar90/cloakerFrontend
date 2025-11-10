import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";

const Dashboard = () => {
  const [chartData] = useState([
    { date: "Nov 04", Safe: 120, Money: 0 },
    { date: "Nov 05", Safe: 30, Money: 25 },
    { date: "Nov 06", Safe: 10, Money: 8 },
    { date: "Nov 07", Safe: 35, Money: 28 },
    { date: "Nov 08", Safe: 5, Money: 4 },
    { date: "Nov 09", Safe: 22, Money: 14 },
  ]);

  const [campaigns] = useState([
    {
      id: 1,
      name: "fb",
      source: "Facebook Adverts",
      status: "active",
      integration: "ok",
      clicks: 36,
      safe: 22,
      money: 14,
      createdOn: "07 Nov, 2025 08:19 PM",
    },
  ]);

  const [page, setPage] = useState(1);
  const totalCampaigns = campaigns.length;
  const activeCount = 1;
  const allowAll = 0;
  const blockAll = 0;
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  const handleRefresh = () => alert("Refresh Account Clicked");
  const goToCampaign = (id) => alert("Open campaign: " + id);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const nextPage = () => setPage((p) => p + 1);

   const handleAddTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  // ✅ Toggle complete/incomplete
  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // ✅ Delete task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ✅ Filtered tasks by search
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Small reusable StatCard
  const StatCard = ({ icon, value, title, subtitle }) => (
  <div className="bg-gray-850/40 border border-gray-700 rounded-lg p-4 flex flex-col justify-between">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-slate-800 text-lg">{icon}</div>
        <div>
          <div className="text-2xl font-semibold text-white">{value}</div>
          <div className="text-xs text-slate-400">{title}</div>
        </div>
      </div>
      <div className="text-xs text-slate-400">{subtitle}</div>
    </div>
  </div>
);


  return (
    <div className="min-h-screen bg-[#0b0d14] p-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <p className="text-slate-400 text-sm">Let's do something new.</p>
        </div>
        <button
          onClick={handleRefresh}
          className="bg-blue-600 px-4 py-2 rounded-md"
        >
          Refresh Account
        </button>
      </div>

      {/* Top Stats */}
      <div className="mb-6 flex gap-6 flex-wrap">
        <StatCard
          icon="📊"
          value={totalCampaigns}
          title="Campaigns"
          
        />
        <StatCard
          icon="▶️"
          value={activeCount}
          title="Active"
         
        />
        <StatCard
          icon="⚡"
          value={allowAll}
          title="Allow All"
          
        />
        <StatCard
          icon="🚫"
          value={blockAll}
          title="Block All"
         
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart */}
          <div className="bg-gray-850/40 border border-gray-700 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-2">
              Clicks Overview
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Cumulative Click Log
            </p>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 16, left: -8, bottom: 0 }}
                >
                  <CartesianGrid stroke="#222235" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <Tooltip
                    wrapperStyle={{
                      background: "#0b1220",
                      border: "1px solid #2b2f3a",
                    }}
                    contentStyle={{ color: "#fff" }}
                  />
                  <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 12 }} />
                  <Bar dataKey="Safe" stackId="a" fill="#fca5a5" />
                  <Bar dataKey="Money" stackId="a" fill="#bbf7d0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Campaign Table */}
          <div className="bg-transparent">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white text-xl font-semibold">
                  All Campaigns{" "}
                  <span className="text-slate-500 text-sm">
                    ( {campaigns.length} )
                  </span>
                </h3>
                <div className="text-slate-400 text-sm">
                  Create/Edit/Delete Campaigns
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-slate-800 border border-gray-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none"
                />
                <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">
                  + Add New Campaign
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-800">
                <thead>
                  <tr className="text-left text-sm text-slate-400">
                    <th className="px-4 py-3">Sn</th>
                    <th className="px-4 py-3">Campaign Name</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Integration</th>
                    <th className="px-4 py-3">Clicks</th>
                    <th className="px-4 py-3">Safe</th>
                    <th className="px-4 py-3">Money</th>
                    <th className="px-4 py-3">Created on</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-gray-800">
                  {campaigns.map((c, idx) => (
                    <tr
                      key={c.id}
                      className="text-sm text-slate-300 hover:bg-slate-900/30"
                    >
                      <td className="px-4 py-3">{idx + 1}</td>
                      <td className="px-4 py-3 font-medium text-white">
                        {c.name}
                      </td>
                      <td className="px-4 py-3 text-slate-400">{c.source}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block w-3 h-3 rounded-full ${
                              c.status === "active"
                                ? "bg-green-400"
                                : "bg-gray-500"
                            }`}
                          ></span>
                          <span className="text-xs">{c.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {c.integration}
                      </td>
                      <td className="px-4 py-3">{c.clicks}</td>
                      <td className="px-4 py-3">{c.safe}</td>
                      <td className="px-4 py-3">{c.money}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">
                        {c.createdOn}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => goToCampaign(c.id)}
                          className="text-xs bg-slate-800 px-2 py-1 rounded-md text-slate-200 hover:bg-slate-700"
                        >
                          ...
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={prevPage}
                className="px-3 py-1 rounded-md bg-slate-800 text-slate-200"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <div className="px-3 py-1 rounded-md bg-slate-800 text-slate-200">
                {page}
              </div>
              <button
                onClick={nextPage}
                className="px-3 py-1 rounded-md bg-slate-800 text-slate-200"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div>
          <div className="bg-gray-850/40 border border-gray-700 rounded-lg p-6 h-full">
            <div className="text-sm text-yellow-300 mb-2">OUR SERVICE</div>
            <h3 className="text-white text-lg font-semibold mb-2">
              Join TrafficShield's Affiliate Revolution!
            </h3>
            <p className="text-slate-400 mb-6">
              Earn a Remarkable 25% Commission on Every Renewal! The Road to
              Earning More Begins Now!
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Start Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* To-do */}
        <div className="bg-gray-850/40 border border-gray-700 rounded-lg p-6 min-h-[220px]">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold">To do</h4>
            <div className="text-slate-400 text-sm">Reminders List for me</div>
          </div>
          <div className="bg-slate-900 border border-gray-800 rounded-md p-4 min-h-[120px]">
            <input
              className="w-full bg-transparent border border-gray-700 px-3 py-2 rounded-md text-slate-300"
              placeholder="Search tasks"
            />
            <div className="mt-4 text-slate-400">0 tasks</div>
            <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md">
              + Add new task
            </button>
          </div>
        </div>

        {/* Click Metrics */}
        <div className="bg-gray-850/40 border border-gray-700 rounded-lg p-6 min-h-[220px]">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold">
              Click Metrics - Realtime Logs
            </h4>
            <div className="text-slate-400 text-sm">
              Recent activity across all campaigns
            </div>
          </div>
          <div className="bg-slate-900 border border-gray-800 rounded-md p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="bg-slate-800 p-4 rounded-md inline-block">
                  <div className="text-2xl font-semibold text-white">14</div>
                </div>
                <div className="text-slate-400 text-xs mt-2">Total Clicks</div>
              </div>
              <div className="text-center">
                <div className="bg-slate-800 p-4 rounded-md inline-block">
                  <div className="text-2xl font-semibold text-white">22</div>
                </div>
                <div className="text-slate-400 text-xs mt-2">Safe Clicks</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-10 text-slate-400 text-sm">
        © 2025 Trafficshield.io, All Rights Reserved
      </footer>
    </div>
  );
};

export default Dashboard;
