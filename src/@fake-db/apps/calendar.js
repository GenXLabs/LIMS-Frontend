// ** Mock Adapter
import mock from 'src/@fake-db/mock'

const date = new Date()
const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1) // Corrected
const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1) // Corrected

// const data = {
//   events: [
//     {
//       id: 1,
//       title: 'Test',
//       batch: 'Batch 1',
//       venue: 'LAB-01',
//       start: '2023-09-17T09:00:00', // Updated date format to ISO 8601
//       end: '2023-09-17T11:00:00', // Updated date format to ISO 8601
//       description: 'Review meeting for project',
//       extendedProps: {
//         calendar: 'LAB-01'
//       }
//     },
//     {
//       id: 2,
//       title: '2 Test',
//       batch: 'Batch 1',
//       venue: 'LAB-02',
//       start: '2023-09-18T09:00:00', // Updated date format to ISO 8601
//       end: '2023-09-18T11:00:00', // Updated date format to ISO 8601
//       description: 'Review meeting for project',
//       extendedProps: {
//         calendar: 'LAB-02'
//       }
//     }

//     // Add more events with the required fields here
//   ]
// }

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

      // Convert API response format to data.events format
      data.events = apiEvents.map(apiEvent => ({
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

    console.log('Events:', data)
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
mock.onPost('/apps/calendar/add-event').reply(config => {
  // Get event from post data
  const { event } = JSON.parse(config.data).data
  const { length } = data.events
  let lastIndex = 0
  if (length) {
    lastIndex = data.events[length - 1].id
  }
  event.id = lastIndex + 1
  data.events.push(event)

  return [201, { event }]
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
