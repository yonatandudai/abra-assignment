import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CreationPage from "./components/CreationPage";
import PlacesPage from "./components/PlacesPage";
import PlacesContextProvider from './components/PlacesContext';

function App() {

  return (
    <PlacesContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<CreationPage />}/>
          <Route path="/places" element={<PlacesPage />} />
        </Routes>
      </BrowserRouter>
    </PlacesContextProvider>
  )
}

export default App;
