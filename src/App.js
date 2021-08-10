import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { 
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  Link,
  Button 
} from "@chakra-ui/react";
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Header from "./Components/Header";
import Theme from "./theme";
import "@fontsource/inter";
import Web3 from "web3";
import { FaExternalLinkAlt } from "react-icons/fa";
import Browse from './Pages/Browse';
const ContractKit = require("@celo/contractkit")
let kit

function App() {

  const [currentAccount, setCurrentAccount] = useState(undefined);
  const [ chainId, setChainId ] = useState();
  const [ isLoading, setIsLoading ] = useState(false);

  const getCurrentAccount = async () => {
    setIsLoading(true);
    await window.celo.enable()
    const web3 = new Web3(window.celo)
    kit = ContractKit.newKitFromWeb3(web3)
    const accounts = await await kit.web3.eth.getAccounts();
    setCurrentAccount(accounts[0]);
    setIsLoading(false);
  }

  useEffect(() => {
    if(window.celo && currentAccount){
      setChainId(window.ethereum.networkVersion);
      
      window.celo.on("accountsChanged", (accounts) => {
        setCurrentAccount(accounts[0]);
      })

      window.celo.on("chainChanged", (newChainId) => {
        setChainId(newChainId.substr(-1, 1));
      })
    }
  }, [currentAccount]);

  return (
    <ChakraProvider theme={Theme}>
      <Router>
      <Header currentAccount={currentAccount} />
      {
            window.ethereum == undefined ?
            <Modal
              isOpen={true}
              isCentered={true}
              closeModalOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Celo Extension Wallet Not Installed!</ModalHeader>
                  <ModalBody>
                      Please Install Celo Extension Wallet.
                  </ModalBody>
                  <ModalFooter>
                      <Link 
                          href="https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en" 
                          isExternal
                      >
                          <Button colorScheme="blue" mr={3} rightIcon={<FaExternalLinkAlt />}>
                              Install On Chrome 
                          </Button>
                      </Link>                      
                  </ModalFooter>
              </ModalContent>      
            </Modal>
            :
            <>
              {
                currentAccount == undefined ?
                <Modal
                  isOpen={true}
                  isCentered={true}
                  closeModalOnOverlayClick={false}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader textAlign="center">Connect Celo Extension Wallet to continue</ModalHeader>
                    <ModalFooter justifyContent="center">
                        <Button className="connect" onClick={getCurrentAccount} isLoading={isLoading} colorScheme="yellow" mr={3}>
                            Connect Celo Extension Wallet
                        </Button>                      
                    </ModalFooter>
                  </ModalContent>
                  
                </Modal>
                :
                chainId == "44787" || chainId == undefined ?
                null
                :
                <Modal
                  isOpen={true}
                  isCentered={true}
                  closeModalOnOverlayClick={false}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Network Not Supported</ModalHeader>
                    <ModalBody>
                        Please Switch to Alfajores Test Network.
                    </ModalBody>
                    <ModalFooter>                        
                    </ModalFooter>
                </ModalContent>      
              </Modal>
              }
            </>
          }
          <Switch>
            {/* <Route exact path="/NFT"> */}
              {/* <HomeScreen currentAccount={currentAccount} /> */}
            {/* </Route> */}
            {/* <Route exact path="/dashboard">
              <Dashboard currentAccount={currentAccount} />
            </Route> */}
            <Route exact path="/">
              <Browse />
            </Route>
          </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
