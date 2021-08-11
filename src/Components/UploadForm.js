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
  import DisplayImage from './DisplayImage'

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
          backgroundColor= "#2E3337"
          width="100%"
          align="stretch"
          padding="20px"
          borderBottomColor="#3CB371"
          borderBottomWidth="4px"
          > 
            <VStack 
          spacing={3}
          // divider={<Divider borderColor="gray.200" />}
          width="100%"
          align="stretch"
          padding="20px"
          borderBottomColor="#3CB371"
          borderBottomWidth="4px"
          backgroundColor="#1F1F23"
          >
            <Center h="100%" color="white" backgroundColor="#1F1F23">
            <Heading as="h2">
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
                <Stack width="10%" variant="ghost" backgroundColor="#3CB371" placeholder="Media Description" borderWidth="3px" borderColor="#FEE09D" textColor="#FEE09D" borderRadius="5px" ><button type="submit">Post</button></Stack>

            </HStack>
            
            </form>
            </VStack>
            <DisplayImage />   
          </VStack>
          
        
        )
      }

  }

  export default Upload;