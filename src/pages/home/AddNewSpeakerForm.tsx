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

const AddNewSpeakerForm = ({ eventId }: Props) => {
    const queryClient = useQueryClient();
    const successToast = useSuccessToast();
    const errorToast = useErrorToast();
    const getAuthHeader = useAuthHeader();
    const [form, setForm] = useState({
        name: "",
        picture: "",
        video: "",
        description: "",
        bio: "",
    });

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, name: e.target.value });
    };

    const onPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, picture: e.target.value });
    };

    const onVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, video: e.target.value });
    };

    const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, description: e.target.value });
    };

    const onBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, bio: e.target.value });
    };

    const { mutateAsync: addSpeakerAsync, isLoading } = useMutation(
        () =>
            apiClient.post(`/events/${eventId}/speakers`, form, {
                headers: {
                    Authorization: getAuthHeader(),
                },
            }),
        {
            onSuccess: () => {
                successToast("Orador añadido correctamente");
                queryClient.resetQueries("events");
            },
            onError: (err) => {
                errorToast(
                    "Error al añadir orador, intente de nuevo mas tarde"
                );
                console.error(err);
            },
        }
    );

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addSpeakerAsync();
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
                    <FormLabel htmlFor="picture">Imagen</FormLabel>
                    <Input
                        value={form.picture}
                        onChange={onPictureChange}
                        id="picture"
                        name={"picture"}
                        type={"url"}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="video">Video YouTube ID</FormLabel>
                    <Input
                        value={form.video}
                        onChange={onVideoChange}
                        id="video"
                        name={"video"}
                        type={"text"}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="description">Descripción</FormLabel>
                    <Input
                        value={form.description}
                        onChange={onDescriptionChange}
                        id="description"
                        name={"description"}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="description">Bio</FormLabel>
                    <Input
                        value={form.bio}
                        onChange={onBioChange}
                        id="bio"
                        name={"bio"}
                    />
                </FormControl>

                <Button
                    w={"10rem"}
                    type={"submit"}
                    colorScheme={"orange"}
                    isLoading={isLoading}
                    isDisabled={
                        form.name === "" ||
                        form.picture === "" ||
                        form.description === "" ||
                        form.bio === "" ||
                        isLoading
                    }
                    bgColor={"#ff7f00"}
                >
                    AÑADIR
                </Button>
            </VStack>
        </chakra.form>
    );
};
export default AddNewSpeakerForm;
