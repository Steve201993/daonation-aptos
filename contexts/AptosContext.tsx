'use client';
import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';

import { Aptos, AptosConfig, Network,MoveValue } from "@aptos-labs/ts-sdk";
import Cookies from 'js-cookie';
import config from './json/config.json'
import { toast } from 'react-toastify';


const NETWORK=Network.DEVNET;
const aptosClient = new Aptos(new AptosConfig({ network: NETWORK }));

const AppContext = createContext({
    aptosClient:aptosClient,
    signerAddress:null,
    showToast: (IdOrShowAlert, FinalizedText, doAfter, callToastSuccess = true,  ShowToast = false) => { },
    EasyToast:(message, type, UpdateType = false, ToastId = '', isLoading = false)=>{},
    sendTransaction:async (signerAddress, method, args = [],value=0)=>{},
    ReadContract:async (query, args = null):Promise<MoveValue>=>{return },
    userInfo:null

});

declare let window:any;

export function AptosProvider({ children }) {
    const [signerAddress, setSignerAddress]=useState('');
    const [userInfo, setUserInfo]=useState({});

    
  async function EasyToast(message, type, UpdateType = false, ToastId = '', isLoading = false) {
    if (UpdateType) {
      toast.update(ToastId, {
        render: message,
        type: type,
        isLoading: isLoading,
        autoClose: 1000,
        closeButton: true,
        closeOnClick: true,
        draggable: true
      });
    }
  }
    async function showToast( IdOrShowAlert, FinalizedText, doAfter, callToastSuccess = true,  ShowToast = false) {
        if (callToastSuccess)
            if (ShowToast == false) {
              toast.update(IdOrShowAlert, {
                render: FinalizedText,
                type: 'success',
                isLoading: false,
                autoClose: 1000,
                closeButton: true,
                closeOnClick: true,
                draggable: true
              });
            } else {
              IdOrShowAlert('success', FinalizedText);
            }
            doAfter();
    
      }
    
    const fetchData = async () => {
        if (Cookies.get('loggedin')=== "true") {
            try {		
            
                if (typeof window?.aptos == "undefined"){
                    setTimeout(fetchData,500)
                }

                if (await window?.aptos?.isConnected()){
            
                   
                    let signerAddress =  (await window?.aptos?.account())?.address ;
                    setSignerAddress(signerAddress);
                  let user_id = Number(Cookies.get('user_id'));
                  let userInfo = await ReadContract("userMap",[user_id]);
                    setUserInfo(userInfo);
                    
                }

            } catch (error) {
                console.error(error);
            }
        }
    };



    
	async function sendTransaction(signerAddress, method, args = [],value=0) {
		let aptos_account = (await window.aptos.account()).address ;
		if (!aptos_account) return ;
		if (value > 0){
			const transaction = await aptosClient.transferCoinTransaction({
				sender: signerAddress,
				recipient: config.moduleAddress,
				amount: value,
			  });
						
			const pendingTxn = await window.aptos.signAndSubmitTransaction(transaction.rawTransaction);
			await new Promise((resolve, reject) => setTimeout(() => resolve(true), 1000));
		}
		await window.aptos.signAndSubmitTransaction({
			type: "entry_function_payload",
			function: `${config.moduleAddress}::${config.moduleName}::${method}`,
			type_arguments: [],
			arguments: args,
		  });
		

	}

	async function ReadContract( query, arg ) {
		const output = await aptosClient.view({
			payload: {
			  function: `${config.moduleAddress}::${config.moduleName}::${query}`,
			  functionArguments: arg,
			},
		  });
		  return output[0];
	}


	useEffect(() => {		
		fetchData();
	}, []);

  return <AppContext.Provider value={{ aptosClient,signerAddress,sendTransaction,ReadContract,userInfo,showToast,EasyToast }}>{children}</AppContext.Provider>;
}

export const useAptosContext = () => useContext(AppContext);
