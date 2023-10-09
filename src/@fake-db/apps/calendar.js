// ** Mock Adapter
import mock from 'src/@fake-db/mock'

const date = new Date()
const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1) // Corrected
const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1) // Corrected

import apiDefinitions from 'src/api/apiDefinitions' // Import your API definitions

const data = {
  events: [] // Initialize events as an empty array
}

async function fetchCalendarEvents(calendars) {
  try {
    // Call your API to get calendar events
    const response = await apiDefinitions.getAllLabReservations() // Replace with your actual API call

    if (response.status === 200) {
      // Assuming that the event data is under the 'data' property
      const apiEvents = response.data.data

      // Filter events where status is 2 or 3
      const filteredEvents = apiEvents.filter(apiEvent => apiEvent.status === 2 || apiEvent.status === 3)

      // Convert API response format to data.events format
      data.events = filteredEvents.map(apiEvent => ({
        id: apiEvent.reservation_id,
        title: apiEvent.title,
        batch: apiEvent.batch,
        venue: apiEvent.venue,
        start: `${apiEvent.date}T${apiEvent.start_time}`,
        end: `${apiEvent.date}T${apiEvent.end_time}`,
        description: apiEvent.description,
        extendedProps: {
          calendar: apiEvent.calendar
        }
      }))
    }

    console.log('Filtered Events:', data.events)
  } catch (error) {
    console.error('Error fetching events:', error)

    // Clear events if there's an error
    data.events = []
  }
}

// ------------------------------------------------
// GET: Return calendar events
// ------------------------------------------------
mock.onGet('/apps/calendar/events').reply(async config => {
  await fetchCalendarEvents()

  const { calendars } = config.params

  return [200, data.events.filter(event => calendars.includes(event.extendedProps.calendar))]
})

// ------------------------------------------------
// POST: Add new event
// ------------------------------------------------
mock.onPost('/apps/calendar/add-event').reply(async config => {
  try {
    // Get event from post data
    const { event } = JSON.parse(config.data).data

    // Define the payload based on your provided data
    const payload = {
      batch: event.batch,
      calendar: event.venue,
      created_at: new Date().toISOString(), // Use ISO-8601 format for the current date and time
      created_by: event.userID,
      date: event.date,
      description: event.description,
      end_time: event.endTime,
      requester_id: event.userID,
      start_time: event.startTime,
      status: 1,
      title: event.title,
      venue: event.venue
    }

    const createdMessageEmail = `
  <p>Your reservation request for <strong>${event.venue}</strong> has been successfully created.</p>
  <p>Date: <strong>${event.date}</strong></p>
  <p>Time: <strong>${event.startTime} - ${event.endTime}</strong></p>
`

    const createdMessageSMS = `Your reservation request for ${event.venue} has been successfully created.\nDate: ${event.date}\nTime: ${event.startTime} - ${event.endTime}`

    console.log('Payload:', payload)
    console.log('Event:', event)

    // Call your API to add the reservation with the payload
    const response = await apiDefinitions.addReservation(event.userID, payload)

    if (response.status === 201) {
      // Add the new event to your data.events
      const { reservation } = response.data
      event.id = reservation.reservation_id // Use the ID from the response

      // Push the new event to the data.events array
      data.events.push(event)

      return [201, { event }]
    } else {
      return [400, { error: 'Failed to add event' }]
    }
  } catch (error) {
    console.error('Error adding event:', error)

    return [500, { error: 'Internal Server Error' }]
  }
})

// ------------------------------------------------
// POST: Update Event
// ------------------------------------------------
mock.onPost('/apps/calendar/update-event').reply(config => {
  const eventData = JSON.parse(config.data).data.event

  // Convert Id to number
  eventData.id = Number(eventData.id)
  const event = data.events.find(ev => ev.id === Number(eventData.id))
  if (event) {
    Object.assign(event, eventData)

    return [200, { event }]
  } else {
    return [400, { error: `Event doesn't exist` }]
  }
})

// ------------------------------------------------
// DELETE: Remove Event
// ------------------------------------------------
mock.onDelete('/apps/calendar/remove-event').reply(config => {
  // Get event id from URL
  const { id } = config.params

  // Convert Id to number
  const eventId = Number(id)
  const eventIndex = data.events.findIndex(ev => ev.id === eventId)
  data.events.splice(eventIndex, 1)

  return [200]
})
