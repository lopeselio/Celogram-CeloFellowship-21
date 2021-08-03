import "./Components.css";
import celogram from '../assets/celo.svg';
import { 
  Button, 
  HStack, 
  Text, 
  Tag, 
  TagLabel, 
  Avatar,
  Spacer 
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import svgAvatarGenerator from "../utils/avatar";
import { Link } from "react-router-dom";
import Web3 from "web3";

function Header({ currentAccount }) {

  const [ isLoading, setIsLoading ] = useState(false);
  const [ avatar, setAvatar ] = useState(undefined);
  const [ isMetamaskInstalled, setIsMetamaskInstalled ] = useState(false);

  useEffect(() => {
    if(window.ethereum) {
      setIsMetamaskInstalled(true);  
      let svg = svgAvatarGenerator(currentAccount, {dataUri: true});
      setAvatar(svg);
    //   const web3 = new Web3(window.ethereum);
    //   window.ethereum.on("chainChanged", async (chainId) => {
    //     const newChainId = await web3.eth.getChainId();
    //     chainIdSetter(newChainId);
    //   });
    } else {
      setIsMetamaskInstalled(false);
    }
  }, [currentAccount])

  

  return (
    <HStack padding={3} className="Header">
      <div className="headercomp">
        <Link to="/"><img className="headerlogo" src={celogram} alt="CeloGram Logo"></img></Link>
      </div>
      <Link to="/dashboard"><Button colorScheme="whatsapp" variant="ghost" className="buttonComp1">Dashboard</Button></Link>
      <Spacer />
      <Link to="/NFT"><Button colorScheme="whatsapp" variant="solid" className="buttonComp">CELOGRAM NFT</Button></Link>
      <div className="headercomp">
        {
          isMetamaskInstalled ? 
          currentAccount ? 
          <Tag
            size="lg"
            borderRadius="full"
            ml={3}
            mr={-2}
            background="#FEE09D"
          >
            <TagLabel color="#2E3337">
                {`${currentAccount.substr(0,6)}...${currentAccount.substr(-4)}`}
            </TagLabel>
            <Avatar borderStyle="solid" borderColor="#37CE81" borderWidth="2px" padding="1px" mr="-13px" ml={4} size="sm" bg="transparent" src={avatar} />
          </Tag>
          :
          <Tag alignSelf="flex-start" color="#37CE81" backgroundColor="#2e3337">Connect Wallet</Tag>
          :
          <Button isLoading={isLoading} alignSelf="flex-start" color="#E6017A" backgroundColor="rgba(230,1,122,0.08)">Install Metamask</Button>
        }
        
      </div>
    </HStack>
  );
}

export default Header;