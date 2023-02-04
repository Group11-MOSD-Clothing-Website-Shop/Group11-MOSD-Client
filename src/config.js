import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZHVvbmciLCJlbWFpbCI6ImR1b25nQGdtYWlsLmNvbSIsImlkIjoiNjJhYzllZmQ1MTI1NmM5ZTUwNzlmMjgyIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjU1NTUzNDI0LCJleHAiOjE2NTU1NjQyMjR9.oMh1m9p3Qx4GBoJpNjHJ7URhu0cgEaaeV9lyu8zyNDo"
export const publicRequest = axios.create({
    baseURL: BASE_URL
})
const userRequest = axios.create({ baseURL: BASE_URL })
userRequest.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = user && JSON.parse(user)?.currentUser;
    const TOKEN = currentUser?.token;
    if (TOKEN)
        req.headers.Authorization = `Bearer ${TOKEN}`
    return req
})

export default userRequest
// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     header: {
//         token: `Bearer ${TOKEN}`
//     }
// })