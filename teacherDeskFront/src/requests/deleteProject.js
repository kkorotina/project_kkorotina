import Axios from "axios";

export const client = Axios.create({
  baseURL: "http://localhost:8000/project/?project_id=5",
});

export const deleteProject = (id) => {
  const client = Axios.create({
    baseURL: `http://localhost:8000/project/?project_id=${id}`,
  });

  client.delete("", id);
  console.log("deleted project successfully");
};
