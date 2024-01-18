import { IconButton } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../api/lib";
import { useAuthHeader } from "react-auth-kit";
import { useSuccessToast, useErrorToast } from "../../hooks/toasts";
import { MdRemoveCircle } from "react-icons/md";

interface Props {
    id: string;
}

const EventSponsorRemove = ({ id }: Props) => {
    const getAuthHeader = useAuthHeader();
    const successToast = useSuccessToast();
    const errorToast = useErrorToast();
    const queryClient = useQueryClient();
    const { isLoading, mutateAsync: removeSpeaker } = useMutation(
        () =>
            apiClient.delete(`/events/sponsors/${id}`, {
                headers: { Authorization: getAuthHeader() },
            }),
        {
            onSuccess: () => {
                successToast("Patrocinador removido");
                queryClient.resetQueries("events");
            },
            onError: (err) => {
                console.error(err);

                errorToast(
                    "Error removiendo el patrocinador",
                    "Intentelo de nuevo más tarde"
                );
            },
        }
    );
    return (
        <IconButton
            colorScheme={"red"}
            variant={"ghost"}
            icon={<MdRemoveCircle />}
            aria-label="Eliminar patrocinador"
            isLoading={isLoading}
            onClick={() => removeSpeaker()}
            isDisabled={isLoading}
        />
    );
};
export default EventSponsorRemove;
