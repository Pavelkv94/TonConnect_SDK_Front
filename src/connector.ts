import TonConnect from "@tonconnect/sdk";

export const connector = new TonConnect(); //new TonConnect({manifestUrl}) - указываем manifestUrl если манифест лежит не в public папке. По умолчаниюподключается автоматически из public
//todo only https (ngrok)
connector.restoreConnection();