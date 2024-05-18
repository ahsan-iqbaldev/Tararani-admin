import OnlyHeader from "components/Headers/OnlyHeader";
import Loader from "components/Loader";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import { MdOutlineTrendingFlat } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardHeader, Container, Row, Table } from "reactstrap";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { updateTopSellingAction } from "store/properties/propertiesThunk";
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

  const updateTopSelling = (id, data) => {
    console.log(id, data, "Ahsan");
    dispatch(
      updateTopSellingAction({
        id,
        data,
        onSuccess: () => {
          toast.success("Update Top Selling products");
        },
      })
    );
  };

  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(getProperties(uid));
  }, []);

  return (
    <>
      <OnlyHeader />
      <Container className="mt--7" fluid>
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
                <Loader />
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
                        <td className="">{property?.title}</td>
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
                          <Button
                            size="sm"
                            className="bg-default border-0 text-white"
                            onClick={() =>
                              updateTopSelling(
                                property?.id,
                                !property?.topSelling
                              )
                            }
                          >
                            {property?.topSelling ? (
                              <HiTrendingUp />
                            ) : (
                              <MdOutlineTrendingFlat />
                            )}
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
                disabled={loading}
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
