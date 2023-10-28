import { Button, Card, CardContent, Grid } from '@mui/material'
import { useState } from 'react'

// ** MUI Imports
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Custom Component Imports
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CustomInput from './PickersCustomInput'

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import toast from 'react-hot-toast'

import apiDefinitions from 'src/api/apiDefinitions'

const statuses = [
  { id: 0, label: 'All' },
  { id: 1, label: 'Pending Approval' },
  { id: 2, label: 'Approved' },
  { id: 3, label: 'Completed' },
  { id: 4, label: 'User Canceled' },
  { id: 5, label: 'Declined' }
]

const GenerateReport = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  const getFilterStatusId = status => {
    const statusfiltered = statuses.find(item => item.label === status)

    return statusfiltered ? statusfiltered.id : null
  }

  const generateReport = () => {
    if (startDate === '' || endDate === '') {
      toast.error('Error Generating Report! Please select a date range.')

      // alert('Please select a date range')

      return
    }

    // initialize jsPDF
    const doc = new jsPDF({
      orientation: 'landscape'
    })

    // define the columns we want and their titles
    const tableColumn = ['ID', 'Requested By', 'Requester Email', 'Batch', 'Venue', 'Date', 'Time', 'Status']

    // define an empty array of rows
    const tableRows = []

    let filteredData

    apiDefinitions.getAllLabReservations().then(res => {
      const reservations = res.data.data

      if (filterStatus === 'All') {
        // Filter based on date range only
        filteredData = reservations.filter(item => new Date(item.date) >= startDate && new Date(item.date) <= endDate)
      } else {
        const filter = getFilterStatusId(filterStatus)

        // Filter based on both status and date range
        filteredData = reservations.filter(
          item => item.status === filter && new Date(item.date) >= startDate && new Date(item.date) <= endDate
        )
      }

      filteredData.forEach((item, index) => {
        item.id = index + 1
      })

      // Now, perform the mapping when you have the data
      filteredData.map(item => {
        const time = item.start_time + ' - ' + item.end_time
        const statusLabel = statuses.find(status => status.id === item.status).label

        const rowData = [
          item.id,
          item.requester_full_name,
          item.requester_email,
          item.batch,
          item.venue,
          item.date,
          time,
          statusLabel
        ]

        // push each reservation's info into a row
        tableRows.push(rowData)
      })

      console.log(tableRows)

      // const date = Date().split('')

      const currentDate = new Date()

      const day = String(currentDate.getDate()).padStart(2, '0')
      const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Month is 0-based, so we add 1
      const year = currentDate.getFullYear()

      const hours = String(currentDate.getHours()).padStart(2, '0')
      const minutes = String(currentDate.getMinutes()).padStart(2, '0')
      const amOrPm = currentDate.getHours() >= 12 ? 'PM' : 'AM'

      const formattedDate = `${day}-${month}-${year}_${hours}.${minutes}${amOrPm}`

      // console.log(formattedDate)

      // we use a date string to generate our filename.
      // const dateStr = date[0]

      function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0') // Month is 0-based, so we add 1
        const year = date.getFullYear()

        return `${day}-${month}-${year}`
      }

      const startDateFormatted = formatDate(startDate)
      const endDateFormatted = formatDate(endDate)

      // console.log(startDateFormatted) // Output: "dd-mm-yyyy" format for startDate
      // console.log(endDateFormatted) // Output: "dd-mm-yyyy" format for endDate

      const center = doc.internal.pageSize.getWidth() / 2

      // title. and margin-top + margin-left
      doc.text(`${filterStatus} Lab Reservations from ${startDateFormatted} to ${endDateFormatted}`, center, 15, {
        align: 'center'
      })

      // startY is basically margin-top
      doc.autoTable({ head: [tableColumn], body: tableRows, startY: 25, theme: 'grid' })

      // we define the name of our PDF file.
      doc.save(
        `${filterStatus} Lab Reservations from ${startDateFormatted} to ${endDateFormatted}_${formattedDate}.pdf`
      )

      toast.success('Report Downloaded Successfully!')

      setStartDate('')
      setEndDate('')
      setFilterStatus('All')
    })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <DatePickerWrapper>
                      <DatePicker
                        showYearDropdown
                        showMonthDropdown
                        fullWidth
                        selected={startDate}
                        id='month-year-dropdown-start'
                        placeholderText='MM-DD-YYYY'
                        onChange={date => setStartDate(date)}
                        customInput={<CustomInput fullWidth label='From' />}
                      />
                    </DatePickerWrapper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DatePickerWrapper>
                      <DatePicker
                        showYearDropdown
                        showMonthDropdown
                        fullWidth
                        selected={endDate}
                        id='month-year-dropdown-end'
                        placeholderText='MM-DD-YYYY'
                        onChange={date => setEndDate(date)}
                        customInput={<CustomInput fullWidth label='To' />}
                        minDate={startDate} // Set the maximum date to the selected end date
                      />
                    </DatePickerWrapper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-outlined-label'>Reservation Status</InputLabel>
                      <Select
                        fullWidth
                        label='Reservation Status'
                        value={filterStatus}
                        id='demo-simple-select-outlined'
                        labelId='demo-simple-select-outlined-label'
                        onChange={e => setFilterStatus(e.target.value)}
                      >
                        {statuses.map(status => (
                          <MenuItem key={status.id} value={status.label}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Button variant='contained' onClick={generateReport} fullWidth>
                      Generate Report
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default GenerateReport
