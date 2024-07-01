import Modal from "react-bootstrap/Modal";

function Model(props: {
  show: boolean;
  setShow: any;
  title: string;
  Body: any;
  close: any;
}) {
  const { show, setShow, title, Body, close } = props;

  return (
    <Modal
      show={show}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=" absolute"
      onHide={() => close()}
    >
      <Modal.Header closeButton>
        <Modal.Title className=" font-bold">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{Body()}</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default Model;
