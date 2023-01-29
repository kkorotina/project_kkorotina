import { Col, ButtonGroup, Row, Form } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import { deleteStudent } from "../requests/deleteStudent";
import { patchChangeProject } from "../requests/patchChangeProject";

export const StudentInfo = (props) => {
  const { posts } = useContext(AppContext);

  const name = props.student.name;
  const surname = props.student.surname;
  const email = props.student.email;
  const studentId = props.student.student_id;
  const [showError, setShowError] = useState(false);
  const [response, setResponse] = useState("");

  const handleDelete = () => {
    const id = studentId;
    deleteStudent(id);
  };

  const handleChangeProject = (e) => {
    const project_id = e.target.value;

    posts.map((project) => {
      if (project.project_id === parseInt(project_id)) {
        if (project.max_capacity !== project.students.length) {
          setResponse(() =>
            patchChangeProject(name, surname, project_id, email, studentId)
          );
        } else {
          setShowError(true);
        }
      }
    });

    if (response.status === 200) {
      console.log("success!");
    }
  };

  return (
    <Row key={props.student.student_id}>
      <Col className="col align-items-center justify-content-center my-auto ">
        <p className="align-middle" style={{ fontSize: "1.6vh" }}>
          {name} {surname}
        </p>
      </Col>
      <Col>
        <ButtonGroup className=" align-top ">
          {/* // PATCH изменить проект у студента */}
          <Form.Select
            // change to student id instead
            onChange={handleChangeProject}
            aria-label="Default select example"
            size="sm"
            className="rounded-pill "
          >
            <option value="0">Проект</option>
            {posts.map((project) => {
              return (
                project.project_id !== props.currentProjectId && (
                  <option value={project.project_id} key={project.project_id}>
                    {project.name}
                  </option>
                )
              );
            })}
          </Form.Select>

          {/* // DELETE удалить студента */}
          <BsTrash
            type="button"
            color="#7a2309"
            className="icon-delete-student justify-content-center my-auto"
            onClick={handleDelete}
          />
        </ButtonGroup>
      </Col>
      <div>
        {showError && (
          <p style={{ "font-size": "medium", color: "red" }}>
            Нет свободных мест для участника проекта
          </p>
        )}
      </div>
    </Row>
  );
};
