import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomeScreen from './components/HomeScreen';
import ConverterScreen from './componentsConverterScreen';
import './App.css'

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/"element={<HomeScreen/>}/>
      <Route path="/convert"element={<ConverterScreen />}/>
    </Routes>
   </Router>
  );
}

export default App;