import { Img, VStack } from "@chakra-ui/react";
import NewEventModal from "./NewEventModal";
import Logo from "../assets/images/logo.png";

const SideBar = () => {
    return (
        <VStack px={6} py={5} bgColor={"black"} h={"full"} spacing={10}>
            <Img src={Logo} alt="It Sitio" w={"5rem"} />
            <VStack spacing={5}>
                <NewEventModal />
            </VStack>
        </VStack>
    );
};

export default SideBar;
