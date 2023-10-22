// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import Anatomy from './Anatomy'
import Instruments from './Instruments'

const TabsNav = () => {
  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label='nav tabs example'>
        <Tab value='1' component='a' label='Anatomy' href='/drafts' onClick={e => e.preventDefault()} />
        <Tab value='2' component='a' label='Instruments' href='/trash' onClick={e => e.preventDefault()} />
        
      </TabList>
      <TabPanel value='1'>
        <Anatomy/>
      </TabPanel>
      <TabPanel value='2'>
       <Instruments/>
      </TabPanel>
    </TabContext>
  )
}

export default TabsNav
