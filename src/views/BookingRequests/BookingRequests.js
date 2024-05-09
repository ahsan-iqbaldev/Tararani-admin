import OnlyHeader from "components/Headers/OnlyHeader";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Table,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Input,
  InputGroup,
  FormGroup,
} from "reactstrap";

const BookingRequests = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const history = useHistory();
  return (
    <>
      <OnlyHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 justify-content-between d-flex flex-wrap align-items-center">
                <h3 className="mb-0  ">Booking Requests </h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Property Name </th>
                    <th scope="col">Guest Name</th>
                    <th scope="col">CheckIn</th>
                    <th scope="col">CheckOut</th>
                    <th scope="col" className="text-center">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="">Luxury Beachfront Villa</td>
                    <td> John Doe</td>
                    <td> 2024-01-15 </td>
                    <td> 2024-01-20</td>

                    <td className="text-center">
                      <Button
                        size="sm"
                        color=" bg-default border-0 text-white"
                        onClick={() => {
                          history.push("/admin/booking/23423423", {
                            type: "request",
                          });
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="bg-success text-white border-0"
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        onClick={toggle}
                        className="bg-danger text-white border-0"
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
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
    </>
  );
};

export default BookingRequests;
