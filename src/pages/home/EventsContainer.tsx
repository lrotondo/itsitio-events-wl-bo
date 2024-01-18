import {
    Spinner,
    Text,
    SimpleGrid,
    GridItem,
    VStack,
    Center,
} from "@chakra-ui/react";
import { apiClient, EventListResponse } from "../../api";
import { useQuery } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import EventCard from "./EventCard";
import { useAppSelector } from "../../redux/hooks";
import Pagination from "./Pagination";

const EventsContainer = () => {
    const state = useAppSelector((s) => s.events);
    const pagination = state.pagination;
    const getAuthHeader = useAuthHeader();

    const {
        isSuccess,
        isLoading,
        isError,
        data: eventsResponse,
    } = useQuery(
        ["events", state],
        () =>
            apiClient.get<EventListResponse>("/events", {
                headers: { Authorization: getAuthHeader() },
                params: {
                    page: pagination.page,
                    perPage: pagination.perPage,
                    all: state.dateFilter.all,
                    from: state.dateFilter.from,
                    to: state.dateFilter.to,
                    perDate: state.sort.perDate,
                    perTitle: state.sort.perTitle,
                    perUsers: state.sort.perUsers,
                    broadcasted: state.otherFilters.broadcasted,
                    notBroadcasted: state.otherFilters.notBroadcasted,
                },
            }),
        { select: (r) => r.data }
    );

    return (
        <VStack w={"full"} h={"full"} spacing={0} alignItems={"center"}>
            <SimpleGrid
                // When the page is displaying events we let the default height.
                // But if the is not displaying the cards (loading, error, no events, etc), we use flex=1 so the loading spinner
                // or the error/no events text can be centered in the remaining space.
                flex={isSuccess && eventsResponse.events.length ? undefined : 1}
                w={"full"}
                columns={12}
                spacing={5}
                p={3}
                gridAutoRows={"1fr"}
            >
                {isSuccess && eventsResponse.events.length ? (
                    eventsResponse.events.map((e) => (
                        <GridItem
                            key={e.id}
                            colSpan={{ base: 12, md: 6, lg: 4, xl: 3 }}
                        >
                            <EventCard event={e} />
                        </GridItem>
                    ))
                ) : (
                    <GridItem w={"full"} h={"full"} colSpan={12}>
                        <Center w={"full"} h={"full"}>
                            {isSuccess && !eventsResponse.events.length && (
                                <Text fontSize={"3xl"}>
                                    No hay resultados para los filtros actuales
                                </Text>
                            )}
                            {isLoading && (
                                <Spinner color={"steelblue"} size={"xl"} />
                            )}
                            {isError && (
                                <Text fontSize={"3xl"} color={"red"}>
                                    Hubo un error, intentalo de nuevo más tarde
                                </Text>
                            )}
                        </Center>
                    </GridItem>
                )}
            </SimpleGrid>
            <Pagination
                pagesAmount={eventsResponse?.pagesAmount}
                isLoading={isLoading}
            />
        </VStack>
    );
};

export default EventsContainer;
