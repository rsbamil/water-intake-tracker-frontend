import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {Toaster} from "react-hot-toast"
import { AuthProvider } from "./context/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster position="top-right" toastOptions={
        {
          duration:3000,
          style:{
            borderRadius:"14px",
            background:"#0f172a",
            color: "#fff",
            padding: "12px 16px",
          }
        }
      } />
    </AuthProvider>
  </StrictMode>
);
