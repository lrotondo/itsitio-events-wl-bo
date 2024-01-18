import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import theme from "./utils/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "@fontsource/inter/500.css";
import { AuthProvider } from "react-auth-kit";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);
const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider
                        authType={
                            navigator.cookieEnabled ? "cookie" : "localstorage"
                        }
                        authName={"_auth_events_bo"}
                        cookieDomain={window.location.hostname}
                        cookieSecure={window.location.protocol === "https:"}
                    >
                        <BrowserRouter>
                            <App />
                            {process.env.NODE_ENV === "development" && (
                                <ReactQueryDevtools />
                            )}
                        </BrowserRouter>
                    </AuthProvider>
                </QueryClientProvider>
            </ChakraProvider>
        </ReduxProvider>
    </React.StrictMode>
);
