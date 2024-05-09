import OnlyHeader from "components/Headers/OnlyHeader";
import InsuranceForHosts from "components/global/InsuranceForHosts";
import PropertyDetailsGuidelines from "components/global/PropertyDetailsGuidelines";
import PropertyPhotosGuidelines from "components/global/PropertyPhotosGuidelines";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { countries } from "../../context/index";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Modal,
  Row,
  Table,
  InputGroup,
} from "reactstrap";
import { getsingleProperty } from "store/properties/propertiesThunk";
import { updateProperty } from "store/properties/propertiesThunk";

const EditListing = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { singleProperty, loading } = useSelector((state) => state.properties);
  console.log(singleProperty);
  const { user } = useSelector((state) => state.auth);

  const uid = user.uid;
  const docId = id;

  const [formData, setFormData] = useState({
    selectedState: "",
    selectedCity: "",
    zipCode: "",
    descriptiveSentence: "",
    generalDescription: "",
    usableSpace: "",
    communications: "",
    otherNoteworthyItems: "",
    keyAmenities: [
      {
        name: "",
        image: "",
      },
    ],
    propertyImages: [],
    priceDetails: {
      roomType: "",
      pricePerNight: null,
      maxGuests: null,
      extraGuestFee: null,
      bedrooms: [
        {
          name: "",
          price: null,
        },
      ],
    },
    petsAllowed: null,
    petFee: null,
    cleaningFee: null,
    cityOptions: null,
  });

  console.log(formData, "HamzaIjazhiugjhyggf");

  const [bedrooms, setBedRooms] = useState([
    {
      name: "",
      price: null,
    },
  ]);

  const handleDetailsChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      priceDetails: { ...prev.priceDetails, roomType: e.target.value },
    }));
  };

  const [selectedState, setSelectedState] = useState("");
  const [guidelinesOpen, setGuidesLinesOpen] = useState(false);
  const guideLinesToggle = () => setGuidesLinesOpen(!guidelinesOpen);

  const [photosOpen, setPhotosGuidesLinesOpen] = useState(false);
  const photosGuideLinesToggle = () => setPhotosGuidesLinesOpen(!photosOpen);

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
  };

  const handleAmenityChange = (index, e) => {
    const updatedAmenities = [...formData.keyAmenities];

    if (e.target.name === "image" && e.target.files.length > 0) {
      const file = e.target.files[0];
      updatedAmenities[index] = {
        ...updatedAmenities[index],
        [e.target.name]: file,
      };
    } else if (e.target.name in updatedAmenities[index]) {
      updatedAmenities[index] = {
        ...updatedAmenities[index],
        [e.target.name]: e.target.value,
      };
    }

    setFormData((prevData) => ({
      ...prevData,
      keyAmenities: updatedAmenities,
    }));
  };

  const addAmenity = () => {
    setFormData((prev) => ({
      ...prev,
      keyAmenities: [...prev.keyAmenities, { name: "", image: "" }],
    }));
  };

  const removeAmenity = (index) => {
    if (formData.keyAmenities.length > 1) {
      const updatedAmenities = [...formData.keyAmenities];
      updatedAmenities.splice(index, 1);
      setFormData((prev) => ({ ...prev, keyAmenities: updatedAmenities }));
    }
  };

  // Bedrooms

  const handleBedroomChange = (index, e) => {
    const updatedBedrooms = [...bedrooms];

    updatedBedrooms[index][e.target.name] = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      priceDetails: { ...prevData.priceDetails, bedrooms: updatedBedrooms },
    }));
  };

  const addBedroom = () => {
    setBedRooms((prev) => [...prev, { name: "", price: null }]);
  };

  const removeBedroom = (index) => {
    if (bedrooms.length > 1) {
      const updatedBedrooms = [...bedrooms];
      updatedBedrooms.splice(index, 1);
      setBedRooms(updatedBedrooms);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // if (name === "selectedState") {
    //   const cityOptions = countries[value];
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     selectedCity: "",
    //     cityOptions,
    //   }));
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      updateProperty({
        formData,
        onSuccess: () => {
          history.push("/admin/products");
        },
        uid,
        docId,
      })
    );
    console.log(formData, "Ahsan New Data");
  };

  useEffect(() => {
    setFormData(singleProperty)
  }, [singleProperty]);

  useEffect(() => {
    dispatch(getsingleProperty(id));
  }, [dispatch, id]);

  return (
    <>
      <OnlyHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow mb-4">
              <CardHeader className="pb-0 border-0 justify-content-between d-flex flex-wrap align-items-center">
                <h3 className="mb-0  ">Update Listing</h3>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardBody>
                  <Row>

                    <Col md="6">
                      <FormGroup>
                        <Label>State</Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            type="select"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            value={formData?.category}
                            name="category"
                          >
                            <option value="">Select State</option>
                            {Object.keys(countries).map((state, index) => (
                              <option key={index} value={state}>
                                {state}
                              </option>
                            ))}
                          </Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Title</Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            type="input"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            value={formData?.title}
                            name="title"
                          >
                          </Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <FormGroup>
                        <Label>Description</Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            type="text"
                            placeholder="Add Description"
                            name="description"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            value={formData?.description}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    {/* <Col xs="12">
                      <hr />
                    </Col>
                    <Col xs="12">
                      <h3>
                        Rental Property Details{" "}
                      </h3>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label>Description</Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            type="textarea"
                            placeholder="e.g This rental is a perfect spot to explore..."
                            name="description"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            value={formData?.description}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col> */}
                    <Col xs="12">
                      <h4>
                        Update Product Images{" "}
                      
                      </h4>
                    </Col>
                    <Col md="6" className="mt-2">
                      <InputGroup className="input-group-alternative">
                        <Input
                          type="file"
                          multiple
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              productImages: [...e.target.files],
                            })
                          }
                        />
                      </InputGroup>
                      <div className="mt-3">
                        {formData?.productImages?.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            height={80}
                            width={80}
                            alt={`Image ${index + 1}`}
                            className="rounded ml-3"
                          />
                        ))}
                      </div>
                    </Col>
                    <Col xs="12">
                      <hr />
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label>Price</Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            type="number"
                            placeholder="e.g $100"
                            name="price"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            value={formData?.price}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label>Compare Price</Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            type="number"
                            placeholder="e.g $100"
                            name="comparePrice"
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            value={formData?.comparePrice}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col xs="12">
                      <Button
                        className="mt-2  bg-default border-0 text-white"
                        type="submit"
                      >
                        {loading ? "Laoding..." : "Update"}
                      </Button>{" "}
                    </Col>
                  </Row>
                </CardBody>
              </form>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default EditListing;
