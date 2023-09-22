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
    width: '100%',
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
  };

  const handleAddEvent = () => {
    if (eventText.trim() !== '') {
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
        const updatedData = [...timetableData, { day: selectedDay, time: selectedTime, event: eventText }];
        setTimetableData(updatedData);
      }

      closeAddEventForm();
    }
  };

  const handleEditEvent = (day, time, event) => {
    setSelectedDay(day);
    setSelectedTime(time);
    setEventText(event);
    setSelectedEvent({ day, time });
    setShowAddEventForm(true);
  };

  const handleDeleteEvent = (day, time, event) => {
    const updatedData = timetableData.filter((item) => !(item.day === day && item.time === time));
    setTimetableData(updatedData);
    // Prevent the event from propagating to open the Add Event form
    event.stopPropagation();
  };

  return (
    <div className="timetable">
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
                  backgroundColor: cellHasEvent ? '#7EEBFF' : undefined, // Add green background for cells with events
                  color: cellHasEvent ? 'black' : undefined, // Add white text color for cells with events
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
                    ) : (
                      cellHasEvent ? event.event : null
                    )}
                    {shouldShowButtonsAndForms && time !== 'LUNCH BREAK' && cellHasEvent && (
                      <div>
                        <button
                          onClick={() =>
                            handleEditEvent(day, time, timetableData.find((item) => item.day === day && item.time === time).event)
                          }
                          className="edit-button"
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
                          className="delete-button"
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
          contentLabel="Add Event Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
              transition: 'transform 0.3s ease-in-out',
            },
          }}
        >
          <div className="modal-header">
            <h2>{selectedEvent ? 'Edit Event' : 'Add Event'}</h2>
            <button
              className="close-button"
              onClick={closeAddEventForm}
              style={{
                backgroundColor: '#FF4343',
                border: 'none',
                fontSize: '20px',
                borderRadius: '8px',
                height: '42px',
                width: '150px',
                color: 'white',
              }}
            >
              Cancel
            </button>
          </div>
          <div className="modal-body">
            <p>Day: {selectedDay}</p>
            <p>Time: {selectedTime}</p>
            <input
              type="text"
              placeholder="Event Name"
              value={eventText}
              onChange={(e) => setEventText(e.target.value)}
              style={{
                ...inputStyle,
                fontSize: '16px',
                height: '40px',
              }}
            />
            <button
              onClick={handleAddEvent}
              className="add-button"
              style={{
                backgroundColor: '#7468F0',
                color: 'white',
                border: 'none',
                fontSize: '20px',
                marginTop: '20px',
                borderRadius: '8px',
                height: '42px',
                width: '180px',
              }}
            >
              {selectedEvent ? 'Save Changes' : 'Add Event'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Timetable;
