import axios from "axios";

export async function fetchCurrentUser() {
    return await axios.get("/auth/me");
}

export async function signup(data) {
    return await axios.post("/auth/signup", data);
}

export async function login(data) {
    return await axios.post("/auth/login", data);
}

export async function logout() {
    return await axios.patch("/auth/logout");
}