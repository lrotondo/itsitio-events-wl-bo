import { Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import { Event } from "../../api";
import { FiCalendar } from "react-icons/fi";
import { trimStringAndAddEllipsis } from "../../utils/stringUtils";
import Countdown from "react-countdown";
import CountdownRenderer from "./CountdownRenderer";
import EventDelete from "./EventDelete";
import EventLink from "./EventLink";
import EventSpeakers from "./EventSpeakers";
import EventSponsors from "./EventSponsors";
import EventModerator from "./EventModerators";
import EventEdit from "./EventEdit";
import EventUsers from "./EventUsers";
import EventModerators from "./EventModerators";

interface Props {
    event: Event;
}

const EventCard = ({ event }: Props) => {
    const dateInLocal = moment.utc(event.dateUTC).local();
    return (
        <HStack
            bgColor={"white"}
            borderColor={"lightgray"}
            borderWidth={1}
            p={5}
            rounded={"16px"}
            spacing={5}
            w={"full"}
            h={"full"}
            justifyContent={"space-between"}
        >
            <VStack alignItems={"flex-start"}>
                <HStack alignItems={"center"}>
                    <FiCalendar />
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                        {dateInLocal.format("DD/MM/yyyy - HH:mm")}
                    </Text>
                </HStack>
                <Divider />
                <Heading fontSize={"xl"}>{event.title}</Heading>
                <Text fontSize={"sm"} color={"gray"}>
                    {event.description.length > 100
                        ? trimStringAndAddEllipsis(event.description, 100)
                        : event.description}
                </Text>
                <Divider />
                <Countdown
                    date={dateInLocal.toDate()}
                    renderer={(props) => (
                        <CountdownRenderer
                            live={event.live}
                            eventId={event.id}
                            days={props.days}
                            hours={props.hours}
                            minutes={props.minutes}
                            seconds={props.seconds}
                            completed={props.completed}
                        />
                    )}
                />
            </VStack>
            <Divider orientation="vertical" />
            <VStack justifyContent={"space-evenly"}>
                <EventLink event={event} />
                <EventUsers
                    users={event.users}
                    eventId={event.id}
                    eventName={event.title}
                />
                <EventSpeakers speakers={event.speakers} eventId={event.id} />
                <EventModerators moderators={event.moderators} eventId={event.id} />
                <EventSponsors sponsors={event.sponsors} eventId={event.id} />
                <EventEdit event={event} />
                <EventDelete id={event.id} />
            </VStack>
        </HStack>
    );
};

export default EventCard;
