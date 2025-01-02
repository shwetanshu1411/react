import { useState } from "react";
import { InputBox } from "./component/Index";
import useCurrencyInfo from './customhooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    const tempAmount = amount;
    setAmount(convertedAmount);
    setConvertedAmount(tempAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      style={{
        backgroundImage: `url('https://images.moneycontrol.com/static-mcnews/2024/08/20240810035729_market_stocks_sensex_Nifty.jpg?impolicy=website&width=770&height=431')`,
      }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 dark:bg-gray-800/50">
        <button
          className="absolute top-4 right-4 bg-blue-600 text-white py-1 px-3 rounded-md"
          onClick={toggleDarkMode}
        >
          Toggle Dark Mode
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-1">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from} 
              onAmountChange={(amt) => setAmount(amt)}
            />
          </div>
          <div className="relative w-full h-0.5">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 px-2 py-0.5 text-white hover:bg-white/20"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className="w-full mt-1 mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
