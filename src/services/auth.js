// auth.js

import { apiUrl } from "./index";

// Function to login user
export async function login(credentials) {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data; // Assuming the backend returns a JWT token upon successful login
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

// Function to logout user
export async function logout(token) {
  try {
    const response = await fetch(`${apiUrl}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Handle response accordingly (e.g., clear local storage, redirect to login page)
    return response.ok;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}
