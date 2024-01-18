import { HStack, Show } from "@chakra-ui/react";
import ChipButton from "./ChipButton";
import { useAppSelector } from "../../redux/hooks";
import { useCallback, useState } from "react";
import useDispatchFunction from "../../hooks/useDispatchFunction";
import { changeDateFilter } from "../../redux/slices/eventsSlice";
// @ts-ignore
import moment from "moment/min/moment-with-locales";
import { Moment } from "moment";

const DateFilters = () => {
    const [active, setActive] = useState<number>(0);
    const momentObj = moment().locale("es") as Moment;
    const state = useAppSelector((s) => s.events.dateFilter);
    const dispatch = useDispatchFunction();

    const onAllClick = useCallback(() => {
        setActive(0);
        if (state.all) return;
        dispatch(changeDateFilter, { accessor: "all", value: !state.all });
    }, [dispatch, state]);

    const dateChangeDispatch = useCallback(
        (from: Moment, to: Moment) => {
            dispatch(changeDateFilter, {
                accessor: "from",
                value: from.format("YYYY-MM-DD"),
            });
            dispatch(changeDateFilter, {
                accessor: "to",
                value: to.format("YYYY-MM-DD"),
            });
            dispatch(changeDateFilter, { accessor: "all", value: false });
        },
        [dispatch]
    );

    const onTwoMonthsAgo = useCallback(() => {
        setActive(1);
        const month = momentObj.clone().subtract(2, "months");
        dateChangeDispatch(
            month.clone().startOf("month"),
            month.clone().endOf("month")
        );
    }, [dateChangeDispatch, momentObj]);

    const onOneMonthAgo = useCallback(() => {
        setActive(2);
        const month = momentObj.clone().subtract(1, "months");
        dateChangeDispatch(
            month.clone().startOf("month"),
            month.clone().endOf("month")
        );
    }, [dateChangeDispatch, momentObj]);

    const onThisMonth = useCallback(() => {
        setActive(3);
        const month = momentObj.clone().startOf("month");
        dateChangeDispatch(month, month.clone().endOf("month"));
    }, [dateChangeDispatch, momentObj]);

    return (
        <HStack>
            <ChipButton
                label={"Todos"}
                isActive={active === 0}
                onClick={onAllClick}
            />
            <Show above="lg">
                <ChipButton
                    label={momentObj
                        .clone()
                        .subtract(2, "months")
                        .format("MMMM")}
                    isActive={active === 1}
                    onClick={onTwoMonthsAgo}
                />
                <ChipButton
                    label={momentObj
                        .clone()
                        .subtract(1, "month")
                        .format("MMMM")}
                    isActive={active === 2}
                    onClick={onOneMonthAgo}
                />
            </Show>

            <ChipButton
                label={"Este mes"}
                isActive={active === 3}
                onClick={onThisMonth}
            />
        </HStack>
    );
};

export default DateFilters;
