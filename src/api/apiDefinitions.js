import { api } from './api'

export default {
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /* Lab Reservation APIs Start */

  getAllLabReservations: async function () {
    return await api.get(`/lab-reservation/get-all`)
  },

  addReservation: async function (userID, reservation) {
    return await api.post(`/lab-reservation/add/${userID}`, reservation)
  },

  updateReservationStatus: async function (reservationID, status) {
    return await api.put(`/lab-reservation/update-status/${reservationID}/${status}`)
  },

  /* Lab Reservation APIs End */

  sendEmail: async function (emailPayload) {
    return await api.post(`/email/send-email`, emailPayload)
  },

  // practical time table API

  addEvent: async function (eventPayload){
    return await api.post(`/timetable-events`, eventPayload)
  },

  getAllEvents: async function(){
    return await api.get(`/timetable-events`)
  },
}
