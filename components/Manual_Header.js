import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function Manual_Header() {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();

  // useEffect constantly checking dependecny array
  // if anything change then call the function

  // what does this useEffect:
  // if we already connected stays the connect button to connected
  //
  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== undefined) {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled]);

  // this useEffect does:
  // when we dont connect wallet doesnt come up repeatedly
  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3(); // will set isWeb3Enabled to false
        console.log("Null account found!");
      }
    });
  }, []);

  return (
    <div>
      {account ? (
        <div>Connected to {account}</div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== undefined)
              window.localStorage.setItem("connected", "injected");
            // injected means MetaMask, it can be wallet-connect, or some other wallet
          }}
          disabled={isWeb3EnableLoading}
        >
          Connect
        </button>
      )}
    </div>
  );
}
