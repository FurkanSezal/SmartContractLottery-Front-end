import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div className="border-b-2 flex flex-row">
      <h1 className="py-4 px-4 front-blog text-3xl">Decentralized Lottery</h1>
      <div className="ml-auto py-2 px-4"></div>
      <ConnectButton moralisAuth={false} />
    </div>
  );
}
