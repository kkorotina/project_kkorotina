import { Card, Button, Form, ButtonGroup, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { addPosts } from "../requests/postCreateProject";
import * as yup from "yup";

export const ModalCreateProject = ({ onClick }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  const schema = yup.object().shape({
    projectName: yup.string().required("Необходимо ввести название проекта"),
    projectDescription: yup
      .string()
      .required("Необходимо ввести описание проекта"),
    maxCapacity: yup
      .number("Необходимо ввести количество участников")
      .positive()
      .required(),
  });

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmit = (e) => {
    console.log(projectName, projectDescription, maxCapacity);
    const response = addPosts(projectName, projectDescription, maxCapacity);
    setPosts([response.data, ...posts]);
    if (response.status === 200) {
      setProjectName("");
      setProjectDescription("");
      setMaxCapacity("");
      setMessage("Project created successfully");
      setShowAlert(true);
    } else {
      setMessage("Some error occured");
    }
  };

  return (
    /* POST создание проекта */
    <Form onSubmit={handleSubmit}>
      <Card style={{ width: "22rem" }}>
        <Card.Img
          variant="top"
          src="https://asraraspia.umsu.ac.id/wp-content/uploads/2021/11/Strategi-Belajar-Small-Group-Work.jpg"
        />
        <Card.Body>
          <Card.Title>
            <Form.Control
              type="text"
              placeholder="Название"
              {...register("projectName")}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <Form.Control
              type="text"
              placeholder="Описание"
              contentEditable="true"
              {...register("projectDescription")}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Количество участников"
              className="mt-1 max-width"
              {...register("maxCapacity")}
              onChange={(e) => setMaxCapacity(e.target.value)}
            />

            {showAlert && (
              <Alert
                variant="success"
                style={{ height: "30px" }}
                className="mt-1"
              >
                {message ? <p>{message}</p> : null}
              </Alert>
            )}
          </Card.Subtitle>

          <ButtonGroup>
            <Button
              type="submit"
              variant="primary"
              className="Buttton btn-sm rounded-pill me-2"
            >
              Сохранить
            </Button>
            <Button
              type="submit"
              variant="light"
              className="Buttton btn-sm rounded-pill"
              onClick={onClick}
            >
              Отменить
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </Form>
  );
};
