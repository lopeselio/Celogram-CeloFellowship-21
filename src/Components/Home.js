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
import { ethers } from 'ethers'
import axios from 'axios'
// class Upload extends Component {
function Home({ currentAccount }) {
    
        return(
            <VStack alignItems="flex-start"  backgroundColor="#1F1F23" color="#3CB371">
            
            {currentAccount ?        
                
                <div>HOME is where the heart is!</div>   : <Tag backgroundColor=" #3CB371;" color="#FEE09D;">Connect Wallet First</Tag>
            }
        </VStack>
          
          
          
        
        )
  }

  export default Home;