// emailSender.js

const axios = require('axios')

const MJ_APIKEY_PUBLIC = process.env.MJ_APIKEY_PUBLIC
const MJ_APIKEY_PRIVATE = process.env.MJ_APIKEY_PRIVATE

// Function to send an email using Mailjet API
async function sendEmail(toEmail, subject, message) {
  const emailData = {
    Messages: [
      {
        From: {
          Email: 'kiu.lims.notifications@pixelcore.lk',
          Name: 'Mailjet Pilot'
        },
        To: [
          {
            Email: toEmail,
            Name: 'Recipient Name'
          }
        ],
        Subject: subject,
        TextPart: message,
        HTMLPart: `<h3>${subject}</h3><br />${message}`
      }
    ]
  }

  const apiUrl = 'https://api.mailjet.com/v3.1/send'

  try {
    const response = await axios({
      method: 'post',
      url: apiUrl,
      auth: {
        username: MJ_APIKEY_PUBLIC,
        password: MJ_APIKEY_PRIVATE
      },
      headers: {
        'Content-Type': 'application/json'
      },
      data: emailData
    })

    console.log(response.data)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = sendEmail // Export the function
