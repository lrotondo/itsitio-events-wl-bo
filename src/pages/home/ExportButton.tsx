import { IconButton, Tooltip } from "@chakra-ui/react";
import { FaFileExport } from "react-icons/fa";
import { useAuthHeader } from "react-auth-kit";
import { useSuccessToast, useErrorToast } from "../../hooks/toasts";
import { useMutation } from "react-query";
import { apiClient } from "../../api/lib";
import { downloadFile, generateExcelFileURL } from "../../utils/files";
import moment from "moment";
import { AxiosError } from "axios";

interface Props {
    eventId: string;
    eventName: string;
}

const ExportButton = ({ eventId, eventName }: Props) => {
    const getAuthHeader = useAuthHeader();
    const successToast = useSuccessToast();
    const errorToast = useErrorToast();

    const { isLoading, mutateAsync: getReport } = useMutation(
        () =>
            apiClient.get<string>(`/events/${eventId}/report`, {
                headers: {
                    Authorization: getAuthHeader(),
                },
            }),
        {
            onSuccess: (axiosRes) => {
                downloadFile(
                    generateExcelFileURL(axiosRes.data),
                    `${eventName
                        .toLocaleLowerCase()
                        .replaceAll(" ", "_")}_usuarios_${moment().format(
                        "DD/MM/yyyy"
                    )}.xlsx`
                );
                successToast("Exportado correctamente");
            },
            onError: (axiosErr: AxiosError) => {
                console.error(axiosErr);
                errorToast("Error al exportar, intente de nuevo más tarde");
            },
        }
    );

    return (
        <Tooltip label="Exportar a excel" placement="bottom">
            <IconButton
                aria-label="Exportar"
                icon={<FaFileExport />}
                colorScheme="green"
                ms="auto"
                onClick={async () => await getReport()}
                isLoading={isLoading}
                isDisabled={isLoading}
            />
        </Tooltip>
    );
};

export default ExportButton;
