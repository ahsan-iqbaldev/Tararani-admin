import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const PropertyPhotosGuidelines = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} size="lg" centered toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <h2>airCASITA.com - Tips for posting great photos of your RENTAL</h2>
      </ModalHeader>
      <ModalBody className="text-dark py-0">
        <p className="font-weight-500">
          <span className="font-weight-bold">STRATEGY:</span> You want{" "}
          <span className="text-underline font-weight-bold">
            captivating, inviting photos
          </span>{" "}
          of your space to appear in your listing. So, carefully select photos
          of the inside, outside, and the neighborhood around your listing.{" "}
        </p>
        <p className="font-weight-500">
          Here’s a guide to getting the best photos:
        </p>

        <ul>
          <li className="font-weight-bold">Think spacious and inviting.</li>
          <li>
            <span className="font-weight-bold">
              Be sure the space is clean and free
            </span>{" "}
            of clutter.
          </li>
          <li>
            <span className="font-weight-bold">Let in the Daylight:</span> Open
            the blinds and turn on the lights to brighten your space.
          </li>
          <li>
            <span className="font-weight-bold">Use landscape format:</span> All
            airCASITA photos in search are landscape style — not vertical.
          </li>
          <li>
            {" "}
            <span className="font-weight-bold">Upload resolution of</span> at
            least 1024px x 683px.
          </li>
          <li>
            {" "}
            <span className="font-weight-bold">Bigger is better</span> when it
            comes to photos.
          </li>
          <li className="font-weight-bold">
            Show off your rental’s unique amenities, like free parking, etc.
          </li>
          <li>
            <span className="font-weight-bold">
              Call attention to special details{" "}
            </span>{" "}
            like a fireplace, artwork, or backyard barbeque.
          </li>
          <li>
            <span className="font-weight-bold">
              {" "}
              Highlight features of easy access,
            </span>{" "}
            such as wide doorways, step-free floors, grab rails.
          </li>
        </ul>
      </ModalBody>
      <ModalFooter>
        <Button className="bg-success text-white" onClick={toggle}>
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PropertyPhotosGuidelines;
