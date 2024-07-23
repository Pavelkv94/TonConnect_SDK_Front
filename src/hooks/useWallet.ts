import { Wallet } from "@tonconnect/sdk";
import { useEffect, useState } from "react";
import { connector } from "../connector";

export const useWallet = (): Wallet | null => {
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    return connector.onStatusChange(setWallet); //todo если пользователь отключает кошелек то будет null если подключает то wallet
  }, []);

  return wallet;
};
