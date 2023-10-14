import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'

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

import apiDefinitions from 'src/api/apiDefinitions'
import { toast } from 'react-hot-toast'

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
  const [data, setData] = useState([])

  const [inventoryNo, setInventoryNo] = useState('')
  const [inventoryName, setInventoryName] = useState('')
  const [availability, setAvailability] = useState('')
  const [newlyArrivals, setNewlyArrivals] = useState('')
  const [broken, setBroken] = useState('')
  const [returns, setReturns] = useState('')
  const [errors, setErrors] = useState({})
  const [rowId, setRowId] = useState('')

  const formData = {
    inventoryNo,
    inventory_name: inventoryName,
    availability,
    newly: newlyArrivals,
    broken,
    returns
  }

  // State for search
  const [searchText, setSearchText] = useState('')

  // State for the form dialog
  const [openForm, setOpenForm] = useState(false)

  // State for editing item
  const [editItem, setEditItem] = useState(null)

  const validateInventoryNo = value => {
    const regex = /^[iI]\d{3}$/

    return regex.test(value)
  }

  const validateNumeric = value => {
    const regex = /^\d+$/

    return regex.test(value)
  }

  const handleSubmit = () => {
    const newErrors = {}

    // // Validate inventoryNo
    // if (!validateInventoryNo(inventoryNo)) {
    //   newErrors.inventoryNo = 'Invalid inventory number. It should be I or i followed by 3 digits.';
    // }

    // // Validate availability, newlyArrivals, broken, and returns
    // if (!validateNumeric(availability)) {
    //   newErrors.availability = 'Availability should be numbers only.';
    // }

    // if (!validateNumeric(newlyArrivals)) {
    //   newErrors.newlyArrivals = 'Newly Arrivals should be numbers only.';
    // }

    // if (!validateNumeric(broken)) {
    //   newErrors.broken = 'Broken should be numbers only.';
    // }

    // if (!validateNumeric(returns)) {
    //   newErrors.returns = 'Returns should be numbers only.';
    // }

    // // If there are errors, set them and return
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   return;
    // }

    // Create an object with the form data

    // Pass the data to the parent component
    console.log(formData)

    apiDefinitions
      .addGlasswares(formData)
      .then(res => {
        console.log(res)
        toast.success('added successfully')
      })
      .catch(err => {
        console.error(err)
      })

    // Clear the form fields and errors
    setInventoryNo('')
    setInventoryName('')
    setAvailability('')
    setNewlyArrivals('')
    setBroken('')
    setReturns('')
    setErrors({})

    // Close the dialog
    onClose()
  }

  const handleDelete = id => {
    apiDefinitions
      .deleteGlasswares(id)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const handleEdit = id => {
    // Find the item to edit based on its id
    const itemToEdit = data.find(item => item.inventory_id === id)

    if (!itemToEdit) {
      console.error(`Item with id ${id} not found.`)

      return
    }

    setRowId(id)

    // Populate the form fields with the previous data
    setInventoryNo(itemToEdit.inventoryNo)
    setInventoryName(itemToEdit.inventory_name)
    setAvailability(itemToEdit.availability)
    setNewlyArrivals(itemToEdit.newly)
    setBroken(itemToEdit.broken)
    setReturns(itemToEdit.returns)

    setOpenForm(true)
    setEditItem(false) // Reset editItem when adding a new item
  }

  const handleUpdate = () => {
    const updatedData = {
      inventoryNo,
      inventory_name: inventoryName,
      availability,
      newly: newlyArrivals,
      broken,
      returns
    }

    console.log(rowId, updatedData)

    apiDefinitions
      .editGlasswares(rowId, updatedData)
      .then(res => {
        console.log(res)
        toast.success('updated successfully')
      })
      .catch(err => {
        console.error(err)
      })

    setOpenForm(false)
  }

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

  const handleAddDetails = () => {
    setOpenForm(true)
    setEditItem(null) // Reset editItem when adding a new item
  }

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

  const onClose = () => {
    setOpenForm(false)
  }

  return (
    <Card elevation={3}>
      <CardContent>
        <Box style={titleStyle}>
          <Typography variant='h5'>Glassware Details</Typography>
        </Box>
        <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          {/* <TextField
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
          /> */}
          <Button variant='contained' color='primary' style={{ marginLeft: '706px' }} onClick={handleAddDetails}>
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
              {data.map((row, index) => (
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
                      onClick={() => handleEdit(row.inventory_id)}
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
                      onClick={() => handleDelete(row.inventory_id)}
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
      {openForm && (
        <Dialog open={open} onClose={onClose}>
          <DialogTitle style={{ fontWeight: 'bold', fontSize: '20px' }}>
            {editItem ? 'Edit Glassware Details' : 'Add New Glassware Details'}
          </DialogTitle>
          <DialogContent>
            <TextField
              label='Inventory No'
              fullWidth
              value={inventoryNo}
              onChange={e => setInventoryNo(e.target.value)}
              margin='normal'
              error={Boolean(errors.inventoryNo)}
              helperText={errors.inventoryNo}
            />
            <TextField
              label='Inventory Name'
              fullWidth
              value={inventoryName}
              onChange={e => setInventoryName(e.target.value)}
              margin='normal'
            />
            <TextField
              label='Availability'
              fullWidth
              value={availability}
              onChange={e => setAvailability(e.target.value)}
              margin='normal'
              error={Boolean(errors.availability)}
              helperText={errors.availability}
            />
            <TextField
              label='Newly Arrivals'
              fullWidth
              value={newlyArrivals}
              onChange={e => setNewlyArrivals(e.target.value)}
              margin='normal'
              error={Boolean(errors.newlyArrivals)}
              helperText={errors.newlyArrivals}
            />
            <TextField
              label='Broken'
              fullWidth
              value={broken}
              onChange={e => setBroken(e.target.value)}
              margin='normal'
              error={Boolean(errors.broken)}
              helperText={errors.broken}
            />
            <TextField
              label='Returns'
              fullWidth
              value={returns}
              onChange={e => setReturns(e.target.value)}
              margin='normal'
              error={Boolean(errors.returns)}
              helperText={errors.returns}
            />
            {editItem ? (
              <Button variant='contained' color='primary' onClick={handleSubmit}>
                submit
              </Button>
            ) : (
              <Button variant='contained' color='primary' onClick={() => handleUpdate()}>
                update
              </Button>
            )}
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}

export default InventoryTable
