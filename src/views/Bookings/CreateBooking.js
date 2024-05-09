import OnlyHeader from "components/Headers/OnlyHeader";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import {
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
  Row,
  Table,
} from "reactstrap";
import { DateRangePicker } from "react-date-range";

const CreateBooking = () => {
  const history = useHistory();
  const [userType, setUserType] = useState("existing");

  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };

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
                <h3 className="mb-0  ">Create Booking </h3>
              </CardHeader>
              <CardBody className="pt-0">
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label>Select Property</Label>
                      <InputGroup className="input-group-alternative">
                        <Input type="select">
                          <option value="">Select Property</option>
                          <option value="oakland">
                            Alabama springfield 1588
                          </option>
                        </Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup tag="fieldset">
                      <Label>User already exists? </Label>
                      <FormGroup check>
                        <Label check>
                          <Input
                            name="userType"
                            type="radio"
                            value="existing"
                            checked={userType === "existing"}
                            onChange={() => handleUserTypeChange("existing")}
                          />
                          Yes
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            name="userType"
                            type="radio"
                            value="new"
                            checked={userType === "new"}
                            onChange={() => handleUserTypeChange("new")}
                          />
                          No
                        </Label>
                      </FormGroup>
                    </FormGroup>
                  </Col>

                  {userType == "existing" ? (
                    <>
                      <Col md="6">
                        <FormGroup>
                          <Label>Select User</Label>
                          <InputGroup className="input-group-alternative">
                            <Input type="select">
                              <option value="">Select User</option>
                              <option value="asdf">
                                Jhon doe(000234234 ){" "}
                              </option>
                            </Input>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label>Paypal Email</Label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              disabled
                              type="email"
                              placeholder="e.g example@gmail.com"
                            ></Input>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col md="6">
                        <FormGroup>
                          <Label>First Name: </Label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              type="text"
                              autoComplete="new-email"
                              placeholder="First Name"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-4">
                          <Label>Last Name: </Label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              type="text"
                              autoComplete="new-email"
                              placeholder="Last Name"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-4">
                          <Label>Phone Number: </Label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              type="number"
                              autoComplete="new-email"
                              placeholder="Phone Number"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup className="mb-4">
                          <Label>Paypal Email: </Label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              type="email"
                              autoComplete="new-email"
                              placeholder="e.g example@gmail.com"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </>
                  )}
                  <Col xs="6">
                    <FormGroup className="mb-4">
                      <Label>Check In</Label>
                      <InputGroup className="input-group-alternative">
                        <Input type="datetime-local" autoComplete="new-email" />
                      </InputGroup>
                    </FormGroup>{" "}
                  </Col>
                  <Col xs="6">
                    <FormGroup className="mb-4">
                      <Label>Check out</Label>
                      <InputGroup className="input-group-alternative">
                        <Input type="datetime-local" autoComplete="new-email" />
                      </InputGroup>
                    </FormGroup>{" "}
                  </Col>

                  <Col xs="12">
                    <Button className="mt-2  bg-default border-0 text-white">
                      Create
                    </Button>{" "}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CreateBooking;
