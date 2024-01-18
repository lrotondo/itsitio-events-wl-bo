import { Button } from "@chakra-ui/react";

interface Props {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

const ChipButton = ({ label, isActive, onClick }: Props) => {
    return (
        <Button
            type={"button"}
            variant={"solid"}
            colorScheme={"gray"}
            bgColor={"gray.400"}
            color={"white"}
            fontSize={"sm"}
            py={2}
            px={5}
            rounded={20}
            _hover={{ bgColor: "gray.500" }}
            _active={{ bgColor: "gray.700" }}
            isActive={isActive}
            whiteSpace={"normal"}
            onClick={onClick}
            textTransform={"capitalize"}
        >
            {label}
        </Button>
    );
};

export default ChipButton;
