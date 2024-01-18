import { Text, VStack, HStack, Divider, Show } from "@chakra-ui/react";
import DateFilters from "./DateFilters";
import Order from "./Order";
import OtherFilters from "./OtherFilters";
import EventsContainer from "./EventsContainer";

const Home = () => {
    return (
        <VStack
            w={"full"}
            spacing={5}
            h={"full"}
            p={3}
            alignItems={"flex-start"}
        >
            <VStack
                spacing={5}
                w={"full"}
                alignItems={"flex-start"}
                ps={{ base: 1, md: 4, lg: 8 }}
            >
                <Text fontSize={"md"} fontWeight={"bold"}>
                    Selección personalizada
                </Text>
                <HStack
                    w={"full"}
                    maxW={"full"}
                    spacing={5}
                    alignItems={"flex-start"}
                    overflowX={"auto"}
                >
                    <DateFilters />
                    <Divider borderColor={"gray"} orientation={"vertical"} />
                    <Show above="md">
                        <Order />
                        <Divider
                            borderColor={"gray"}
                            orientation={"vertical"}
                        />
                    </Show>
                    <OtherFilters />
                </HStack>
            </VStack>
            <EventsContainer />
        </VStack>
    );
};

export default Home;
