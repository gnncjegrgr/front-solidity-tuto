import React, {useState} from 'react';
import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";
import {COUNTER_ABI} from "../constant"

function Count(){
    const {active, library} = useWeb3React() 
    const [count, setCount] = useState(0)

    const onClick = ()=>{
        const counterContract = new ethers.Contract('0x92816c5b4169562a0D29D9962FC8757377bc05DE', COUNTER_ABI, library)

        counterContract.get({gasLimit: 1000000})
            .then((result)=>setCount(result.toNumber()))
        
    }

    return(
        <div>
            <button type = "button" onClick = {onClick}>
                Get Count : {count}
            </button>
        </div>

    );
}

export default Count