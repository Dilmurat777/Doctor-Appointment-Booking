const { default: axios } = require('axios')

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

const axiosClient = axios.create({
	baseURL: 'http://localhost:1337/api',
	headers: {
		'Authorization': `Bearer ${API_KEY}`
	}
})

const getCategory = () => axiosClient.get('/categories?populate=*')
const getDoctorList = () => axiosClient.get('/doctors?populate=*')
const getDoctorByCategory = (category) => axiosClient.get('/doctors?filters[category][name][$in]='+category+'&populate=*')
const getDoctorByID = (id) => axiosClient.get('/doctors?filters[id][$eq]='+id+'&populate=*')
const getAppointment = (data) => axiosClient.post('/appointments', data)
const sentEmail = (data) => axios.post('/api/send-email', data)
const getMyBooking = (Email) =>
	axiosClient.get(`/appointments?filters[Email][$eq]=${Email}&populate=doctors.Image`);
// const getMyBooking = (Email) =>
// 	axiosClient.get(`/appointments?filters[Email][$eq]=${Email}&populate=doctors.Image&_=${Date.now()}`);


const cancelBooking = (id) => axiosClient.delete(`/appointments/${id}`)
export default {
	getCategory,
	getDoctorList,
	getDoctorByCategory,
	getDoctorByID,
	getAppointment,
	sentEmail,
	getMyBooking,
	cancelBooking
}