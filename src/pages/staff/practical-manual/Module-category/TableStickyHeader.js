/* eslint-disable react/jsx-no-undef */
// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'

// ** Custom Components
import QuickSearchToolbar from './QuickSearchToolbar'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
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

  const handleAddModuleClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const rows = [
    {
      id: '1',
      module_name: 'Module 1'
    },
    {
      id: '2',
      module_name: 'Module 2'
    },
    {
      id: '3',
      module_name: 'Module 3'
    },
    {
      id: '4',
      module_name: 'Module 4'
    },
    {
      id: '5',
      module_name: 'Module 5'
    }
  ]

  const columns = [
    {
      flex: 0.1,
      minWidth: 170,
      headerName: 'Name',
      field: 'name',
      valueGetter: params => new Date(params.value),
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.module_name} {params.row.last_name}
        </Typography>
      )
    },

    {
      flex: 0.1,
      minWidth: 170,
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'right',
      align:'right',
      renderCell: params => {
        return (
          <Box className='d-flex align-items-center'>
            <IconButton color='primary' onClick={handleAddModuleClick}>
              <Icon icon='fluent:edit-16-regular' />
            </IconButton>
            <IconButton color='primary' onClick={deleteSuccess}>
              <Icon icon='lucide:trash-2' />
            </IconButton>
          </Box>
        )
      }
    }
  ]

  // ** States
  const [data] = useState(rows)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const [isFormVisible, setIsFormVisible] = useState(false);



  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

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

  return (
    <div>
      {isFormVisible ? (
             <Card>
             <CardHeader title='' />
             <CardContent sx={{ minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Form onSubmit={e => e.preventDefault()}>
                 <Grid container spacing={5}>
                   <Grid item xs={12}>
                     <Typography variant='h5'>Edit Module Name</Typography>
                   </Grid>
                   <Grid item xs={12}>
                     <CustomTextField fullWidth label='' placeholder='Module 6' />
                   </Grid>


                   <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
                     <Button type='submit' variant='contained' sx={{ width: '100%' }} onClick={editSuccess}>
                       Edit module
                     </Button>
                   </Grid>
                 </Grid>
               </Form>
             </CardContent>
           </Card>
        ) : (
            <DataGrid
            autoHeight
            columns={columns}
            pageSizeOptions={[1, 2, 3, 4, 5]}
            paginationModel={paginationModel}
            slots={{ toolbar: QuickSearchToolbar }}
            onPaginationModelChange={setPaginationModel}
            rows={filteredData.length ? filteredData : data}
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
        )}
    </div>

  )
}

export default TableStickyHeaderColumns
