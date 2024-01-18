import {
    chakra,
    VStack,
    FormControl,
    HStack,
    FormLabel,
    Textarea,
    FormErrorMessage,
} from "@chakra-ui/react";
import FormikChakraField from "./FormikChakraField";

interface Props {
    formik: any;
}

const CreationFormContent = ({ formik }: Props) => {
    return (
        <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
            <VStack w={"full"} alignItems={"center"} spacing={5}>
                <FormikChakraField
                    name="title"
                    label="Titulo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    type={"text"}
                    error={formik.errors.title}
                    touched={formik.touched.title}
                />
                <FormikChakraField
                    name="subtitle"
                    label="Subtitulo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.subtitle}
                    type={"text"}
                    helperText={"Pequeño encabezado arriba del título"}
                    error={formik.errors.subtitle}
                    touched={formik.touched.subtitle}
                />
                <FormControl
                    isInvalid={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                    }
                >
                    <HStack w={"full"} alignItems={"center"} pb={2}>
                        <FormLabel htmlFor="description">Descripcion</FormLabel>
                    </HStack>
                    <Textarea
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />
                    <FormErrorMessage>
                        {formik.errors.description}
                    </FormErrorMessage>
                </FormControl>

                <FormikChakraField
                    label="Color primario"
                    type={"color"}
                    name="primaryColor"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.primaryColor}
                    error={formik.errors.primaryColor}
                    touched={formik.touched.primaryColor}
                />

                <FormikChakraField
                    label="Banner (URL)"
                    type={"text"}
                    name="banner"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.banner}
                    helperText={
                        "Asegurese de que el link de la imagen/video sea público"
                    }
                    error={formik.errors.banner}
                    touched={formik.touched.banner}
                />

                <FormikChakraField
                    touched={formik.touched.dateUTC}
                    label={"Fecha y hora"}
                    name={"dateUTC"}
                    type={"datetime-local"}
                    error={formik.errors.dateUTC}
                    onChange={formik.handleChange}
                    value={formik.values.dateUTC}
                    onBlur={formik.handleBlur}
                />

                <FormikChakraField
                    label="ID del chatroom de Arena"
                    type={"text"}
                    name="arenaId"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.arenaId}
                    error={formik.errors.arenaId}
                    touched={formik.touched.arenaId}
                />
                <FormikChakraField
                    label="Vimeo/Youtube ID"
                    type={"text"}
                    name="streamId"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.streamId}
                    error={formik.errors.streamId}
                    touched={formik.touched.streamId}
                />
            </VStack>
        </chakra.form>
    );
};

export default CreationFormContent;
