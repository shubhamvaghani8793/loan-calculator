import { useState } from 'react';

export const useLoanCalculator = () => {
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const calculateEMI = (P, annualRate, years, conversionRate = 1) => {
    const R = annualRate / 12 / 100;
    const N = years * 12;

    let emiValue = 0;

    if (R === 0) {
      emiValue = P / N;
    } else {
      emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    }

    const convertedEmi = emiValue * conversionRate;
    setEmi(convertedEmi.toFixed(2));

    const amortization = [];
    let balance = P;

    for (let i = 1; i <= N; i++) {
      const interest = R === 0 ? 0 : balance * R;
      const principalPaid = emiValue - interest;
      balance = +(balance - principalPaid).toFixed(8);

      amortization.push({
        month: i,
        principal: (principalPaid * conversionRate).toFixed(2),
        interest: (interest * conversionRate).toFixed(2),
        remaining: (i === N ? 0 : balance * conversionRate).toFixed(2),
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
