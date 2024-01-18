import { HStack, IconButton, Spinner, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../redux/hooks";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useMemo } from "react";
import useDispatchFunction from "../../hooks/useDispatchFunction";
import { changePage } from "../../redux/slices/eventsSlice";

interface Props {
    pagesAmount?: number;
    isLoading?: boolean;
}

const Pagination = ({ pagesAmount, isLoading }: Props) => {
    const currentPage = useAppSelector((s) => s.events.pagination.page);
    const previousPageAllowed = useMemo(() => currentPage > 0, [currentPage]);
    const nextPageAllowed = useMemo(
        () => (pagesAmount ? currentPage + 1 < pagesAmount : false),
        [currentPage, pagesAmount]
    );

    const dispatch = useDispatchFunction();

    const onPreviousPage = () => dispatch(changePage, currentPage - 1);
    const onNextPage = () => dispatch(changePage, currentPage + 1);

    return (
        <HStack alignItems={"center"}>
            <IconButton
                variant={"ghost"}
                icon={<GrPrevious />}
                aria-label="Previous page"
                isDisabled={!previousPageAllowed}
                onClick={onPreviousPage}
            />
            <Text fontSize={"xl"} as={"span"}>
                {pagesAmount ? (
                    currentPage + 1
                ) : isLoading ? (
                    <Spinner size={"xs"} />
                ) : (
                    0
                )}
                /
                {pagesAmount ? (
                    pagesAmount
                ) : isLoading ? (
                    <Spinner size={"xs"} />
                ) : (
                    0
                )}
            </Text>
            <IconButton
                icon={<GrNext />}
                aria-label="Next page"
                variant={"ghost"}
                isDisabled={!nextPageAllowed}
                onClick={onNextPage}
            />
        </HStack>
    );
};

export default Pagination;
