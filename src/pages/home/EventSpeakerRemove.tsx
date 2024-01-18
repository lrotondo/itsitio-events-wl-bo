import { IconButton } from "@chakra-ui/react";
import { HiUserRemove } from "react-icons/hi";
import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../api/lib";
import { useAuthHeader } from "react-auth-kit";
import { useSuccessToast, useErrorToast } from "../../hooks/toasts";

interface Props {
    id: string;
}

const EventSpeakerRemove = ({ id }: Props) => {
    const getAuthHeader = useAuthHeader();
    const successToast = useSuccessToast();
    const errorToast = useErrorToast();
    const queryClient = useQueryClient();
    const { isLoading, mutateAsync: removeSpeaker } = useMutation(
        () =>
            apiClient.delete(`/events/speakers/${id}`, {
                headers: { Authorization: getAuthHeader() },
            }),
        {
            onSuccess: () => {
                successToast("Orador removido");
                queryClient.resetQueries("events");
            },
            onError: (err) => {
                console.error(err);

                errorToast(
                    "Error removiendo el orador",
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
            aria-label="Eliminar orador"
            isLoading={isLoading}
            onClick={() => removeSpeaker()}
            isDisabled={isLoading}
        />
    );
};
export default EventSpeakerRemove;
