import React, { useEffect, useState } from 'react';
import './App.css';
import SelectCharacter from './Components/SelectCharacter';
import Arena from './Components/Arena';
import { CONTRACT_ADDRESS, transformCharacterData } from './constants';
import myEpicGame from './utils/MyEpicGame.json';
import LoadingIndicator from './Components/LoadingIndicator';
import { ethers } from 'ethers';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const MY_TWITTER_HANDLE = 'markmcintosh01';
const MY_TWITTER_LINK = `https://twitter.com/${MY_TWITTER_HANDLE}`;
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;


const App = () => {
  // State
  const [currentAccount, setCurrentAccount] = useState(null);
/*
 * Right under current account, setup this new state property
 */
const [characterNFT, setCharacterNFT] = useState(null);
const [isLoading, setIsLoading] = useState(false);
  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        return;
      } else {
        console.log('We have the ethereum object', ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Found an authorized account:', account);
        setCurrentAccount(account);
      } else {
        console.log('No authorized account found');
      }

     setIsLoading(false);
        

    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Implement your connectWallet method here
   */
  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkIfWalletIsConnected();
  }, []);

// Render Methods
const renderContent = () => {
 /*
   * If the app is currently loading, just render out LoadingIndicator
   */
  if (isLoading) {
    return <LoadingIndicator />;
  }

  /*
   * Scenario #1
   */
  if (!currentAccount) {
    return (
      <div className="connect-wallet-container">
        <img
          src="https://cloudflare-ipfs.com/ipfs/QmYT1bvRUVxwKLenYMUSfxgwvGvuP7RBgkGw1L5HFCMdEN"
          alt="Fam on Bike and Quads"
        />
        <button
          className="cta-button connect-wallet-button"
          onClick={connectWalletAction}
        >
          Connect Wallet To Get Started
        </button>
      </div>
    );

    
    /*
     * Scenario #2
     */
  } else if (currentAccount && !characterNFT) {
    return <SelectCharacter setCharacterNFT={setCharacterNFT} />;

	/*
	* If there is a connected wallet and characterNFT, it's time to battle!
	*/
  } else if (currentAccount && characterNFT) {
    return <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />;
  }
}; 




return (
  
  <div className="App">
    <div className="container">
      <div className="header-container">
        <p className="header gradient-text">🏍️ The Great McIntosh Race 🏍️</p>
        <p className="sub-text">Daddy got a headstart. Somebody get him!</p>
        {/* This is where our button and image code used to be!
         *	Remember we moved it into the render method.
         */}
        {renderContent()}
      </div>
      <div className="footer-container">
            <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
            <span className="footer-text">built on <a
              href={TWITTER_LINK}
              target="_blank"
              rel="noreferrer"
            >{`@${TWITTER_HANDLE}`}</a> by <a
              href={MY_TWITTER_LINK}
              target="_blank"
              rel="noreferrer"
            >{`@${MY_TWITTER_HANDLE}`}</a>
           </span> 
          </div>
    </div>
  </div>
);
};

export default App;