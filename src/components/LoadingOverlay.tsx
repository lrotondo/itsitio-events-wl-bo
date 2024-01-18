import { Center, Spinner } from "@chakra-ui/react";

const LoadingOverlay = () => {
    return (
        <Center
            w={"full"}
            h={"full"}
            position={"absolute"}
            top={0}
            left={0}
            bgColor={"rgba(0, 0, 0, .5)"}
        >
            <Spinner zIndex={1000} size={"xl"} color={"white"} />
        </Center>
    );
};
export default LoadingOverlay;
