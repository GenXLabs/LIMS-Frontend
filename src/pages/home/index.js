// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import ApexAreaChart from './ApexAreaChart'
import ReservationTable from './all'

const data = [
  {
    stats: '230',
    title: 'Available',
    color: 'primary',
    icon: 'fluent:presence-available-10-regular'
  },
  {
    color: 'error',
    stats: '30',
    title: 'Broken',
    icon: 'mdi:glass-broken'
  },
  {
    color: 'info',
    stats: '62',
    title: 'Newly Arrival',
    icon: 'mdi:new-box'
  },
  {
    stats: '25',
    color: 'success',
    title: 'Return',
    icon: 'ph:key-return-fill'
  }
]

const Illustration = styled('img')(({ theme }) => ({
  right: 20,
  bottom: 0,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    right: 5,
    width: 110
  }
}))

const renderStats = () => {
  return data.map((sale, index) => (
    <Grid item xs={6} md={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' color={sale.color} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={sale.icon} fontSize='1.5rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'>{sale.stats}</Typography>
          <Typography variant='body2'>{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const Home = () => {
  return (
    <>
      {/* <Grid
        container
        spacing={6}
        sx={{ display: 'flex', minHeight: '110% !important', justifyContent: 'center', alignItems: 'center' }}
      >
        <img height='450' alt='page-under-construction' src='/images/pages/DashUnderProgress.png' />
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', minHeight: '100% !important', justifyContent: 'center', alignItems: 'center' }}
        >
          <Card>
            <CardHeader title='Student Dashboard'></CardHeader>
            <CardContent>
              <img height='400' alt='page-under-construction' src='/images/pages/DashUnderProgress.png' />
            </CardContent>
          </Card>
          <img height='400' alt='page-under-construction' src='/images/pages/DashUnderProgress.png' />
        </Grid>
      </Grid> */}
      <Grid container spacing={6}>
        <Grid item xs={4}>
          <Card sx={{ position: 'relative', minHeight: '100%' }}>
            <CardContent>
              <Typography variant='h4' sx={{ mb: 2, mt: 8 }}>
                Welcome Back!
              </Typography>
              <Typography sx={{ mb: 2, color: 'text.secondary' }} variant='h2'>
                John Doe
              </Typography>
              <Typography variant='h4' sx={{ mb: 3, color: 'primary.main' }}></Typography>
              {/* <Button variant='contained'>View Sales</Button> */}
              <Illustration width={116} alt='congratulations john' src='/images/cards/congratulations-john.png' />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <CardHeader
              title='Inventory Information'
              sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
              action={
                <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                  Updated Just Now
                </Typography>
              }
            />
            <CardContent
              sx={{ pt: theme => `${theme.spacing(7)} !important`, pb: theme => `${theme.spacing(7.5)} !important` }}
            >
              <Grid container spacing={6}>
                {renderStats()}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={7}>
          <Card sx={{ minHeight: '100%' }}>
            <CardHeader title='Upcoming Reservation' />
            <CardContent>
              <ReservationTable />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <ApexAreaChart />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
