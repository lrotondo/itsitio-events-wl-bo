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
import { BsPersonFill } from "react-icons/bs";
import { EventSpeaker } from "../../api";
import EventSpeakersItem from "./EventSpeakersItem";
import AddNewSpeakerForm from "./AddNewSpeakerForm";

interface Props {
    speakers: EventSpeaker[];
    eventId: string;
}

const EventSpeakers = ({ speakers, eventId }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Tooltip label="Oradores">
                <IconButton
                    onClick={onOpen}
                    aria-label="Oradores"
                    icon={<BsPersonFill />}
                    colorScheme={"orange"}
                    size={"sm"}
                    bgColor="#ff7f00"
                />
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minW={"80vw"} pb={5}>
                    <ModalHeader>Oradores</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex
                            gap={4}
                            alignItems="flex-start"
                            justifyContent={"center"}
                            flexDir={{ base: "column", md: "row" }}
                        >
                            <VStack spacing={5} w={{ base: "full", md: "40%" }}>
                                {speakers.map((s) => (
                                    <EventSpeakersItem key={s.id} speaker={s} />
                                ))}
                                {!speakers.length && (
                                    <Text>
                                        Todavía no añadiste ningún orador
                                    </Text>
                                )}
                            </VStack>
                            {speakers.length < 5 ? (
                                <AddNewSpeakerForm eventId={eventId} />
                            ) : (
                                <Text textAlign={"center"}>
                                    Solo puedes añadir hasta cinco oradores,
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

export default EventSpeakers;
