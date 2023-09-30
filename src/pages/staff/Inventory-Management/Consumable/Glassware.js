import React, { useState,useEffect } from 'react';
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
  Button,
} from '@mui/material';

// Import the InventoryForm component
import InventoryForm from './GlasswareForm';
import apiDefinitions from 'src/api/apiDefinitions';

const tableStyle = {
  minWidth: 650,
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '10px',
};

const tableHeaderCellStyle = {
  fontWeight: 'bold',
  borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
};

const titleStyle = {
  marginBottom: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};



const InventoryTable = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    apiDefinitions
      .getAllGlasswares()
      .then(res => {
        console.log(res.data)
        setData(res.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  // Sample data for the table

  // State for search
  const [searchText, setSearchText] = useState('')

  // State for the form dialog
  const [openForm, setOpenForm] = useState(false)

  // State for editing item
  const [editItem, setEditItem] = useState(null)

  // Function to filter data based on search text
  // Function to filter data based on search text
  // Function to filter data based on search text
  // Function to filter data based on search text
  // ...
  // Function to filter data based on search text
const filteredData = data
  ? data.filter(row => {
      const searchTextLower = searchText.toLowerCase()
      const isMatch =
        (row.inventoryNo && row.inventoryNo.toString().includes(searchTextLower)) ||
        (row.inventoryName && row.inventoryName.toLowerCase().includes(searchTextLower)) ||
        (row.availability && row.availability.toString().includes(searchTextLower)) ||
        (row.newly && row.newly.toString().includes(searchTextLower)) ||
        (row.broken && row.broken.toString().includes(searchTextLower)) ||
        (row.returns && row.returns.toString().includes(searchTextLower)) ||
        (row.balance && row.balance.toString().includes(searchTextLower))

      return isMatch
    })
  : []





  // ...

  // Function to add new inventory details
  const addInventoryDetails = formData => {
    // Add the new data to the existing data
    setData([...data, formData])
  }

  // Function to edit inventory details
  const editInventoryDetails = (index, updatedData) => {
    const updatedDataArray = [...data]
    updatedDataArray[index] = updatedData
    setData(updatedDataArray)
    setEditItem(null) // Reset editItem state after editing
  }

  // Function to delete inventory details
  const deleteInventoryDetails = index => {
    const updatedDataArray = [...data]
    updatedDataArray.splice(index, 1)
    setData(updatedDataArray)
  }

  return (
    <Card elevation={3}>
      <CardContent>
        <Box style={titleStyle}>
          <Typography variant='h5'>Glassware Details</Typography>
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
                <TableCell style={tableHeaderCellStyle}>Inventory No</TableCell>
                <TableCell style={tableHeaderCellStyle}>Inventory Name</TableCell>
                <TableCell style={tableHeaderCellStyle}>Availability</TableCell>
                <TableCell style={tableHeaderCellStyle}>Newly Arrivals</TableCell>
                <TableCell style={tableHeaderCellStyle}>Broken</TableCell>
                <TableCell style={tableHeaderCellStyle}>Returns</TableCell>
                <TableCell style={tableHeaderCellStyle}>Balance</TableCell>
                <TableCell style={tableHeaderCellStyle}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={row.inventory_id}>
                  <TableCell>{row.inventory_id}</TableCell>
                  <TableCell>{row.inventory_name}</TableCell>
                  <TableCell>{row.availability}</TableCell>
                  <TableCell>{row.newly}</TableCell>
                  <TableCell>{row.broken}</TableCell>
                  <TableCell>{row.returns}</TableCell>
                  <TableCell>{row.availability + row.newly - row.broken - row.returns}</TableCell>
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
                      onClick={() => deleteInventoryDetails(index)}
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
        onSubmit={editItem ? formData => editInventoryDetails(data.indexOf(editItem), formData) : addInventoryDetails}
        editItem={editItem} // Pass the editItem data to InventoryForm
      />
    </Card>
  )
};

export default InventoryTable;


