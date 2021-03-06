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
import FundPostabi from '../utils/fundpost.json'
// import { create } from 'ipfs-http-client'
// const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' })
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const ContractKit = require("@celo/contractkit")
let kit
var FundPostContractObj
// const ipfs = window.IpfsHttpClient.create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
// const ipfsClient = require('ipfs-http-client')




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
        // await window.celo.enable()        
        const web3 = new Web3(window.celo);
        kit = ContractKit.newKitFromWeb3(web3);
        const networkId = await kit.web3.eth.net.getId();
        const networkData = FundPostABI.networks[networkId];
        console.log(networkData, networkId)
        if(networkData)
        {
        FundPostContractObj = new kit.web3.eth.Contract(FundPostabi.abi, "0x05460a3bDe86e616EA9137C8854aA55225679310"
            , {
            // from: currentAccount, // default from address
            // gasPrice: '20000000000', // default gas price in wei, 20 gwei in this case
            gasLimit: "50000"

        }
        );
        // setFundPost(FundPostContractObj);
        if(FundPostContractObj){
        const imagesCount = await FundPostContractObj.methods.imageCount().call()     
        for(var i = 1; i <= imagesCount; i++){
            const image = await FundPostContractObj.methods.images(i).call()
            setImages([...images, image])
            console.log(images)
        }
    return images
    }
        }else {
            window.alert('Contract not deployed to Alfajores TestNetwork')
        }
    }
    const sortView = () => {
        const sorted = [...images].sort((a,b) => {
          return b.tipAmount - a.tipAmount
        })
        setImages(sorted)
        // this.setState({ loading: false})
        setIsLoading(false)
    }
    
    const unsortView = () => {
        const sortedReverse = [...images].reverse();
        setImages(sortedReverse)
        setIsLoading(false)
    }
    
    const setTipAmount = (e) => {
        setTipAm(e.target.value)
    };
    const tipImageOwner = (id, tipAmount) => {
        setIsLoading(true)
        FundPostContractObj.methods.tipImageOwner(id).send({ from: currentAccount, value: tipAmount }).on('transactionHash', (hash) => {
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
                <Button className="rankButton" backgroundColor="#3cb371" size="md" variant="ghost" onClick={() => sortView()}  >
                    Rank Posts by &nbsp;<span className="CELO"> $CELO</span>
                </Button>
                {/* <Button className="rankButton" backgroundColor="#3cb371" size="md" variant="ghost" onClick={() => sortView()}  >
                    View Unranked
                </Button> */}
                </Stack>
                <VStack align="center" direction="row" spacing={10} overflowY="auto" height="575px">
                    {/* {currentAccount ?  */}
                    {images.map((image, key) => {
                        <Center>
                        <Box key={key} padding="8px" maxW="lg" borderWidth="4px" borderRadius="lg" borderColor="#FEE09D" overflow="hidden" backgroundColor="#3cb371">
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
                                {/* <TagLabel color="#4d8a68">Posted by {`${currentAccount.substr(0,6)}...${currentAccount.substr(-4)}`} </TagLabel> */}
                                <TagLabel color="#4d8a68">Posted by {image.author}

                                </TagLabel>
                                <Avatar borderStyle="solid" borderColor="#37CE81" borderWidth="2px" padding="1px" mr="-13px" ml={4} size="sm" bg="transparent" src={avatar} />
                            </Tag>
        
                            </Box>
                            <Image borderRadius="lg" src={`https://ipfs.infura.io/ipfs/${image.hash}`} alt={property.imageAlt} />
        
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
                                    {image.description}
                                </Box>
                                </Box>
                            </Box>
                            <HStack>
                            <Tag key={key} size="lg" colorScheme="teal" borderRadius="full">
                                <Avatar
                                    src="https://assets.coingecko.com/coins/images/11090/small/icon-celo-CELO-color-500.png?1592293590"
                                    size="xs"
                                    name="cUSD"
                                    ml={-1}
                                    mr={2}
                                />
                                <TagLabel color="#4d8a68" >
                                    {Web3.utils.fromWei(
                                image.tipAmount.toString(),
                                "Ether"
                              )}{" "}
                              </TagLabel>
                            </Tag>
                            <Stack width="40%" backgroundColor="white" placeholder="Media Description" borderWidth="4px" borderColor="#FEE09D" textColor="#3CB371" >
                            <input
                                type="text"
                                style={{width:"100px"}} 
                                className="form-control"
                                onChange={(e) => setTipAmount(e)}
                                placeholder="cUSD Tip"
                                padding="5px"
                                required />
                            </Stack>
                            <Stack width="20%" variant="ghost" backgroundColor="#FEE09D" placeholder="Media Description" borderWidth="3px" borderColor="#4d8a68" textColor="#3CB371" borderRadius="5px" >
                                <button type="submit"
                                 name={image.id}
                                 onClick={(event) => {
                                    console.log({ tipAm });
                                    let tipAmount = Web3.utils.toWei(
                                      tipAm.toString(),
                                      "ether"
                                    );
                                    console.log(event.target.name, tipAmount);
                                    tipImageOwner(
                                      event.target.name,
                                      tipAmount
                                    );
                                    console.log(tipAmount, tipAm);
                                  }}
                                >TIP cUSD</button>
                            </Stack>
                            </HStack>
                            </Box>
                            </Center>

                    })}
                    

                    
                    </VStack>

            </VStack>
        )
    // }


}

export default DisplayImage;