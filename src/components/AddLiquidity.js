import React from 'react'
import {useWeb3React} from "@web3-react/core";

import {ROUTER1_ABI} from "../constant"
import {ethers} from 'ethers';

function AddLiquidity(){

    const {account,library } = useWeb3React()
 
 
    const signer = library?.getSigner(account).connectUnchecked()

    const routerContract = new ethers.Contract('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', ROUTER1_ABI, signer)

    const onClick = () => {
        routerContract.addLiquidity(
            '0xe592427a0aece92de3edee1f18e0157c05861564',
            '0xad6d458402f60fd3bd25163575031acdce07538d',
            ethers.utils.parseEther("0.1"),
            ethers.utils.parseEther("0.1"),
            '0',
            '0',
            '0x739ECe608f49Ed10828e9B14b57D4adc1D8EB276',
            Math.floor(Date.now() / 1000) + 60 * 20,
            { gasLimit: ethers.utils.hexlify(2500000), gasPrice: ethers.utils.parseUnits('5', "gwei")}
        ).then(result => console.log(result))
    }
    return (
        <button onClick = {onClick}>
            Add Liquidity
        </button>
    )
}

export default AddLiquidity;