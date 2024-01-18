import { HStack, Text } from "@chakra-ui/react";
import { MdSettingsInputAntenna } from "react-icons/md";

interface Props {
    live: boolean;
}

const StreamPanel = ({ live }: Props) => {
    return (
        <HStack color={live ? "#ff7f00" : "green"}>
            <MdSettingsInputAntenna size={25} />
            <Text fontSize={"2xl"}>
                {live ? "Transmitiendo" : "Transmitido"}
            </Text>
        </HStack>
    );
};

export default StreamPanel;
