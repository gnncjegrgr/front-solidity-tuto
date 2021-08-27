import React from 'react';
import {useWeb3React} from '@web3-react/core'
import {ROUTERR_ABI} from "../constant";
import {ethers } from 'ethers';

function RemoveLiquidityETH(){
    const {account, library} = useWeb3React()
    const signer = library?.getSigner(account).connectUnchecked()
    const routerContract = new ethers.Contract('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', ROUTERR_ABI, signer)
    const onClick = () => {
        routerContract.removeLiquidityETH(
            '0xaD6D458402F60fD3Bd25163575031ACDce07538D',
            ethers.utils.parseEther("0.00001"),
            '0',
            '0',
            '0x739ECe608f49Ed10828e9B14b57D4adc1D8EB276',
            Math.floor(Date.now() / 1000) + 60 * 20,
            { gasLimit: ethers.utils.hexlify(250000), gasPrice: ethers.utils.parseUnits('5', "gwei")}
        ).then(result => console.log(result))
    }

    return (
        <div>
            <button onClick = {onClick}>
                Remove Liquidity ETH
            </button>
        </div>
    )
}

export default RemoveLiquidityETH