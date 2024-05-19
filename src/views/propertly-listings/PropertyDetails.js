import OnlyHeader from "components/Headers/OnlyHeader";
import Loader from "components/Loader";
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
import { getsingleProperty } from "store/properties/propertiesThunk";

const PropertyDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singleProperty, loading } = useSelector((state) => state.properties);

  console.log(singleProperty,'singleProperty');

  useEffect(() => {
    dispatch(getsingleProperty(id));
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
               <Loader/>
              ) : (
                <CardBody className="">
                  <Row>
                    <Col xs="12">
                      <div>
                        <h3 className="mb-0">Title</h3>
                        <p className="property_details-text text-capitalize">
                          {singleProperty?.title}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <h3 className="mb-0">Product Details</h3>

                  <Row>
                    {singleProperty?.productImages?.map((img, idx) => {
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
                    })}

                    <Col xs="12" className="mt-3">
                      <h5 className="mb-0">Descriptive</h5>
                      <p>{singleProperty?.description}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="12" className="d-flex align-items-center">
                      <h5 className="mb-0 mr-2">Product Category</h5>
                      <Badge className=" px-4 text-white bg-default" pill>
                        {singleProperty?.category}
                      </Badge>
                    </Col>

                    <Col xs="12">
                      <div className="d-flex flex-column ">
                        <div className=" d-flex align-items-center mt-3">
                          <h5 className="mb-0 mr-2">Price</h5>
                          <Badge className=" px-4 text-white bg-default" pill>
                            ${singleProperty?.price}
                          </Badge>
                        </div>
                        <div className=" d-flex align-items-center mt-3">
                          <h5 className="mb-0 mr-2">Compare Price</h5>
                          <Badge className=" px-4 text-white bg-default" pill>
                            ${singleProperty?.comparePrice}
                          </Badge>
                        </div>
                        <div className=" d-flex align-items-center mt-3">
                          <h5 className="mb-0 mr-2">Status</h5>
                          <Badge className=" px-4 text-white bg-default" pill>
                            {singleProperty?.status}
                          </Badge>
                        </div>
                      </div>
                      <div className=" d-flex align-items-center mt-3">
                        <h5 className="mb-0 mr-2">Color</h5>
                        <Badge className=" px-4 text-white bg-default" pill>
                          {singleProperty?.color}
                          color
                        </Badge>
                      </div>
                      
                      <div className=" d-flex align-items-center mt-3">
                        <h5 className="mb-0 mr-2">Size</h5>
                        <Badge className=" px-4 text-white bg-default" pill>
                          {singleProperty?.size}
                          size
                        </Badge>
                      </div>
                  
                      <div className=" d-flex align-items-center mt-3">
                        <h5 className="mb-0 mr-2">Top Selling</h5>
                        <Badge className=" px-4 text-white bg-default" pill>
                          {singleProperty?.topSelling}
                          topSelling
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

export default PropertyDetails;
