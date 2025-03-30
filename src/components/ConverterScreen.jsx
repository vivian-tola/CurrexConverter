import { useEffect, useState } from "react";
import axios from "axios";
import { data } from "autoprefixer";
const ConverterScreen =() => {
    const [amount, setAmount]= useState("");
    const [convertered, setConvertered]= useState("");
    const [fromCurrency, setfromCurrency]= useState("USD");
    const [toCurrency, settoCurrency] =useState("NGN");
    const [currencies, setCurrencies] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [historicalRate, setHistoricalRate] = useState(null);
    const API_URL = "https://api.exchangerate-api.com/v4/latest/";
    //Fetch available currencies
    useEffect(( ) => {axios.get('${API_URL}USD').then((Response) =>{
        setCurrencies(Object.keys(Response.data.rates));
    });
    }, []);
    //Convert Currency
    const convertCurrency = async () => {
        if(!amount) return;
        try{
            const rate = Response.data.rates[toCurrency];
            setConvertered((amount * rate).toFixed(2));
        }catch(error) {
            console.error("Error fetching exchange rate:",error);
        }
    };
    //Fetch historical exchange rate (7 days ago)
    const fetchHistoricalRate = async () => {
        const today = new Date();
        today.setDate(today.getDate()-7); //Get date from 7 days ago
        const formattedDate = today.toISOString().split("T")[0]; //Format YYYY-MM-DD
        try { const Response = await axios.get('https://api.exchangerate.host/${formattedDate}?base=${fromCurrency}');

        const rate = Response.data.rates[toCurrency];
        setHistoricalRate(rate.toFixed(2));
    } catch (error) {console.error("Error fetching historical rate:", error);
};
return (
    <div className={`${darkMode ?"bg-gray-900 test-white" : "bg-white text-black"} min-h-screen flex flex-col items-center justify-center transition-all`}>
        <button onAuxClick={() => setDarkMode(!darkMode)}
             className="absolute top-4 right-4 text-2xl">
                {darkMode ? <Fasun /> : <FaMoon />}
        </button>
        <h1 className="text-3xl font-bold mb-6">Currency Converter</h1>
        <div className=""></div>
    </div>
)

}