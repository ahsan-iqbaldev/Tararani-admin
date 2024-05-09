import OnlyHeader from "components/Headers/OnlyHeader";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardHeader, Container, Row, Table } from "reactstrap";

const Bookings = () => {
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
                <h3 className="mb-0  ">Bookings </h3>{" "}
                <Button
                  className="bg-default text-white border-0"
                  onClick={() => {
                    history.push("/admin/create-booking");
                  }}
                >
                  Create Booking
                </Button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Booking ID#</th>

                    <th scope="col">Property</th>
                    <th scope="col">Guest Name</th>
                    <th scope="col">Guest Phone#</th>
                    <th scope="col">CHECK IN</th>
                    <th scope="col">CHECK OUT</th>
                    <th scope="col">Amount</th>
                    <th scope="col" className="text-center">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="">t234234234df</td>
                    <td className="">
                      North Kierland Blvd. Suite 100 Scottsdale AZ 85254
                    </td>

                    <td>John Doe</td>
                    <td>2423423423423</td>
                    <td>December 20, 2022, at 2:34 AM</td>
                    <td>December 24, 2022, at 2:34 AM</td>
                    <td>$100</td>
                    <td>
                      <Button
                        size="sm"
                        className="bg-default border-0 text-white"
                        onClick={() => {
                          history.push("/admin/booking/23423423");
                        }}
                      >
                        view details
                        {/* <i className="fa fa-eye"></i> */}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Bookings;
