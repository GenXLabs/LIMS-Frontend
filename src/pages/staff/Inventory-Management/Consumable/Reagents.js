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
  IconButton,
  InputAdornment,
  Button
} from '@mui/material'

// Import the InventoryForm component
import InventoryForm from './ReagentsForm'

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

const InventoryTable = () => {
  // Sample data for the table
  const [data, setData] = useState([
    {
      chemicalName: 'Chemical A',
      type: 'Type A',
      msdsLocation: 'Location A',
      hazardClass: 'Class A',
      maxQuantity: 100,
      balance: 50
    },
    {
      chemicalName: 'Chemical B',
      type: 'Type B',
      msdsLocation: 'Location B',
      hazardClass: 'Class B',
      maxQuantity: 150,
      balance: 75
    },
    {
      chemicalName: 'Chemical C',
      type: 'Type C',
      msdsLocation: 'Location C',
      hazardClass: 'Class C',
      maxQuantity: 200,
      balance: 100
    }
  ])

  // State for search
  const [searchText, setSearchText] = useState('')

  // State for the form dialog
  const [openForm, setOpenForm] = useState(false)

  // State for editing item
  const [editItem, setEditItem] = useState(null)

  // Function to filter data based on search text
  const filteredData = data.filter(
    row =>
      row.chemicalName.includes(searchText) ||
      row.type.toLowerCase().includes(searchText.toLowerCase()) ||
      row.msdsLocation.toLowerCase().includes(searchText.toLowerCase()) ||
      row.hazardClass.toLowerCase().includes(searchText.toLowerCase())
  )

  // Function to add new chemical details
  const addChemicalDetails = formData => {
    // Add the new data to the existing data
    setData([...data, formData])
  }

  // Function to edit chemical details
  const editChemicalDetails = (index, updatedData) => {
    const updatedDataArray = [...data]
    updatedDataArray[index] = updatedData
    setData(updatedDataArray)
    setEditItem(null) // Reset editItem state after editing
  }

  // Function to delete chemical details
  const deleteChemicalDetails = index => {
    const updatedDataArray = [...data]
    updatedDataArray.splice(index, 1)
    setData(updatedDataArray)
  }

  return (
    <Card elevation={3}>
      <CardContent>
        <Box style={titleStyle}>
          <Typography variant='h5'>Chemical Details</Typography>
        </Box>
        <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <TextField
            label='Search'
            variant='outlined'
            size='small'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setSearchText('')} size='small'>
                    Clear
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            variant='contained'
            color='primary'
            style={{ marginLeft: '706px' }}
            onClick={() => {
              setOpenForm(true)
              setEditItem(null) // Reset editItem when adding a new item
            }}
          >
            + Add Details
          </Button>
        </Box>
        <Paper elevation={0}>
          <Table style={tableStyle}>
            <TableHead>
              <TableRow>
                <TableCell style={tableHeaderCellStyle}>Name of the chemical</TableCell>
                <TableCell style={tableHeaderCellStyle}>Type</TableCell>
                <TableCell style={tableHeaderCellStyle}>MSDs location</TableCell>
                <TableCell style={tableHeaderCellStyle}>Hazard Class</TableCell>
                <TableCell style={tableHeaderCellStyle}>Maximum Quantity</TableCell>
                <TableCell style={tableHeaderCellStyle}>Balance</TableCell>
                <TableCell style={tableHeaderCellStyle}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={row.chemicalName}>
                  <TableCell>{row.chemicalName}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.msdsLocation}</TableCell>
                  <TableCell>{row.hazardClass}</TableCell>
                  <TableCell>{row.maxQuantity}</TableCell>
                  <TableCell>{row.balance}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setOpenForm(true)
                        setEditItem(row) // Set editItem to the selected row data
                      }}
                      size='small'
                      style={{
                        backgroundColor: '#684AFF',
                        color: 'white',
                        borderRadius: '8px',
                        marginRight: '7px',
                        width: '55px'
                      }}
                    >
                      Edit
                    </IconButton>
                    <IconButton
                      onClick={() => deleteChemicalDetails(index)}
                      size='small'
                      style={{ backgroundColor: '#FF4A4A', color: 'white', borderRadius: '8px' }}
                    >
                      Delete
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </CardContent>
      {/* Render the InventoryForm component as a dialog */}
      <InventoryForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={editItem ? formData => editChemicalDetails(data.indexOf(editItem), formData) : addChemicalDetails}
        editItem={editItem} // Pass the editItem data to InventoryForm
      />
    </Card>
  )
}

export default InventoryTable
