import Axios from "axios";

const client = Axios.create({
  baseURL: "http://localhost:8000/project/",
});

export const addPosts = (name, description, max_capacity) => {
  const obj = {
    name: name,
    description: description,
    max_capacity: max_capacity,
  };

  console.log(obj);

  let response = client.post("", obj);
  response && console.log("created project successfuly");
  return response;
};
