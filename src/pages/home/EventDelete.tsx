import {
    useDisclosure,
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    IconButton,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BiTrash } from "react-icons/bi";
import { useMutation, useQueryClient } from "react-query";
import { useSuccessToast, useErrorToast } from "../../hooks/toasts";
import { apiClient } from "../../api/lib";
import { useAuthHeader } from "react-auth-kit";

interface Props {
    id: string;
}

const EventDelete = ({ id }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const getAuthHeader = useAuthHeader();
    const cancelRef = useRef(null);
    const successToast = useSuccessToast();
    const errorToast = useErrorToast();
    const queryClient = useQueryClient();

    const { isLoading, mutateAsync: deleteEvent } = useMutation(
        () =>
            apiClient.delete(`/events/${id}`, {
                headers: { Authorization: getAuthHeader() },
            }),
        {
            onSuccess: () => {
                queryClient.resetQueries("events");
                queryClient.resetQueries(`event-${id}`);
                successToast("Evento eliminado");
                onClose();
            },
            onError: (e) => {
                console.log(e);
                errorToast(
                    "Error al eliminar el evento",
                    "Intentelo de nuevo más tarde"
                );
            },
        }
    );

    return (
        <>
            <IconButton
                colorScheme={"red"}
                onClick={onOpen}
                icon={<BiTrash />}
                aria-label="Eliminar evento"
                size={"sm"}
            />

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Eliminar evento
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            ¿Estás seguro de que quieres eliminar este evento?
                            Esta acción no es reversible
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button
                                colorScheme="red"
                                ml={3}
                                isLoading={isLoading}
                                isDisabled={isLoading}
                                onClick={() => deleteEvent()}
                            >
                                Eliminar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};
export default EventDelete;
