// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import All from './tables/all'
import Approved from './tables/approved'
import Completed from './tables/completed'
import Declined from './tables/declined'
import PendingApproval from './tables/pending-approval'
import UserDeleted from './tables/user-deleted'

const CardNavigation = () => {
  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example' sx={{ '& .MuiTab-root': { py: 3.5 } }}>
          <Tab value='1' label='All' />
          <Tab value='2' label='Pending Approval' />
          <Tab value='3' label='Approved' />
          <Tab value='4' label='Completed' />
          <Tab value='5' label='Declined' />
          <Tab value='6' label='User Deleted' />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            <All />
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0 }}>
            <PendingApproval />
          </TabPanel>
          <TabPanel value='3' sx={{ p: 0 }}>
            <Approved />
          </TabPanel>
          <TabPanel value='4' sx={{ p: 0 }}>
            <Completed />
          </TabPanel>
          <TabPanel value='5' sx={{ p: 0 }}>
            <Declined />
          </TabPanel>
          <TabPanel value='6' sx={{ p: 0 }}>
            <UserDeleted />
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default CardNavigation
