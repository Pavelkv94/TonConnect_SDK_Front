import { Box, Button, Center, useDisclosure } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/Header";
import ConnectWalletModal from "./components/ConnectWalletModal";
import { useWallet } from "./hooks/useWallet";
import { useSendTransaction } from "./hooks/useSendTransaction";
import { connector } from "./connector";
import { isWalletInfoCurrentlyEmbedded, WalletInfo } from "@tonconnect/sdk";
import { useEffect, useMemo, useState } from "react";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wallet = useWallet();
  const [sendTransaction, confirmationOnProgress] = useSendTransaction();

  const [wallets, setWallets] = useState<WalletInfo[] | null>(null);

  useEffect(() => {
    connector.getWallets().then(setWallets); //получаем доступные кошельки из коннектора
  }, []);

  const embeddedWallet = useMemo(() => wallets && wallets.find(isWalletInfoCurrentlyEmbedded), [wallets]);

  const onConnectClick = () => {
    if (embeddedWallet) {
      connector.connect({ jsBridgeKey: embeddedWallet.jsBridgeKey });
    }
    onOpen();
  };
  
  return (
    <Box p="4">
      <Header onConnect={onConnectClick} />
      <ConnectWalletModal isOpen={isOpen} onClose={onClose} />

      {!!wallet && (
        <Center h={"300px"} w={"100%"}>
          <Button onClick={sendTransaction} isLoading={confirmationOnProgress}>
            Send Transaction
          </Button>
        </Center>
      )}
    </Box>
  );
}

export default App;
