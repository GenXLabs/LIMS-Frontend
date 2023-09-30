import Icon from 'src/@core/components/icon'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, Grid, MenuItem, Typography } from '@mui/material'
import apiDefinitions from 'src/api/apiDefinitions'
import toast from 'react-hot-toast'
import CustomTextField from 'src/@core/components/mui/text-field'

const PracticalManual = () => {
  const [allPracticalManuals, setAllPracticalManuals] = useState([])
  const [allModuleCategories, setAllModuleCategories] = useState([])
  const [moduleCategoryMap, setModuleCategoryMap] = useState({})
  const [moduleCategory, setModuleCategory] = useState('all') // Set the value to 'all' initially
  const [filteredModuleCategories, setFilteredModuleCategories] = useState([])

  useEffect(() => {
    apiDefinitions
      .getAllPracticalManuals()
      .then(res => {
        const filteredData = res.data.data.filter(manual => manual.deleted_at == null)
        setAllPracticalManuals(filteredData)
      })
      .catch(err => {
        console.log(err)
      })

    apiDefinitions
      .getAllModuleCategories()
      .then(res => {
        const moduleCategoryData = res.data.data
        setAllModuleCategories(moduleCategoryData)

        // Create a mapping between module category IDs and names
        const categoryMap = {}
        moduleCategoryData.forEach(category => {
          categoryMap[category.category_id] = category.category_name
        })
        setModuleCategoryMap(categoryMap)

        // Filter module categories based on deleted_at property
        const filteredCategories = moduleCategoryData.filter(category => category.deleted_at === null)
        setFilteredModuleCategories(filteredCategories)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleDownloadPDF = manual => {
    apiDefinitions
      .getPDFByManualID(manual.manual_id)
      .then(res => {
        console.log(res)

        toast.success('Practical Manual Downloaded Successfully')

        // Create a URL for the blob data
        const url = window.URL.createObjectURL(new Blob([res.data]))

        // Create a temporary link element and trigger a download
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${manual.title}_manual_${manual.manual_id}.pdf`)
        document.body.appendChild(link)
        link.click()

        // Clean up
        window.URL.revokeObjectURL(url)
      })
      .catch(err => {
        console.log(err)
        toast.error('Error Downloading Practical Manual')
      })
  }

  // Filter practical manuals based on the selected module category
  const filteredManuals = allPracticalManuals.filter(manual => {
    if (moduleCategory === 'all') {
      return true // Return all manuals when "All Categories" is selected
    }

    return manual.module_category === moduleCategory
  })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid item xs={4}>
              <CustomTextField
                select
                label='Filter By Module Category'
                id='custom-select'
                fullWidth
                value={moduleCategory}
                onChange={e => setModuleCategory(e.target.value)}
              >
                <MenuItem value='all'>All Categories</MenuItem>
                {filteredModuleCategories.map(moduleCategoryItem => (
                  <MenuItem key={moduleCategoryItem.category_id} value={moduleCategoryItem.category_id}>
                    {moduleCategoryItem.category_name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {filteredManuals.map(manual => (
        <Grid item xs={6} key={manual.id}>
          <div
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
            className='card-container'
          >
            <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }} className='card'>
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon icon='uiw:file-pdf' fontSize={120} />
                  </Grid>
                  <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography variant='body2'>
                      <strong>Title:</strong> {manual.title}
                    </Typography>
                    <Typography variant='body2'>
                      <strong>Module Category:</strong> {moduleCategoryMap[manual.module_category]}
                    </Typography>
                    <Typography variant='body2'>
                      <strong>Description:</strong> {manual.description}
                    </Typography>
                    <Button
                      variant='contained'
                      startIcon={<Icon icon='humbleicons:download' />}
                      sx={{ mt: 5 }}
                      onClick={() => handleDownloadPDF(manual)}
                    >
                      Download
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </Grid>
      ))}
    </Grid>
  )
}

export default PracticalManual
