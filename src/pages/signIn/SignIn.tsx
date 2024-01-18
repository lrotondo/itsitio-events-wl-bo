import {
    Button,
    Center,
    chakra,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useSignIn } from "react-auth-kit";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { apiClient, AuthResponse } from "../../api";
import { useErrorToast } from "../../hooks/toasts";

const initialValues = {
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Revise este campo")
        .required("El email no puede estar vacío"),
    password: Yup.string().required("La contraseña no puede estar vacía"),
});

const SignIn = () => {
    const errorToast = useErrorToast();
    const localSignIn = useSignIn();

    const { mutateAsync: signIn } = useMutation(
        (values: typeof initialValues) =>
            apiClient.post<AuthResponse>("/users/auth/sign-in", values),
        {
            onSuccess: (res) => {
                localSignIn({
                    token: res.data.authToken.token,
                    expiresIn: res.data.authToken.expiresIn,
                    tokenType: res.data.tokenType,
                    authState: res.data.authState,
                });
                window.location.href = "/";
            },
            onError: (err: AxiosError<AuthResponse>) => {
                console.log(err);
                errorToast(
                    "Error iniciando sesión",
                    err.response?.data?.error?.description ||
                        "Intenta nuevamente más tarde"
                );
            },
        }
    );

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            await signIn(values);
            setSubmitting(false);
        },
    });

    return (
        <Center w={"full"} h={"full"}>
            <Flex
                bgColor={"white"}
                px={6}
                py={4}
                rounded={5}
                borderColor={"lightgray"}
                borderWidth={1}
                minW={"25rem"}
            >
                <chakra.form onSubmit={formik.handleSubmit} w={"full"}>
                    <VStack spacing={5}>
                        <FormControl
                            isInvalid={
                                Boolean(formik.errors.email) &&
                                formik.touched.email
                            }
                        >
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id={"email"}
                                name={"email"}
                                type={"email"}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>
                                {formik.errors.email}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={
                                Boolean(formik.errors.password) &&
                                formik.touched.password
                            }
                        >
                            <FormLabel htmlFor="password">Contraseña</FormLabel>
                            <Input
                                id={"password"}
                                name={"password"}
                                type={"password"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>
                                {formik.errors.password}
                            </FormErrorMessage>
                        </FormControl>
                        <Button
                            type="submit"
                            isLoading={formik.isSubmitting}
                            colorScheme={"blue"}
                        >
                            Iniciar sesión
                        </Button>
                    </VStack>
                </chakra.form>
            </Flex>
        </Center>
    );
};

export default SignIn;
