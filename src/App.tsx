import { Box, useDisclosure } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/Header";
import ConnectWalletModal from "./components/ConnectWalletModal";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p="4">
      <Header onConnect={onOpen} />
      <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
      Hello WOrld
    </Box>
  );
}

export default App;
