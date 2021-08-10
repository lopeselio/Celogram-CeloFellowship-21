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
      state = {currentImage:'https://cdn.iconscout.com/icon/free/png-256/gallery-187-902099.png'}

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
        const {currentImage} = this.state
        return(
      
          <VStack 
          spacing={3}
          // divider={<Divider borderColor="gray.200" />}
          width="100%"
          align="stretch"
          backgroundColor="#1F1F23"
          padding="20px"
          borderBottomColor="#3CB371"
          borderBottomWidth="4px"
          >
            <Center h="100%" color="white">
            <Heading as="h4" size="lg">
                Upload to CELOGram
            </Heading>
            </Center>
            <Box
            width="5%"
            borderRadius="10px"
            padding="3px"
            borderColor="#FEE09D"
            backgroundColor="yellow"
            >
            <Image
            boxSize="50px"
            // objectFit="cover"
            src={currentImage}
            alt="" 
            id="img"
            />
            </Box>
            <form style={{ width: "100%" }}
              onSubmit={(event) => {
              event.preventDefault()
              const description = this.imageDescription.value
              this.props.uploadImage(description)}}
            >
              <HStack width="70%" spacing={3} alignItems="flex-start">
                
                {/* <VStack
                      cursor="pointer"
                      alignItems="flex-end"
                      as="label"
                      htmlFor="image-input"
                      px="15px"
                      width="15%"
                      borderRadius="10px"
                      height="50px"
                      borderWidth="4px"
                      borderStyle="solid"
                      backgroundColor="#3CB371"
                      borderColor="#FEE09D"
                      textColor="#FEE09D"
                      justifyContent="center"
                    > */}
                      {/* <VStack height="100%" width="100%" justifyContent="center" alignItems="flex-start"> */}
                      <input
                //   onChange={(e) => handleImage(e)}
                        name="image-upload"
                        type="file"
                        style={{ color: 'white', background: '#3CB371' }}
                        id="input"
                        accept=".jpg, .jpeg, .png, .bmp, .gif"
                        onInput={this.props.captureFile} 
                        onChange={this.imageHandler}
                      />
                        {/* <TiPlus style={{ fill: "#FEE09D" }} /> */}
                        {/* <Text fontWeight="400" color="#FEE09D">
                          Image
                        </Text> */}
                        
                      {/* </VStack> */}
                {/* </VStack> */}
                  <Stack width="70%" backgroundColor="white" placeholder="Media Description" borderWidth="4px" borderColor="#FEE09D" textColor="#3CB371" >
                    <input
                        id="imageDescription"
                        type="text"
                        // style={{ display: "none" }}
                        style={{ border: "none" }}
                        ref={(input) => { this.imageDescription = input }}
                        className="form-control"
                        placeholder="Enter Image Description"
                        required />
                </Stack>
                <Stack width="10%" backgroundColor="#3CB371" placeholder="Media Description" borderWidth="3px" borderColor="#FEE09D" textColor="#FEE09D" borderRadius="5px" ><button type="submit">Post</button></Stack>

            </HStack>
            
            </form>
            

            
        </VStack>
      // </Grid>
        )
      }

  }

  export default Upload;