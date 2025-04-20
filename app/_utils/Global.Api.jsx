const { default: axios } = require('axios')

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

const axiosClient = axios.create({
	baseURL: 'http://localhost:1337/api',
	headers: {
		'Authorization': `Bearer ${API_KEY}`
	}
})

// const getCategory = () => axiosClient.get('/sliders?populate=*')
const getCategory = () => axiosClient.get('/categories?populate=*')
const getDoctorList = () => axiosClient.get('/doctors?populate=*')

export default {
	getCategory,
	getDoctorList
}