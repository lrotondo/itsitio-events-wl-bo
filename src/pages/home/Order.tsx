import { HStack, Show } from "@chakra-ui/react";
import ChipButton from "./ChipButton";
import { useAppSelector } from "../../redux/hooks";
import useDispatchFunction from "../../hooks/useDispatchFunction";
import { useCallback } from "react";
import { changeSort } from "../../redux/slices/eventsSlice";

const Order = () => {
    const state = useAppSelector((s) => s.events.sort);
    const dispatch = useDispatchFunction();

    const dispatchSortChange = useCallback(
        (name: string) => dispatch(changeSort, name),
        [dispatch]
    );

    const onDateClick = useCallback(
        () => dispatchSortChange("perDate"),
        [dispatchSortChange]
    );

    const onTitleClick = useCallback(
        () => dispatchSortChange("perTitle"),
        [dispatchSortChange]
    );

    const onUsersClick = useCallback(
        () => dispatchSortChange("perUsers"),
        [dispatchSortChange]
    );

    return (
        <HStack spacing={4}>
            <ChipButton
                label={"Por fecha"}
                isActive={state.perDate}
                onClick={onDateClick}
            />
            <ChipButton
                label={"Por titulo"}
                isActive={state.perTitle}
                onClick={onTitleClick}
            />
            <Show above="lg">
                <ChipButton
                    label={"Por usuarios registrados"}
                    isActive={state.perUsers}
                    onClick={onUsersClick}
                />
            </Show>
        </HStack>
    );
};

export default Order;
