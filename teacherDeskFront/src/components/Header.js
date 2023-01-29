import { Row, Col, Container, Image, Navbar } from "react-bootstrap";

export const Header = () => {
  return (
    <div>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Row style={{ width: "100%" }}>
            <Col className="align-items-center justify-content-center my-auto col-9 text-start">
              <Navbar.Brand>Управление проектами</Navbar.Brand>
            </Col>
            <Col className="align-items-center justify-content-center my-auto">
              <Navbar.Brand>Мария Иванова</Navbar.Brand>
            </Col>
            <Col className="ms-auto">
              <div className="image-cropper">
                <Image
                  src="https://media.istockphoto.com/id/1289220949/photo/successful-smiling-woman-wearing-eyeglasses-on-grey-wall.jpg?s=612x612&w=0&k=20&c=BjyPRn28F3mc6IiBCf4Ko-lFZisaNUYXBBnAcO47ZgE="
                  className="profile-pic"
                  alt=""
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
};
