import OnlyHeader from "components/Headers/OnlyHeader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Row,
  Col,
  Container,
  CardHeader,
  Spinner,
} from "reactstrap";
import { updateSettings } from "store/settings/settingThunk";
import { getSettings } from "store/settings/settingThunk";
const Settings = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  console.log(formData.identification);
  const [disable, setDisable] = useState(true);

  const { user } = useSelector((state) => state.auth)
  const { userData, loading, updateLoading } = useSelector((state) => state.settings)
  console.log(userData, loading);

  const userId = user.uid;
  const preIdCard = userData?.identifierImageUrl;
  const preProfileImg = userData?.profileImageUrl;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setDisable(false);
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      [fileType]: file,
    });
    setDisable(false);
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    try {
      setDisable(true);
      await dispatch(updateSettings({ formData,userId }));
      setFormData({
      firstName : '',
      lastName : '',
      });
    }
    catch (error) {
      setDisable(false);
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(getSettings(userId));
  }, [dispatch]);

  return (
    <>
      <OnlyHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow mb-3">
              <CardHeader className="border-0 justify-content-between d-flex flex-wrap align-items-center">
                <h3 className="mb-0  ">Settings</h3>
              </CardHeader>
              {
                !loading ?
                  (
                    <CardBody>
                      <Form
                        role="form"
                        onSubmit={handleUpdateSettings}
                      >
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label>First Name </label>

                              <InputGroup className="input-group-alternative mb-3">
                                <Input
                                  placeholder="First Name"
                                  type="text"
                                  defaultValue={userData?.firstName}
                                  onChange={handleInputChange}
                                  name="firstName"
                                  required
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Last Name </label>

                              <InputGroup className="input-group-alternative mb-3">
                                <Input
                                  placeholder="Last Name"
                                  type="text"
                                  defaultValue={userData?.lastName}
                                  onChange={handleInputChange}
                                  name="lastName"
                                  required
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>

                          {/* <Col md="6">
                            <FormGroup>
                              <label>Paypal Email </label>

                              <InputGroup className="input-group-alternative mb-3">
                                <Input
                                  placeholder="Paypal Email"
                                  type="text"
                                  defaultValue={userData?.paypalEmail}
                                  onChange={handleInputChange}
                                  name="paypalEmail"
                                  required
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col> */}
                        </Row>

                        {/* <FormGroup className="mb-4">
                          <label>Upload Photo of Government ID Card: </label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              type="file"
                              autoComplete="new-email"
                              onChange={(e) => handleFileChange(e, "identification")}
                            />
                          </InputGroup>
                        </FormGroup>

                        <img
                          src={
                            formData.identification ?
                              URL.createObjectURL(formData.identification)
                              : (userData?.identifierImageUrl)
                          }
                          alt="ID Card"
                          width={'200px'}
                          className="mb-4 rounded"
                        />

                        <FormGroup className="mb-3">
                          <label>Upload Your Selfie (Face Photo):</label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              type="file"
                              accept="image/*"
                              autoComplete="new-email"
                              onChange={(e) => handleFileChange(e, "profileImage")}
                            />
                          </InputGroup>
                        </FormGroup>

                        <img
                          src={
                            formData.profileImage ?
                              URL.createObjectURL(formData.profileImage)
                              : (userData?.profileImageUrl)
                          }
                          alt="Profile Image"
                          width={'200px'}
                          className="mb-4 rounded"
                        /> */}

                        <div className="text-center">
                          <Button
                            className="mt-4 btn  bg-default border-0 text-white"
                            color="primary"
                            type="submit"
                            disabled={disable}
                          >
                            {
                              !updateLoading ?
                                ("Save")
                                :
                                (
                                  <Spinner
                                    size="sm"
                                    style={{
                                      display: "block",
                                      margin: "0 auto",
                                    }}
                                  />
                                )
                            }
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  )
                  : (
                    <div className="mt-5 mb-5 text-center">
                      <Spinner
                        size="lg"
                        style={{
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                    </div>
                  )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Settings;
