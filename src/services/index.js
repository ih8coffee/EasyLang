const apiUrl = "http://localhost:3000/api";

// Function to make authenticated API requests
async function fetchUserData() {
  const token = getTokenFromStorage(); // Retrieve JWT token from storage
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    console.log(data); // Handle the response data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Example function to get token from storage
function getTokenFromStorage() {
  // Implement logic to retrieve token from local storage or cookie
}

export { apiUrl, fetchUserData };
