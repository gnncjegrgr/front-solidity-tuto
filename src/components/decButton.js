import React from "react";
import { useWeb3React } from "@web3-react/core";
import {ethers} from "ethers";
import { COUNTER_ABI } from "../constant";

function IncButton(){
    const {account, library} = useWeb3React()
    const signer = library?.getSigner(account).connectUnchecked()

    const onClick = ()=>{
        const counterContract = new ethers.Contract('0x92816c5b4169562a0D29D9962FC8757377bc05DE', COUNTER_ABI, signer)
        
        counterContract.dec({gasLimit:1000000}).then(
            (result)=>console.log(result)
        )
            
    }
    return (
        <>
            <button type="button" onClick = {onClick}>
                Decrease
            </button>
        </>
    )
}

export default IncButton;