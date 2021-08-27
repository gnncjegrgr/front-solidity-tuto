export const COUNTER_ABI = ['function get() public view returns (uint)', 'function inc() public', 'function dec() public', ]

export const ROUTER_ABI = ['function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin,address to,uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)']

export const ROUTER1_ABI = ['function addLiquidity(address tokenA,address tokenB,uint amountADesired,uint amountBDesired,uint amountAMin,uint amountBMin,address to,uint deadline) external virtual override returns (uint amountA, uint amountB, uint liquidity)',]
export const ROUTER2_ABI = ['function removeLiquidity(address tokenA,address tokenB,uint liquidity,uint amountAMin,uint amountBMin,address to,uint deadline) external returns (uint amountA, uint amountB)']
export const ROUTERR_ABI = ['function removeLiquidityETH(address token,uint liquidity,uint amountTokenMin,uint amountETHMin,address to,uint deadline) public virtual override returns (uint amountToken, uint amountETH)']