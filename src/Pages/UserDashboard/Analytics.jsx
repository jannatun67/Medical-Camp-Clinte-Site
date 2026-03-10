import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../UseHook/UseAxiosPublic";
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Sector 
} from 'recharts';
import { useState } from "react";
import { FaChartBar, FaChartPie, FaDownload, FaCalendarAlt, FaDollarSign, FaUsers } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";

const Analytics = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartType, setChartType] = useState('bar'); // 'bar' or 'pie'
  const axiosPublic = UseAxiosPublic();

  // Primary colors based on your theme
  const colors = ['#0F766E', '#F97316', '#115E59', '#EA580C', '#14B8A6', '#FB923C'];
  
  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["bar-chart"],
    queryFn: async () => {
      const res = await axiosPublic.get("/medicalCamps");
      return res.data;
    }
  });

  // Calculate statistics
  const totalCamps = chartData.length;
  const totalFees = chartData.reduce((sum, camp) => sum + (camp.campFees || 0), 0);
  const totalParticipants = chartData.reduce((sum, camp) => sum + (camp.participantCount || 0), 0);
  const avgFees = totalCamps > 0 ? (totalFees / totalCamps).toFixed(2) : 0;

  // Custom shape for bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-2xl border-l-4 border-[#F97316]">
          <p className="font-bold text-gray-800 mb-2">{label}</p>
          <p className="text-sm text-gray-600">
            <span className="inline-block w-3 h-3 rounded-full bg-[#0F766E] mr-2"></span>
            Camp Fees: <span className="font-bold text-[#0F766E]">${payload[0].value}</span>
          </p>
          {payload[0].payload.participantCount && (
            <p className="text-sm text-gray-600 mt-1">
              <span className="inline-block w-3 h-3 rounded-full bg-[#F97316] mr-2"></span>
              Participants: <span className="font-bold text-[#F97316]">{payload[0].payload.participantCount}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom active shape for pie chart
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm font-bold">
          {payload.campName}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">
          {`$${value}`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" className="text-xs">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F766E]/5 via-white to-[#F97316]/5 py-12">
        <div className="w-11/12 mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg w-64 mb-8"></div>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[1,2,3,4].map(n => (
                <div key={n} className="h-32 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F766E]/5 via-white to-[#F97316]/5 py-12">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-[#0F766E]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-[#F97316]/10 rounded-full blur-3xl"></div>

      <div className="relative w-11/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F97316]/10 text-[#F97316] px-6 py-2 rounded-full mb-4">
            <MdOutlineAnalytics className="text-xl" />
            <span className="font-semibold">Data Insights</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Camp{" "}
            <span className="bg-gradient-to-r from-[#0F766E] to-[#F97316] bg-clip-text text-transparent">
              Analytics Dashboard
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visual insights and statistics about our medical camps and their performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0F766E]/10 rounded-xl flex items-center justify-center">
                <FaChartBar className="text-2xl text-[#0F766E]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Camps</p>
                <p className="text-2xl font-bold text-gray-800">{totalCamps}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F97316]/10 rounded-xl flex items-center justify-center">
                <FaDollarSign className="text-2xl text-[#F97316]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">${totalFees}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0F766E]/10 rounded-xl flex items-center justify-center">
                <FaUsers className="text-2xl text-[#0F766E]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Participants</p>
                <p className="text-2xl font-bold text-gray-800">{totalParticipants}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F97316]/10 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="text-2xl text-[#F97316]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Fees</p>
                <p className="text-2xl font-bold text-gray-800">${avgFees}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setChartType('bar')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  chartType === 'bar'
                    ? 'bg-gradient-to-r from-[#0F766E] to-[#F97316] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FaChartBar />
                Bar Chart
              </button>
              <button
                onClick={() => setChartType('pie')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  chartType === 'pie'
                    ? 'bg-gradient-to-r from-[#0F766E] to-[#F97316] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FaChartPie />
                Pie Chart
              </button>
            </div>

            <button className="px-6 py-3 bg-white border-2 border-[#0F766E] text-[#0F766E] rounded-xl font-semibold hover:bg-[#0F766E] hover:text-white transition-all duration-300 flex items-center gap-2">
              <FaDownload />
              Export Data
            </button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 70,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="campName" 
                    angle={-45} 
                    textAnchor="end" 
                    height={80}
                    tick={{ fill: '#4B5563', fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: '#4B5563', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: 20 }}
                    formatter={(value) => <span className="text-gray-700 font-medium">{value}</span>}
                  />
                  <Bar 
                    dataKey="campFees" 
                    name="Camp Fees ($)" 
                    shape={<TriangleBar />} 
                    label={{ position: 'top', fill: '#4B5563', fontSize: 11 }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <PieChart width={800} height={400}>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={140}
                    fill="#8884d8"
                    dataKey="campFees"
                    onMouseEnter={onPieEnter}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div className="mt-10 bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Camp Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Camp Name</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Location</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Fees ($)</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Participants</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {chartData.slice(0, 5).map((camp, index) => (
                  <tr key={camp._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}></span>
                        <span className="text-gray-800 font-medium">{camp.campName}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{camp.location}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-[#0F766E]/10 text-[#0F766E] rounded-full font-semibold">
                        ${camp.campFees}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-[#F97316]/10 text-[#F97316] rounded-full font-semibold">
                        {camp.participantCount}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{new Date(camp.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {chartData.length > 5 && (
            <div className="text-center mt-6">
              <button className="text-[#0F766E] hover:text-[#F97316] font-semibold transition-colors">
                View All {chartData.length} Camps →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;