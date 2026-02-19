import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';


import { Outlet } from 'react-router-dom';
function App() {
  

  return (
    <div className="block ">
      <Header />
      <div id="mainwrapper" className="flex w-full">
        <Sidebar  />
        <div id="maincontent" className="p-4 w-full">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default App;
