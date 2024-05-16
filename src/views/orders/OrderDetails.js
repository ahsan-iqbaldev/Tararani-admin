import OnlyHeader from "components/Headers/OnlyHeader";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import { getsingleOrder } from "store/orders/ordersThunk";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singleOrder, loading } = useSelector((state) => state.allOrders);

  console.log(singleOrder, "singleOrder");

  useEffect(() => {
    dispatch(getsingleOrder(id));
  }, []);

  return (
    <div>
      {" "}
      <OnlyHeader />
      <Container className="mt--7" fluid>
        <Row className="property_details">
          <div className="col">
            <Card className="shadow mb-3">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Product Details</h3>
              </CardHeader>
              {loading ? (
                <div className="w-100 d-flex justify-content-center align-items-center vh-100">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                </div>
              ) : (
                <CardBody className="">
                  <Row>
                    <Col xs="12">
                      <div>
                        <h3 className="mb-0">Title</h3>
                        <p className="property_details-text text-capitalize">
                          {singleOrder?.productData?.title}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <h3 className="mb-0">Product Details</h3>

                  <Row>
                    {singleOrder?.productData?.productImages?.map(
                      (img, idx) => {
                        return (
                          <Col
                            lg="3"
                            md="6"
                            sm="6"
                            xs="12"
                            className="mt-3"
                            key={idx}
                          >
                            <img
                              src={img}
                              alt="propertyImages"
                              height="150px"
                              className="rounded w-100  "
                            />
                          </Col>
                        );
                      }
                    )}

                    <Col xs="12" className="mt-3">
                      <h5 className="mb-0">Address</h5>
                      <p>{singleOrder?.address}</p>
                    </Col>
                    <Col xs="12" className="mt-1">
                      <h5 className="mb-0">Email</h5>
                      <p>{singleOrder?.email}</p>
                    </Col>
                    <Col xs="12" className="mt-1">
                      <h5 className="mb-0">Phone Number</h5>
                      <p>{singleOrder?.phoneNumber}</p>
                    </Col>
                    <Col xs="12" className="mt-1">
                      <h5 className="mb-0">City</h5>
                      <p>{singleOrder?.selectedCity}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="12" className="d-flex align-items-center">
                      <h5 className="mb-0 mr-2">Current Location</h5>
                      <Badge className=" px-4 text-white bg-default" pill>
                        {singleOrder?.curLocation}
                      </Badge>
                    </Col>

                    <Col xs="12">
                      <div className="d-flex flex-column ">
                        <div className=" d-flex align-items-center mt-3">
                          <h5 className="mb-0 mr-2">Price</h5>
                          <Badge className=" px-4 text-white bg-default" pill>
                            {singleOrder?.price}
                          </Badge>
                        </div>
                        <div className=" d-flex align-items-center mt-3">
                          <h5 className="mb-0 mr-2">Status</h5>
                          <Badge className=" px-4 text-white bg-default" pill>
                            {singleOrder?.status}
                          </Badge>
                        </div>
                      </div>
                      <div className=" d-flex align-items-center mt-3">
                        <h5 className="mb-0 mr-2">Color</h5>
                        <Badge className=" px-4 text-white bg-default" pill>
                          {singleOrder?.color}
                        </Badge>
                      </div>

                      <div className=" d-flex align-items-center mt-3">
                        <h5 className="mb-0 mr-2">Size</h5>
                        <Badge className=" px-4 text-white bg-default" pill>
                          {singleOrder?.size}
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default OrderDetails;
