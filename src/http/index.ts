import axios from "axios";

const http = axios.create({ //ese método cria uma instância do axios
    baseURL: "http://localhost:8000/api/v2/"
})
export default http;