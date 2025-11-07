import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import store from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "next-themes";

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate 
      loading={
        <div className="flex items-center justify-center h-screen bg-background">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A38C2]"></div>
        </div>
      }
      onBeforeLift={() => {
        // Add small delay to ensure smooth transition
        return new Promise(resolve => setTimeout(resolve, 100))
      }}
      persistor={persistor}
    >
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <App />
        <Toaster />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
