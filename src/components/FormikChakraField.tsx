import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
} from "@chakra-ui/react";

interface Props {
    touched?: boolean;
    label: string;
    name: string;
    type: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
    color?: string;
    helperText?: string;
}

const FormikChakraField = ({
    touched,
    name,
    label,
    type,
    error,
    onChange,
    value,
    color,
    onBlur,
    helperText,
}: Props) => {
    return (
        <FormControl isInvalid={touched && Boolean(error)}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input
                type={type}
                name={name}
                id={name}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                sx={{ color: color }}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export default FormikChakraField;
