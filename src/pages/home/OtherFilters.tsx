import { HStack } from "@chakra-ui/react";
import ChipButton from "./ChipButton";
import { useAppSelector } from "../../redux/hooks";
import useDispatchFunction from "../../hooks/useDispatchFunction";
import { useCallback } from "react";
import { changeOtherFilters } from "../../redux/slices/eventsSlice";

const OtherFilters = () => {
    const state = useAppSelector((s) => s.events.otherFilters);
    const dispatch = useDispatchFunction();

    const dispatchOtherFiltersChange = useCallback(
        (name: string) => dispatch(changeOtherFilters, name),
        [dispatch]
    );

    const onBroadcastedClick = useCallback(() => {
        if (state.broadcasted && !state.notBroadcasted) return;
        dispatchOtherFiltersChange("broadcasted");
    }, [dispatchOtherFiltersChange, state.broadcasted, state.notBroadcasted]);

    const onNotBroadcastedClick = useCallback(() => {
        if (state.notBroadcasted && !state.broadcasted) return;
        dispatchOtherFiltersChange("notBroadcasted");
    }, [dispatchOtherFiltersChange, state.broadcasted, state.notBroadcasted]);

    return (
        <HStack w={"full"} spacing={4}>
            <ChipButton
                label={"Transmitidos"}
                isActive={state.broadcasted}
                onClick={onBroadcastedClick}
            />
            <ChipButton
                label={"Por transmitir"}
                isActive={state.notBroadcasted}
                onClick={onNotBroadcastedClick}
            />
        </HStack>
    );
};
export default OtherFilters;
