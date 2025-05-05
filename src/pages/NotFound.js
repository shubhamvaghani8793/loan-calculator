import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Box textAlign="center" mt={20}>
      <Typography variant="h1" color="error">404</Typography>
      <Typography variant="h4">Page Not Found</Typography>
      <Link to="/" className='mt-6 block border w-fit mx-auto px-4 py-2 rounded-md text-white bg-blue-500'>Go To Home</Link>
    </Box>
  )
}

export default NotFound