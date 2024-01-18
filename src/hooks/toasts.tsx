import { useToast } from "@chakra-ui/react";

export const useSuccessToast = () => {
    const toast = useToast();
    const showSuccessToast = (title: string, message?: string) => {
        toast({
            title: title,
            description: message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
        });
    };
    return showSuccessToast;
};

export const useErrorToast = () => {
    const toast = useToast();
    const showErrorToast = (title: string, message?: string) => {
        toast({
            title: title,
            description: message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
        });
    };
    return showErrorToast;
};
