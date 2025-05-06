import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  Line,
  CartesianGrid,
  Bar,
} from 'recharts';
import { Box, Typography } from '@mui/material';

const LoanBarChart = ({longTermData}) => {
  return (
    <div className='shadow-xl mt-10 rounded-md px-2'>
      <Box sx={{ width: '100%', height: 600, paddingBlock: 4 }}>
      <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold', marginBottom: 2}}>
        Loan Payment Breakdown
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={longTermData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" interval={11} />
          
          {/* Left Y-axis: for Principal and Interest */}
          <YAxis yAxisId="left"
            orientation="left"
            domain={[0, 'auto']}
            tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} />
          
          {/* Right Y-axis: for Remaining Balance */}
          <YAxis yAxisId="right"
            orientation="right"
            domain={[0, (dataMax) => dataMax * 1.05]} 
            tickFormatter={(val) => `${(val / 1000).toFixed(1)}M`} />
          
          <Tooltip 

            formatter={(value) =>
              typeof value === 'number'
                ? value.toLocaleString(undefined, { maximumFractionDigits: 2 })
                : value
            }
          />
          {/* <Legend /> */}

          {/* Bars on left axis */}
          <Bar yAxisId="left" dataKey="principal" fill="#82ca9d" name="Principal" />
          <Bar yAxisId="left" dataKey="interest" fill="#8884d8" name="Interest" />

          {/* Line on right axis */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="remaining"
            stroke="#ff7300"
            name="Remaining Balance"
            dot={false}
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
      </Box>
    </div>
  );
};

export default LoanBarChart;
