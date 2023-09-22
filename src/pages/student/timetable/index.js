import React, { useState } from 'react'
import Modal from 'react-modal'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM']

function Timetable() {
  const [timetableData, setTimetableData] = useState([])
  const [showAddEventForm, setShowAddEventForm] = useState(false)
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [eventText, setEventText] = useState('')

  const cellStyle = {
    border: '1px solid #ddd',
    padding: '19px',
    textAlign: 'center',
    fontSize: '16px',
    width: '200px',
    borderRadius: '8px',
    cursor: 'pointer'
  }

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: '#7468F0',
    fontWeight: 'bold',
    color: 'white'
  }

  const evenRowStyle = {
    backgroundColor: '#fff'
  }

  const oddRowStyle = {
    backgroundColor: '#f9f9f9'
  }

  const openAddEventForm = (day, time) => {
    setSelectedDay(day)
    setSelectedTime(time)
    setShowAddEventForm(true)
  }

  const closeAddEventForm = () => {
    setShowAddEventForm(false)
    setSelectedDay('')
    setSelectedTime('')
    setEventText('')
  }

  const handleAddEvent = () => {
    if (eventText.trim() !== '') {
      const updatedData = [...timetableData, { day: selectedDay, time: selectedTime, event: eventText }]
      setTimetableData(updatedData)
      closeAddEventForm()
    }
  }

  return (
    <div className='timetable'>
      <table>
        <thead>
          <tr>
            <th style={cellStyle}>Time</th>
            {daysOfWeek.map((day, index) => (
              <th key={index} style={headerCellStyle}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, timeIndex) => (
            <tr key={timeIndex} style={timeIndex % 2 === 0 ? evenRowStyle : oddRowStyle}>
              <td style={cellStyle}>{time}</td>
              {daysOfWeek.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  style={cellStyle}
                  ref={cellRef => (cellRef ? (cellRef.style.cursor = 'pointer') : null)}
                  onClick={() => openAddEventForm(day, time)}
                >
                  {timetableData.find(item => item.day === day && item.time === time)?.event}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {showAddEventForm && (
        <Modal
          isOpen={showAddEventForm}
          onRequestClose={closeAddEventForm}
          contentLabel='Add Event Modal'
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            },
            content: {
              alignItems: 'center',
              top: '20%',
              right: '0',
              transform: 'translateX(0%)',
              width: '300px',
              marginLeft: '720px',
              padding: '50px',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              position: 'fixed',
              height: '500px',
              transition: 'transform 0.3s ease-in-out'
            }
          }}
        >
          <div className='modal-header'>
            <h2>Add Event</h2>
            <button
              className='close-button'
              onClick={closeAddEventForm}
              style={{
                backgroundColor: '#FF4343',
                border: 'none',
                fontSize: '20px',
                borderRadius: '8px',
                height: '42px',
                width: '150px',
                color: 'white'
              }}
            >
              Cancel
            </button>
          </div>
          <div className='modal-body'>
            <p>Day: {selectedDay}</p>
            <p>Time: {selectedTime}</p>
            <input
              type='text'
              placeholder='Event Name'
              value={eventText}
              onChange={e => setEventText(e.target.value)}
              style={{
                border: '2px',
                borderColor: 'gray',
                backgroundColor: '#F1F1F1',
                fontsize: '45px',
                width: '200px',
                height: '40px',
                borderRadius: '8px'
              }}
            />
            <button
              onClick={handleAddEvent}
              className='add-button'
              style={{
                backgroundColor: '#7468F0',
                color: 'white',
                border: 'none',
                fontSize: '20px',
                marginTop: '20px',
                borderRadius: '8px',
                height: '42px',
                width: '180px'
              }}
            >
              Add Event
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Timetable
