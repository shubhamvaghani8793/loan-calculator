import axios from "axios";

const serverCall = axios.create({
  baseURL: 'https://v6.exchangerate-api.com/'
})

serverCall.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

serverCall.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default serverCall;