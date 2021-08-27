import logo from './logo.svg';
import './App.css';
import Account from "./components/Account"
import Count from "./components/Count"
import IncButton from './components/incButton';
import DecButton from './components/decButton';
import AddLiquidityETH from "./components/AddLiquidityETH";
import AddLiquidity from "./components/AddLiquidity";
import RemoveLiquidity from "./components/removeLiquidity";
import RemoveLiquidityETH from "./components/removeLiquidityETH";

function App(){
  return(
    <div>
      <div className ="App">
      <Account/>
      <Count/>
      <IncButton/>
      <DecButton/>
      <br></br>
      <AddLiquidityETH/>
      <AddLiquidity/>
      <br></br>
      <RemoveLiquidity/>
      <RemoveLiquidityETH/>
      </div>
    </div>
  )
}

export default App;
