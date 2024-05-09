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
import { getsingleProperty } from "store/properties/propertiesThunk";

const PropertyDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singleProperty, loading } = useSelector((state) => state.properties);

  console.log(singleProperty);

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
                      {/* <h5 className="mb-0">General Description</h5>
                      <p>{singleProperty?.generalDescription}</p>

                      <h5 className="mb-0">Usable Space</h5>
                      <p>{singleProperty?.usableSpace}</p>
                      <h5 className="mb-0">Communications/transportation</h5>
                      <p>{singleProperty?.communications}</p>
                      <h5 className="mb-0">Other noteworthy items</h5>
                      <p>{singleProperty?.otherNoteworthyItems}</p> */}
                    </Col>

                    {/* <Col xs="12" className="d-flex mt-3">
                  <h5 className="mb-0">Rental by individual bedroom?</h5>
                  <Badge className="mx-3 px-4 text-white bg-default" pill>
                    {singleProperty?.rentalByRoom ? "Yes" : "No"}
                  </Badge>
                </Col> */}
                  </Row>
                  {/* <h5 className="">Amenities</h5> */}

                  {/* <Row>
                    <Col xs="12">
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Amenity</th>
                            <th scope="col">Image</th>
                          </tr>
                        </thead>
                        <tbody>
                          {singleProperty?.keyAmenities?.map(
                            (amenity, index) => {
                              return (
                                <tr key={index + 100}>
                                  <th scope="row">{amenity?.name}</th>
                                  <td>
                                    <img
                                      width="50px"
                                      height="50px"
                                      className="rounded"
                                      src={amenity?.image}
                                    />
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </Table>
                    </Col>
                  </Row> */}

                  <Row>
                    <Col xs="12" className="d-flex align-items-center">
                      <h5 className="mb-0 mr-2">
                     Product Category
                      </h5>
                      <Badge className=" px-4 text-white bg-default" pill>
                        {singleProperty?.category}
                      </Badge>
                    </Col>

                    <Col xs="12">
                      {/* {singleProperty?.priceDetails?.roomType == "true" ? (
                        <Table
                          className="align-items-center table-flush mt-3"
                          responsive
                        >
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Bedroom</th>
                              <th scope="col">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {singleProperty?.priceDetails?.bedrooms?.map(
                              (room, idx) => {
                                return (
                                  <tr key={idx}>
                                    <th scope="row">{room?.name}</th>
                                    <td>${room?.price}</td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </Table>
                      ) : (
                        <div className="d-flex flex-column flex-wrap">
                          <div className="d-flex flex-wrap  mt-2">
                            <h5 className="mb-0 mr-2">Price per night</h5>
                            <Badge className=" px-4 text-white bg-default" pill>
                              ${singleProperty?.priceDetails?.pricePerNight}{" "}
                            </Badge>
                          </div>
                          <div className="d-flex flex-wrap mt-2 ">
                            <h5 className="mb-0 mr-2">
                              Maximum numbers of guests allowed
                            </h5>
                            <Badge className=" px-4 text-white bg-default" pill>
                              {singleProperty?.priceDetails?.maxGuests}{" "}
                            </Badge>
                          </div>
                          <div className="d-flex flex-wrap mt-2">
                            <h5 className="mb-0 mr-2">Extra guest fee</h5>
                            <Badge className=" px-4 text-white bg-default" pill>
                              ${singleProperty?.priceDetails?.extraGuestFee}{" "}
                            </Badge>
                          </div>
                        </div>
                      )} */}

                      <div className="d-flex flex-column ">
                        {/* <div className=" d-flex align-items-center mt-3">
                          <h5 className="mb-0 mr-2">Pets Allowed ?</h5>
                          <Badge className="px-4 text-white bg-default" pill>
                            {singleProperty?.petsAllowed === "true"
                              ? "Yes"
                              : "No"}
                          </Badge>
                        </div> */}
                        {/* {singleProperty?.petsAllowed == "true" && (
                          <div className=" d-flex align-items-center mt-3">
                            <h5 className="mb-0 mr-2">Pets Fee</h5>
                            <Badge
                              className="  px-4 text-white bg-default"
                              pill
                            >
                              ${singleProperty?.petFee}
                            </Badge>
                          </div>
                        )} */}
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
