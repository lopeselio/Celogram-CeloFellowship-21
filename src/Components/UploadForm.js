import React, { useState, useEffect, useContext } from 'react';
import {
    Center,
    Grid,
    VStack,
    Heading,
    InputGroup,
    FormControl,
    HStack,
    Image,
    Skeleton,
    Spinner,
    Box,
    // StackDivider,
    Text,
    Divider,
    Button,
    FormLabel,
    Input,
    FormHelperText,
    Textarea,
    InputRightAddon,
    SkeletonText,
  } from "@chakra-ui/react";
  import { TiPlus } from "react-icons/ti";

  function Upload() {
      const [currentImage, setCurrentImage] = useState("https://iconscout.com/icon/image-1889136")
      return(
    //     <Grid
    //   padding="20px"
    // //   pt="20px"
    //   height="100%"
    // //   px="500px"
    //   width="100%"
    //   templateColumns="1 5fr"
    //   gridGap={5}
    //   alignItems="flex-start"
    // >
    
      <VStack 
      spacing={3}
      divider={<Divider borderColor="gray.200" />}
      width="100%"
      align="stretch"
      backgroundColor="#4e5250"
      padding="20px"
      >
        <Center h="100%" color="white">
        <Heading as="h3" size="lg">
            Upload to CELOGram
        </Heading>
        </Center>
        <form style={{ width: "100%" }}>
          <VStack width="100%" spacing={5} alignItems="flex-start">
            <input
              multiple
            //   onChange={(e) => handleImage(e)}
              type="file"
              style={{ display: "none" }}
              id="image-input"
              accept="image/*"
            />
            <Box
                  cursor="pointer"
                  as="label"
                  htmlFor="image-input"
                  px="35px"
                  width="100%"
                  borderRadius="10px"
                  height="70px"
                  borderWidth="1px"
                  borderStyle="solid"
                  borderColor="whatsapp.500"
                >
                  <VStack height="100%" width="100%" justifyContent="center">
                    <TiPlus style={{ fill: "#22C35E" }} />
                    <Text fontWeight="600" color="#22C35E">
                      Image
                    </Text>
                  </VStack>
            </Box>
        </VStack>
        </form>
        

        
    </VStack>
    // </Grid>
      )

  }

  export default Upload;