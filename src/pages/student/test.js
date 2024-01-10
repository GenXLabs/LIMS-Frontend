import React, { useState } from 'react'
import axios from 'axios'

function CreateManual() {
  const [manual, setManual] = useState({
    title: '',
    moduleCategory: '',
    description: '',
    file: null
  })

  const [manualId, setManualId] = useState('') // New state for manual ID input

  const handleChange = e => {
    const { name, value } = e.target
    setManual({ ...manual, [name]: value })
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    setManual({ ...manual, file })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('manual', new Blob([JSON.stringify(manual)], { type: 'application/json' }))
    formData.append('file', manual.file)

    try {
      const response = await axios.post('http://localhost:8082/api/v1/lims/practical-manual/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log('Manual created:', response.data)
    } catch (error) {
      console.error('Error creating manual:', error)
    }
  }

  const handleDownload = async () => {
    try {
      // Replace 'http://localhost:8082' with the actual URL for downloading the file
      const response = await axios.get(`http://localhost:8082/api/v1/lims/practical-manual/download-pdf/${manualId}`, {
        responseType: 'blob' // Indicate that the response is a binary file
      })

      // Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]))

      // Create a temporary link element and trigger a download
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `manual_${manualId}.pdf`)
      document.body.appendChild(link)
      link.click()

      // Clean up
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading manual:', error)
    }
  }

  return (
    <div>
      <h2>Create Practical Manual</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type='text' name='title' value={manual.title} onChange={handleChange} />
        </div>
        <div>
          <label>Module Category:</label>
          <input type='text' name='moduleCategory' value={manual.moduleCategory} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name='description' value={manual.description} onChange={handleChange} />
        </div>
        <div>
          <label>File:</label>
          <input type='file' name='file' onChange={handleFileChange} />
        </div>
        <button type='submit'>Create Manual</button>
      </form>

      <div>
        <h2>Download Practical Manual</h2>
        <div>
          <label>Enter Manual ID:</label>
          <input type='text' name='manualId' value={manualId} onChange={e => setManualId(e.target.value)} />
        </div>
        <button onClick={handleDownload}>Download Manual</button>
      </div>
    </div>
  )
}

export default CreateManual
