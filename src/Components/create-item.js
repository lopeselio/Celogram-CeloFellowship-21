import { useState } from 'react'
import { ethers } from 'ethers'
// import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useParams,
    useLocation,
    useHistory,
    useRouteMatch } from "react-router-dom";
import Web3 from 'web3'
import {
    nftaddress, nftmarketaddress
} from '../utils/config'
import NftABI from '../abis/CELOGramNFT.json'
import NFTMarketABI from '../abis/CELOGramNFTMarket.json'
import { createStandaloneToast } from '@chakra-ui/toast';
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
let kit
var NFTContract
var NFTMarketContract
const ContractKit = require("@celo/contractkit")
// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
const ipfsClient = require('ipfs-http-client')
const client = ipfsClient({ host: 'localhost', port: '5001', protocol: 'https' })


export default function CreateItem (currentAccount) {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    const router = useRouteMatch()
    async function onChange(e) {
        const file = e.target.files[0]
        try {
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
        } catch (e) {
            console.log(e)
        }
    }

    async function createMarket() {
        const { name, description, price } = formInput
        if(!name || !description || !price || !fileUrl) return
        const data = JSON.stringify({
            name, description, image: fileUrl
        })

        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            /*Once the file uploads to the IPFS, pass the URL to save it on the CELO Blockchain */
            createSale(url)
        } catch (error) {
            console.log('error uploading your file: ',error)
        }
    }

    async function createSale(url) {
        const web3 = new Web3(window.celo)
        kit = ContractKit.newKitFromWeb3(web3);
        const networkId = await kit.web3.eth.net.getId();
        const networkData2 = NFTMarketABI.networks[networkId] 
        const networkData1 = NftABI.networks[networkId]
        let contract = new kit.web3.eth.Contract(NftABI.abi, nftaddress)
        let transaction = await NFTContract.methods.createToken(url)
        let tx = await transaction.wait()
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()

        const price = ethers.utils.parseUnits(formInput.price, 'ether')
        contract = new kit.web3.eth.Contract(NFTMarketABI.abi, nftmarketaddress)
        let listingPrice = await contract.methods.getListingPrice()
        listingPrice = listingPrice.toString()
        transaction = await contract.methods.createMarketItem(
            nftaddress, tokenId, price, { value: listingPrice }
        )
        await transaction.wait()
        router.push("/")
    }

    return (
        <VStack backgroundColor="#1F1F23" borderColor="#FEE09D" borderWidth="4px" borderRadius="15px" color="#3CB371" px="300" backgroundColor="#2E3337">
            <Center>
        <Stack padding="100px" width="100%" placeholder="Media Description" textColor="#3CB371" spacing={8} >
        <Center>
        <Heading as="h6" fontSize={20}  >
                Mint NFTs for the CELOGram Metaverse
        </Heading>
        </Center>
        <Stack padding="5px" fontSize="20px" borderWidth="3px" borderColor="#FEE09D" borderRadius="5px" >      
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        </Stack>
        <Stack padding="5px" fontSize="20px" borderWidth="3px" borderColor="#FEE09D" borderRadius="5px" >      
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        </Stack>
        <Stack padding="5px" fontSize="20px" borderWidth="3px" borderColor="#FEE09D" borderRadius="5px" >
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        </Stack>
        <Stack padding="5px" fontSize="20px" borderWidth="3px" borderColor="#FEE09D" borderRadius="5px" >
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        </Stack>
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <Stack padding="10px" variant="ghost" backgroundColor="#3CB371" fontSize="40px" placeholder="Media Description" borderWidth="3px" borderColor="#4d8a68" textColor="#fff" borderRadius="5px" >
        <button onClick={createMarket} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Digital Asset
        </button>
        </Stack>
            </Stack>
            </Center>
        </VStack>
    )
}