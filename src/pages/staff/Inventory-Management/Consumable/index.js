// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'

import Glassware from './Glassware'

import Reagents from './Reagents'

const TabsSimple = () => {
  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label='simple tabs example'>
        <Tab value='1' label='Glassware' />
        <Tab value='2' label='Reagents' />
        
      </TabList>
      <TabPanel value='1'>
        <Glassware />
      </TabPanel>
      <TabPanel value='2'>
        <Reagents />
      </TabPanel>
     
    </TabContext>
  )
}

export default TabsSimple
