import { Button, Row, Form } from "react-bootstrap";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postStudentInfo } from "../requests/postStudentInfo";

export const AddStudent = ({ onClick, projectId }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  const schema = yup.object().shape({
    name: yup.string().required("Необходимо имя участника проекта"),
    surname: yup
      .string()
      .required("Необходимо ввести фамилию участника проекта"),
    email: yup.string("Необходимо ввести почту").required(),
  });
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmit = (e) => {
    console.log(name, surname, email, projectId);
    const response = postStudentInfo(name, surname, email, projectId);
    setPosts([response.data, ...posts]);
    if (response.status === 200) {
      setName("");
      setSurname("");
      setEmail("");
      setMessage("User created successfully");
      console.log("successfully added new student");
    } else {
      setMessage("Some error occured");
    }
  };

  return (
    // POST добавление нового студента
    <Form onSubmit={handleSubmit}>
      <Row>
        <Form.Control
          type="text"
          placeholder="Имя"
          className="mb-1"
          {...register("name")}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Control
          type="text"
          placeholder="Фамилия"
          className="mb-1"
          {...register("surname")}
          onChange={(e) => setSurname(e.target.value)}
        />
        <Form.Control
          type="email"
          placeholder="example@example.com"
          className="mb-1"
          {...register("email")}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Row>
      <Button
        type="submit"
        variant="primary"
        className="Button btn-sm rounded-pill"
      >
        Добавить
      </Button>
      <Button
        type="button"
        variant="light"
        className="Button btn-sm rounded-pill"
        onClick={onClick}
      >
        Отменить
      </Button>
    </Form>
  );
};
