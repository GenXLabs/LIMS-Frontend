// smsService.js

import axios from 'axios'

const username = process.env.DIALOG_USERNAME
const password = process.env.DIALOG_PASSWORD

const api = axios.create({
  baseURL: 'https://e-sms.dialog.lk/api/v1' // Set your API base URL here
})

export default {
  login: async function () {
    try {
      const loginPayload = {
        username: username,
        password: password
      }

      const response = await api.post('/login', loginPayload)

      if (response.data && response.data.token) {
        return response.data.token
      } else {
        throw new Error('Login failed. Token not found in the response.')
      }
    } catch (error) {
      throw error
    }
  },

  sendSMS: async function (phoneNumber, message, token) {
    try {
      const response = await api.post(
        '/sms',
        {
          msisdn: [{ mobile: phoneNumber }],
          sourceAddress: 'Pixelcore',
          message: message,
          transaction_id: generateRandomString(8)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }
}

function generateRandomString(length) {
  const characters = '0123456789'
  let randomString = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }

  return randomString
}
