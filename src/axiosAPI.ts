import axios from 'axios';

const axiosApi = axios.create({
    baseURL : 'https://homework66-6d7d1-default-rtdb.europe-west1.firebasedatabase.app/'
})

export default axiosApi;