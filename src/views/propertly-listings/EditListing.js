import OnlyHeader from "components/Headers/OnlyHeader";
import React, { useEffect, useRef, useState } from "react";
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
import JoditEditor from "jodit-react";
import "../../assets/css/custuminput.css";
import { getCategory } from "store/categories/categoriesThunk";

const EditListing = () => {
  const editor = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { singleProperty, loading } = useSelector((state) => state.properties);
  const { categories } = useSelector((state) => state.categories);
  console.log(singleProperty);
  const { user } = useSelector((state) => state.auth);

  const uid = user.uid;
  const docId = id;

  const [formData, setFormData] = useState({
    category: null,
    title: "",
    description: "",
    productImages: [],
    price: "",
    comparePrice: "",
    color: false,
    size: false,
  });

  console.log(formData, "HamzaIjazhiugjhyggf");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "category") {
      const selectedCategory = categories.find(
        (category) => category.title === value
      );

      setFormData({
        ...formData,
        category: value,
        categoryId: selectedCategory ? selectedCategory.id : "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleColorToggle = () => {
    setFormData({
      ...formData,
      color: !formData?.color,
    });
  };

  const handleSizeToggle = () => {
    setFormData({
      ...formData,
      size: !formData.size,
    });
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
    setFormData(singleProperty);
  }, [singleProperty]);

  useEffect(() => {
    dispatch(getsingleProperty(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCategory(uid));
  }, []);

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
                            {categories.map((state, index) => (
                              <option key={index} value={state.titlle}>
                                {state.title}
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
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <FormGroup>
                        <Label>Description</Label>
                        <InputGroup className="input-group-alternative">
                          <JoditEditor
                            ref={editor}
                            value={formData?.description}
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e,
                              })
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                 
                    <Col md="6" className="mt-2">
                      <FormGroup>
                        {" "}
                        <Label>Images</Label>
                        <InputGroup className="input-group-alternative p-2">
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
                      </FormGroup>
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

                    <Col md="6" className="mt-2">
                      <FormGroup>
                        <Label> &nbsp;</Label>
                        <div className="d-flex justify-content-around">
                          <div className="justify-content-center d-flex flex-wrap align-items-center">
                            <h3 className="mt-1">Color:</h3>
                            <Button
                              color={formData?.color ? "primary" : "secondary"}
                              onClick={handleColorToggle}
                              className="mr-2 ml-2"
                            >
                              {formData?.color ? "On" : "Off"}
                            </Button>
                          </div>
                          <div className="justify-content-center d-flex flex-wrap align-items-center">
                            <h3 className="mt-1">Size:</h3>
                            <Button
                              color={formData?.size ? "primary" : "secondary"}
                              onClick={handleSizeToggle}
                              className="ml-2"
                            >
                              {formData?.size ? "On" : "Off"}
                            </Button>
                          </div>
                        </div>
                      </FormGroup>
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
