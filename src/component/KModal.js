import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const KModal = ({
  isOpen,
  onClose,
  postData,
  updateData,
  editedUser,
  loading,
}) => {
  //setting value get from modal input box
  const [name, setname] = useState();
  const [email, setemail] = useState();

  // to re-render the component when a editeduser got value

  useEffect(() => {
    setname(editedUser ? editedUser.name : "");
    setemail(editedUser ? editedUser.email : "");
  }, [editedUser]);

  //on submit handlers
  const onSubmit = async () => {
    const obj = {
      name: name,
      email: email,
    };

    if (editedUser) {
      await updateData(obj);
      onClose();
    } else {
      await postData(obj);
      onClose();
      setemail("");
      setname("");
    }
  };

  return (
    <Modal
      size={"sm"}
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Contact</ModalHeader>
        <ModalCloseButton sx={{ border: "1px solid blue.600" }} />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              name="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {!loading ? (
            <Button onClick={onSubmit} bg="purple.600" color="white">
              {editedUser ? "Edit User" : "Add Contact"}
            </Button>
          ) : (
            <Spinner color="red.500" />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default KModal;
