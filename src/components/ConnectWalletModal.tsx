import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React, { FunctionComponent, useEffect, useState } from "react";
import { connector } from "../connector";
import { WalletInfo, WalletInfoRemote, isWalletInfoCurrentlyInjected, isWalletInfoRemote } from "@tonconnect/sdk";
import QRCodeModal from "./QRCodeModal";
import { useWallet } from "../hooks/useWallet";

const ConnectWalletModal: FunctionComponent<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [wallets, setWallets] = useState<WalletInfo[] | null>(null);
  const [selectedWalletInfo, setSelectedWalletInfo] = useState<WalletInfoRemote | null>(null);

  const wallet = useWallet();

  useEffect(() => {
    //close modal after connect
    if (isOpen && wallet) {
      onClose();
    }
  }, [isOpen, wallet, onClose]);

  useEffect(() => {
    connector.getWallets().then(setWallets); //получаем доступные кошельки из коннектора
  }, []);

  const onWalletClick = (walletInfo: WalletInfo) => {
    // если кошелек удаленный то показываем qr для подключения
    if (isWalletInfoRemote(walletInfo)) {
      //todo open QR code modal
      return setSelectedWalletInfo(walletInfo);
    }

    //если есть встроенный кошелек
    if (isWalletInfoCurrentlyInjected(walletInfo)) {
      return connector.connect({ jsBridgeKey: walletInfo.jsBridgeKey });
    }

    window.open(walletInfo.aboutUrl, "_blank");
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Choose a wallet</ModalHeader>
          <ModalBody>
            {wallets && (
              <Flex gap="2" flexWrap={"wrap"}>
                {wallets.map((wallet, i) => (
                  <Button key={i} leftIcon={<Image src={wallet.imageUrl} w="16px" h="16px" />} onClick={() => onWalletClick(wallet)}>
                    {wallet.name}
                  </Button>
                ))}
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {selectedWalletInfo && <QRCodeModal isOpen={!!selectedWalletInfo} onClose={() => setSelectedWalletInfo(null)} walletInfo={selectedWalletInfo} />}
    </>
  );
};

export default ConnectWalletModal;
