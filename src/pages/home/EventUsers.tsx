import {
    Tooltip,
    IconButton,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Table,
    Thead,
    Th,
    Tbody,
    Tr,
    Td,
    Text,
    VStack,
} from "@chakra-ui/react";
import { HiOutlineUsers } from "react-icons/hi";
import { UserForEvent } from "../../api/types";
import ExportButton from "./ExportButton";

interface Props {
    users: Array<UserForEvent>;
    eventId: string;
    eventName: string;
}

const EventUsers = ({ users, eventId, eventName }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Tooltip label="Usuarios registrados">
                <IconButton
                    onClick={onOpen}
                    aria-label="Oradores"
                    icon={<HiOutlineUsers />}
                    colorScheme={"blackAlpha"}
                    size={"sm"}
                />
            </Tooltip>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minW={"fit-content"} pb={10}>
                    <ModalHeader>Usuarios registrados</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody maxW={"90vw"} overflowX={"auto"}>
                        <VStack w={"full"} alignItems="flex-start">
                            {users.length && (
                                <ExportButton
                                    eventName={eventName}
                                    eventId={eventId}
                                />
                            )}
                            {users.length ? (
                                <Table w={"ful"}>
                                    <Thead>
                                        <Th>Nombre</Th>
                                        <Th>Teléfono</Th>
                                        <Th>Email</Th>
                                        <Th>Compañía</Th>
                                        <Th>Ciudad</Th>
                                        <Th>Pais</Th>
                                    </Thead>
                                    <Tbody>
                                        {users.map((user) => (
                                            <Tr key={user.id}>
                                                <Td>{user.fullName}</Td>
                                                <Td>{user.phone}</Td>
                                                <Td>{user.email}</Td>
                                                <Td>{user.company}</Td>
                                                <Td>{user.city}</Td>
                                                <Td>{user.country}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            ) : (
                                <Text>No hay usuarios registrados</Text>
                            )}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EventUsers;
