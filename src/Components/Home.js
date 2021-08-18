import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import Web3 from "web3";
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch, withRouter } from "react-router-dom";
import { RiHome3Fill } from "react-icons/ri";
import { AiFillDollarCircle } from "react-icons/ai";
import { BiPurchaseTag } from "react-icons/bi"
import { FaHandHoldingHeart } from "react-icons/fa";
import {
    Center,
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

import NFTABI from '../abis/CELOGramNFT.json'
import NFTMarketABI from '../abis/CELOGramNFTMarket.json'
const ContractKit = require("@celo/contractkit")

let kit
var NFTContract
function Home({ currentAccount }) {

    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        loadNFTs()       
    }, [])

    async function loadNFTs() {
        const provider = new ethers.providers.JsonRpcProvider()
        const tokenContract = new ethers.Contract(nftaddress, NFTABI.abi, provider)
        const marketContract = new ethers.Contract(nftmarketaddress, NFTMarketABI.abi, provider)
        const data = await marketContract.fetchMarketItems()

        const items = await Promise.all(data.map(async i => {
            const tokenUri = await tokenContract.tokenURI(i.tokenId)
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
        // const provider = new ethers.providers.Web3Provider
        const contract = new ethers.Contract(nftmarketaddress, NFTMarketABI.abi, currentAccount)
    }

    if (loadingState === 'loaded' && !nfts.length) return (
        <VStack alignItems="flex-start"  backgroundColor="#1F1F23" color="#3CB371">
                <Heading as="h2" fontSize={50} px="50px" py="50px">
                No items in the Metaverse
                </Heading>
        </VStack>
    )
    
        return(
            <VStack alignItems="flex-start"  backgroundColor="#1F1F23" color="#3CB371">
            
            {currentAccount ?        
                
                <div>HOME is where the heart is!</div>   : <Tag backgroundColor=" #3CB371;" color="#FEE09D;">Connect Wallet First</Tag>
            }
        </VStack>
          
          
          
        
        )
  }

  export default Home;