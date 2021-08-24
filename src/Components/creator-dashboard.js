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

export default function CeloCreatorDashboard( {currentAccount} ) {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [currentAccount])
  async function loadNFTs () {
    // const web3Modal = new Web3Modal({
    //   network: "mainnet",
    //   cacheProvider: true,
    // })
    // const connection = await web3Modal.connect()
    // const provider = new ethers.providers.Web3Provider(connection)
    // const signer = provider.getSigner()
    // await window.celo.enable()
    const web3 = new Web3(window.celo)
    kit = ContractKit.newKitFromWeb3(web3);
    const networkId = await kit.web3.eth.net.getId();
    const networkData2 = NFTMarketABI.networks[networkId] 
    const networkData1 = NftABI.networks[networkId]
    const tokenContract = new kit.web3.eth.Contract(NftABI.abi, nftaddress, {
        // gasPrice: '20000000000', // default gas price in wei, 20 gwei in this case
        gasLimit: "50000"
    }
        // , 
        // {
        // from: currentAccount, // default from address
        // gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
        // }
    ) 
    const marketContract = new kit.web3.eth.Contract(NFTMarketABI.abi, nftmarketaddress, {
        // gasPrice: '20000000000', // default gas price in wei, 20 gwei in this case
        gasLimit: "50000"
    }
        // , 
        // {
        // from: currentAccount, // default from address
        // gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
        // }
    )
      
    
    const data = await marketContract.methods.fetchItemsCreated().call()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.methods.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
      }
      return item
    }))
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded') 
  }
  if (loadingState === 'loaded' && !nfts.length) return (
    <Center>
        <Heading as="h2" fontSize={50} px="50px" py="50px">
        No NFTs minted on CELOGram Metaverse
        </Heading> 
    </Center>
    )
  return (
    <VStack alignItems="flex-start"  backgroundColor="#1F1F23" color="#3CB371">
    <Center>
        <Heading as="h6" fontSize={20}  >
        NFTs Minted By You 
        </Heading>
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
    
    {currentAccount ?        
            nfts.map((nft, i) => (
            <div key={i}>
              <Box w="100%" h="70">
                <Image borderRadius="lg" src={nft.image} />
                <Box p="6">
                        <Box d="flex" alignItems="baseline">
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
    <Stack>
        {
    
        Boolean(sold.length) && (
            <div>
            <Heading as="h6" fontSize={20}  >
                NFTs Sold By You 
            </Heading>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                {
                    sold.map((nft, i) => (
                        <div key={i}>
                            <Box w="100%" h="70">
                                <Image borderRadius="lg" src={nft.image} />
                                <Box p="6">
                                        <Box d="flex" alignItems="baseline">
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
                }
            </Grid>

            </div>
            )}
        </Stack>
        </Center>
    </VStack>
  )
}