import { EventSpeaker } from "../../api";
import { Avatar, HStack, Text } from "@chakra-ui/react";
import EventSpeakerRemove from "./EventSpeakerRemove";

interface Props {
    speaker: EventSpeaker;
}

const EventSpeakersItem = ({ speaker }: Props) => {
    return (
        <HStack w={"full"}>
            <Avatar src={speaker.speaker.picture} name={speaker.speaker.name} />
            <Text>{speaker.speaker.name}</Text>
            <EventSpeakerRemove id={speaker.id} />
        </HStack>
    );
};
export default EventSpeakersItem;
