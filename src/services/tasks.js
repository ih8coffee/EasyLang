// tasks.js

import { apiUrl } from "./index";

// Function to fetch all own tasks

export async function fetchOwnTasks(token) {
  try {
    const response = await fetch(`${apiUrl}/tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

// Function to fetch all tasks from a project

export async function fetchProjectTasks(token, projectID) {
  try {
    const response = await fetch(`${apiUrl}/projects/${projectID}/tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching project tasks:", error);
    throw error;
  }
}

// Function to fetch a single task

export async function fetchTask(token, taskID) {
  try {
    const response = await fetch(`${apiUrl}/tasks/${taskID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
}

// Function to create a new task

export async function createTask(token, newTask) {
  try {
    const response = await fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

// Function to update a task

export async function updateTask(token, updatedTask) {
  try {
    const response = await fetch(`${apiUrl}/tasks/${updatedTask._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}

// Function to delete a task

export async function deleteTask(token, taskID) {
  try {
    const response = await fetch(`${apiUrl}/tasks/${taskID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}
