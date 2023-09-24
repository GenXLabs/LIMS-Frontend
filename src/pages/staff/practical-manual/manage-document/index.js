import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import QuickSearchToolbar from './QuickSearchToolbar'


import Grid from '@mui/material/Grid'
import CustomTextField from 'src/@core/components/mui/text-field'
import { styled } from '@mui/material/styles'

import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

// Styled component for the form
const Form = styled('form')(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`
}))


const TableStickyHeaderColumns = () => {

  const rows = [
    {
      id: '1',
      module_name: 'Doument 1'
    },
    {
      id: '2',
      module_name: 'Doument 2'
    },
    {
      id: '3',
      module_name: 'Doument 3'
    },
    {
      id: '4',
      module_name: 'Doument 4'
    },
    {
      id: '5',
      module_name: 'Doument 5'
    }
  ]

  const columns = [
    {
      flex: 0.1,
      minWidth: 170,
      headerName: 'Name',
      field: 'module_name', // Use 'module_name' here to match your data
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.value}
        </Typography>
      )
    },


    {
      flex: 0.1,
      minWidth: 170,
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'right',
      align: 'right',
      renderCell: params => {
        return (
          <div className='d-flex align-items-center'>
            <IconButton color='Success' onClick={toggleDownloadAlert}>
              <Icon icon='material-symbols:download' />
            </IconButton>
            <IconButton color='error' onClick={deleteSuccess}>
              <Icon icon='lucide:trash-2' />
            </IconButton>
            <Button variant='contained' endIcon={<Icon icon='tabler:Edit' />} onClick={handleAddModuleClick}>
              Edit
            </Button>
          </div>
        )
      }
    }
  ]

  const handleAddModuleClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };


  const editSuccess = () =>{
    Swal.fire({
      icon:'success',
      title: 'Changes Saved Successfully...!',
      showDenyButton: true,
      confirmButtonText: 'Continue',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleCloseForm();
      } else if (result.isDenied) {
        handleCloseForm();
      }
    })
  }


  const deleteSuccess = () =>{
    Swal.fire({
      icon:'question',
      title: 'Are you sure want to Delete?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Deleted', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Not Deleted', '', 'error')
      }
    })
  }

  const toggleDownloadAlert = () => {
    // setShowDownloadAlert(true);

    // // Hide the alert after a delay (e.g., 3 seconds)
    // setTimeout(() => {
    //   setShowDownloadAlert(false);
    // }, 3000); // 3000 milliseconds = 3 seconds

    // // Add your download logic here
    // // You can trigger the actual download process here
    Swal.fire({
      icon: 'success',
      title: 'Successfully Downloaded',
      text: 'Successfully Downloaded — check it out!',
      confirmButtonText: 'Ok'
    })
  };

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [data] = useState(rows)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString())
      })
    })

    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  return (

        <div>
        {isFormVisible ? (
               <Card>
               <CardHeader title='' />
               <CardContent sx={{ minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Form onSubmit={e => e.preventDefault()}>
                   <Grid container spacing={5}>
                     <Grid item xs={12}>
                       <Typography variant='h5'>Edit Doument Name</Typography>
                     </Grid>
                     <Grid item xs={12}>
                       <CustomTextField fullWidth label='' placeholder='Doument Name' />
                     </Grid>


                     <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
                       <Button type='submit' variant='contained' sx={{ width: '100%' }} onClick={editSuccess}>
                         Edit Doument name
                       </Button>
                     </Grid>
                   </Grid>
                 </Form>
               </CardContent>
             </Card>
          ) : (
            <Card>
              <CardHeader title='Manage Document' action={<Button variant='contained'>View Module</Button>} />
              <CardContent>
                <DataGrid
                  autoHeight
                  columns={columns}
                  pageSizeOptions={[1, 2, 3, 4, 5]}
                  paginationModel={paginationModel}
                  rows={filteredData.length ? filteredData : data}
                  onPaginationModelChange={setPaginationModel}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: '1.125rem'
                    }
                  }}
                  slotProps={{
                    baseButton: {
                      size: 'medium',
                      variant: 'outlined'
                    },
                    toolbar: {
                      value: searchText,
                      clearSearch: () => handleSearch(''),
                      onChange: event => handleSearch(event.target.value)
                    }
                  }}
                />
              </CardContent>
            </Card>
          )}
      </div>
  )
}

export default TableStickyHeaderColumns
