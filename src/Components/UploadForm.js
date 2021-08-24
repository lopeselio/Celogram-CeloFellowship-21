import React, { useState, useEffect } from 'react';
import Web3 from "web3";

import {
    Center,
    VStack,
    Heading,
    HStack,
    Image,
    Box,
    Stack,
  } from "@chakra-ui/react";
  import { TiPlus } from "react-icons/ti";
  import FundPostABI from '../abis/FundPost.json'
  import DisplayImage from './DisplayImage'
  import FundPostabi from '../utils/fundpost.json'
  // import { create as ipfsClient} from 'ipfs-http-client'
  // const ipfsClient = require("ipfs-http-client");

  // const ipfs = create('https://ipfs.infura.io:5001/api/v0')
  // const { create } = require('ipfs-http-client')
  // const ipfs = create({
  //   host: "ipfs.infura.io",
  //   port: 5001,
  //   protocol: "https",
  // });

  const ipfsClient = require('ipfs-http-client')
  const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

  
  

  
  const ContractKit = require("@celo/contractkit") 
  let kit
  
  var FundPostContractObj
 
function Upload({ currentAccount }) {
      const [currentImage, setCurrentImage] = useState('https://cdn.iconscout.com/icon/free/png-256/gallery-187-902099.png')
      const [Bbuffer, setBuffer] = useState(undefined);
      const [ isLoading, setIsLoading ] = useState(false);
      const [Desc, setDesc] = useState('')
      

      useEffect(() => {
        if(window.celo && currentAccount){

        }
      }, [currentAccount]);

    //   const init = async () => {
    //     const web3 = new Web3(window.celo);
    //     kit = ContractKit.newKitFromWeb3(web3);
    //     const networkId = await kit.web3.eth.net.getId();
    //     const networkData = FundPostABI.networks[networkId];
    //     FundPostContractObj = new kit.web3.eth.Contract(FundPostABI.abi, "0xd5D69912a00a919dbB1613382d6dF5650c580ec7"
    //   );
    //     console.log(FundPostContractObj)
        
    // }

      const handleDesc = (event) => {
        event.preventDefault()
        setDesc(event.target.value)
      }

      const captureFile = (event) => {

        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
    
        reader.onloadend = () => {
          
          const buffer = Buffer(reader.result)
          setBuffer(buffer)
          // this.setState({ buffer: Buffer(reader.result) })
          console.log('buffer',buffer)
        }
      }

      const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
          if(reader.readyState === 2){
            // this.setState({Img: reader.result})
            setCurrentImage(reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
    
      };
      async function uploadImage (description) {
        // await window.celo.enable()
        if (currentAccount !== undefined) {
          console.log("Submitting file to ipfs...");
          console.log(description)
    
          ipfs.add(Bbuffer, (error, result) => {
            console.log("Ipfs result", result);
            if (error) {
              // console.error(error);
              return;
            }
            // this.setState({ loading: true });
            setIsLoading(true);
            
            const web3 = new Web3(window.celo);
            kit = ContractKit.newKitFromWeb3(web3);
            const networkId =  kit.web3.eth.net.getId();
            const networkData = FundPostABI.networks[networkId];
            let FundPostContractObj = new kit.web3.eth.Contract(FundPostabi.abi, "0x05460a3bDe86e616EA9137C8854aA55225679310", {
              // from: currentAccount, // default from address
              gasPrice: '20000000000', // default gas price in wei, 20 gwei in this case
              gasLimit: "50000"
          })
            FundPostContractObj.methods
              .uploadImage(result[0].hash, description)
              .send({ from: currentAccount })
              .on("transactionHash", (hash) => {
                // this.setState({ isLoading: false });
                setIsLoading(false)
              });
            if (isLoading) {
              window.location.reload();
            }
          });
        } else {
          window.alert("Please connect your Celo Wallet to upload!");
        }
      };
      // render() {
        // const {currentImage} = this.state
        // const {currentAccount} = this.props.currentAccount
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
              const description = {Desc}
              // console.log(description)
              uploadImage(description)
            }}
            >
              <HStack width="70%" spacing={3} alignItems="flex-start">
                
                
                      <input
                        name="image-upload"
                        type="file"
                        style={{ color: 'white', background: '#3CB371' }}
                        id="input"
                        accept=".jpg, .jpeg, .png, .bmp, .gif"
                        onInput={(event) => captureFile(event)} 
                        onChange={(e) => imageHandler(e)}
                      />
                        
                  <Stack width="70%" backgroundColor="white" placeholder="Media Description" borderWidth="4px" borderColor="#FEE09D" textColor="#3CB371" >
                    <input
                        id="imageDescription"
                        name="imageDescription"
                        type="text"
                        // style={{ display: "none" }}
                        style={{ border: "none" }}
                        // ref={(input) => { imageDescription = input }}
                        value={Desc}
                        onChange={(event) => handleDesc(event)}
                        className="form-control"
                        placeholder="Enter Image Description"
                        required />
                </Stack>
                <Stack width="10%" variant="ghost" backgroundColor="#3CB371" placeholder="Media Description" borderWidth="3px" borderColor="#FEE09D" textColor="#FEE09D" borderRadius="5px" ><button type="submit">Post</button></Stack>

            </HStack>
            
            </form>
            </VStack>
            <DisplayImage currentAccount={currentAccount} />   
          </VStack>
          
        
        )
      // }

  }

  export default Upload;