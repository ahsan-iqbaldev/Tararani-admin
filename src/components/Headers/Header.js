/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { getProperties } from "store/properties/propertiesThunk";

const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);
  const uid = user.uid;
  const { property, loading } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(getProperties(uid));
  }, []);
  return (
    <>
      <div className="header bg-site-primary pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Products
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{property.length}</span>
                      </div>
                      {/* <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col> */}
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Earnings
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">$0</span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="4">
                <Card className="card-stats mb-4  mt-lg-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Categories
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">0</span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
