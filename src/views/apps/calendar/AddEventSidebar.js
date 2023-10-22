// ** React Imports
import { useState, useEffect, forwardRef, useCallback, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Custom Component Imports
import CustomInput from './PickersCustomInput'

import smsService from 'src/api/sendSMS'

import apiDefinitions from 'src/api/apiDefinitions'

const defaultState = {
  description: '',
  calendar: 'LAB-01',
  startDate: new Date(),
  title: '',
  startTime: new Date(),
  endTime: new Date()
}

const AddEventSidebar = props => {
  const userData = JSON.parse(localStorage.getItem('userData'))

  // ** Props
  const {
    store,
    dispatch,
    addEvent,
    updateEvent,
    drawerWidth,
    calendarApi,
    deleteEvent,
    handleSelectEvent,
    addEventSidebarOpen,
    handleAddEventSidebarToggle
  } = props

  // ** States
  const [values, setValues] = useState(defaultState)

  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())

  const emailID = 'sandupa.isum@gmail.com'
  const smsNumber = '767912651'

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { title: '' } })

  const handleSidebarClose = async () => {
    setValues(defaultState)
    clearErrors()
    dispatch(handleSelectEvent(null))
    handleAddEventSidebarToggle()
  }

  const onSubmit = data => {
    // Convert startTime and endTime to hh:mm:ss format in 24-hour clock format
    const startTimeFormatted = startTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })

    const endTimeFormatted = endTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })

    const modifiedEvent = {
      title: data.title,
      batch: data.batch || 'Test Batch', // Include batch (you can change the default value as needed)
      venue: values.calendar, // Use values.calendar as the venue
      date: values.startDate.toISOString().split('T')[0], // Extract date in ISO-8601 format
      startTime: startTimeFormatted, // Use formatted start time
      endTime: endTimeFormatted, // Use formatted end time
      description: values.description,
      userID: userData.id
    }

    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      dispatch(addEvent(modifiedEvent))
    } else {
      dispatch(updateEvent({ id: store.selectedEvent.id, ...modifiedEvent }))
    }
    calendarApi.refetchEvents()

    const createdMessageEmail = `
  <p>Your reservation request for <strong>${modifiedEvent.venue}</strong> has been successfully created.</p>
  <p>Date: <strong>${modifiedEvent.date}</strong></p>
  <p>Time: <strong>${modifiedEvent.startTime} - ${modifiedEvent.endTime}</strong></p>
`

    const createdMessageSMS = `Your reservation request for ${modifiedEvent.venue} has been successfully created.\nDate: ${modifiedEvent.date}\nTime: ${modifiedEvent.startTime} - ${modifiedEvent.endTime}`

    smsService
      .login()
      .then(token => {
        console.log('Login successful. Token:', token)

        smsService
          .sendSMS(smsNumber, createdMessageSMS, token)
          .then(response => {
            console.log('SMS sent successfully:', response)
          })
          .catch(error => {
            console.error('Error sending SMS:', error)
          })
      })
      .catch(error => {
        console.error('Login failed:', error)
      })

    const emailPayload = {
      recipient: emailID,
      subject: 'Lab Reservation Created - KIU LIMS',
      content: createdMessageEmail
    }

    apiDefinitions
      .sendEmail(emailPayload)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    handleSidebarClose()

    // window.location.reload()
  }

  const handleStartDate = date => {
    if (date > values.endDate) {
      setValues({ ...values, startDate: new Date(date), endDate: new Date(date) })
    }
  }

  const resetToStoredValues = useCallback(() => {
    if (store.selectedEvent !== null) {
      const event = store.selectedEvent
      setValue('title', event.title || '')

      const extendedProps = event.extendedProps || {} // Check if extendedProps exists
      setValues({
        description: extendedProps.description || '', // Access description inside extendedProps if it exists
        calendar: extendedProps.calendar || 'LAB-01',
        startDate: event.start !== null ? event.start : new Date()
      })
    }
  }, [setValue, store.selectedEvent])

  const resetToEmptyValues = useCallback(() => {
    setValue('title', '')
    setValues(defaultState)
  }, [setValue])
  useEffect(() => {
    if (store.selectedEvent !== null) {
      resetToStoredValues()
    } else {
      resetToEmptyValues()
    }
  }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, store.selectedEvent])

  const PickersComponent = forwardRef(({ ...props }, ref) => {
    return (
      <CustomTextField
        inputRef={ref}
        fullWidth
        {...props}
        label={props.label || ''}
        sx={{ width: '100%' }}
        error={props.error}
      />
    )
  })

  const RenderSidebarFooter = () => {
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      return (
        <Fragment>
          <Button type='submit' variant='contained' sx={{ mr: 4 }}>
            Add
          </Button>
          <Button variant='tonal' color='secondary' onClick={resetToEmptyValues}>
            Reset
          </Button>
        </Fragment>
      )
    }
  }

  return (
    <Drawer
      anchor='right'
      open={addEventSidebarOpen}
      onClose={handleSidebarClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: ['100%', drawerWidth] } }}
    >
      <Box
        className='sidebar-header'
        sx={{
          p: 6,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant='h5'>
          {store.selectedEvent !== null && store.selectedEvent.title.length ? 'Event Details' : 'Add Event'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {store.selectedEvent !== null && store.selectedEvent.title.length ? (
            <IconButton
              size='small'
              onClick={handleDeleteEvent}
              sx={{ color: 'text.primary', mr: store.selectedEvent !== null ? 1 : 0 }}
            >
              <Icon icon='tabler:trash' fontSize='1.25rem' />
            </IconButton>
          ) : null} */}
          <IconButton
            size='small'
            onClick={handleSidebarClose}
            sx={{
              p: '0.375rem',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
              }
            }}
          >
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </IconButton>
        </Box>
      </Box>
      <Box className='sidebar-body' sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <DatePickerWrapper>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <Controller
              name='title'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  label='Title'
                  value={value}
                  sx={{ mb: 4 }}
                  onChange={onChange}
                  placeholder='Event Title'
                  disabled={store.selectedEvent !== null && store.selectedEvent.title.length ? true : false}
                  error={Boolean(errors.title)}
                  {...(errors.title && { helperText: 'This field is required' })}
                />
              )}
            />
            <CustomTextField
              select
              fullWidth
              sx={{ mb: 4 }}
              label='Venue'
              disabled={store.selectedEvent !== null && store.selectedEvent.title.length ? true : false}
              SelectProps={{
                value: values.calendar,
                onChange: e => setValues({ ...values, calendar: e.target.value })
              }}
              error={Boolean(errors.calendar)}
              {...(errors.calendar && { helperText: 'This field is required' })}
            >
              <MenuItem value='LAB-01'>LAB-01</MenuItem>
              <MenuItem value='LAB-02'>LAB-02</MenuItem>
            </CustomTextField>
            <Box sx={{ mb: 4 }}>
              <DatePicker
                selectsStart
                id='event-start-date'
                disabled={store.selectedEvent !== null && store.selectedEvent.title.length ? true : false}
                selected={values.startDate}
                dateFormat={'yyyy-MM-dd'}
                customInput={<PickersComponent label='Date' registername='startDate' />}
                onChange={date => setValues({ ...values, startDate: new Date(date) })}
                onSelect={handleStartDate}
                error={errors.startDate}
                {...(errors.startDate && { helperText: 'This field is required' })}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <DatePicker
                showTimeSelect
                selected={startTime}
                timeIntervals={15}
                disabled={store.selectedEvent !== null && store.selectedEvent.title.length ? true : false}
                showTimeSelectOnly
                dateFormat='h:mm aa'
                id='time-only-picker'
                onChange={date => setStartTime(date)}
                customInput={<CustomInput label='Start Time' />}
                error={errors.startTime}
                {...(errors.startTime && { helperText: 'This field is required' })}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <DatePicker
                showTimeSelect
                selected={endTime}
                timeIntervals={15}
                disabled={store.selectedEvent !== null && store.selectedEvent.title.length ? true : false}
                showTimeSelectOnly
                dateFormat='h:mm aa'
                id='time-only-picker'
                onChange={date => setEndTime(date)}
                customInput={<CustomInput label='End Time' />}
                error={errors.endTime}
                {...(errors.endTime && { helperText: 'This field is required' })}
              />
            </Box>

            <CustomTextField
              rows={4}
              multiline
              fullWidth
              sx={{ mb: 6.5 }}
              disabled={store.selectedEvent !== null && store.selectedEvent.title.length ? true : false}
              label='Description'
              id='event-description'
              value={values.description}
              onChange={e => setValues({ ...values, description: e.target.value })}
              error={errors.description}
              {...(errors.description && { helperText: 'This field is required' })}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RenderSidebarFooter />
            </Box>
          </form>
        </DatePickerWrapper>
      </Box>
    </Drawer>
  )
}

export default AddEventSidebar
