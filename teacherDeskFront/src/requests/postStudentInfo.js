import Axios from "axios";

const client = Axios.create({
  baseURL: "http://localhost:8000/student/",
});

export const postStudentInfo = (name, surname, email, projectId) => {
  const obj = {
    name: name,
    surname: surname,
    email: email,
    project_id: projectId,
  };
  console.log(obj);
  let response = client.post("", obj);
  console.log("added");
  return response;
};
