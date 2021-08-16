import React, {useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {injectedConnector} from "../connector";

function Account() {
    const {chainId, account, activate, active} = useWeb3React()
    
    const onClick = () =>{
        activate(injectedConnector)
    }

    return (
        <div>
            <div> ChainId : {chainId}</div>
            <div> Account : {account}</div>

            {active ? (
            <div>Connected</div>
            ): (
            <button type = "button" onClick={onClick}>
                Connect
            </button>
            )}
                
            </div>
      
    )
}


export default Account;