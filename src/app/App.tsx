import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { AuthProvider } from "@features/auth";
import "@mantine/core/styles.css";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
