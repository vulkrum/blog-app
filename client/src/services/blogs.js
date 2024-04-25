import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
let config;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
};

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = async (newObject) => {
  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const update = async (newObject) => {
  const res = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config);
  return res.data;
};

const remove = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

const comment = async (id, comment) => {
  const res = await axios.put(`${baseUrl}/${id}/comments`, comment);
  return res.data;
};

export default { getAll, create, update, remove, comment, setToken };
