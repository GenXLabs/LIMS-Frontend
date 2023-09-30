import React, { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  TextField,
  InputAdornment
} from '@mui/material'

import apiDefinitions from 'src/api/apiDefinitions'

// Styles for the table and components
const tableStyle = {
  minWidth: 650,
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '10px'
}

const tableHeaderCellStyle = {
  fontWeight: 'bold',
  borderBottom: '2px solid rgba(0, 0, 0, 0.12)'
}

const titleStyle = {
  marginBottom: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const EventTable = () => {
  // Sample data for the table with new columns
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch data from the API
        const response = await apiDefinitions.getAllEvents()
        const responseData = response.data
        console.log(responseData)
        setData(responseData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    // Call the fetchData function when the component mounts
    fetchData()
  }, [])

  // State for search
  const [searchText, setSearchText] = useState('')

  // Function to filter data based on search text across all fields
  const filteredData = data.filter(row => {
    return Object.values(row).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchText.toLowerCase())
      }

      return false
    })
  })

  // Conditional rendering based on user's access level
  const userAccessLevel = JSON.parse(localStorage.getItem('userData')).accessLevel
  if (userAccessLevel !== 0) {
    return null // Return null to hide the table for student logins
  }

  return (
    <Card elevation={3}>
      <CardContent>
        <Box style={titleStyle}>
          <Typography variant='h5'>Event Details</Typography>
          <TextField
            label='Search'
            variant='outlined'
            size='small'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position='end'>Clear</InputAdornment>
            }}
          />
        </Box>
        <Paper elevation={0}>
          {filteredData.length === 0 ? (
            // Render "No results found" message when filteredData is empty
            <Typography variant='body1'>No results found.</Typography>
          ) : (
            // Render the table when there are matches
            <Table style={tableStyle}>
              <TableHead>
                <TableRow>
                  <TableCell style={tableHeaderCellStyle}>Event Title</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Start Time</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Venue</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Date</TableCell>
                  <TableCell style={tableHeaderCellStyle}>Instructor's Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.event_title}</TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.venue}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </CardContent>
    </Card>
  )
}

export default EventTable
