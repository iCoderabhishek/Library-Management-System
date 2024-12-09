const BASE_URL = "http://localhost:5000/api";

export const fetchBooks = async () => {
  const response = await fetch(`${BASE_URL}/books`);
  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};
