import { SendTransactionRequest, UserRejectsError } from "@tonconnect/sdk";
import { useState } from "react";
import { connector } from "../connector";
import { createStandaloneToast } from "@chakra-ui/react";

export function useSendTransaction() {
  const [confirmationOnProgress, setConfirmationOnProgrss] = useState(false);

  async function sendTransaction() {
    setConfirmationOnProgrss(true);

    const tx: SendTransactionRequest = {
      validUntil: Math.round(Date.now() / 1000) + 600,
      messages: [
        {
          address: "0:" + "0".repeat(64),
          amount: "1000000",
        },
      ],
    };

    const { toast } = createStandaloneToast();

    try {
      await connector.sendTransaction(tx);

      toast({
        status: "success",
        title: "Transaction sent successfully",
      });
    } catch (e) {
      if (e instanceof UserRejectsError) {
        return toast({
          status: "error",
          title: "You rejected transaction",
        });
      }
      toast({
        status: "error",
        title: "Transaction didn't send",
      });
      console.log(e);
    } finally {
      setConfirmationOnProgrss(false);
    }
  }

  return [sendTransaction, confirmationOnProgress] as const;
}
