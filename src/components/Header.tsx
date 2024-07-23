import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Spinner, useClipboard } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import { useWallet } from "../hooks/useWallet";
import { connector } from "../connector";
import { CHAIN, toUserFriendlyAddress } from "@tonconnect/sdk";
import { useIsConnectionRestored } from "../hooks/useIsConnectionRestored";

const Header: FunctionComponent<{ onConnect: () => void }> = ({ onConnect }) => {
  const wallet = useWallet();

  const isConnectionRestored = useIsConnectionRestored();

  const userFriendlyAddress = wallet ? toUserFriendlyAddress(wallet?.account.address, wallet.account.chain === CHAIN.TESTNET) : ""; //делаем читаемый адрес кошелька
  const slicedUserFriendlyAddress = userFriendlyAddress.slice(0, 4) + "..." + userFriendlyAddress.slice(-4);

  const { onCopy, hasCopied } = useClipboard(userFriendlyAddress);

  return (
    <Box as="header" display="flex" justifyContent="flex-end">
      {wallet ? (
        <Menu>
          <MenuButton as={Button}>{slicedUserFriendlyAddress}</MenuButton>
          <MenuList>
            <MenuItem onClick={onCopy} closeOnSelect={false}>
              {hasCopied ? "Copied!" : "Copy address"}
            </MenuItem>
            <MenuItem onClick={() => connector.disconnect()}>Disconnect</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button w={"150px"} onClick={onConnect}>
          {isConnectionRestored ? "Connect Wallet" : <Spinner />}
        </Button>
      )}
    </Box>
  );
};

export default Header;
