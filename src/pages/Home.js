import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup'
import InputField from '../components/InputField';
import { useLoanCalculator } from '../hooks/useLoanCalculator';

function Home() {

  const { emi, schedule, calculateEMI } = useLoanCalculator();

  console.log(emi);
  console.log(schedule);
  
  const handleSubmit = (values) => {
    console.log(values);
    let amount = Number(Number(values.amount).toFixed(2));
    let rate = Number(Number(values.rate).toFixed(2));
    let years = Number(Number(values.years).toFixed(2));
   
    calculateEMI(amount, rate, years)
  }

  const validationSchema = Yup.object({
    amount: Yup.string().required('Loan Amount is Required!'),
    rate: Yup.number()
      .typeError('Must be a number')
      .min(0, 'Rate must be greater than or equal to 0')
      .max(100, 'Rate must be less than or equal to 100')
      .required('Interest Rate is Required!'),
    years: Yup.number()
      .typeError('Must be a number')
      .min(1, 'Term must be greater than or equal to 1')
      .max(30, 'Term must be less than or equal to 30')
      .required('Term is required'),
  });

  const formik = useFormik({
    initialValues: {
      amount: '',
      rate: '',
      years: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values)
    }
  })

  const handleChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (/^\d*\.?\d*$/.test(value)) {
      formik.setFieldValue(name, value);
    }
  }

  return (
    <div className='max-w-[1200px] mt-10 w-full mx-auto'>
      <h1 className='text-3xl'>Loan Calculator Dashboard</h1>
      <form onSubmit={formik.handleSubmit} className=''>
        <div className='flex gap-6 mt-4'>
          <InputField 
            id="amount"
            name="amount"
            label="Loan Amount"
            value={formik.values.amount}
            onChange={(e) => handleChangeInput(e)}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
          <InputField 
            id="rate"
            name="rate"
            label="Interest Rate (%)"
            value={formik.values.rate}
            onChange={(e) => handleChangeInput(e)}
            error={formik.touched.rate && Boolean(formik.errors.rate)}
            helperText={formik.touched.rate && formik.errors.rate}
          />
          <InputField 
            id="years"
            name="years"
            label="Term (Years)"
            value={formik.values.years}
            onChange={(e) => handleChangeInput(e)}
            error={formik.touched.years && Boolean(formik.errors.years)}
            helperText={formik.touched.years && formik.errors.years}
          />
        </div>

        <Button color="primary" variant="contained" type="submit" sx={{ mt: 2}}>
          Submit
        </Button>
      </form>

      {
        schedule.length > 0 &&
        <div className='mt-10'>
          <h1>Monthly EMI: $2051.65</h1>

          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell>Principal</TableCell>
                    <TableCell>Interest</TableCell>
                    <TableCell>Remaining Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schedule.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{Number(row.principal).toFixed(2)} CAD</TableCell>
                      <TableCell>{Number(row.interest).toFixed(2)} CAD</TableCell>
                      <TableCell>{Number(row.balance).toFixed(2)} CAD</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      }
    </div>
  )
}

export default Home