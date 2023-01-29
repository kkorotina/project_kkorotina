import {
  Card,
  Button,
  ButtonGroup,
  Row,
  Col,
  Container,
  Form,
} from "react-bootstrap";
import { StudentInfo } from "./StudentInfo";
import { useState } from "react";
import { AddStudent } from "./AddStudent";
import { BsCheckCircle, BsPencilSquare, BsXCircle } from "react-icons/bs";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteProject } from "../requests/deleteProject";
import { patchChangeDescription } from "../requests/patchChangeeDescription";
import Axios from "axios";

export const client = Axios.create({
  baseURL: "https://httpbin.org/patch",
});

export const ProjectCard = (props) => {
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [description, setDescription] = useState("");
  const id = props.project.project_id;
  const name = props.project.name;
  const max_capacity = props.project.max_capacity;

  const schema = yup.object().shape({
    description: yup.string().required("Необходимо ввести новое описание"),
  });

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddStudent = () => {
    setShowAddStudent(!showAddStudent);
  };

  const showEditingField = () => {
    setEditDescription(!editDescription);
  };

  const handleEditDescription = (e) => {
    console.log(description);
    patchChangeDescription(description, id);
  };

  const handleDeleteProject = () => {
    const id = props.project.project_id;
    deleteProject(id);
  };
  return (
    <Card
      className="me-4 mt-3"
      style={{ width: "22rem" }}
      key={props.project.project_id}
    >
      <Card.Img
        variant="top"
        src="https://asraraspia.umsu.ac.id/wp-content/uploads/2021/11/Strategi-Belajar-Small-Group-Work.jpg"
      />
      <Card.Body>
        <Card.Title>
          <h4>{props.project.name}</h4>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <Container>
            <Row style={{ paddingRight: "0px", maxWidth: "100%" }}>
              {!editDescription ? (
                <Row>
                  <Col className="align-items-center justify-content-center col-10 my-auto text-start">
                    {props.project.description}
                  </Col>
                  <Col className="icon-button align-items-center justify-content-center my-auto">
                    <BsPencilSquare
                      type="button"
                      color="blue"
                      onClick={showEditingField}
                    />
                  </Col>
                </Row>
              ) : (
                <div>
                  {/* // PATCH редактировать описание проекта */}
                  <Form onSubmit={handleEditDescription}>
                    <Col className="align-items-center justify-content-center my-auto text-start">
                      <Form.Control
                        type="text"
                        defaultValue={props.project.description}
                        placeholder="ввкдтне что-то"
                        {...register("description")}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Button
                        type="submit"
                        variant="primary"
                        className="Buttton btn-sm rounded-pill me-2 mt-1 "
                      >
                        Изменить
                      </Button>
                      <Button
                        className="Buttton btn-sm rounded-pill me-2 mt-1"
                        type="button"
                        variant="Light"
                        onClick={showEditingField}
                      >
                        Отмена
                      </Button>
                    </Col>
                  </Form>
                </div>
              )}
            </Row>
            <Row style={{ paddingRight: "0px", maxWidth: "100%" }}>
              <Col className="alignalign-items-center justify-content-center my-auto col-10 text-start-items-start">
                <Card.Text style={{ color: "black" }}>
                  Max число участников: {props.project.max_capacity}
                </Card.Text>
              </Col>
            </Row>
          </Container>
        </Card.Subtitle>

        <Row>
          {props.project.students.map((student, id) => {
            return (
              <StudentInfo
                student={student}
                currentProjectId={props.project.project_id}
                key={student.id}
              />
            );
          })}
        </Row>

        <div>
          {showAddStudent && (
            <AddStudent
              onClick={handleAddStudent}
              projectId={props.project.project_id}
            />
          )}
        </div>

        <ButtonGroup>
          {/* // POST Добавить студента */}
          <Button
            variant="primary"
            className="Button btn-sm rounded-pill"
            onClick={handleAddStudent}
          >
            Добавить студента
          </Button>
          {/* // DELETE удалить проект */}
          <Button
            variant="danger"
            className="Button btn-sm rounded-pill"
            onClick={handleDeleteProject}
          >
            Удалить проект
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};
