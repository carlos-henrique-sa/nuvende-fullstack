import axios from "axios";

// Intercepta requisições
axios.interceptors.request.use(request => {
  console.log("AXIOS REQUEST:", {
    url: request.url,
    method: request.method,
    headers: request.headers,
    data: request.data
  });
  return request;
});

// Intercepta respostas
axios.interceptors.response.use(response => {
  console.log("AXIOS RESPONSE:", {
    url: response.config.url,
    status: response.status,
    data: response.data
  });
  return response;
}, error => {
  if (error.response) {
    console.log("AXIOS ERROR RESPONSE:", {
      url: error.response.config.url,
      status: error.response.status,
      data: error.response.data
    });
  } else {
    console.log("AXIOS ERROR:", error.message);
  }
  return Promise.reject(error);
});