import Axios from "axios";

export const deleteStudent = (id) => {
  const client = Axios.create({
    baseURL: `http://localhost:8000/student/?student_id=${id}`,
  });
  console.log(id);
  client.delete("", id);
  console.log("deleted student successfully");
};
