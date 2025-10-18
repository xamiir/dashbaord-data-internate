import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider, setupStore } from "./models/helpers";
const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StoreProvider value={store}>
      <App />
    </StoreProvider>
  </BrowserRouter>
);
