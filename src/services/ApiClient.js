const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const postData = async function (
  route = "",
  data = {},
  token = "",
  method = ""
) {
  const response = await fetch(`${API_BASE_URL}${route}`, {
    method: method || "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(data),
  });

  return response.json();
};

export const getData = async function (route = "", token = "") {
  const response = await fetch(`${API_BASE_URL}${route}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};
