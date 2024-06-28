import axios from 'axios';

const BASE_URL = "https://666fdf9c0900b5f872488377.mockapi.io/Api";

//feteching all Data ...................................................
export const mainData = async () => {
  const result = await axios.get(BASE_URL);
  return result.data;
};

// fetching SingleData ....................................................
export const singleData = async (id) => {
  const result = await axios.get(`${BASE_URL}/${id}`);
  return result.data;
};

// DeleteData ..............................................................
export const deleteData = async (id) => {
  const result = await axios.delete(`${BASE_URL}/${id}`);
  return result.data;
};
// UpdateData ...............................................................
export const updateData = async ({ id, data }) => {
  const result = await axios.put(`${BASE_URL}/${id}`, data);
  return result.data;
};
// createData ...............................................................
export const createData = async (data) => {
  const result = await axios.post(BASE_URL, data);
  return result.data;
};

// export const fetchItemById = async (id) => {
//   const result = await axios.get(`${BASE_URL}/${id}`);
//   return result.data;
// };
