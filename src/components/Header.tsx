import { Box, Button, Menu, MenuButton, MenuItem, MenuList, useClipboard } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import { useWallet } from "../hooks/useWallet";
import { connector } from "../connector";

const Header: FunctionComponent<{ onConnect: () => void }> = ({ onConnect }) => {
  const wallet = useWallet();

  // const { onCopy, hasCopied } = useClipboard();

  return (
    <Box as="header" display="flex" justifyContent="flex-end">
      {wallet ? (
        <Menu>
          <MenuButton as={Button}>{wallet.account.address}</MenuButton>
          <MenuList>
            <MenuItem>Copy address</MenuItem>
            <MenuItem onClick={() => connector.disconnect()}>Disconnect</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button onClick={onConnect}>Connect Wallet</Button>
      )}
    </Box>
  );
};

export default Header;
