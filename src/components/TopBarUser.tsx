import { Avatar, HStack, IconButton, Text } from "@chakra-ui/react";
import { useSignOut } from "react-auth-kit";
import { BiExit } from "react-icons/bi";
import useAuthState from "../hooks/useAuthState";

const TopBarUser = () => {
    const user = useAuthState();
    const signOut = useSignOut();

    const onSignOut = () => {
        signOut();
        window.location.reload();
    };

    return (
        <HStack>
            <Avatar name={user?.fullName} />
            <Text>{user?.fullName}</Text>
            <IconButton
                icon={<BiExit />}
                aria-label="Cerrar sesión"
                colorScheme={"black"}
                onClick={onSignOut}
                rounded="full"
                variant="link"
            />
        </HStack>
    );
};
export default TopBarUser;
