import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Heading, Image } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./App.css";
import ContactCard from "./component/ContactCard";
import logo from "./banner.png";
import KModal from "./component/KModal";
import axios from "axios";

const App = () => {
  //to open and close chakra ui modals
  const { isOpen, onOpen, onClose } = useDisclosure();

  //maintaining all user locally
  const [user, setuser] = useState([]);
  const [searchUser, setsearchUser] = useState([]);

  //to show loading spinner when api is called
  const [loading, setloading] = useState(false);
  const [loadingmodal, setloadingmodal] = useState(false);
  const [editedUser, seteditUser] = useState();

  //functionality to add contact in the list
  const postData = async (obj) => {
    setloadingmodal(true);
    const data = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    let response = await data.json();
    console.log(response);

    setuser([...user, response]);
    setsearchUser([...user, response]);
    setloadingmodal(false);
  };

  //functionality to open a modal when it click on edit user
  const seteditedUser = (id) => {
    let obj = user.find((item) => {
      return item.id === id;
    });

    if (obj) {
      seteditUser(obj);
      onOpen();
    }
  };

  //to delete the particular person from contact list
  const deleteData = async (id) => {
    setloading(true);
    const data = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    if (data.status === 200) {
      let Newuser = user.filter((item) => {
        return item.id !== id;
      });

      setuser(Newuser);
      setsearchUser(Newuser);
      setloading(false);
    }
  };

  //to update particular person in contact list
  const updateData = async (obj) => {
    setloadingmodal(true);
    const data = await fetch("https://jsonplaceholder.typicode.com/users/1", {
      method: "put",

      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const response = await data.json();

    const array1 = user.map((item) => {
      if (item.id === response.id) {
        item.name = response.name;
        item.email = response.email;
        return item;
      } else {
        return item;
      }
    });

    setuser(array1);
    setsearchUser(array1);
    setloadingmodal(false);
  };

  //functionality to get all the contact
  let fetchData = async () => {
    try {
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setuser(data.data);
      setsearchUser(data.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addContact = () => {
    seteditUser();
    onOpen();
  };

  //functionality to search a particular person by name in a contact list
  const SearchHandler = (value) => {
    if (value) {
      let searchArray = user.filter((item) => {
        return item.name.toLowerCase().startsWith(value.toLowerCase());
      });

      setsearchUser(searchArray);
    } else {
      setsearchUser(user);
    }
  };

  return (
    <div className="app">
      <KModal
        loading={loadingmodal}
        editedUser={editedUser}
        updateData={updateData}
        isOpen={isOpen}
        onClose={onClose}
        postData={postData}
      ></KModal>

      <Flex
        boxShadow="xl"
        direction={"column"}
        bg={"white"}
        w={"390px"}
        h={"640px"}
        gap={3}
        p={4}
        rounded={"3xl"}
      >
        <Flex height={"60px"} alignItems="center" gap={2}>
          <Image w={"80px"} h={"60px"} src={logo}></Image>
          <Heading as={"h6"} fontSize={"3xl"} ml={"-20px"}>
            Contact App
          </Heading>
        </Flex>

        <HStack
          onClick={addContact}
          sx={{ cursor: "pointer" }}
          borderRadius={10}
          gap={2}
          p={4}
          w="100%"
          h="48px"
          color={"whiteAlpha.900"}
          bg={"purple.800"}
        >
          <i
            style={{
              border: "2px solid white",
              borderRadius: "50%",
              fontSize: "13px",
              padding: "5px",
            }}
            className="fa-solid fa-plus"
          ></i>
          <Text
            as="h1"
            sx={{ fontSize: "21px", fontWeight: "600", cursor: "pointer" }}
          >
            {" "}
            Add New Contact
          </Text>
        </HStack>

        <Stack>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<i className="fa-solid fa-magnifying-glass"></i>}
            />
            <Input
              border={"1px solid gray"}
              type="tel"
              fontSize={"20px"}
              fontWeight={"600"}
              placeholder="Search Contact..."
              onChange={(e) => {
                SearchHandler(e.target.value);
              }}
            />
          </InputGroup>
        </Stack>

        <ContactCard
          seteditedUser={seteditedUser}
          loading={loading}
          user={searchUser}
          deleteData={deleteData}
          onOpen={onOpen}
        ></ContactCard>
      </Flex>
    </div>
  );
};

export default App;
