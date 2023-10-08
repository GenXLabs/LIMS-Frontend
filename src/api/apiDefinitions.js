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

  updateReservation: async function (reservation) {
    return await api.put(`/lab-reservation/update`, reservation)
  },

  updateReservationStatus: async function (reservationID, status) {
    return await api.put(`/lab-reservation/update-status/${reservationID}/${status}`)
  },

  /* Lab Reservation APIs End */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /* Practical Manual and Module Category APIs Start */

  getAllPracticalManuals: async function () {
    return await api.get(`/practical-manual/get-all`)
  },

  getPracticalManualByID: async function (manualID) {
    return await api.get(`/practical-manual/get-by-id/${manualID}`)
  },

  addPracticalManual: async function (formData) {
    return await api.post(`/practical-manual/create`, formData)
  },

  updatePracticalManual: async function (manualID, payload) {
    return await api.put(`/practical-manual/update/${manualID}`, payload)
  },

  getAllModuleCategories: async function () {
    return await api.get(`/module-categories/get-all`)
  },

  addModuleCategory: async function (payload) {
    return await api.post(`/module-categories/add`, payload)
  },

  updateModuleCategory: async function (categoryID, payload) {
    return await api.put(`/module-categories/update/${categoryID}`, payload)
  },

  deleteModuleCategory: async function (categoryID, payload) {
    return await api.put(`/module-categories/delete/${categoryID}`, payload)
  },

  getModuleCategoryById: async function (categoryID) {
    return await api.get(`/module-categories/get-by-id/${categoryID}`)
  },

  deletePracticalManual: async function (manualID, payload) {
    return await api.put(`/practical-manual/delete/${manualID}`, payload)
  },

  getPDFByManualID: async function (manualID) {
    return await api.get(`/practical-manual/download-pdf/${manualID}`, {
      responseType: 'blob'
    })
  },

  /* Practical Manual and Module Category APIs End */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /* Inventory Management APIs Start */
  getAllGlasswares: async function () {
    return await api.get(`/inventory-management/get-all`)
  },

  addGlasswares: async function (dataPayload) {
    return await api.post(`/inventory-management/create`, dataPayload)
  },

  deleteGlasswares: async function (id) {
    return await api.delete(`/inventory-management/delete/${id}`)
  },

  editGlasswares: async function (id, dataPayload) {
    return await api.put(`/inventory-management/update/${id}`, dataPayload)
  },
  
  /* Inventory Management APIs End */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /* SOP Management APIs Start */

  getAllInstruments: async function () {
    return await api.get(`/instrument/get-all`)
  },

  getInstrumentByID: async function (manualID) {
    return await api.get(`/instrument/get-by-id/${manualID}`)
  },

  addInstruments: async function (formData) {
    return await api.post(`/instrument/create`, formData)
  },

  updateInstruments: async function (manualID, payload) {
    return await api.put(`/instrument/update/${manualID}`, payload)
  },

  deleteInstruments: async function (manualID, payload) {
    return await api.put(`/instrument/delete/${manualID}`, payload)
  },

  getPDFByManualID: async function (manualID) {
    return await api.get(`/instrument/download-pdf/${manualID}`, {
      responseType: 'blob'
    })
  },


  getAllBiohazard: async function () {
    return await api.get(`/biohazard/get-all`)
  },

  getBiohazardByID: async function (manualID) {
    return await api.get(`/biohazard/get-by-id/${manualID}`)
  },

  addBiohazard: async function (formData) {
    return await api.post(`/biohazard/create`, formData)
  },

  updateBiohazard: async function (manualID, payload) {
    return await api.put(`/biohazard/update/${manualID}`, payload)
  },

  deleteBiohazard: async function (manualID, payload) {
    return await api.put(`/biohazard/delete/${manualID}`, payload)
  },

  getPDFByManualID: async function (manualID) {
    return await api.get(`/biohazard/download-pdf/${manualID}`, {
      responseType: 'blob'
    })
  },






  /* SOP Management APIs End */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /* Practical Timetable APIs Start */

  addEvent: async function (eventPayload) {
    return await api.post(`/timetable-events`, eventPayload)
  },

  getAllEvents: async function () {
    return await api.get(`/timetable-events`)
  },

  /* Practical Timetable APIs End */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /* User Management APIs Start */

  getUserById: async function (userID) {
    return await api.get(`/user/get?id=${userID}`)
  },

  /* User Management APIs End */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /* Research Management APIs Start */

  getAllResearch: async function () {
    return await api.get(`/research-management/get-all`)
  },

  addResearch: async function (researchPayload) {
    return await api.post(`/research-management/create`, researchPayload)
  },

  updateResearch: async function (researchID, researchPayload) {
    return await api.put(`/research-management/update/${researchID}`, researchPayload)
  },

  deleteResearch: async function (researchID) {
    return await api.delete(`/research-management/delete/${researchID}`)
  },

  getResearchById: async function (researchID) {
    return await api.get(`/research-management/get/${researchID}`)
  },

  /* Research Management APIs End */

  sendEmail: async function (emailPayload) {
    return await api.post(`/email/send-email`, emailPayload)
  },

   /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /* User Management APIs Start */

  getAllUsers: async function () {
    return await api.get(`/user`)
  },

  deleteUser: async function (userID) {
    return await api.delete(`/user/delete/${userID}`)
  },

  getUserById: async function (userID) {
    return await api.get(`/user/${userID}`)
  },

  updateUser: async function (userID, userPayload) {
    return await api.put(`/user/update/${userID}`, userPayload)
  },

  getUserByEmail: async function (email) {
    return await api.get(`user/getEmail?email=${email}`)
  },

  addUser: async function (userPayload) {
    return await api.post(`/user/add`, userPayload)
  },


  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /* User Management APIs End */
}
