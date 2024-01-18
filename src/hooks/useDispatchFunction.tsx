import { useAppDispatch } from "../redux/hooks";

const useDispatchFunction = () => {
    const dispatch = useAppDispatch();
    return (type: any, payload?: any) => dispatch({ type, payload });
};

export default useDispatchFunction;
