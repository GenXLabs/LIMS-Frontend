import Icon from 'src/@core/components/icon'
import React from 'react'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material'

const PracticalManual = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={4}>
                <Icon icon='uiw:file-pdf' fontSize={120} />
              </Grid>
              <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Title</Typography>
                <Typography variant='h6'>Module Category</Typography>
                <Typography variant='h6'>Description</Typography>
                <Button variant='contained' startIcon={<Icon icon='humbleicons:download' />}>
                  Download
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={4}>
                <Icon icon='uiw:file-pdf' fontSize={120} />
              </Grid>
              <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Title</Typography>
                <Typography variant='h6'>Module Category</Typography>
                <Typography variant='h6'>Description</Typography>
                <Button variant='contained' startIcon={<Icon icon='humbleicons:download' />}>
                  Download
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={4}>
                <Icon icon='uiw:file-pdf' fontSize={120} />
              </Grid>
              <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Title</Typography>
                <Typography variant='h6'>Module Category</Typography>
                <Typography variant='h6'>Description</Typography>
                <Button variant='contained' startIcon={<Icon icon='humbleicons:download' />}>
                  Download
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={4}>
                <Icon icon='uiw:file-pdf' fontSize={120} />
              </Grid>
              <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Title</Typography>
                <Typography variant='h6'>Module Category</Typography>
                <Typography variant='h6'>Description</Typography>
                <Button variant='contained' startIcon={<Icon icon='humbleicons:download' />}>
                  Download
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PracticalManual
