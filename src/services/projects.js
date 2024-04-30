// projects.js

import { apiUrl } from "./index";

// Function to fetch all projects
export async function fetchProjects(token) {
  try {
    const response = await fetch(`${apiUrl}/projects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

// Fetch own projects
export async function fetchOwnProjects(token) {
  try {
    const response = await fetch(`${apiUrl}/projects/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching own projects:", error);
    throw error;
  }
}

// Function to fetch a single project

export async function fetchProject(token, projectID) {
  try {
    const response = await fetch(`${apiUrl}/projects/${projectID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
}

// Function to create a new project

export async function createProject(token, newProject) {
  try {
    const response = await fetch(`${apiUrl}/projects`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

// Function to update a project

export async function updateProject(token, projectID, updatedProject) {
  try {
    const response = await fetch(`${apiUrl}/projects/${projectID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

// Function to delete a project

export async function deleteProject(token, projectID) {
  try {
    const response = await fetch(`${apiUrl}/projects/${projectID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}
