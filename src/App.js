import Search from "./components/Search.js";
import MyPhotos from "./components/MyPhotos.js";
import BasicModal from "./components/Modal.js";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/App.css";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState();

  return (
    <div className="App">
      <Provider store={store}>
        <BasicModal setOpen={setOpen} open={open} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="myPhotos" element={<MyPhotos setOpen={setOpen} />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
