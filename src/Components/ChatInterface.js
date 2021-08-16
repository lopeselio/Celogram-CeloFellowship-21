import { VStack, Input, HStack, Text, Button, Box, Tag, Avatar, Flex, Image, useToast, FormControl, Form } from "@chakra-ui/react";
import seedColor from "seed-color";
import OrbitDb, { Identities } from "orbit-db";
import { create } from "ipfs-http-client";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import IPFSpubsub from "orbit-db-pubsub";
import svgAvatarGenerator from "../utils/avatar";
import Web3 from "web3";
// import SuperchatABI from "../abis/superChat";


var orbitdb;
var db;
var pubsub;
var web3;

function ChatInterface({ currentAccount, isLocked, pubsubTopic }) {
    const toast = useToast();
    const [isConnectingToDatabase, setIsConnectingToDatabase ] = useState(false);
    const [ isStreaming, setIsStreaming ] = useState(false);
    const [ message, setMessage ] = useState("");
    const [ messages, setMessages ] = useState([]);
    const [ superchatContractAddress, setSuperchatContractAddress ] = useState("0xE85b157E7685Ce6Bc35fd33c1dfb7E887E7470AF");
    const [ superchatContract, setSuperchatContract ] = useState("");
    const [ isSuperChatting, setIsSuperChatting ] = useState(false);
    const [ superChatValue, setSuperChatValue ] = useState("0");

    useEffect(() => {
        
    }, []);
    
    useEffect(() => {
        if(currentAccount)
            init();
    }, [currentAccount]);

    useEffect(() => {

    }, [messages, isLocked]);

    const init = async () => {
        web3 = new Web3(window.celo);
        // let superchatContractObj = new web3.eth.Contract(SuperchatABI, superchatContractAddress);
        // setSuperchatContract(superchatContractObj);
        
        // const ipfs = create("http://5a40bd7bdcaf.ngrok.io");
        // orbitdb = await OrbitDb.createInstance(ipfs);
        // db = await orbitdb.docs("niftysubs");
        // pubsub = new IPFSpubsub(ipfs, "niftysubs");
        // subscribeToTopic();
        // initDb();
    } 

    const subscribeToTopic = async () => {
        await pubsub.subscribe(pubsubTopic, handleMessage, handleNewPeer);
        console.log(`Subscribed to ${pubsubTopic}`);
    }

    const handleMessage = (topic, message) => {
        // let newMessage = {_id: uuidv4(), sender: currentAccount, message: message};
        setMessages(messages => [...messages, message]);
        // console.log(message);
    }

    const handleNewPeer = (address, peer) => {
       
    }
    const handleChange = ({ target }) => {
        setMessage(target.value);
    }

    const initDb = async () => {
        db.load();
        const prevMessages = await db.get("");
        setMessages(messages => [...messages, ...prevMessages]);
        console.log(db);
        db.events.on("ready", () => {
            console.log("Database Ready!");
        });
        db.events.on("write", (address, entry, heads) => {
            console.log(heads);
            let newMessage = { _id: heads[0].payload.value._id, sender: heads[0].payload.value.sender, message: heads[0].payload.value.message };  
            setMessages(messages => [...messages, newMessage]);
            console.log("write event");
        });
        db.events.on("peer", (peer) => {
            console.log(`Hello ${peer}`);
        });
    }


    const handleSuperChatValue = ({ target }) => {
        setSuperChatValue(target.value);
    }

    const sendMessage = async () => {
        let newMessage = await pubsub.publish(pubsubTopic, { _id: uuidv4(), message: message, sender: currentAccount, isSuperChat: false, value: 0 });
        setMessage("");
    }

    const sendSuperChat = async () => {
        if(parseFloat(superChatValue) > 0) {
            setIsSuperChatting(true);
            console.log(superChatValue);
            let weiAmount = web3.utils.toWei(superChatValue, "ether");
            superchatContract.methods.superChat("0x22b2DD2CFEF2018D15543c484aceF6D9B5435863", weiAmount, message, uuidv4()).send({ from: currentAccount, value: weiAmount })
            .on("transactionHash", (hash) => {
                console.log(hash);
                sendSuperChatMessage(message, superChatValue);
                setIsSuperChatting(false);
            })
            .on("error", (error, receipt) => {
                toast({
                    position: "bottom-right",
                    title: `Request Rejected`,
                    status: "error",
                    isClosable: true
                })
                setIsSuperChatting(false);
            })
        } else {
            toast({
                position: "bottom-right",
                title: `SuperChat value is 0`,
                status: "error",
                isClosable: true
            })
        }
    }

    const sendSuperChatMessage = async (message, value) => {
        let newMessage = await pubsub.publish(pubsubTopic, { _id: uuidv4(), message: message, sender: currentAccount, isSuperChat: true, value: superChatValue });
        setMessage("");
        setSuperChatValue(0);
        setIsSuperChatting(false);
    }

    return (
        <VStack borderLeftWidth="4px" borderLeftColor="#FEE09D" margin={0} spacing={4} height="calc(100vh - 65px)"backgroundColor="#1F1F23" padding={3} alignItems="flex-start" width="20vw">
            <VStack alignItems="flex-start"  width="100%">
                <Text fontSize="20px" color="#3CB371">Chat</Text>
                <VStack width="100%" justifyContent="flex-end" height="calc(100vh - 65px - 23vh)">
                    <VStack overflowY="scroll" width="100%" alignItems="flex-start" justifySelf="flex-end">
                        {
                            messages.length == 0 ?
                            null
                            :
                            messages.map(message => {
                                return (
                                    <Box key={message._id} maxWidth="18vw">
                                        <Text isTruncated color={seedColor(message.sender).toHex()} as="i">{message.sender.substr(0,3)}...{message.sender.substr(-3)}</Text>
                                        <Text ml="10px" as="span">{message.message}</Text>
                                    </Box>
                                );
                            })
                        }
                    </VStack>
                    
                </VStack>
            </VStack>
                <VStack justifySelf="flex-end" width="100%">
                    <Input isRequired focusBorderColor="#FEE09D" isRequired={true} marginTop="0 !important" value={message} onChange={handleChange} width="100%" placeholder="Send a message" backgroundColor="gray.200" />
                    <HStack width="100%">
                    {/* <Input width="100px" value={superChatValue} focusBorderColor="pink.400" onChange={handleSuperChatValue} /> */}
                        {/* <Button isLoading={isSuperChatting} onClick={sendSuperChat} colorScheme="red">SuperChat</Button> */}
                        <Button onClick={sendMessage} backgroundColor="#3CB371" color="#fff">Send</Button>
                    </HStack>
                </VStack>            
        </VStack>
    );  
}

export default ChatInterface;