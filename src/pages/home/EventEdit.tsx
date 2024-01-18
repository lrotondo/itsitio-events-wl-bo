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
import { MdEdit } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../api/lib";
import { useAuthHeader } from "react-auth-kit";
import { useSuccessToast, useErrorToast } from "../../hooks/toasts";
import moment from "moment";
import { Event } from "../../api";
import CreationFormContent from "../../components/CreationFormContent";

const validationSchema = Yup.object().shape({
    title: Yup.string().required("El titulo no puede estar vacio"),
    description: Yup.string().required("La descripcion no puede estar vacia"),
    dateUTC: Yup.date().required("La fecha no puede estar vacia"),
    primaryColor: Yup.string().required(
        "El color primario no puede estar vacio"
    ),
    banner: Yup.string().url().required("La imagen no puede estar vacia"),
    subtitle: Yup.string().required("El subtitulo no puede estar vacio"),
    arenaId: Yup.string().nullable(),
    streamId: Yup.string().nullable(),
});

interface Props {
    event: Event;
}

const EventEdit = ({ event }: Props) => {
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const successToast = useSuccessToast();
    const errorToast = useErrorToast();
    const getAuthHeader = useAuthHeader();
    //const editable = !event.isPast || event.live;
    const editable = true;

    const initialValues = {
        ...event,
        dateUTC: moment.utc(event.dateUTC).local().format("YYYY-MM-DDTHH:mm"),
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            await editEvent({
                ...values,
                dateUTC: moment(values.dateUTC)
                    .utc()
                    .format("YYYY-MM-DDTHH:mm"),
            });
            setSubmitting(false);
        },
    });

    const { mutateAsync: editEvent } = useMutation(
        (values: typeof initialValues) =>
            apiClient.put(`/events/${event.id}`, values, {
                headers: { Authorization: getAuthHeader() },
            }),
        {
            onSuccess: () => {
                successToast("Evento editado correctamente");
                queryClient.resetQueries("events");
                formik.resetForm();
                onClose();
            },
            onError: (err: any) => {
                console.log(err);
                errorToast(
                    "Error al editar el evento, intente de nuevo más tarde"
                );
            },
        }
    );

    return (
        <>
            <Tooltip
                label={
                    editable
                        ? "Editar"
                        : "No se puede editar un evento ya finalizado"
                }
            >
                <IconButton
                    icon={<MdEdit />}
                    onClick={onOpen}
                    aria-label="Editar evento"
                    colorScheme={"twitter"}
                    size={"sm"}
                    isDisabled={!editable}
                />
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
                <ModalOverlay />
                <ModalContent minW={"80vw"}>
                    <ModalHeader>Editar evento</ModalHeader>
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
                            bgColor="#ff7f00"
                        >
                            Editar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
export default EventEdit;
