import { EventSponsor } from "../../api";
import { HStack, Img, Text } from "@chakra-ui/react";
import EventSponsorRemove from "./EventSponsorRemove";

interface Props {
    sponsor: EventSponsor;
}

const EventSponsorsItem = ({ sponsor }: Props) => {
    return (
        <HStack w={"full"}>
            <Img
                src={sponsor.sponsor.logo}
                alt={sponsor.sponsor.name}
                w={"5rem"}
                border={"1px solid lightgray"}
            />
            <Text>{sponsor.sponsor.name}</Text>
            <EventSponsorRemove id={sponsor.id} />
        </HStack>
    );
};

export default EventSponsorsItem;
