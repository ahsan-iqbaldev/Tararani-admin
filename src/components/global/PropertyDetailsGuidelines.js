import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const PropertyDetailsGuidelines = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} size="lg" centered toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <h2>AirCASITA.com Guide to Property Description</h2>
      </ModalHeader>
      <ModalBody className="text-dark py-0">
        <ol type="a">
          {/* a. */}
          <li>
            This rental is a perfect spot to explore ________(fill in the
            blank).
          </li>

          {/* b. */}
          <li>
            Mention key amenities that set your property apart (possible
            examples below)
            <ol>
              <li>A pool</li>
              <li>Wifi</li>
              <li>A kitchen</li>
              <li>Free parking</li>
              <li>A hot tub</li>
              <li>Air conditioning or heating</li>
              <li>A washer or dryer</li>
              <li>Self check-in</li>
              <li>TV or cable</li>
              <li>A fireplace</li>
            </ol>
          </li>

          {/* c. */}
          <li>Be realistic with your description. Plus, add the following:</li>

          {/* d. */}
          <li>
            <span className="text-dark font-weight-bold">
              General Description:
            </span>{" "}
            Describe your rooms and spaces to emphasize fun and practical
            details guests might want to know. For example, 'The park across the
            street is a great place for pets and kids to run around.
          </li>

          {/* e. */}
          <li>
            <span className="text-dark font-weight-bold">Usable Space: </span>{" "}
            Describe{" "}
            <span className="text-dark font-weight-bold">how many beds</span>{" "}
            and{" "}
            <span className="text-dark font-weight-bold">
              how many bedrooms.
            </span>{" "}
            Describe which parts of your property are available to be used by
            guests. For example, 'Guests can use the patio that is on the south
            side of the house.
          </li>

          {/* f. */}
          <li>
            <span className="text-dark font-weight-bold">
              Communications and Transportation:{" "}
            </span>{" "}
            Guests and host can arrange mutually agreeable expectations. For
            example, a host might arrange to be available to guests by text or
            to be able to provide transportation for a guest in certain
            circumstances.
          </li>

          {/* g. */}
          <li>
            <span className="text-dark font-weight-bold">
              Other noteworthy items
            </span>{" "}
            Other noteworthy items: Include anything else you’d like guests to
            know that isn’t listed elsewhere. For example, 'The city center is
            only a 10-minute walk from the house.
          </li>
        </ol>
      </ModalBody>
      <ModalFooter>
        <Button className="bg-success text-white" onClick={toggle}>
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PropertyDetailsGuidelines;
