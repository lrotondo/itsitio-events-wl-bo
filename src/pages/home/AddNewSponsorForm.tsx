import {
    chakra,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../api/lib";
import { useAuthHeader } from "react-auth-kit";
import { useSuccessToast, useErrorToast } from "../../hooks/toasts";

interface Props {
    eventId: string;
}

const AddNewSponsorForm = ({ eventId }: Props) => {
    const queryClient = useQueryClient();
    const successToast = useSuccessToast();
    const errorToast = useErrorToast();
    const getAuthHeader = useAuthHeader();
    const [form, setForm] = useState({
        name: "",
        logo: "",
    });

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, name: e.target.value });
    };

    const onLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, logo: e.target.value });
    };

    const { mutateAsync: addSponsorAsync, isLoading } = useMutation(
        () =>
            apiClient.post(`/events/${eventId}/sponsors`, form, {
                headers: {
                    Authorization: getAuthHeader(),
                },
            }),
        {
            onSuccess: () => {
                successToast("Patrocinador añadido correctamente");
                queryClient.resetQueries("events");
            },
            onError: (err) => {
                errorToast(
                    "Error al añadir patrocinador, intente de nuevo mas tarde"
                );
                console.error(err);
            },
        }
    );

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addSponsorAsync();
    };

    return (
        <chakra.form onSubmit={onSubmit} w={"full"}>
            <VStack spacing={3} w={"full"}>
                <FormControl>
                    <FormLabel htmlFor="name">Nombre</FormLabel>
                    <Input
                        value={form.name}
                        onChange={onNameChange}
                        id="name"
                        name={"name"}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="logo">Logo</FormLabel>
                    <Input
                        value={form.logo}
                        onChange={onLogoChange}
                        id="logo"
                        name={"logo"}
                        type={"url"}
                    />
                </FormControl>
                <Button
                    w={"10rem"}
                    type={"submit"}
                    colorScheme={"orange"}
                    isLoading={isLoading}
                    isDisabled={
                        form.name === "" || form.logo === "" || isLoading
                    }
                    bgColor="#ff7f00"
                >
                    AÑADIR
                </Button>
            </VStack>
        </chakra.form>
    );
};
export default AddNewSponsorForm;
