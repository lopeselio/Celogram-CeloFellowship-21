import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import Web3 from "web3";
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch, withRouter } from "react-router-dom";
import {
    Center,
    Grid,
    Badge,
    Avatar,
    TagLabel,
    VStack,
    Heading,
    HStack,
    Image,
    Box,
    Button,
    Stack,
    Tag
  } from "@chakra-ui/react";
import axios from 'axios'
import {
    nftaddress, nftmarketaddress
} from '../utils/config'
// import Web3 from "web3";
import NftABI from '../abis/CELOGramNFT.json'
import NFTMarketABI from '../abis/CELOGramNFTMarket.json'
const ContractKit = require("@celo/contractkit")

let kit
var NFTContract
var NFTMarketContract

function Home({ currentAccount }) {

    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        if(window.celo && currentAccount){
            loadNFTs()       

        }
    }, [])

    async function loadNFTs() {

        const web3 = new Web3(window.celo)
        kit = ContractKit.newKitFromWeb3(web3);
        const networkId = await kit.web3.eth.net.getId();
        const networkData2 = NFTMarketABI.networks[networkId] 
        const networkData1 = NftABI.networks[networkId]
        // if(networkData1) {
        NFTContract = new kit.web3.eth.Contract(NftABI.abi, nftaddress)
        // }
        // if(networkData2) {
        NFTMarketContract = new kit.web3.eth.Contract(NFTMarketABI.abi, nftmarketaddress)
        const data = await NFTMarketContract.methods.fetchMarketItems().call()

        // }
        // const provider = new ethers.providers.JsonRpcProvider()
        // const tokenContract = new ethers.Contract(nftaddress, NftABI.abi, provider)
        // const marketContract = new ethers.Contract(nftmarketaddress, NFTMarketABI.abi, provider)
        // const data = await marketContract.fetchMarketItems()

        const items = await Promise.all(data.map(async i => {
            const tokenUri = await NFTContract.methods.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description
            }
            return item

        }))
        setNfts(items)
        setLoadingState('loaded')
    }

    async function buyNft(nft) {
        const web3 = new Web3(window.celo)
        kit = ContractKit.newKitFromWeb3(web3);
        const networkId = await kit.web3.eth.net.getId();
        const networkData2 = NFTMarketABI.networks[networkId] 
        
        NFTMarketContract = new kit.web3.eth.Contract(NFTMarketABI.abi, nftmarketaddress)

        /* user will be prompted to pay the asking proces to complete the transaction */
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
        const transaction = await NFTMarketContract.methods.createMarketSale(nftaddress, nft.tokenId, {
        value: price
        })
        await transaction.wait()
        loadNFTs()
    }

    if (loadingState === 'loaded' && !nfts.length) return (
        <VStack backgroundColor="#1F1F23" color="#3CB371">
            <Center>
                <Heading as="h2" fontSize={50} px="50px" py="50px">
                No NFTs for sale in the CELOGram Metaverse
                </Heading>
            </Center>
        </VStack>
    )
    
        return(
            <VStack alignItems="flex-start"  backgroundColor="#1F1F23" color="#3CB371">
            <Center>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            
            {currentAccount ?        
                
            
                    // <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    nfts.map((nft, i) => (
                    <div key={i}>
                      <Box w="100%" h="70">
                        <Image borderRadius="lg" src={nft.image} />
                        {/* <img src={nft.image} /> */}
                        <Box p="6">
                                <Box d="flex" alignItems="baseline">
                                <Badge borderRadius="full" px="2" backgroundColor="#FEE09D">
                                    {nft.name}
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
                                    {nft.description}
                                </Box>
                                <Tag size="lg" colorScheme="teal" borderRadius="full">
                                <Avatar
                                    src="https://assets.coingecko.com/coins/images/11090/small/icon-celo-CELO-color-500.png?1592293590"
                                    size="xs"
                                    name="cUSD"
                                    ml={-1}
                                    mr={2}
                                />
                                <TagLabel color="#4d8a68" >
                                    {nft.price} CELO
                              </TagLabel>
                            </Tag>
                            </Box>
                          
                            <Stack width="20%" variant="ghost" backgroundColor="#FEE09D" placeholder="Media Description" borderWidth="3px" borderColor="#4d8a68" textColor="#3CB371" borderRadius="5px" >
                                <button onClick={() => buyNft(nft)}>Buy</button>
                            </Stack>

                        </Box>

                        {/* <div className="p-4">
                          <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                          <div style={{ height: '70px', overflow: 'hidden' }}>
                            <p className="text-gray-400">{nft.description}</p>
                          </div>
                        </div>
                        <div className="p-4 bg-black">
                          <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
                          <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                        </div> */}
                      </Box>
                      </div>
                      
                    ))
                    
                    : <Tag backgroundColor=" #3CB371;" color="#FEE09D;">Connect Wallet First</Tag>
        
            }
            </Grid>
            </Center>
        </VStack>
          
          
          
        
        )
  }

  export default Home;