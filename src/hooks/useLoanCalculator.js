import { useState } from 'react';

export const useLoanCalculator = () => {
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const calculateEMI = (P, annualRate, years) => {
    const R = annualRate / 12 / 100; 
    const N = years * 12;

    let emiValue = 0;

    if (R === 0) {
      emiValue = P / N;
    } else {
      emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    }

    setEmi(emiValue.toFixed(2));

    const amortization = [];
    let balance = P;

    for (let i = 1; i <= N; i++) {
      let interest = R === 0 ? 0 : balance * R;
      let principalPaid = emiValue - interest;
      balance -= principalPaid;

      amortization.push({
        month: i,
        principal: principalPaid.toFixed(2),
        interest: interest.toFixed(2),
        remaining: balance > 0 ? balance.toFixed(2) : '0.00',
      });
    }

    setSchedule(amortization);
  };

  return {
    emi,
    schedule,
    calculateEMI,
  };
};
