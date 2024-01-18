import {
    Button,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
} from "@chakra-ui/react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useAuthHeader } from "react-auth-kit";
import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../api";
import { AxiosError } from "axios";
import { useErrorToast } from "../../hooks/toasts";

interface Props {
    eventId: string;
}

const TurnOffStream = ({ eventId }: Props) => {
    const getAuthHeader = useAuthHeader();
    const queryClient = useQueryClient();
    const errorToast = useErrorToast();

    const { isLoading, mutateAsync: turnOff } = useMutation(
        () =>
            apiClient.post(
                `/events/${eventId}/off`,
                {},
                {
                    headers: { Authorization: getAuthHeader() },
                }
            ),
        {
            onSuccess: () => {
                queryClient.resetQueries("events");
            },
            onError: (err: AxiosError) => {
                console.error(err);
                errorToast(
                    "Error apagando el evento, intenta de nuevo más tarde",
                    err.message
                );
            },
        }
    );

    return (
        <Popover>
            <PopoverTrigger>
                <IconButton
                    aria-label="Apagar transmision"
                    icon={<AiOutlinePoweroff size={20} />}
                    colorScheme={"red"}
                    size={"sm"}
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Terminar transmisión</PopoverHeader>
                <PopoverBody>
                    Está seguro que quiere terminar la transmisión? Esta acción
                    no es reversible
                </PopoverBody>
                <PopoverFooter
                    w={"full"}
                    display={"flex"}
                    justifyContent={"flex-end"}
                >
                    <Button
                        ms={"auto"}
                        colorScheme={"red"}
                        isLoading={isLoading}
                        onClick={async () => await turnOff()}
                    >
                        Confirmar
                    </Button>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

export default TurnOffStream;
