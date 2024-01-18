import { IconButton, Link } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import { Event } from "../../api";

interface Props {
    event: Event;
}

const EventLink = ({ event }: Props) => {
    const clientUrl = `${process.env.REACT_APP_CLIENT_URL}/events/${event.slug}`;
    return (
        <IconButton
            as={Link}
            icon={<FiExternalLink />}
            aria-label={`Ir a ${event.title}`}
            to={`/events/${event.id}`}
            colorScheme={"blue"}
            size={"sm"}
            href={clientUrl}
            target={"_blank"}
        />
    );
};
export default EventLink;
