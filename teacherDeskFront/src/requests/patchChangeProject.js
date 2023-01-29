import Axios from "axios";

export const client = Axios.create({
  baseURL: "http://localhost:8000/student/",
});

export const patchChangeProject = (
  name,
  surname,
  project_id,
  email,
  studentId
) => {
  //const name = name;
  //const surname = surname;
  //const studentId = studentId;
  const projectId = project_id;
  // const email = email;
  const response = client
    .patch("", {
      project_id: projectId,
      student_id: studentId,
      name: name,
      surname: surname,
      email: email,
    })
    .catch((error) => console.log("Error: ", error));

  if (response && response.data) {
    console.log("changed project successfully");
  }

  return response;
};
