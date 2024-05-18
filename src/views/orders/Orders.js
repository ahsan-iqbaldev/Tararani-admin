import OnlyHeader from "components/Headers/OnlyHeader";
import React, { useEffect, useState } from "react";
import { HiTrendingUp } from "react-icons/hi";
import { MdOutlineTrendingFlat } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardHeader, Container, Row, Table } from "reactstrap";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { getOrders } from "store/orders/ordersThunk";
import { deleteProperty } from "store/properties/propertiesThunk";
import dayjs from "dayjs";
import { updateOrderAction } from "store/orders/ordersThunk";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { rejectOrder } from "store/orders/ordersThunk";
import Loader from "components/Loader";

const Orders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { orders, loading } = useSelector((state) => state.allOrders);
  const { user } = useSelector((state) => state.auth);
  const uid = user.uid;
  const [modal, setModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");
  const handleDelete = async (Id) => {
    console.log(Id, "ahsanId");
    dispatch(
      rejectOrder({
        Id,
        onSuccess: () => {
          toast.success("Order Rejected Successfully");
          setModal(!modal);
          dispatch(getOrders());
        },
      })
    );
  };

  const updateStatus = (id, data) => {
    console.log(id, data, "Ahsan");
    dispatch(
      updateOrderAction({
        id,
        data,
        onSuccess: () => {
          toast.success("Update Order Status Sucessfully");
          dispatch(getOrders());
        },
      })
    );
  };

  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <>
      <OnlyHeader />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 justify-content-between d-flex flex-wrap align-items-center">
                <h3 className="mb-0  ">Orders</h3>
              </CardHeader>
              {loading ? (
                <Loader />
              ) : (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Location</th>
                      <th scope="col">CreatedAt</th>
                      <th scope="col">Status</th>

                      <th scope="col" className="text-center">
                        actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((property, index) => (
                      <tr key={index}>
                        <td className="">{property?.productData?.title}</td>
                        <th>{`${property.firstName} ${property.lastName}`}</th>
                        <td>{property.phoneNumber}</td>
                        <td>{`${property.selectedCity}, ${property.selectedState}`}</td>
                        <td>
                          {" "}
                          {dayjs
                            .unix(property.createdAt.seconds)
                            .format("YYYY-MM-DD / hh:mm A")}
                        </td>
                        <td>
                          {" "}
                          <Button
                            size="sm"
                            disabled
                            className={`${
                              property?.status == "completed"
                                ? "bg-success"
                                : "bg-danger"
                            } text-white border-0`}
                          >
                            {property?.status}
                          </Button>
                        </td>

                        <td className="text-center">
                          <Link to={`/admin/orders-details/${property.id}`}>
                            <Button
                              size="sm"
                              className="bg-default border-0 text-white mr-2"
                            >
                              View Details
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            className="bg-default border-0 text-white"
                            disabled={property?.status != "pending"}
                            onClick={() =>
                              updateStatus(
                                property?.id,
                                property?.status == "completed"
                                  ? "pending"
                                  : "completed"
                              )
                            }
                          >
                            {property?.status == "completed" ? (
                              <HiTrendingUp />
                            ) : (
                              <MdOutlineTrendingFlat />
                            )}
                          </Button>

                          <Button
                            size="sm"
                            className="bg-default border-0 text-white"
                            disabled={property?.status != "pending"}
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
              Are you sure you want to reject this Order?
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
                Confirm Reject
              </Button>{" "}
            </ModalFooter>
          </Modal>
        </Row>
      </Container>
    </>
  );
};

export default Orders;
