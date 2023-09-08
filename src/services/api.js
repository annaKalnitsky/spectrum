const API_BASE_URL = 'https://fedtest.bylith.com/api/';

export const getAllProducts = () => {
  return fetch(`${API_BASE_URL}catalog/getAll`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => data.data);
};

export const getProductById = (id) => {
  return fetch(`${API_BASE_URL}catalog/get?id=${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => data.data);
};
