import OnlyHeader from "components/Headers/OnlyHeader";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Table,
  ModalBody,
  Modal,
  FormGroup,
  Form,
  Input,
  ModalFooter,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Label,
} from "reactstrap";
import { MdDelete } from "react-icons/md";

import { FaPhoneAlt, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "store/categories/categoriesThunk";
import { useHistory } from "react-router-dom";
import { getCategory } from "store/categories/categoriesThunk";
import { deleteCategory } from "store/categories/categoriesThunk";
import { getsingleCategory } from "store/categories/categoriesThunk";

const CoHost = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const uid = user?.uid;
  const { categories,singleCategory, loading } = useSelector((state) => state.categories);
  console.log(categories, "categories");
  const [createModal, setCreateModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");
  const [formData, setFormData] = useState({
    title:"",
    Categoryimage: null,
  });

  const handleDelete = async (Id) => {
    dispatch(deleteCategory(Id));
    setModal(!modal);
  };

  const toggle = () => setModal(!modal);
  const createToggle = () => setCreateModal(!createModal);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addCategory({
        formData,
        onSuccess: () => {
          history.push("/admin/category");
          setCreateModal(!createModal)
          setFormData({
            title: "",
            Categoryimage: null,
          })
        },
        uid,
      })
    );
    console.log(formData, "formData");
  };

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
            <Card className="shadow">
              <CardHeader className="border-0 justify-content-between d-flex flex-wrap align-items-center">
                <h3 className="mb-0 ">Categories</h3>
                <Button
                  className="mt-2  bg-default border-0 text-white"
                  onClick={createToggle}
                >
                  Create category
                </Button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Products</th>
                    <th scope="col">Category Images</th>
                    <th scope="col" className="text-center">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((item, index) => (
                    <tr>
                      <td scope="col">{item?.title}</td>
                      <td scope="col">{item?.products}</td>
                      <td scope="col">
                        {" "}
                        <img
                          src={item?.Categoryimage}
                          alt="Categoryimage"
                          height="60px"
                          width="60px"
                          className="rounded"
                        />
                      </td>
                      <td scope="col" className="text-center display-1">
                        <h3>
                          <Button
                            color=" bg-default border-0 text-white"
                            size="sm"
                            type="button"
                            onClick={() => {
                              setConfirmDelete(item?.id);
                              toggle();
                            }}
                          >
                            <MdDelete />
                          </Button>
                        </h3>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
      <Modal isOpen={createModal} toggle={createToggle}>
        <Form role="form" onSubmit={handleSubmit}>
          <ModalBody>
            <h1 className="text-center my-2">Create Host</h1>{" "}
            <FormGroup className="mb-4">
              <Label>Category Title</Label>
              <InputGroup className="input-group-alternative">
                <Input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={formData?.title}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup className="mb-3">
              <Label>Upload Category Image</Label>
              <InputGroup className="input-group-alternative">
                <Input
                  type="file"
                  accept="image/*"
                  autoComplete="new-email"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Categoryimage: e.target.files[0],
                    })
                  }
                />
              </InputGroup>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color=" bg-default border-0 text-white" type="submit">
              {loading ? "Loading..." : "Create"}
            </Button>{" "}
            <Button color="secondary" onClick={createToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

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
    </>
  );
};

export default CoHost;
