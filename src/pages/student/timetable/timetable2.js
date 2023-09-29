import React, { useState } from 'react';
import Modal from 'react-modal';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['9:00 AM', '11:00 AM', '1:00 PM', 'LUNCH BREAK', '3:00 PM', '5:00 PM'];

function Timetable() {
  const [timetableData, setTimetableData] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [eventText, setEventText] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null); // Track the selected event for editing
  const [selectedVenue, setSelectedVenue] = useState('Lab 02'); // Venue selection
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [instructorEmail, setInstructorEmail] = useState('');
  const [startTimeError, setStartTimeError] = useState('');
  const [endTimeError, setEndTimeError] = useState('');
  const [emailError, setEmailError] = useState('');

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

  // Check user's access level and decide whether to show buttons and forms
  const userAccessLevel = JSON.parse(localStorage.getItem('userData')).accessLevel;
  const shouldShowButtonsAndForms = userAccessLevel === 0;

  const openAddEventForm = (day, time) => {
    setSelectedDay(day);
    setSelectedTime(time);
    setShowAddEventForm(true);
  };

  const closeAddEventForm = () => {
    setShowAddEventForm(false);
    setSelectedDay('');
    setSelectedTime('');
    setEventText('');
    setSelectedEvent(null); // Clear selected event
    setSelectedVenue('Lab 01'); // Reset venue selection
    setStartTime('');
    setEndTime('');
    setInstructorEmail('');
    setStartTimeError('');
    setEndTimeError('');
    setEmailError('');
  };

  const handleAddEvent = () => {
    // Reset error messages
    setStartTimeError('');
    setEndTimeError('');
    setEmailError('');

    // Validation for start time (00:00 AM/PM format)
    const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9]\s(AM|PM)$/;

    if (!timeRegex.test(startTime)) {
      setStartTimeError('Start time should be in the format: 00:00 AM/PM');
      return;
    }

    // Validation for end time (00:00 AM/PM format)
    if (!timeRegex.test(endTime)) {
      setEndTimeError('End time should be in the format: 00:00 AM/PM');
      return;
    }

    // Validation for email format (a-z+@my.kiu.lk)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@my\.kiu\.lk$/;

    if (!emailRegex.test(instructorEmail)) {
      setEmailError('Email should be in the format: a-z+@my.kiu.lk');
      return;
    }

    // If all validations pass, you can proceed with adding/updating the event
    if (selectedEvent) {
      // If a selected event exists, update it
      const updatedData = timetableData.map((item) =>
        item.day === selectedEvent.day && item.time === selectedEvent.time
          ? { ...item, event: eventText }
          : item
      );
      setTimetableData(updatedData);
    } else {
      // Otherwise, add a new event
      const updatedData = [
        ...timetableData,
        {
          day: selectedDay,
          time: selectedTime,
          event: eventText,
          venue: selectedVenue,
          startTime,
          endTime,
          instructorEmail,
        },
      ];
      setTimetableData(updatedData);
    }

    closeAddEventForm();
  };

  const handleEditEvent = (day, time, event) => {
    const selectedEventData = timetableData.find((item) => item.day === day && item.time === time);
    setSelectedDay(day);
    setSelectedTime(time);
    setEventText(event);
    setSelectedEvent({ day, time });
    setSelectedVenue(selectedEventData.venue);
    setStartTime(selectedEventData.startTime);
    setEndTime(selectedEventData.endTime);
    setInstructorEmail(selectedEventData.instructorEmail);
    setShowAddEventForm(true);
  };

  const handleDeleteEvent = (day, time, event) => {
    const updatedData = timetableData.filter((item) => !(item.day === day && item.time === time));
    setTimetableData(updatedData);
    // Prevent the event from propagating to open the Add Event form
    event.stopPropagation();
  };

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
                  color: cellHasEvent ? '#E35A0C' : undefined,fontWeight:'bold',
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
            <p>Day: {selectedDay}</p>
            <p>Time: {selectedTime}</p>
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
                }}
              />
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
                <option value='Lab 01'>Lab 02</option>
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type='text'
                placeholder='Start Time (e.g., 09:00 AM)'
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={{
                  ...inputStyle,
                  fontSize: '16px',
                  height: '40px',
                  width: '450px',
                  borderColor: startTimeError ? 'red' : '', // Highlight input border if there's an error
                }}
              />
              <p style={{ color: 'red' }}>{startTimeError}</p> {/* Display start time error message */}
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type='text'
                placeholder='End Time (e.g., 11:00 AM)'
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                style={{
                  ...inputStyle,
                  fontSize: '16px',
                  height: '40px',
                  width: '450px',
                  borderColor: endTimeError ? 'red' : '', 
                }}
              />
              <p style={{ color: 'red' }}>{endTimeError}</p> 
            </div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type='text'
                placeholder="Instructor's Email (e.g., john@my.kiu.lk)"
                value={instructorEmail}
                onChange={(e) => setInstructorEmail(e.target.value)}
                style={{
                  ...inputStyle,
                  fontSize: '16px',
                  height: '40px',
                  width: '450px',
                  borderColor: emailError ? 'red' : '', 
                }}
              />
              <p style={{ color: 'red' }}>{emailError}</p> 
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

export default Timetable;
