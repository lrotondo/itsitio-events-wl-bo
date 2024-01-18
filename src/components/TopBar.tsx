import { HStack, Heading } from "@chakra-ui/react";
import TopBarUser from "./TopBarUser";

const TopBar = () => {
    return (
        <HStack w={"full"} p={5} px={10} justifyContent={"space-between"}>
            <Heading>Eventos</Heading>
            <TopBarUser />
        </HStack>
    );
};

export default TopBar;
