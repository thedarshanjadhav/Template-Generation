import { Alert, AlertIcon } from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
const Notification = ({ message, status }) => {
    return (
        <Alert status={status} position="fixed" top="4rem" width="100%" zIndex="9999">
            <AlertIcon />
            {message}
        </Alert>
    );
};

export default Notification;
