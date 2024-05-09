import OnlyHeader from "components/Headers/OnlyHeader";
import React from "react";
import { Button, Card, CardHeader, Container, Row, Table } from "reactstrap";

const Disputes = () => {
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
                <h3 className="mb-0  ">Disputes </h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Booking ID#</th>
                    <th scope="col">Property</th>
                    <th scope="col">Guest Name</th>
                    <th scope="col">Guest Phone#</th>
                    <th scope="col">Amount</th>
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
                    <td>$100</td>
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

export default Disputes;
