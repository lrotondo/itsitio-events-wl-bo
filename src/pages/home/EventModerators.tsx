import {
    IconButton,
    Tooltip,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Text,
    Flex,
    VStack,
} from "@chakra-ui/react";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { EventModerator } from "../../api";
import EventModeratorsItem from "./EventModeratorsItem";
import AddNewModeratorForm from "./AddNewModeratorForm";

interface Props {
    moderators: EventModerator[];
    eventId: string;
}

const EventModerators = ({ moderators, eventId }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Tooltip label="Moderadores">
                <IconButton
                    onClick={onOpen}
                    aria-label="Moderadores"
                    icon={<BsFillPersonCheckFill />}
                    colorScheme={"red"}
                    size={"sm"}
                    bgColor="red"
                />
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minW={"80vw"} pb={5}>
                    <ModalHeader>Moderadores</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex
                            gap={4}
                            alignItems="flex-start"
                            justifyContent={"center"}
                            flexDir={{ base: "column", md: "row" }}
                        >
                            <VStack spacing={5} w={{ base: "full", md: "40%" }}>
                                {moderators.map((s) => (
                                    <EventModeratorsItem key={s.id} moderator={s} />
                                ))}
                                {!moderators.length && (
                                    <Text>
                                        Todavía no añadiste ningún moderador
                                    </Text>
                                )}
                            </VStack>
                            {moderators.length < 6 ? (
                                <AddNewModeratorForm eventId={eventId} />
                            ) : (
                                <Text textAlign={"center"}>
                                    Solo puedes añadir hasta seis moderadores,
                                    elimina alguno si quieres agregar otro
                                </Text>
                            )}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EventModerators;
