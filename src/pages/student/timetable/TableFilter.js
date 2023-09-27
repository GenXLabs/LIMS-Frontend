import React, { useState } from 'react'
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
  const [data, setData] = useState([
    {
      eventTitle: 'Event A',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      venue: 'Venue X',
      instructorEmail: 'instructorA@example.com'
    },
    {
      eventTitle: 'Event B',
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      venue: 'Venue Y',
      instructorEmail: 'instructorB@example.com'
    },
    {
      eventTitle: 'Event C',
      startTime: '9:00 AM',
      endTime: '11:00 AM',
      venue: 'Venue Z',
      instructorEmail: 'instructorC@example.com'
    }
  ])

  // State for search
  const [searchText, setSearchText] = useState('')

  // Function to filter data based on search text
  const filteredData = data.filter(
    row =>
      row.eventTitle.toLowerCase().includes(searchText.toLowerCase()) ||
      row.instructorEmail.toLowerCase().includes(searchText.toLowerCase())
  )

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
          <Table style={tableStyle}>
            <TableHead>
              <TableRow>
                <TableCell style={tableHeaderCellStyle}>Event Title</TableCell>
                <TableCell style={tableHeaderCellStyle}>Start Time</TableCell>
                <TableCell style={tableHeaderCellStyle}>End Time</TableCell>
                <TableCell style={tableHeaderCellStyle}>Venue</TableCell>
                <TableCell style={tableHeaderCellStyle}>Instructor's Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.eventTitle}</TableCell>
                  <TableCell>{row.startTime}</TableCell>
                  <TableCell>{row.endTime}</TableCell>
                  <TableCell>{row.venue}</TableCell>
                  <TableCell>{row.instructorEmail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </CardContent>
    </Card>
  )
}

export default EventTable
