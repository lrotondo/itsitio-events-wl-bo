import { useAuthUser, useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../api/types";
import { useEffect } from "react";

const useAuthState = () => {
    const navigate = useNavigate();
    const signOut = useSignOut();

    const getAuthUser = useAuthUser();
    const user = getAuthUser();

    useEffect(() => {
        if (!user) {
            signOut();
            navigate("/sign-in");
        }
    }, [user, navigate, signOut]);

    return user as AuthState;
};

export default useAuthState;
