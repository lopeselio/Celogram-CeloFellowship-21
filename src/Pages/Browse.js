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

var sf
var LockContract
var web3

const ACTIONS = {
  SET_LOCK_ADDRESS: 'set-lock-address',
  SET_BLOCK_NUMBER: 'set-block-number',
  SET_SENDER: 'set-sender',
  SET_VIDEO: 'set-video',
  SET_IS_LOCKED: 'set-is-locked',
}

function stateReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOCK_ADDRESS:
      return { ...state, lockAddress: action.payload }
    case ACTIONS.SET_BLOCK_NUMBER:
      return { ...state, blockNumber: action.payload }
    case ACTIONS.SET_SENDER:
      return { ...state, sender: action.payload }
    case ACTIONS.SET_VIDEO:
      return { ...state, video: action.payload }
    case ACTIONS.SET_IS_LOCKED:
      return { ...state, isLocked: action.payload }
    default:
      return state
  }
}

export default function Browse({ currentAccount }) {
  const toast = useToast()
  // const [isStartingFlow, setIsStartingFlow] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const { id } = useParams()
  

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
                <Text className="artistname">Ariana Grande</Text>
                <div className="tagcase">
                <Tag className="tag" backgroundColor="#3CB371" color="#FEE09D">
                  Singer
                </Tag>
                </div>
              </VStack>
              <div className="watchcount">🍩 248M</div>
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
        </HStack>
          
        <HStack> 
            <ChatInterface
              // pubsubTopic={state.video.videoId}
              // isLocked={state.isLocked}
              // creatorAccount={state.video.currentAccount}
              // currentAccount={currentAccount}
            />
        </HStack>
      </HStack>
    </div>
  )
}