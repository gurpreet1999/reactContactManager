import { Flex, flexbox, HStack, Spinner, Text } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import React from 'react'

const ContactCard = ({onOpen,user,deleteData,loading,seteditedUser}) => {

  //to render contact card
  return(
 <Box p={1}  sx={{
  '&::-webkit-scrollbar': {
    width: '7px',
  },
  '&::-webkit-scrollbar-track': {
    background: "#f1f1f1",
    borderRadius:"25px"

  },
  '&::-webkit-scrollbar-thumb': {
    background: "#ccc",
    borderRadius: "25px"
  },
}} overflow={"auto"} >
   {
      user && user.map((item)=>(
<Flex  key={item.id}  cursor={"pointer"} p={4} mb={2} borderRadius={10} justifyContent={'space-between'} color="whiteAlpha.900"  bg="purple.600" w="100%" h="60px" >

<HStack size="xl"  >
<i  style={{fontSize:"30px" ,color:"#6B46C1" ,background:"white" ,borderRadius:"50%",border:"1px solid white"}}    className="fa-sharp fa-solid fa-circle-user"></i>
</HStack>

< Flex ml={-5}  direction="column" justifyContent={"center"} columnGap={0}  >
<Text as={"h1"}  sx={{fontSize:"17px"}} >{item.name}</Text>
<Text as={"p"}   sx={{fontSize:"13px"}}  >{item.email}</Text>
</Flex>

<HStack>
<Box  onClick={()=>{seteditedUser(item.id)}}  ><i  style={{fontSize:"21px"}}      className="fa-solid fa-pen-to-square"  ></i></Box>
<Box onClick={()=>{deleteData(item.id)}}  >{!loading?(<i  style={{fontSize:"21px",color:"#FC8181"}}  className="fa-solid fa-trash"></i>):(<Spinner color='red.500' />)}  </Box>


</HStack>
   </Flex>
      ))
    }
  
  </Box>

  ) 


  
}

export default ContactCard