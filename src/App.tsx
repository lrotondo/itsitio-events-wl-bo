import { Box, Hide, HStack, VStack } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useWindowSize } from "./hooks/useWindowsSize";
import SignIn from "./pages/signIn/SignIn";
import SideBar from "./components/SideBar";
import { RequireAuth } from "react-auth-kit";
import Home from "./pages/home/Home";
import TopBar from "./components/TopBar";

const signInPath = "/sign-in";

const App = () => {
    const location = useLocation();
    const screenHeight = useWindowSize().h;
    const onSignInpage = location.pathname === signInPath;
    return (
        <HStack
            width={"full"}
            h={`${screenHeight}px`}
            maxW={"full"}
            bgColor={"whitesmoke"}
            spacing={0}
        >
            <Box w={"fit-content"} h={"full"}>
                {!onSignInpage && (
                    <Hide below={"md"}>
                        <SideBar />
                    </Hide>
                )}
            </Box>
            <VStack w={"full"} h={"full"}>
                {!onSignInpage && <TopBar />}
                <Box
                    flex={1}
                    w={"full"}
                    maxH={"full"}
                    overflowY={"auto"}
                    overflowX={"hidden"}
                >
                    <Routes>
                        <Route
                            path={"/"}
                            element={
                                <RequireAuth loginPath={signInPath}>
                                    <Home />
                                </RequireAuth>
                            }
                        />
                        <Route path={signInPath} element={<SignIn />} />
                    </Routes>
                </Box>
            </VStack>
        </HStack>
    );
};

export default App;
