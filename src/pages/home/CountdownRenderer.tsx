import {
    Box,
    Center,
    GridItem,
    SimpleGrid,
    Text,
    VStack,
} from "@chakra-ui/react";
import CountdownRendererItem from "./CountdownRendererItem";
import StreamPanel from "./StreamPanel";
import TurnOffStream from "./TurnOffStream";
interface Props {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
    live: boolean;
    eventId: string;
}

const CountdownRenderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
    live,
    eventId,
}: Props) => {
    return (
        <VStack w={"full"} alignItems={"flex-start"} position={"relative"}>
            <Text fontSize={"sm"} color={"gray"}>
                En vivo en
            </Text>
            <SimpleGrid w={"full"} columns={12} spacing={1}>
                <GridItem colSpan={3}>
                    <CountdownRendererItem value={days} label={"Dias"} />
                </GridItem>
                <GridItem colSpan={3}>
                    <CountdownRendererItem value={hours} label={"Horas"} />
                </GridItem>
                <GridItem colSpan={3}>
                    <CountdownRendererItem value={minutes} label={"Minutos"} />
                </GridItem>
                <GridItem colSpan={3}>
                    <CountdownRendererItem value={seconds} label={"Segundos"} />
                </GridItem>
            </SimpleGrid>
            {completed && (
                <Center
                    position={"absolute"}
                    top={"50%"}
                    right={"50%"}
                    w={"full"}
                    h={"120%"}
                    bgColor="rgba(255, 255, 255, 0.9)"
                    transform={"translate(50%, -50%)"}
                >
                    <StreamPanel live={live} />
                </Center>
            )}
            {completed && live && (
                <Box pos={"absolute"} top={0} right={0}>
                    <TurnOffStream eventId={eventId} />
                </Box>
            )}
        </VStack>
    );
};

export default CountdownRenderer;
