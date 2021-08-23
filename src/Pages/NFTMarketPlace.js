import React, { useState, useEffect } from 'react';
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
import Home from '../Components/Home'
import CreateItem from '../Components/create-item';
import MyAssets from '../Components/my-assets';
import CeloCreatorDashboard from '../Components/creator-dashboard';
// class Upload extends Component {
function NFTMarketPlaceHeader({ currentAccount }) {
    let { path, url } = useRouteMatch();
        return(
            <VStack alignItems="flex-start"  backgroundColor="#1F1F23" color="#3CB371">
                <Heading as="h2" fontSize={50} px="50px" py="50px">
                NFT Metaverse
                </Heading>

            <HStack alignItems="flex-start" py="20px" px="50px" h="100vh">
                
            {
                currentAccount ?
                <Router>
                    
                    <VStack alignItems="flex-start" backgroundColor="#2E3337" color="#3CB371" borderRadius="15px" padding="10px" borderColor="#FEE09D" borderWidth="4px">
                        <Link to={`${url}/`}><Button justifyContent="flex-start" textAlign="left"  width="200px" variant="ghost" leftIcon={<RiHome3Fill />}>Home</Button></Link>
                        <Link to={`${url}/create-item`}><Button colorScheme={window.location.pathname === `${url}/create-item` ? "pink" : ""} justifyContent="flex-start" width="200px" variant="ghost" leftIcon={<AiFillDollarCircle />}>Sell NFTs</Button></Link>
                        <Link to={`${url}/my-assets`}><Button colorScheme={window.location.pathname === `${url}/my-assets` ? "pink" : ""} justifyContent="flex-start" width="200px" variant="ghost" leftIcon={<BiPurchaseTag />}>My NFTs</Button></Link>
                        <Link to={`${url}/creator-dashboard`}><Button colorScheme={window.location.pathname === `${url}/creator-dashboard` ? "yellow" : ""} justifyContent="flex-start" width="200px" variant="ghost" leftIcon={<FaHandHoldingHeart />}>Creator Dashboard</Button></Link>
                    </VStack>
                    <VStack alignSelf="flex-start" width="100%" px="50px">
                        <Switch>
                            <Route exact path={`${path}/`}>
                                {
                                <Home currentAccount={currentAccount} />
                                }
                            </Route>
                            <Route exact  path={`${path}/create-item`}>
                                {
                                    <CreateItem currentAccount={currentAccount} />
                                    
                                }
                            </Route>
                            <Route exact  path={`${path}/my-assets`}>
                                {
                                <MyAssets currentAccount={currentAccount} />
                                }
                            </Route>
                            <Route exact  path={`${path}/creator-dashboard`}>
                                {
                                <CeloCreatorDashboard currentAccount={currentAccount} />
                                }
                            </Route>
                        </Switch>
                    </VStack>
                </Router>
                :
                <Tag backgroundColor=" #3CB371;" color="#FEE09D;">Connect Wallet First</Tag>
            }
        </HStack>
        </VStack>
          
          
          
        
        )
  }

  export default NFTMarketPlaceHeader;