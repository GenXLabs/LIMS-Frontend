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


const TabsNav = () => {
  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label='nav tabs example'>
        <Tab value='1' component='a' label='Glassware' href='/drafts' onClick={e => e.preventDefault()} />
        <Tab value='2' component='a' label='Reagents' href='/trash' onClick={e => e.preventDefault()} />
        
      </TabList>
      <TabPanel value='1'>
      <Glassware/>
      </TabPanel>
      <TabPanel value='2'>
       <Reagents/>
      </TabPanel>
    </TabContext>
  )
}

export default TabsNav
