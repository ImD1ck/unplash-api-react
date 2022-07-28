import Search from "./components/Search.js";
import MyPhotos from "./components/MyPhotos.js";

import { store } from "./redux/store";
import { Provider, provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/App.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="myPhotos" element={<MyPhotos />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
