import React, { useEffect, useState } from 'react';
import Web3 from "web3";
import {
    Center,
    VStack,
    HStack,
    Image,
    Skeleton,
    Box,
    Stack,
    Button,
    Badge,
    Tag,
    Avatar,
    TagLabel
  } from "@chakra-ui/react";
import '../Pages/Browse.css'
import svgAvatarGenerator from "../utils/avatar";
import FundPostABI from '../abis/FundPost.json'
const ContractKit = require("@celo/contractkit")
let kit
// FundPostContractObj = new web3.eth.Contract(FundPostABI.abi, networkData.address);
var FundPostContractObj


function DisplayImage({ currentAccount }) {

    const [tipAm, setTipAm] = useState('2')
    const [ isMetamaskInstalled, setIsMetamaskInstalled ] = useState(false);
    const [ avatar, setAvatar ] = useState(undefined);
    const [selectedImg, setSelectedImg] = useState(null);
    const [images, setImages] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    // const [FundPost, setFundPost] = useState(null);
    // const [count, setCount] = useState(0)

    
    useEffect(() => {
        if(window.celo && currentAccount){
        //   setChainId(window.celo.networkVersion);
          init();
          
        //   window.celo.on("accountsChanged", (accounts) => {
        //     setCurrentAccount(accounts[0]);
        //   })
    
        //   window.celo.on("chainChanged", (newChainId) => {
        //     setChainId(newChainId.substr(-1, 1));
        //   })
        }
      }, [currentAccount]);

      const init = async () => {
        const web3 = new Web3(window.celo);
        kit = ContractKit.newKitFromWeb3(web3);
        const networkId = await kit.web3.eth.net.getId();
        const networkData = FundPostABI.networks[networkId];
        if(networkData)
        {
        FundPostContractObj = new web3.eth.Contract(FundPostABI.abi, networkData.address);
        // setFundPost(FundPostContractObj);
        if(FundPostContractObj){
        const imagesCount = await FundPostContractObj.methods.imageCount().call()     
        for(var i = 1; i <= imagesCount; i++){
            const image = await FundPostContractObj.methods.images(i).call()
            setImages([...images, image])
        }}
        }else {
            window.alert('Contract not deployed to Alfajores TestNetwork')
        }
    }
    const sortView = () => {
        // this.setState({
    
        // })
        const sorted = [...images].sort((a,b) => {
          return b.tipAmount - a.tipAmount
        })
        setImages(sorted)
        // this.setState({ loading: false})
        setIsLoading(false)
    }
    
    const unsortView = () => {
        // this.setState({
        const sortedReverse = [...images].reverse();
        setImages(sortedReverse)
        // this.setState({ loading: false})
        setIsLoading(false)
    }
    
    const setTipAmount = (e) => {
        // this.setState({tipAm: e.target.value})
        // const am = e.target.value
        setTipAm(e.target.value)
    };
    const tipImageOwner = (id, tipAmount) => {
        // this.setState({ loading: true })
        setIsLoading(true)
        FundPostContractObj.methods.tipImageOwner(id).send({ from: currentAccount, value: tipAmount }).on('transactionHash', (hash) => {
          // this.setState({ loading: false })
          setIsLoading(false)
        })
    }

    useEffect(() => {
        if(window.celo && currentAccount){
            setIsMetamaskInstalled(true); 
            let svg = svgAvatarGenerator(currentAccount, {dataUri: true});
            setAvatar(svg);
        }
        else{
            setIsMetamaskInstalled(false);
        }
        
    }, [currentAccount])
    

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
                    {currentAccount ? 
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
                    <Tag
                        size="lg"
                        borderRadius="full"
                        // ml={3}
                        // mr={-2}
                        background="#FEE09D"
                    >
                        <TagLabel color="#4d8a68">Posted by {`${currentAccount.substr(0,6)}...${currentAccount.substr(-4)}`}
                        </TagLabel>
                        <Avatar borderStyle="solid" borderColor="#37CE81" borderWidth="2px" padding="1px" mr="-13px" ml={4} size="sm" bg="transparent" src={avatar} />
                    </Tag>

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
                    </Center>:<div>Hey There</div>
}
                    
                    </VStack>

            </VStack>
        )
    // }


}

export default DisplayImage;