import OnlyHeader from "components/Headers/OnlyHeader";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteProperty } from "store/properties/propertiesThunk";
import { getProperties } from "store/properties/propertiesThunk";

const PropertyListings = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { property, loading } = useSelector((state) => state.properties);
  const { user } = useSelector((state) => state.auth);
  const uid = user.uid;
  const [modal, setModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");

  console.log(property, "properties");


  const handleDelete = async (Id) => {
    console.log(Id, "ahsanId");
    dispatch(deleteProperty(Id));
    setModal(!modal);
  };

  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(getProperties(uid));
  }, []);

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
                <h3 className="mb-0  ">Product Listings</h3>
                <Button
                  className="mt-2  bg-default border-0 text-white"
                  onClick={() => {
                    history.push("/admin/create-listing");
                  }}
                >
                  Create Product
                </Button>
              </CardHeader>
              {loading ? (
                <div className="w-100 d-flex justify-content-center align-items-center vh-100">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                </div>
              ) : (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Status</th>
                      <th scope="col">Category</th>
                      <th scope="col">Sales</th>

                      <th scope="col" className="text-center">
                        actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {property?.map((property, index) => (
                      <tr key={index}>
                        <td className="">
                          {property?.title}
                        </td>
                        <td>
                          {" "}
                          <Button
                            size="sm"
                            disabled
                            className="bg-success text-white border-0"
                          >
                            {property.status}
                          </Button>
                        </td>
                        <td>{property.category}</td>
                        <th>{property.sales}</th>

                        <td className="text-center">
                          <Button
                            size="sm"
                            className="bg-default border-0 text-white"
                            onClick={() => {
                              history.push(`/admin/property/${property.id}`);
                            }}
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            className="bg-default border-0 text-white"
                            onClick={() => {
                              history.push(
                                `/admin/update-listing/${property.id}`
                              );
                            }}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-default border-0 text-white"
                            onClick={() => {
                              setConfirmDelete(property?.id);
                              toggle();
                            }}
                          >
                            <MdDelete />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card>
          </div>

          <Modal isOpen={modal} toggle={toggle}>
            <ModalBody className="mt-2">
              Are you sure you want to delete this item?
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
              <Button
                color="danger"
                onClick={() => {
                  handleDelete(confirmDelete);
                }}
              >
                Confirm Delete
              </Button>{" "}
            </ModalFooter>
          </Modal>
        </Row>
      </Container>
    </>
  );
};

export default PropertyListings;
