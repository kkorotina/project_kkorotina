import Axios from "axios";

export const client = Axios.create({
  baseURL: "http://localhost:8000/project/",
});

export const patchChangeDescription = (description, id) => {
  //const description = props.description;
  //const id = props.id;
  const body = { project_id: id, description: description };
  console.log(body);
  const response = client
    .patch("", body)
    .catch((error) => console.log("Error: ", error));

  if (response && response.data) {
    console.log("changed project's description successfully");
  }
};
