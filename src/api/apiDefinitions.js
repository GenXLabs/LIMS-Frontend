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

  getPDFByManualID: async function (manualID) {
    return await api.get(`/practical-manual/download-pdf/${manualID}`, {
      responseType: 'blob'
    })
  },

  /* Practical Manual and Module Category APIs End */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /* Inventory Management APIs Start */
  getAllGlasswares: async function(){
    return await api.get(`/inventory-management/get-all`)
  },
  /* Inventory Management APIs End */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  /* SOP Management APIs Start */
  getAllInstrument: async function(){
  return await api.get(`/instrument/get-all`)
  },

  addInstrument: async function	(dataPayload){
    return await api.post(`/instrument/create`,dataPayload)
  },

  deleteInstrumrnt : async function (){
    return await api.delete(`/instrument/delete`)
  },
  /* SOP Management APIs End */
  /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  sendEmail: async function (emailPayload) {
    return await api.post(`/email/send-email`, emailPayload)
  }
}
