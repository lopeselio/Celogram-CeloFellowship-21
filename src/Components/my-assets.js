import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Web3 from 'web3'
import {
  nftmarketaddress, nftaddress
} from '../utils/config'
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
import NftABI from '../abis/CELOGramNFT.json'
import NFTMarketABI from '../abis/CELOGramNFTMarket.json'
const ContractKit = require("@celo/contractkit")
let kit

export default function MyAssets({ currentAccount }) {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
      loadNFTs()
    }, [])
    async function loadNFTs() {
    //   const web3Modal = new Web3Modal({
    //     network: "alfajores",
    //     cacheProvider: true,
    //   })
    //   const connection = await web3Modal.connect()
    //   const provider = new ethers.providers.Web3Provider(connection)
    //   const signer = provider.getSigner()
    const web3 = new Web3(window.celo)
    kit = ContractKit.newKitFromWeb3(web3);
    const networkId = await kit.web3.eth.net.getId();
    const networkData2 = NFTMarketABI.networks[networkId] 
    const networkData1 = NftABI.networks[networkId]
    const tokenContract = new kit.web3.eth.Contract(NftABI.abi, nftaddress, 
        // {
        // from: currentAccount, // default from address
        // gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
        // }
    ) 
    const marketContract = new kit.web3.eth.Contract(NFTMarketABI.abi, nftmarketaddress, 
        // {
        // from: currentAccount, // default from address
        // gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
        // }
    )  
    //   const marketContract = new ethers.Contract(nftmarketaddress, NFTMarketABI.abi, signer)
    //   const tokenContract = new ethers.Contract(nftaddress, NftABI.abi, provider)
    const data = await marketContract.methods.fetchMyNFTs().call()
      
    const items = await Promise.all(data.map(async i => {
        const tokenUri = await tokenContract.methods.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
        }
        return item
      }))
      setNfts(items)
      setLoadingState('loaded') 
    }
    if (loadingState === 'loaded' && !nfts.length) return (<VStack backgroundColor="#1F1F23" color="#3CB371">
    <Center>
        <Heading as="h2" fontSize={50} px="50px" py="50px">
        No NFTs owned on CELOGram Metaverse
        </Heading>
    </Center>
</VStack>)
    return (
            <VStack alignItems="flex-start"  backgroundColor="#1F1F23" color="#3CB371">
            <Center>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            
            {currentAccount ?        
                    nfts.map((nft, i) => (
                    <div key={i}>
                      <Box w="100%" h="70">
                        <Image borderRadius="lg" src={nft.image} />
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
                                    Price: {nft.price} CELO
                              </TagLabel>
                            </Tag>
                            </Box>
                        </Box>
                      </Box>
                      </div>
                      
                    ))
                    
                    : <Tag backgroundColor=" #3CB371;" color="#FEE09D;">Connect Wallet First</Tag>
        
            }
            </Grid>
            </Center>
        </VStack>
    //   <div className="flex justify-center">
    //     <div className="p-4">
    //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
    //         {
    //           nfts.map((nft, i) => (
    //             <div key={i} className="border shadow rounded-xl overflow-hidden">
    //               <img src={nft.image} className="rounded" />
    //               <div className="p-4 bg-black">
    //                 <p className="text-2xl font-bold text-white">Price - {nft.price} CELO</p>
    //               </div>
    //             </div>
    //           ))
    //         }
    //       </div>
    //     </div>
    //   </div>
    )
  }