import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { WalletInfoRemote } from "@tonconnect/sdk";
import React, { FunctionComponent, useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { connector } from "../connector";
import { useWallet } from "../hooks/useWallet";

const QRCodeModal: FunctionComponent<{ isOpen: boolean; onClose: () => void; walletInfo: WalletInfoRemote | null }> = ({ isOpen, onClose, walletInfo }) => {
  const [walletConnectionURL, setWalletConnectionURL] = useState("");

  const wallet = useWallet();

  useEffect(() => {
    //close modal after connect
    if(isOpen && wallet) {
      onClose()
    }
  }, [isOpen, wallet, onClose])

  useEffect(() => {
    if (walletInfo) {
      setWalletConnectionURL(connector.connect({ bridgeUrl: walletInfo.bridgeUrl, universalLink: walletInfo.universalLink })); //если через асширение в браузере(jsBridge) то не нужно
    }
  }, [walletInfo]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Connect wo wallet {walletInfo?.name}</ModalHeader>
        <ModalBody display="flex" flexDirection="column" alignItems="center">
          <QRCodeSVG value={walletConnectionURL} />
          <Button w="100%" my="4" onClick={() => window.open(walletConnectionURL, '_blank')}>Open {walletInfo?.name}</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default QRCodeModal;
