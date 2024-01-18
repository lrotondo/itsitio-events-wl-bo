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
    VStack,
    Flex,
} from "@chakra-ui/react";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { EventSponsor } from "../../api";
import EventSponsorsItem from "./EventSponsorsItem";
import AddNewSponsorForm from "./AddNewSponsorForm";

interface Props {
    sponsors: EventSponsor[];
    eventId: string;
}

const EventSponsors = ({ sponsors, eventId }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Tooltip label="Patrocinadores">
                <IconButton
                    onClick={onOpen}
                    aria-label="Oradores"
                    icon={<FaMoneyBillWaveAlt />}
                    colorScheme={"orange"}
                    size={"sm"}
                />
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minW={"80vw"} pb={5}>
                    <ModalHeader>Patrocinadores</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex
                            gap={4}
                            alignItems="flex-start"
                            justifyContent={"center"}
                            flexDir={{ base: "column", md: "row" }}
                        >
                            <VStack spacing={5} w={{ base: "full", md: "40%" }}>
                                {sponsors.map((s) => (
                                    <EventSponsorsItem key={s.id} sponsor={s} />
                                ))}
                                {!sponsors.length && (
                                    <Text>
                                        Todavía no añadiste ningún patrocinador
                                    </Text>
                                )}
                            </VStack>
                            {sponsors.length < 3 ? (
                                <AddNewSponsorForm eventId={eventId} />
                            ) : (
                                <Text textAlign={"center"}>
                                    Solo puedes añadir hasta tres
                                    patrocinadores, elimina alguno si quieres
                                    agregar otro
                                </Text>
                            )}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EventSponsors;
