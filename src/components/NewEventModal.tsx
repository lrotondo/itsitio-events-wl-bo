import * as Yup from "yup";
import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    IconButton,
    Tooltip,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { MdAdd } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../api/lib";
import { useAuthHeader } from "react-auth-kit";
import { useSuccessToast, useErrorToast } from "../hooks/toasts";
import moment from "moment";
import CreationFormContent from "./CreationFormContent";

const initialValues = {
    title: "",
    description: "",
    subtitle: "",
    dateUTC: "",
    primaryColor: "#1C75CC",
    banner: "",
    arenaId: "",
    streamId: "",
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required("El titulo no puede estar vacio"),
    description: Yup.string().required("La descripcion no puede estar vacia"),
    dateUTC: Yup.date().required("La fecha no puede estar vacia"),
    primaryColor: Yup.string().required(
        "El color primario no puede estar vacio"
    ),
    banner: Yup.string()
        .url("Ingrese una URL válida")
        .required("El banner no puede estar vacio"),
    subtitle: Yup.string().required("El subtitulo no puede estar vacio"),
    arenaId: Yup.string(),
    streamId: Yup.string(),
});

const NewEventModal = () => {
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const successToast = useSuccessToast();
    const errorToast = useErrorToast();
    const getAuthHeader = useAuthHeader();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            await createEventAsync({
                ...values,
                dateUTC: moment(values.dateUTC)
                    .utc()
                    .format("YYYY-MM-DDTHH:mm:ss"),
            });
            setSubmitting(false);
        },
    });

    const { mutateAsync: createEventAsync } = useMutation(
        (values: typeof initialValues) =>
            apiClient.post("/events", values, {
                headers: { Authorization: getAuthHeader() },
            }),
        {
            onSuccess: () => {
                successToast("Evento creado correctamente");
                queryClient.resetQueries("events");
                formik.resetForm();
                onClose();
            },
            onError: (err: any) => {
                console.log(err);
                errorToast(
                    "Error al crear el evento, intente de nuevo más tarde"
                );
            },
        }
    );

    return (
        <>
            <Tooltip label="Crear un nuevo evento">
                <IconButton
                    icon={<MdAdd size={20} />}
                    onClick={onOpen}
                    aria-label="Crear evento"
                    colorScheme={"orange"}
                    bgColor="#3182ce"
                />
            </Tooltip>
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
                <ModalOverlay />
                <ModalContent minW={"80vw"}>
                    <ModalHeader>Crear evento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <CreationFormContent formik={formik} />
                    </ModalBody>
                    <ModalFooter justifyContent={"center"}>
                        <Button
                            w={"10rem"}
                            colorScheme={"orange"}
                            type={"submit"}
                            isLoading={formik.isSubmitting}
                            onClick={formik.submitForm}
                            bgColor={"#ff7f00"}
                        >
                            Crear
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
export default NewEventModal;
