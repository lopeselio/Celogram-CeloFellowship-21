import './Browse.css'
import {
  Button,
  Heading,
  VStack,
  HStack,
  Box,
  Flex,
  Spacer,
  Image,
  Tag,
  Text,
  Avatar,
  Skeleton,
  SkeletonCircle,
  Stack,
} from '@chakra-ui/react'
import { create } from "ipfs-http-client";
import ChatInterface from '../Components/ChatInterface.js'
import { useState, useEffect, useReducer } from 'react'
// import publicLockABI from '../abis/publicLock'
import Web3 from 'web3'
// import { Framework } from '@superfluid-finance/js-sdk'
import { Web3Provider } from '@ethersproject/providers'
import { useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
// import { getClient, queryThread } from '../utils/textile'
// import { Where } from '@textile/hub-threads-client'
import svgAvatarGenerator from '../utils/avatar'
// import OrbitDB from "orbit-db";
import Upload from "../Components/UploadForm"

var sf
var LockContract
var web3

// const ipfsOptions = {
//   EXPERIMENTAL: {
//     pubsub: true
//   },
//   repo: './ipfs'
// }

// http://5a40bd7bdcaf.ngrok.io
// const ipfs = create("http://5a40bd7bdcaf.ngrok.io", ipfsOptions);


// const ACTIONS = {
//   SET_LOCK_ADDRESS: 'set-lock-address',
//   SET_BLOCK_NUMBER: 'set-block-number',
//   SET_SENDER: 'set-sender',
//   SET_VIDEO: 'set-video',
//   SET_IS_LOCKED: 'set-is-locked',
// }

// function stateReducer(state, action) {
//   switch (action.type) {
//     case ACTIONS.SET_LOCK_ADDRESS:
//       return { ...state, lockAddress: action.payload }
//     case ACTIONS.SET_BLOCK_NUMBER:
//       return { ...state, blockNumber: action.payload }
//     case ACTIONS.SET_SENDER:
//       return { ...state, sender: action.payload }
//     case ACTIONS.SET_VIDEO:
//       return { ...state, video: action.payload }
//     case ACTIONS.SET_IS_LOCKED:
//       return { ...state, isLocked: action.payload }
//     default:
//       return state
//   }
// }

export default function Browse({ currentAccount }) {
  // const [isStartingFlow, setIsStartingFlow] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [ avatar, setAvatar ] = useState(undefined);
  const toast = useToast();
  const { id } = useParams();
  const [ isLocked, setIsLocked ] = useState(true);
  const [ lockAddress, setLockAddress ] = useState("");
  const [ blockNumber, setBlockNumber ] = useState();
  const [ sender, setSender ] = useState();
  const [ web3, setWeb3 ] = useState();
  const [ topic, setTopic ] = useState("");
  const [ db, setdb ] = useState();
  const [ fundraiseId, setFundraiseId ] = useState();
  
  useEffect(async () => {
    // var loadScript = function (src) {
    //   var tag = document.createElement('script');
    //   tag.async = false;
    //   tag.src = src;
    //   var body = document.getElementsByTagName('body')[0];
    //   body.appendChild(tag);
    // }

    let svg = svgAvatarGenerator(currentAccount, {dataUri: true});
    setAvatar(svg);

    

    // loadScript("https://niftysubs.github.io/fundraising-widget/main.js");

    // const orbitdb = await OrbitDB.createInstance(ipfs);
    // let db = await orbitdb.docs("/orbitdb/zdpuAz6e2rGQ917hroubfJuazTQDTHdvDPhm7QhKkMiu64SD7/videosdb");
    // await db.load();
    // setdb(db);
    // let transmission = await db.query((docs) => docs._id == id);
    // console.log(transmission);
    // setTopic(transmission[0].pubsubTopic);
    // setLockAddress(transmission[0].lockAddress);
  }, []);

  useEffect(() => {
    if(currentAccount) {
      init();
    }
  },[currentAccount])


  const init = async () => {
    let web3 = new Web3(window.celo);
    setWeb3(web3);
  }

    // let fundraises = await FundraisingContract.methods.getFundraises(currentAccount).call();
    // console.log(fundraises);
    // setFundraiseId(fundraises[fundraises.length - 1]);
    // changeFlowSender(currentAccount);
  // }

  return (
    <div className="HomeScreen">
      <HStack spacing={0} className="MainSectionHome">
        <section className="sidepanel">
          {/* <br /> */}
          <Heading as="h4" fontSize={15} className="sidepaneltitle">
            Creators for you
          </Heading>
          <div className="descrip">
          <b className="bolddesc">CeloGram</b> is the place to share Photos and Videos with fellow creators on Celo. Connect with others, Mint/Shop NFTs and donate to Good Causes.
          </div>
          <VStack
            marginTop={3}
            alignContent="flex-start"
            spacing={3}
            className="artists"
          >
            <HStack className="artist">
              <VStack alignItems="flex-start" alignContent="flex-start">
                <Text className="artistname">Cristiano Ronaldo</Text>
                <div className="tagcase">
                <Tag className="tag" backgroundColor="#3CB371" color="#FEE09D">
                  Football
                </Tag>
                <Tag className="tag" backgroundColor="#3CB371" color="#FEE09D">
                  Juventus
                </Tag>
                </div>
              </VStack>
              <div className="watchcount">🍩 406.44M</div>
            </HStack>
            <HStack className="artist">
              <VStack alignItems="flex-start" alignContent="flex-start">
                <Text className="artistname">The Rock</Text>
                <div className="tagcase">
                <Tag className="tag" backgroundColor="#3CB371" color="#FEE09D">
                  Hollywood
                </Tag>
                <Tag className="tag" backgroundColor="#3CB371" color="#FEE09D">
                  WWE
                </Tag>
                </div>
              </VStack>
              <div className="watchcount">🍩 309M</div>
            </HStack>
            <HStack className="artist">
              <VStack alignItems="flex-start" alignContent="flex-start">
                <Text className="artistname">Vitalik Buterin</Text>
                <div className="tagcase">
                <Tag className="tag" backgroundColor="#3CB371" color="#FEE09D">
                  Ethereum
                </Tag>
                <Tag className="tag" backgroundColor="#3CB371" color="#FEE09D">
                  EIP 1559
                </Tag>
                </div>
              </VStack>
              <div className="watchcount">🍩 10.7M</div>
            </HStack>
          </VStack>
          <div className="showmore">Show More</div>
          <VStack spacing={3} className="joincard">
            <Heading className="cardtitle">
              Join the <span className="titlecardhighlight">CELOGram</span>{' '}
              community!
            </Heading>
            <Heading as="h5" fontSize={13} className="cardsubtitle">
              Discover the best Creators on Celo and Lead a Creator Economy
            </Heading>
          </VStack>
        </section>
        <HStack
          width="80vw"
          alignItems="flex-start"
          backgroundColor="#EFEFF1"
          height="100%"
          className="mainsection"
        >
          <Upload
            currentAccount={currentAccount}
          />
        </HStack>
          
        <HStack> 
        <ChatInterface 
          pubsubTopic={topic}
          // isLocked={isLocked}
          currentAccount={currentAccount}
        />
        </HStack>
      </HStack>
    </div>
  )
}