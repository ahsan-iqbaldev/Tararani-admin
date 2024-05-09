import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ForgotPassword = () => {
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Forgot Password</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <FaPhoneAlt />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Enter your Phone Number"
                    type="number"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button
                  className="my-2 btn  bg-default border-0 text-white"
                  color="primary"
                  type="button"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link className="  text-white" to="/auth/login">
              <small>Login</small>
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <Link className="   text-white" to="/auth/register">
              <small>Create new account</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default ForgotPassword;
