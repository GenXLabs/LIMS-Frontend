import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import CustomInput from './PickersCustomInput';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

const formContainerStyle = {
  width: '400px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f5f5f5',
};

const myFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputLabelStyle = {
  fontWeight: 'bold',
};

const inputFieldStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '3px',
};

const fileInputStyle = {
  display: 'none', // Hide the file input
};

const fileLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const fileIconStyle = {
  marginRight: '8px',
};

const submitButtonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
};

const AddInstrument = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Handle the submission of name, description, dateTime, and selectedFile values
    // You can perform your desired logic here
    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Date & Time:', dateTime);
    console.log('Selected File:', selectedFile);

    // Reset the form fields if needed
    setName('');
    setDescription('');
    setDateTime(new Date());
    setSelectedFile(null);
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit} style={myFormStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor='name' style={inputLabelStyle}>Name:</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputFieldStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor='description' style={inputLabelStyle}>Description:</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            cols={50}
            style={inputFieldStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={inputLabelStyle}>Attach File:</label>
          <label htmlFor='file' style={fileLabelStyle}>
            <span style={fileIconStyle}>📎</span> Attach File
          </label>
          <input
            type='file'
            id='file'
            accept='.pdf,.doc,.docx,.jpg,.png'
            style={fileInputStyle}
            onChange={handleFileChange}
          />
        </div>

        <DatePickerWrapper>
          <DatePicker
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            selected={dateTime}
            id='date-time-picker'
            dateFormat='MM/dd/yyyy h:mm aa'
            onChange={(date) => setDateTime(date)}
            customInput={<CustomInput label='Date & Time' />}
          />
        </DatePickerWrapper>

        <button type='submit' style={submitButtonStyle}>Submit</button>
      </form>
    </div>
  );
};

export default AddInstrument;



