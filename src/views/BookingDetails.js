import OnlyHeader from "components/Headers/OnlyHeader";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

const BookingDetails = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [bookingType, setBookingType] = useState("");
  const history = useHistory();

  useEffect(() => {
    const typeFromState = history.location.state?.type;

    if (typeFromState) {
      setBookingType(typeFromState);
    }
  }, [history.location.state]);
  return (
    <>
      <OnlyHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow mb-3">
              <CardHeader className="border-0 justify-content-between d-flex flex-wrap align-items-center">
                <h3 className="mb-0  ">
                  {bookingType ? "Request" : "Booking"} ID# 2342423423{" "}
                </h3>
              </CardHeader>

              <CardBody className="pt-0">
                <h4>Property Details</h4>
                <div className="rounded border px-3 py-2">
                  <Row noGutters>
                    <Col md="12">
                      <h5 className="mb-0">Address</h5>
                      <p className="property_details-text text-capitalize mb-0">
                        Alabama springfield 1588
                      </p>
                      <div className=" d-flex align-items-center mt-3">
                        <h5 className="mb-0 mr-2">Pets Allowed ?</h5>
                        <Badge className=" px-4 text-white bg-default" pill>
                          Yes
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </div>

                <h4 className="mt-2">Guest Details</h4>
                <div className="rounded border px-3 py-2">
                  <Row noGutters>
                    <Col
                      xs="12"
                      className="mt-2 d-flex justify-content-center mb-3"
                    >
                      <div className="avatar avatar-lg"></div>
                    </Col>
                    <Col md="6">
                      <Label className="font-weight-600 mr-2">
                        Guest Name:
                      </Label>
                      <span>Jhon doe</span>
                    </Col>
                    <Col md="6">
                      <Label className="font-weight-600 mr-2">Phone No#:</Label>
                      <span>Jhon doe</span>
                    </Col>

                    <Col md="6">
                      <Label className="font-weight-600 mr-2">Check In:</Label>
                      <span>December 20, 2022, at 2:34 AM</span>
                    </Col>
                    <Col md="6">
                      <Label className="font-weight-600 mr-2">Check Out:</Label>
                      <span>December 24, 2022, at 2:34 AM</span>
                    </Col>

                    <Col md="6">
                      <Label className="font-weight-600 mr-2">
                        Number of guests:
                      </Label>
                      <span>2</span>
                    </Col>
                  </Row>
                </div>

                {bookingType == "request" && (
                  <div className=" mt-3">
                    <Button
                      size="md"
                      className="bg-success text-white border-0"
                    >
                      Accept
                    </Button>
                    <Button
                      size="md"
                      onClick={toggle}
                      className="bg-danger text-white border-0"
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </Row>

        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader>
            <h3>Reason of rejection</h3>
          </ModalHeader>
          <ModalBody className="py-0">
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <Input
                  type="textarea"
                  placeholder="Please provide the reason for rejection..."
                  style={{ height: "150px" }}
                />
              </InputGroup>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color=" bg-default border-0 text-white" onClick={toggle}>
              Save{" "}
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default BookingDetails;
