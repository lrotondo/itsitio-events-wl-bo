import { EventModerator } from "../../api";
import { Avatar, HStack, Text } from "@chakra-ui/react";
import EventModeratorRemove from "./EventModeratorRemove";

interface Props {
    moderator: EventModerator;
}

const EventModeratorsItem = ({ moderator }: Props) => {
    return (
        <HStack w={"full"}>
            <Avatar src={moderator.moderator.picture} name={moderator.moderator.name} />
            <Text>{moderator.moderator.name}</Text>
            <EventModeratorRemove id={moderator.id} />
        </HStack>
    );
};
export default EventModeratorsItem;
