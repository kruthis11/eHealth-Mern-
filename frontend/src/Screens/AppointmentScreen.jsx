import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetAppointmentDetailsQuery } from "../slices/appointmentsApiSlice";

const AppointmentScreen = () => {
  const { id: appointmentId } = useParams();

  const {
    data: appointment,
    refetch,
    isLoading,
    error,
  } = useGetAppointmentDetailsQuery(appointmentId);

  const { userInfo } = useSelector((state) => state.auth);
  console.log(appointment);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <>
      <h1>Appointment Id: {appointment._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Address</h2>
              <p>
                <strong>Name: </strong> {appointment.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${appointment.user.email}`}>
                  {appointment.user.email}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {appointment.address.address},
              </p>
              <p>
                <strong>Contact: </strong>
                {appointment.address.contact}
              </p>
              {appointment.isDelivered ? (
                <Message variant="success">
                  Approved on {appointment.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Approved</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <h2>Doctor Info</h2>
            {appointment.appointmentItems.length === 0 ? (
              <Message>No Doctor Selected</Message>
            ) : (
              <ListGroup variant="flush">
                {appointment.appointmentItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/appointment/${item.doctor}`}>
                          {item.name}
                        </Link>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Appointment Summary</h2>
              </ListGroup.Item>
              {appointment.appointmentItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col>Name</Col>
                    <Col>{item.name}</Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>Chamber</Col>
                    <Col>{item.chamber}</Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>Available</Col>
                    <Col>{item.available}</Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>Specialist</Col>
                    <Col>{item.specialist}</Col>
                  </Row>
                </ListGroup.Item>
              ))}

              {/* {loadingApprove && <Loader />} */}

              {userInfo && userInfo.isAdmin && (
                <ListGroup.Item>
                  <Button type="button" className="btn btn-block">
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AppointmentScreen;
