import OnlyHeader from "components/Headers/OnlyHeader";
import { countries } from "../../context/index";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
  Row,
  InputGroup,
} from "reactstrap";
import { addProperty } from "store/properties/propertiesThunk";

const CreateListing = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector((state) => state.properties);
  const { user } = useSelector((state) => state.auth);

  const uid = user.uid;

  const [formData, setFormData] = useState({
    category: null,
    title: "",
    description: "",
    productImages: [],
    price: "",
    comparePrice: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      addProperty(
        {
        formData,
        onSuccess: () => {
          history.push("/admin/products");
        },
        uid,
      }
    )
    );
    console.log(formData,'formData');
  };

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
                <h3 className="mb-0  ">Create Listing</h3>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardBody>
                  <Row>

                    <Col md="6">
                      <FormGroup>
                        <Label>Category</Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            type="select"
                            onChange={handleInputChange}
                            value={formData.category}
                            name="category"
                            required
                          >
                            <option value="">Select Category</option>
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
                            type="Input"
                            onChange={handleInputChange}
                            value={formData.title}
                            name="title"
                            placeholder="Add Product Title"
                            required
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <FormGroup>
                        <Label>Description</Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            type="text"
                            placeholder="Description"
                            name="description"
                            onChange={handleInputChange}
                            value={formData.description}
                            required
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col xs="12">
                      <h4>Upload Product Images </h4>
                    </Col>
                    <Col md="6" className="mt-2">
                      <InputGroup className="input-group-alternative">
                        <Input
                          required
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
                    </Col>
                    <Col xs="12">
                      <hr />
                    </Col>

                    <Col xs="12">
                      <h3>Pricing Details </h3>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Price</Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            type="number"
                            placeholder="Add Price"
                            onChange={handleInputChange}
                            value={formData.price}
                            name="price"
                            required
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Compare-at price</Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            type="number"
                            placeholder="Add Compare Price"
                            onChange={handleInputChange}
                            value={formData.comparePrice}
                            name="comparePrice"
                            required
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col xs="12">
                      <Button
                        className="mt-2  bg-default border-0 text-white"
                        type="submit"
                      >
                        {loading ? "Laoding..." : "Create"}
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

export default CreateListing;
