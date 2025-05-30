import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic, { axiosPublic } from "../../UseHook/UseAxiosPublic";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';




const Analytics = () => {
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
  const  axiosPublic= UseAxiosPublic()
    const {data: chartData= []}= useQuery({
        queryKey:"bar-chat",
        queryFn:async()=> {
            const res = await axiosPublic.get("/medicalCamps")
            return res.data
        }
    })

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
      
    return (
        <div>
            <BarChart
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="campName" />
      <YAxis />
      <Bar dataKey="campFees" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 6]} />
        ))}
      </Bar>
    </BarChart>
        </div>
    );
};

export default Analytics;