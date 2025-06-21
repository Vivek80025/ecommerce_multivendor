import { useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchRevenueChart } from '../../../State/seller/revenueChartSlice';

const SellingChart = ({chartType}:{chartType:string}) => {

  const dispatch = useAppDispatch();

  const {revenue} = useAppSelector(store=>store)

  useEffect(()=>{
    dispatch(fetchRevenueChart({type:chartType}))
  },[chartType])


  return (
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={revenue.chart}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey={"revenue"} />
          <Tooltip />
          <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
  )
}

export default SellingChart