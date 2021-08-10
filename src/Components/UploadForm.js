import React, { useState, useEffect, useContext, Component } from 'react';
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
    Stack,
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
  

class Upload extends Component {
      state = {currentImage:"https://iconscout.com/icon/image-1889136"}

      imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
          if(reader.readyState === 2){
            this.setState({Img: reader.result})
          }
        }
        reader.readAsDataURL(e.target.files[0])
    
      };
      render() {
        const currentImage = this.state
        return(
      
          <VStack 
          spacing={3}
          // divider={<Divider borderColor="gray.200" />}
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
            <Box>
              <img src={currentImage} alt="" id="img" className="img" />
            </Box>
            <form style={{ width: "100%" }}
              onSubmit={(event) => {
              event.preventDefault()
              const description = this.imageDescription.value
              this.props.uploadImage(description)}}
            >
              <HStack width="70%" spacing={3} alignItems="flex-start">
                
                <Stack
                      cursor="pointer"
                      as="label"
                      htmlFor="image-input"
                      px="25px"
                      width="15%"
                      borderRadius="10px"
                      height="50px"
                      borderWidth="4px"
                      borderStyle="solid"
                      backgroundColor="#3CB371"
                      borderColor="#FEE09D"
                      textColor="#FEE09D"
                    >
                      <input
                //   onChange={(e) => handleImage(e)}
                        name="image-upload"
                        type="file"
                        // style={{ display: "none" }}
                        id="input"
                        accept=".jpg, .jpeg, .png, .bmp, .gif"
                        onInput={this.props.captureFile} 
                        onChange={this.imageHandler}
                      />
                      <VStack height="100%" width="100%" justifyContent="center">
                        <TiPlus style={{ fill: "#FEE09D" }} />
                        <Text fontWeight="600" color="#FEE09D">
                          Image
                        </Text>
                        
                      </VStack>
                </Stack>
                {/* <Box
                  cursor="pointer"
                  as="label"
                  htmlFor="image-input"
                  px="25px"
                  width="55%"
                  borderRadius="10px"
                  height="50px"
                  borderWidth="4px"
                  borderStyle="solid"
                  backgroundColor="white"
                  borderColor="#FEE09D"
                  textColor="#FEE09D"
                > */}
                  <Stack width="55%" backgroundColor="white" placeholder="Media Description" borderWidth="4px" borderColor="#FEE09D" textColor="#3CB371" ><input
                        id="imageDescription"
                        type="text"
                        // style={{ display: "none" }}
                        style={{ border: "none" }}
                        ref={(input) => { this.imageDescription = input }}
                        className="form-control"
                        placeholder="Enter Image Caption"
                        required />
                </Stack>
            </HStack>
            </form>
            

            
        </VStack>
      // </Grid>
        )
      }

  }

  export default Upload;