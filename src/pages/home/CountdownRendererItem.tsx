import { Heading, Text, VStack } from "@chakra-ui/react";

interface Props {
    value: number;
    label: string;
}
const CountdownRendererItem = ({ value, label }: Props) => {
    return (
        <VStack alignItems={"center"} spacing={0} w={"full"} maxW={"full"}>
            <Heading fontSize={"3xl"}>
                {value.toString().padStart(2, "0")}
            </Heading>
            <Text
                textTransform={"uppercase"}
                w={"full"}
                textAlign={"center"}
                whiteSpace={"nowrap"}
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                fontSize={"sm"}
            >
                {label}
            </Text>
        </VStack>
    );
};

export default CountdownRendererItem;
