import React from 'react'
import {useWeb3React} from "@web3-react/core";

import {ROUTER2_ABI} from "../constant"
import {ethers} from 'ethers';

function RemoveLiquidity(){

    const {account,library } = useWeb3React()
 
 
    const signer = library?.getSigner(account).connectUnchecked()

    const routerContract = new ethers.Contract('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', ROUTER2_ABI, signer)

    const onClick = () => {
        routerContract.removeLiquidity(
            '0xe592427a0aece92de3edee1f18e0157c05861564',
            '0xad6d458402f60fd3bd25163575031acdce07538d',
            ethers.utils.parseEther("0.1"),
            '0',
            '0',
            '0x739ECe608f49Ed10828e9B14b57D4adc1D8EB276',
            Math.floor(Date.now() / 1000) + 60 * 20,
            {value:ethers.utils.parseEther("0.01"), gasLimit: ethers.utils.hexlify(250000), gasPrice: ethers.utils.parseUnits('5', "gwei")}
        ).then(result => console.log(result))
    }
    return (
        <button onClick = {onClick}>
            Remove Liquidity
        </button>
    )
}

export default RemoveLiquidity;