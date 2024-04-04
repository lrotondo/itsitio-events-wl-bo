import { IconButton } from "@chakra-ui/react";
import { HiUserRemove } from "react-icons/hi";
import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../api/lib";
import { useAuthHeader } from "react-auth-kit";
import { useSuccessToast, useErrorToast } from "../../hooks/toasts";

interface Props {
    id: string;
}

const EventModeratorRemove = ({ id }: Props) => {
    const getAuthHeader = useAuthHeader();
    const successToast = useSuccessToast();
    const errorToast = useErrorToast();
    const queryClient = useQueryClient();
    const { isLoading, mutateAsync: removeModerator } = useMutation(
        () =>
            apiClient.delete(`/events/moderators/${id}`, {
                headers: { Authorization: getAuthHeader() },
            }),
        {
            onSuccess: () => {
                successToast("Moderador removido");
                queryClient.resetQueries("events");
            },
            onError: (err) => {
                console.error(err);

                errorToast(
                    "Error removiendo el moderador",
                    "Intentelo de nuevo más tarde"
                );
            },
        }
    );
    return (
        <IconButton
            colorScheme={"red"}
            variant={"ghost"}
            icon={<HiUserRemove />}
            aria-label="Eliminar moderador"
            isLoading={isLoading}
            onClick={() => removeModerator()}
            isDisabled={isLoading}
        />
    );
};
export default EventModeratorRemove;
