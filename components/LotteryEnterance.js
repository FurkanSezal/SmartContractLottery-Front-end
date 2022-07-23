import { useEffect, useState } from "react";
import {
  useMoralis,
  useWeb3Contract,
  useMoralisSubscription,
  useMoralisQuery,
} from "react-moralis";
import { abi, contractAddress } from "../constants/index";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function LotteryEnterance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  //console.log(parseInt(chainIdHex));
  const chainId = parseInt(chainIdHex);
  const [enteranceFee, setEnteranceFee] = useState("0");
  const [numPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");

  const dispatch = useNotification();

  const lotteryAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;

  const {
    runContractFunction: enterLottery,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "enterLottery",
    params: {},
    msgValue: enteranceFee,
  });

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  });
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "getRecentWinner",
    params: {},
  });

  const { runContractFunction: getEnteranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "getEnteranceFee",
    params: {},
  });

  async function updateUI() {
    const enteranceFeeFromCall = (await getEnteranceFee()).toString();
    const numPlayersFromCall = (await getNumberOfPlayers()).toString();
    const recentWinnerFromCall = (await getRecentWinner()).toString();

    setEnteranceFee(enteranceFeeFromCall);
    setNumPlayers(numPlayersFromCall);
    setRecentWinner(recentWinnerFromCall);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  const handleSuccess = async function (tx) {
    await tx.wait(1);
    handleNotification(tx);
    updateUI();
  };

  const handleNotification = function () {
    dispatch({
      type: "info",
      message: "Transaciton Complete!",
      title: "Tx Notification",
      icon: "bell",
      position: "topR",
    });
  };

  return (
    <div className="p-5">
      Hi From LotteryEnterance
      {lotteryAddress ? (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white front-bold py-2 px-4 rounded ml-auto"
            onClick={async function () {
              await enterLottery({
                onSuccess: handleSuccess,
                onError: (error) => {
                  console.log(error);
                },
              });
            }}
            disabled={(isLoading, isFetching)}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              "Enter Lottery"
            )}
          </button>
          <div>
            Enterance Fee: {ethers.utils.formatUnits(enteranceFee, "ether")}{" "}
            ETH!
          </div>
          <div>Number of Players: {numPlayers}</div>
          <div>Recent Winner : {recentWinner}</div>
        </div>
      ) : (
        <div>No Lottery Address Detected!</div>
      )}
    </div>
  );
}
