// users.js

import { apiUrl } from "./index";

// Function to fetch user data
export async function fetchUserData(token) {
  try {
    const response = await fetch(`${apiUrl}/users/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// Function to fetch user by ID
export async function fetchUserById(token, userId) {
  try {
    const response = await fetch(`${apiUrl}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

// Function to fetch user's own profile
export async function fetchOwnProfile(token) {
  try {
    const response = await fetch(`${apiUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching own profile:", error);
    throw error;
  }
}

// Function to update user profile
export async function updateUserProfile(token, updatedProfile) {
  try {
    const response = await fetch(`${apiUrl}/users/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}
