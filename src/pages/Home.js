import { Autocomplete, Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import InputField from '../components/InputField';
import { useLoanCalculator } from '../hooks/useLoanCalculator';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import LoanBarChart from '../components/LoanBarChart';
import { useSelector } from 'react-redux';


function Home() {

  const { emi, schedule, calculateEMI } = useLoanCalculator();
  
  const currencies = useSelector(state => state?.currenciesData?.currencies)

  const [currenciesNameList, setCurrenciesNameList] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [rateList, setRateList] = useState({})
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isTableOpen, setIsTableOpen] = useState(false)

  useEffect(() => { 
    if (schedule.length > 0 && !isTableOpen) {
      setIsTableOpen(true)
    }
  },[schedule])
  
  const handleSubmit = (values) => {
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

  useEffect(() => {
    if (currencies.length > 0) {
      const currencyObject = currencies.reduce((acc, curr) => {
        acc[curr.name] = curr.rate;
        return acc;
      }, {});
      const list = Object.keys(currencyObject) || [];

      setCurrenciesNameList(list || []);
      setRateList(currencyObject || {})
    }
  }, [currencies])

  const handleChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (/^\d*\.?\d*$/.test(value)) {
      formik.setFieldValue(name, value, false);
    }
  }

  const handleCurrency = (value) => {
    if (!value) return;

    const formValues = formik.values;
    let amount = Number(Number(formValues.amount).toFixed(2));
    let rate = Number(Number(formValues.rate).toFixed(2));
    let years = Number(Number(formValues.years).toFixed(2));

    const CurrencyRate = rateList[value] || 1;
    
    calculateEMI(amount, rate, years, CurrencyRate);

    setSelectedCurrency(value)
  }
  
  const handleExcel = () => {
    const filename = `Loan EMIs.xlsx`
    const worksheet = XLSX.utils.json_to_sheet(schedule);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(fileData, filename);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)  
  }, [])

  if (Loading) {
    return (
    <div className='flex items-center justify-center h-[500px] min-w-[90%]'>
      <div>
        <CircularProgress color="primary" />
      </div>
    </div>
    )
  }

  return (
    <div className='max-w-[1200px] mt-10 w-full mx-auto pb-20 px-4 thin-scrollbar'>
      <h1 className='text-3xl'>Loan Calculator Dashboard</h1>
      <form onSubmit={formik.handleSubmit} className=''>
        <div className='flex sm:gap-6 gap-0 sm:mt-4 mt-0 flex-col sm:flex-row'>
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

        <Button 
          color="primary" 
          variant="contained" 
          type="submit" 
          sx={{ mt: 2}} 
        >
          calculate
        </Button>
      </form>

      {
        schedule.length > 0 && isTableOpen &&
        <div className='mt-10'>
          <h1 className='text-lg'><span className='opacity-70'>Monthly EMI:</span> <span className='font-bold'>{selectedCurrency} {Number(emi) || 0}</span></h1>

           <div className='flex justify-between items-center'>
            <Autocomplete
              options={currenciesNameList}
              value={selectedCurrency}
              onChange={(event, newValue) => handleCurrency(newValue)}
              renderInput={(params) => <TextField {...params} label="Currency" />}
              sx={{ width: 200, my: 3 }}
            />

            <Button 
              variant="outlined" 
              sx={{height: 50, px:4}}
              onClick={() => {
                setIsTableOpen(false)
                formik.resetForm();
              }}
            >Reset</Button>  
           </div> 

          <div className='h-full overflow-hidden border rounded-md border-gray-300/50 shadow-md'>
              
              <div className='flex gap-4 justify-between p-4 items-center border-b-[1px] border-b-[#dedede]'>
                <Typography variant="h6">
                  Amortization Schedule ({selectedCurrency})
                </Typography>

                <Button 
                  color="success" 
                  variant="contained" 
                  onClick={handleExcel}
                >Download Excel</Button>
              </div>
              <TableContainer className='thin-scrollbar' component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader className='thin-scrollbar'>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ fontSize: '1.2rem', fontWeight: 'bold'}}>Month</TableCell>
                    <TableCell align="right" sx={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '150px' }}>Principal</TableCell>
                    <TableCell align="right" sx={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '150px'  }}>Interest</TableCell>
                    <TableCell align="right" sx={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '150px'  }}>Remaining Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schedule.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell align="left">{row.month}</TableCell>
                      <TableCell align="right">{Number(row.principal)} {selectedCurrency}</TableCell>
                      <TableCell align="right">{Number(row.interest)} {selectedCurrency}</TableCell>
                      <TableCell align="right">{Number(row.remaining)} {selectedCurrency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <LoanBarChart longTermData={schedule}/>
        </div>
      }
    </div>
  )
}

export default Home