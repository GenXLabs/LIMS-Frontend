// ** React Imports
import { useState } from 'react'
import Timetable1 from './Timetable1'
import Timetable2 from './timetable2'
import TableFilter from './TableFilter'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TabsIcon = () => {
  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label='icon tabs example'>
        <Tab value='1' label='Timetable-LAB 01' icon={<Icon icon='mdi:timetable' />} />
        <Tab value='2' label='Timetable-LAB 02' icon={<Icon icon='mdi:timetable' />} />
        <Tab value='3' label='Scheduled Events' icon={<Icon icon='mdi:events-check' />} />
        
      </TabList>


      <TabPanel value='1'>
        <Timetable1 />
      </TabPanel>


      <TabPanel value='2'>
      <Timetable2 />
      </TabPanel>

      <TabPanel value='3'>
        <TableFilter/>
      </TabPanel>

    </TabContext>
  )
}

export default TabsIcon
