import { AppRouter } from "./routers";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useStores } from "./models/helpers";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { loadString } from "./app/utils/storage";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const navigate = useNavigate();
  const {
    authStore: { accessToken, logout },
  } = useStores();

  window.navigate = navigate;

  useEffect(() => {
    const checkAuthStatus = () => {
      const authToken = loadString("token");

      if (!authToken && accessToken) {
        logout();
      }
    };

    checkAuthStatus();

    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [accessToken, navigate]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AppRouter />
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}

export default observer(App);
