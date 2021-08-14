import React, { Component, useState } from 'react';
import Web3 from "web3";
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
    Badge,
    StarIcon,
    Tag,
    Avatar,
    TagLabel
  } from "@chakra-ui/react";
import '../Pages/Browse.css'

function DisplayImage({ currentAccount }) {

    const [tipAm, setTipAm] = useState('2')
    // state = {
    //     tipAm: '2'
    // }
    const setTipAmount = (e) => {
        // this.setState({tipAm: e.target.value})
        // const am = e.target.value
        setTipAm(e.target.value)
    };
    

    // render() {
        // const {tipAm} = this.state
        const property = {
            imageUrl: "https://bit.ly/2Z4KKcF",
            imageAlt: "Rear view of modern home with pool",
            beds: 3,
            baths: 2,
            title: "Modern home in city center in the heart of historic Los Angeles",
            formattedPrice: "$1,900.00",
            reviewCount: 34,
            rating: 4,
          }
        return(
            <VStack 
                spacing={3}
                // divider={<Divider borderColor="gray.200" />}
                width="100%"
                align="stretch"
                direction="row"
                
                // backgroundColor="#1F1F23"
                // padding="10px"
                // borderBottomColor="#3CB371"
                // borderBottomWidth="4px"
                >
                <Stack align="center" colorScheme="#FEE09D">
                <Button className="rankButton" backgroundColor="#3cb371" size="md" variant="ghost"  >
                    Rank Posts by &nbsp;<span className="CELO"> $CELO</span>
                </Button>
                </Stack>
                <VStack align="center" direction="row" spacing={10} overflowY="auto" height="575px">
                <Center>
                <Box padding="8px" maxW="lg" borderWidth="4px" borderRadius="lg" borderColor="#FEE09D" overflow="hidden" backgroundColor="#3cb371">
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        padding="5px"
                        backgroundColor="FEE09D"
                        ml="2"
                    >
                    Posted by 0x123456
                    </Box>
                    <Image borderRadius="lg" src={property.imageUrl} alt={property.imageAlt} />

                     <Box p="6">
                        <Box d="flex" alignItems="baseline">
                        <Badge borderRadius="full" px="2" backgroundColor="#FEE09D">
                            DESCRIPTION
                        </Badge>
                        <Box
                            color="white"
                            fontWeight="bold"
                            letterSpacing="wide"
                            fontSize="s"
                            textTransform="uppercase"
                            ml="2"
                            backgroundColor="#4d8a68"
                            borderRadius="5px"
                            padding="6px"
                        >
                            Hey there it is me Elio. I am from India. I am learning Blockchain development
                        </Box>
                        </Box>
                    </Box>
                    <HStack>
                    <Tag size="lg" colorScheme="teal" borderRadius="full">
                        <Avatar
                            src="https://assets.coingecko.com/coins/images/11090/small/icon-celo-CELO-color-500.png?1592293590"
                            size="xs"
                            name="cUSD"
                            ml={-1}
                            mr={2}
                        />
                        <TagLabel color="#4d8a68" >2</TagLabel>
                    </Tag>
                    <Stack width="40%" backgroundColor="white" placeholder="Media Description" borderWidth="4px" borderColor="#FEE09D" textColor="#3CB371" >
                    <input
                        type="text"
                        style={{width:"100px"}} 
                        className="form-control"
                        // onChange={this.setTip}
                        placeholder="cUSD Tip"
                        padding="5px"
                        required />
                    </Stack>
                    <Stack width="20%" variant="ghost" backgroundColor="#FEE09D" placeholder="Media Description" borderWidth="3px" borderColor="#4d8a68" textColor="#3CB371" borderRadius="5px" ><button type="submit">TIP cUSD</button></Stack>
                    </HStack>

                       

                       {/*<Box d="flex" mt="2" alignItems="center">
                         {Array(5)
                            .fill("")
                            .map((_, i) => (
                            <StarIcon
                                key={i}
                                color={i < property.rating ? "teal.500" : "gray.300"}
                            />
                            ))}
                        <Box as="span" ml="2" color="gray.600" fontSize="sm">
                            {property.reviewCount} reviews
                        </Box>
                        </Box>
                   {/* </Box> */}
                    </Box>
                    </Center>
                    <Center>
                    <Box padding="8px" maxW="lg" borderWidth="4px" borderRadius="lg" borderColor="#FEE09D" overflow="hidden" backgroundColor="#3cb371">
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        padding="5px"
                        backgroundColor="FEE09D"
                        ml="2"
                    >
                    Posted by {currentAccount} 0x123456
                    </Box>
                    <Image borderRadius="lg" src={property.imageUrl} alt={property.imageAlt} />

                     <Box p="6">
                        <Box d="flex" alignItems="baseline">
                        <Badge borderRadius="full" px="2" backgroundColor="#FEE09D">
                            DESCRIPTION
                        </Badge>
                        <Box
                            color="white"
                            fontWeight="bold"
                            letterSpacing="wide"
                            fontSize="s"
                            // textTransform="uppercase"
                            ml="2"
                            backgroundColor="#4d8a68"
                            borderRadius="5px"
                            padding="6px"
                        >
                            Hey there it is me Elio. I am from India. I am learning Blockchain development
                        </Box>
                        </Box>
                    </Box>
                    <HStack>
                    <Tag size="lg" colorScheme="teal" borderRadius="full">
                        <Avatar
                            src="https://assets.coingecko.com/coins/images/11090/small/icon-celo-CELO-color-500.png?1592293590"
                            size="xs"
                            name="cUSD"
                            ml={-1}
                            mr={2}
                        />
                        <TagLabel color="#4d8a68" >2</TagLabel>
                    </Tag>
                    <Stack width="40%" backgroundColor="white" placeholder="Media Description" borderWidth="4px" borderColor="#FEE09D" textColor="#3CB371" >
                    <input
                        type="text"
                        style={{width:"100px"}} 
                        className="form-control"
                        // onChange={this.setTip}
                        placeholder="cUSD Tip"
                        padding="5px"
                        required />
                    </Stack>
                    <Stack width="20%" variant="ghost" backgroundColor="#FEE09D" placeholder="Media Description" borderWidth="3px" borderColor="#4d8a68" textColor="#3CB371" borderRadius="5px" ><button type="submit">TIP cUSD</button></Stack>
                    </HStack>

                       

                       {/*<Box d="flex" mt="2" alignItems="center">
                         {Array(5)
                            .fill("")
                            .map((_, i) => (
                            <StarIcon
                                key={i}
                                color={i < property.rating ? "teal.500" : "gray.300"}
                            />
                            ))}
                        <Box as="span" ml="2" color="gray.600" fontSize="sm">
                            {property.reviewCount} reviews
                        </Box>
                        </Box>
                   {/* </Box> */}
                    </Box>
                    </Center>
                    </VStack>

            </VStack>
        )
    // }


}

export default DisplayImage;