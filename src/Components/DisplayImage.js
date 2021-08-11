import React, { Component } from 'react';
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
    StarIcon
  } from "@chakra-ui/react";
import '../Pages/Browse.css'

class DisplayImage extends Component {
    state = {
        tipAm: '2'
    }
    setTipAmount = (e) => {
        this.setState({tipAm: e.target.value})
    };
    

    render() {
        const {tipAm} = this.state
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
                // backgroundColor="#1F1F23"
                // padding="10px"
                // borderBottomColor="#3CB371"
                // borderBottomWidth="4px"
                >
                <Stack align="center" colorScheme="#FEE09D">
                <Button className="rankButton" backgroundColor="#3cb371" size="md" variant="ghost" onClick={this.props.unsortView} >
                    Rank Posts by &nbsp;<span className="CELO"> $CELO</span>
                </Button>
                </Stack>
                <Box maxW="sm" borderWidth="1px" borderRadius="lg" borderColor="#FEE09D" overflow="hidden">
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
                    Posted by {this.props.currentAccount} 0x123456
                    </Box>
                    <Image src={property.imageUrl} alt={property.imageAlt} />

                     <Box p="6">
                        <Box d="flex" alignItems="baseline">
                        <Badge borderRadius="full" px="2" backgroundColor="#FEE09D">
                            New
                        </Badge>
                        <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                        >
                            {property.beds} beds &bull; {property.baths} baths
                        </Box>
                        </Box>
                    </Box>
{/*
                        <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                        >
                        {property.title}
                        </Box>

                        <Box>
                        {property.formattedPrice}
                        <Box as="span" color="gray.600" fontSize="sm">
                            / wk
                        </Box>
                        </Box>

                        <Box d="flex" mt="2" alignItems="center">
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
                    </Box> */}
                    </Box>

            </VStack>
        )
    }


}

export default DisplayImage;