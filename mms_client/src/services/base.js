import axios from 'axios'

const baseAPI = axios.create({
    baseUrl: process.env.VUE_APP_API_SERVER,
})

export default baseAPI