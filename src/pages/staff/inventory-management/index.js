import React, { useState } from 'react';

// ReagentsForm Component
const ReagentsForm = ({ handleSaveReagents }) => {
  const [formData, setFormData] = useState({
    containerType: '',
    chemicalType: '',
    msdsLocation: '',
    maxQuantity: '',
    hazardClass: '',
    storageClassNumber: '',
    balanceLastMonth: ''
  });

  const inputStyle = {
    border: '1px solid #dddddd',
    borderRadius:'8px',
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    marginBottom: '10px'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveReagents(formData);
    setFormData({
      containerType: '',
      chemicalType: '',
      msdsLocation: '',
      maxQuantity: '',
      hazardClass: '',
      storageClassNumber: '',
      balanceLastMonth: ''
    });
  }

  return (
    <div>
      <h2>Reagents Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Container Type:</label>
          <input
            type="text"
            name="containerType"
            value={formData.containerType}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Chemical Type:</label>
          <input
            type="text"
            name="chemicalType"
            value={formData.chemicalType}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label>MSDS Location:</label>
          <input
            type="text"
            name="msdsLocation"
            value={formData.msdsLocation}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Maximum Quantity:</label>
          <input
            type="number"
            name="maxQuantity"
            value={formData.maxQuantity}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Hazard Class:</label>
          <input
            type="text"
            name="hazardClass"
            value={formData.hazardClass}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Storage Class Number:</label>
          <input
            type="number"
            name="storageClassNumber"
            value={formData.storageClassNumber}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Balance from Last Month:</label>
          <input
            type="number"
            name="balanceLastMonth"
            value={formData.balanceLastMonth}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={{
          backgroundColor: '#BF62E2 ',
          margin: '10px',
          padding: '10px',
          borderRadius: '10px',
          fontSize: '18px',
          border: 'none',
          color: 'white',
          width: '160px'
        }}>
          Save
        </button>
      </form>
    </div>
  );
}

function MyInventoryFeature() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showGlasswareTable, setShowGlasswareTable] = useState(false);
  const [showReagentsForm, setShowReagentsForm] = useState(false);
  const [tableData, setTableData] = useState([
    { id: 1, inventoryNo: '123', name: 'Item A', availability: '10', newArrival: '5', broken: '1', returns: '2', balance: '2' }
  ]);
  const [isEditMode, setIsEditMode] = useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }

  const buttonStyle = {
    margin: '5px',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '10px',
    fontSize: '18px',
    border: 'none',
    backgroundColor: '#7468F0',
    color: 'white',
    width: '200px'
  }

  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#00FF00'
  }

  const selectedButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'darkgray'
  }

  const subCategoryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#B74BBA',
    color: 'white'
  }

  const selectedSubCategoryButtonStyle = {
    ...subCategoryButtonStyle,
    backgroundColor: '#BCB4BC'
  }

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%'
  }

  const cellStyle = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px'
  }

  const inputStyle = {
    border: '1px solid #dddddd',
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box'
  }

  const openGlasswareTable = () => {
    setShowGlasswareTable(true);
    setShowReagentsForm(false); // Close Reagents Form
  }

  const openReagentsForm = () => {
    setShowReagentsForm(true);
    setShowGlasswareTable(false); // Close Glassware Table
  }

  const handleAddRow = () => {
    setTableData(prevData => [...prevData, {
      id: prevData.length + 1,
      inventoryNo: '',
      name: '',
      availability: '',
      newArrival: '',
      broken: '',
      returns: '',
      balance: ''
    }]);
  }

  const handleDeleteRow = (id) => {
    setTableData(prevData => prevData.filter(item => item.id !== id));
  }

  const handleInputChange = (id, field, value) => {
    setTableData(prevData => prevData.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  }

  const handleEditClick = () => {
    setIsEditMode(true);
  }

  const handleSaveClick = () => {
    setIsEditMode(false);
    console.log("Data saved:", tableData);
  }

  const handleSaveReagents = (formData) => {
    console.log("Reagents Form Data:", formData);
    setShowReagentsForm(false);
  }

  return (
    <div style={containerStyle}>
      <button
        style={selectedCategory === 'Consumables' ? selectedButtonStyle : buttonStyle}
        onClick={() => {
          if (selectedCategory === 'Consumables') {
            setSelectedCategory(null)
          } else {
            setSelectedCategory('Consumables')
            setSelectedSubCategory(null)
          }
        }}
      >
        Consumables
      </button>

      {selectedCategory === 'Consumables' && (
        <div>
          <button
            style={selectedSubCategory === 'Glassware' ? selectedSubCategoryButtonStyle : subCategoryButtonStyle}
            onClick={() => {
              setSelectedSubCategory('Glassware');
              openGlasswareTable();
            }}
          >
            Glassware
          </button>
          <button
            style={selectedSubCategory === 'Reagents' ? selectedSubCategoryButtonStyle : subCategoryButtonStyle}
            onClick={openReagentsForm}
          >
            Reagents
          </button>
        </div>
      )}

      <button
        style={selectedCategory === 'Non-Consumables' ? selectedButtonStyle : buttonStyle}
        onClick={() => {
          if (selectedCategory === 'Non-Consumables') {
            setSelectedCategory(null)
            setSelectedSubCategory(null)
          } else {
            setSelectedCategory('Non-Consumables')
            setSelectedSubCategory(null)
          }
        }}
      >
        Non-Consumables
      </button>

      {selectedCategory === 'Non-Consumables' && (
        <div>
          <button
            style={selectedSubCategory === 'Anatomy' ? selectedSubCategoryButtonStyle : subCategoryButtonStyle}
            onClick={() => setSelectedSubCategory('Anatomy')}
          >
            Anatomy
          </button>
          <button
            style={selectedSubCategory === 'Instruments' ? selectedSubCategoryButtonStyle : subCategoryButtonStyle}
            onClick={() => setSelectedSubCategory('Instruments')}
          >
            Instruments
          </button>
        </div>
      )}

      {showGlasswareTable && (
         <div>
         <div style={{  fontSize: '24px', marginBottom: '10px',}}>Glassware</div>
          <button
            style={{ ...buttonStyle, backgroundColor: '#7468F0', borderRadius: '5px', width: '90px', height: '40px' }}
            onClick={handleAddRow}
          >
            Add
          </button>

          <button
            style={{saveButtonStyle, backgroundColor: '#BF62E2 ', borderRadius: '5px', width: '90px', height: '40px',border:'none',fontSize:'15px',color:'white',}}
            onClick={handleSaveClick}
          >
            Save
          </button>

          <table style={tableStyle}>
            <thead>
              <tr>
                {Object.keys(tableData[0]).map((key) => (
                  <th key={key} style={cellStyle}>
                    {key}
                  </th>
                ))}
                <th style={cellStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  {Object.keys(row).map((key) => (
                    <td style={cellStyle} key={key}>
                      {isEditMode ? (
                        <input
                          style={inputStyle}
                          type="text"
                          value={row[key]}
                          onChange={(e) => handleInputChange(row.id, key, e.target.value)}
                        />
                      ) : (
                        row[key]
                      )}
                    </td>
                  ))}
                  <td style={cellStyle}>
                    {isEditMode ? (
                      <>
                        <button
                          style={{ ...buttonStyle, width: '90px', height: '40px', borderRadius: '8px', backgroundColor: '#7468F0', border: 'none', color: 'white', fontSize: '15px' }}
                        >
                          Edit
                        </button>
                        <button
                          style={{ ...buttonStyle, width: '90px', height: '40px', borderRadius: '8px', backgroundColor: '#ff4000', border: 'none', color: 'white', fontSize: '15px', marginLeft: '5px' }}
                          onClick={() => handleDeleteRow(row.id)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        style={{ ...buttonStyle, width: '90px', height: '40px', borderRadius: '8px', backgroundColor: '#7468F0', border: 'none', color: 'white', fontSize: '15px' }}
                        onClick={handleEditClick}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showReagentsForm && <ReagentsForm handleSaveReagents={handleSaveReagents} />}
    </div>
  )
}

export default MyInventoryFeature;
