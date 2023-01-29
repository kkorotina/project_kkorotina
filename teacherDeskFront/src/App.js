import "./App.css";
import { Row, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/Header";
import { ProjectCard } from "./components/ProjectCard";
import { useState, createContext, useEffect } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { ModalCreateProject } from "./components/ModalCreateProject";

import Axios from "axios";
export const AppContext = createContext();

function App() {
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/project/").then((res) => {
      setPosts(res.data);
    });
  }, []);

  console.log(posts);

  const handleShow = (event) => {
    setShow(!show);
  };

  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <AppContext.Provider value={{ posts }}>
          <Container className="mt-5 ">
            <Row>
              {posts.map((project, id) => {
                return (
                  <ProjectCard
                    className="col-4"
                    project={project}
                    key={project.project_id}
                  />
                );
              })}

              {!show && (
                <div className="col-4 align-items-center justify-content-center my-auto">
                  <Button
                    className="align-middle rounded-pill"
                    variant="primary"
                    onClick={handleShow}
                  >
                    <BsPlusCircle className="me-2" />
                    Добавить проект
                  </Button>
                </div>
              )}
              {show && (
                <div
                  style={{ padding: "0px" }}
                  className="col-4 align-items-center justify-content-center mt-3"
                >
                  <ModalCreateProject onClick={handleShow} />
                </div>
              )}
            </Row>
          </Container>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
