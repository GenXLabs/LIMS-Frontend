import React, { useState } from 'react';
import Modal from 'react-modal';
import apiDefinitions from 'src/api/apiDefinitions';

// Constants for days of the week and time slots
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['9:00 AM', '11:00 AM', '1:00 PM', 'LUNCH BREAK', '3:00 PM', '5:00 PM'];

function Timetable() {
  // State variables to manage data and form state
  const [timetableData, setTimetableData] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [eventText, setEventText] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState('Lab 01');
  const [instructorEmail, setInstructorEmail] = useState('');
  const [eventTextError, setEventTextError] = useState('');
  const [instructorEmailError, setInstructorEmailError] = useState('');

  // User access level check
  const userAccessLevel = JSON.parse(localStorage.getItem('userData')).accessLevel;
  const shouldShowButtonsAndForms = userAccessLevel === 0;

  // Function to open the Add Event form
  const openAddEventForm = (day, time) => {
    setSelectedDay(day);
    setSelectedTime(time);
    setShowAddEventForm(true);
  };

  // Function to close the Add Event form and reset form fields
  const closeAddEventForm = () => {
    setShowAddEventForm(false);
    setSelectedDay('');
    setSelectedTime('');
    setEventText('');
    setSelectedEvent(null);
    setSelectedVenue('Lab 01');
    setInstructorEmail('');
    setEventTextError('');
    setInstructorEmailError('');
  };

  // Function to handle adding an event
  const handleAddEvent = () => {
    // Reset error messages
    setEventTextError('');
    setInstructorEmailError('');

    let isValid = true;

    // Validation for event title (should not be empty)
    if (!eventText.trim()) {
      setEventTextError('Event Title is required');
      isValid = false;
    }

    // Regular expression pattern for validating instructor's email
    const emailPattern = /^[a-zA-Z0-9]+@gmail\.com$/;

    // Validation for instructor's email format
    if (!instructorEmail.match(emailPattern)) {
      setInstructorEmailError("Instructor's Email should be in the format: any number or letter + gmail.com");
      isValid = false;
    }

    // If any validation fails, do not proceed with adding the event
    if (!isValid) {
      return;
    }

    // Event data to be added
    const eventData = {
      venue: selectedVenue,
      date: selectedDay,
      time: selectedTime,
      email: instructorEmail,
      event_title: eventText,
    };

    // Function to make an API call to add the event
    const addEventData = async () => {
      try {
        const response = await apiDefinitions.addEvent(eventData);
        console.log('add event response', response);
      } catch (error) {
        console.error('add event error', error);
      }
    };

    // Call the function to add the event and close the form
    addEventData();
    closeAddEventForm();
  };

  // Render the timetable table with events and buttons
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
              {daysOfWeek.map((day, dayIndex) => {
                const event = timetableData.find((item) => item.day === day && item.time === time);
                const cellHasEvent = event && event.event.trim() !== '';

                const cellStyleWithEvent = {
                  ...cellStyle,
                  backgroundColor: cellHasEvent ? '#E2E2E2 ' : undefined,
                  color: cellHasEvent ? '#E35A0C' : undefined,
                  fontWeight: 'bold',
                };

                return (
                  <td
                    key={dayIndex}
                    style={cellHasEvent ? cellStyleWithEvent : cellStyle}
                    ref={(cellRef) => (cellRef ? (cellRef.style.cursor = 'pointer') : null)}
                    onClick={() => openAddEventForm(day, time)}
                  >
                    {time === 'LUNCH BREAK' ? (
                      <span style={lunchBreakStyle}>{time}</span>
                    ) : cellHasEvent ? (
                      event.event
                    ) : null}
                    {shouldShowButtonsAndForms && time !== 'LUNCH BREAK' && cellHasEvent && (
                      <div>
                        <button
                          onClick={() =>
                            handleEditEvent(
                              day,
                              time,
                              timetableData.find((item) => item.day === day && item.time === time).event
                            )
                          }
                          className='edit-button'
                          style={{
                            backgroundColor: '#7468F0',
                            color: 'white',
                            border: 'none',
                            width: '50px',
                            height: '30px',
                            borderRadius: '8px',
                            marginRight: '5px',
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleDeleteEvent(day, time, e)}
                          className='delete-button'
                          style={{
                            backgroundColor: '#FF4343',
                            color: 'white',
                            border: 'none',
                            height: '30px',
                            width: '50px',
                            borderRadius: '8px',
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {shouldShowButtonsAndForms && showAddEventForm && (
        <Modal
          isOpen={showAddEventForm}
          onRequestClose={closeAddEventForm}
          contentLabel='Add Event Modal'
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
            },
            content: {
              alignItems: 'center',
              top: '8%',
              right: '0',
              transform: 'translateX(0%)',
              width: '600px',
              marginLeft: '550px',
              padding: '50px',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              position: 'fixed',
              height: '600px',
              transition: 'transform 0.3s ease-in-out',
            },
          }}
        >
          <div className='modal-header'>
            <h2>{selectedEvent ? 'Edit Event' : 'Add Event'}</h2>
          </div>
          <div className='modal-body'>
            <div style={{ marginBottom: '20px', marginTop: '-10px' }}>
              <input
                type='text'
                placeholder='Event Title'
                value={eventText}
                onChange={(e) => setEventText(e.target.value)}
                style={{
                  ...inputStyle,
                  fontSize: '16px',
                  height: '40px',
                  width: '450px',
                  borderColor: eventTextError ? 'red' : '',
                }}
              />
              <p style={{ color: 'red' }}>{eventTextError}</p>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                style={{
                  ...inputStyle,
                  fontSize: '16px',
                  height: '40px',
                  width: '450px',
                }}
              >
                <option value='Lab 01'>Lab 01</option>
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type='text'
                disabled
                value={selectedTime}
                style={{
                  ...inputStyle,
                  fontSize: '16px',
                  height: '40px',
                  width: '450px',
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type='text'
                disabled
                value={selectedDay}
                style={{
                  ...inputStyle,
                  fontSize: '16px',
                  height: '40px',
                  width: '450px',
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type='text'
                placeholder="Instructor's Email (e.g., john@gmail.com)"
                value={instructorEmail}
                onChange={(e) => setInstructorEmail(e.target.value)}
                style={{
                  ...inputStyle,
                  fontSize: '16px',
                  height: '40px',
                  width: '450px',
                  borderColor: instructorEmailError ? 'red' : '',
                }}
              />
              <p style={{ color: 'red' }}>{instructorEmailError}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                className='add-button'
                onClick={handleAddEvent}
                style={{
                  backgroundColor: '#7468F0',
                  color: 'white',
                  border: 'none',
                  fontSize: '20px',
                  marginTop: '20px',
                  borderRadius: '8px',
                  height: '42px',
                  width: '180px',
                  marginRight: '20px',
                }}
              >
                {selectedEvent ? 'Save Changes' : 'Add Event'}
              </button>
              <button
                className='close-button'
                onClick={closeAddEventForm}
                style={{
                  backgroundColor: '#FF4343',
                  border: 'none',
                  fontSize: '20px',
                  borderRadius: '8px',
                  height: '42px',
                  width: '180px',
                  color: 'white',
                  marginRight: '25px',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Styles for table and form elements
const cellStyle = {
  border: '1px solid #ddd',
  padding: '19px',
  textAlign: 'center',
  fontSize: '16px',
  width: '200px',
  borderRadius: '8px',
  cursor: 'pointer',
};

const headerCellStyle = {
  ...cellStyle,
  backgroundColor: '#7468F0',
  fontWeight: 'bold',
  color: 'white',
};

const evenRowStyle = {
  backgroundColor: '#fff',
};

const oddRowStyle = {
  backgroundColor: '#f9f9f9',
};

const lunchBreakStyle = {
  fontSize: '12px',
  color: 'gray',
};

const inputStyle = {
  width: '60%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

export default Timetable;
