
// src/api/auth.ts
import axios from "axios";

const API_URL = "https://frontline-fury-backend.onrender.com/api/auth";

export interface SignupPayload {
  Username: string;
  email: string;
  password: string;
}

export const signupUser = async (userData: SignupPayload): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (userData: LoginPayload): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

