import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import EmptyImage from '../assets/image/Empty_result.svg'

function LiveRate() {

  const currencies = useSelector(state => state?.currenciesData?.currencies)
  let IsLoading = useSelector(state => state?.currenciesData?.isLoading);

  const [paginationList, setPaginationList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (Object.keys(currencies).length > 0) {
      
      const PagiData = currencies.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
      setPaginationList(PagiData || [])
    }
  }, [page, rowsPerPage, currencies])

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - currencies?.length) : 0;

  return (
    <div className='p-6'>

      {
        IsLoading && 
        <div className='flex items-center justify-center h-[300px] min-w-[90%]'>
          <div>
            <CircularProgress color="primary" />
          </div>
        </div>
      }

      {
        !IsLoading && currencies.length > 0 ?
        <div className='shadow-2xl h-[calc(100vh-140px)] flex flex-col border border-gray-50/50 rounded-md overflow-hidden'>
          <Paper style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography  variant="h6" sx={{ p: 2, borderBottom: 1, borderBottomColor: '#dedede'}}>
              Exchange Rates
            </Typography>
            <TableContainer className='thin-scrollbar' style={{ flex: 1, overflow: 'auto' }}>
              <Table stickyHeader style={{ height: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{fontSize: '1rem', fontWeight: 'bold'}}>Currency</TableCell>
                    <TableCell align="left" sx={{fontSize: '1rem', fontWeight: 'bold'}}>Rate ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginationList.length > 0 && paginationList.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell align="left" sx={{fontSize: 16}}>{row?.name}</TableCell>
                      <TableCell align="left" sx={{fontSize: 16}}>{row?.rate}</TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 30 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={currencies.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 20, 30]}
              className='thin-scrollbar'
            />
          </Paper>
        </div>
        : IsLoading ? null :
        <div className='w-fit mx-auto'>
          <img src={EmptyImage} alt="No Data Found" width={400} className='mr-20'/>
        </div>
      }
    </div>

  )
}

export default LiveRate