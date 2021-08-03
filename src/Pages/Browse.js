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


function Browse() {


  return (
    <div>Hello Browse page!</div>
  );
}

export default Browse;
