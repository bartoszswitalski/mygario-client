import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { useEffect, useState } from 'react';
import { REGISTER_CURSOR_ACTION_CREATOR, RegisterCursorActionCreator } from 'src/board/action-creators';
import { AUTH_ACTION_CREATOR, AuthActionCreator } from 'src/common/action-creators/auth.action-creator';
import { useSubscription } from 'src/common/hooks/use-subscription';
import { AUTH_STATE, AuthState } from 'src/common/states/auth.state';
import { tokenExpired } from 'src/common/utils/jwt-expiration';
import Yup from 'src/common/utils/yup';
import { useInjection } from 'src/infrastructure/injection/use-injection';

export const userNameValidationSchema = Yup.object({
    userName: Yup.string().required().min(5).max(20),
});

export const LoginModal = () => {
    const authState = useInjection<AuthState>(AUTH_STATE);
    const authActionCreator = useInjection<AuthActionCreator>(AUTH_ACTION_CREATOR);
    const registerCursorActionCreator = useInjection<RegisterCursorActionCreator>(REGISTER_CURSOR_ACTION_CREATOR);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSubmit = async (values: { userName: string }) => {
        setIsLoading(true);
        authActionCreator.create(values.userName);
    };

    useEffect(() => {
        onOpen();
    }, []);

    useSubscription(authState.credentials$(), ({ userName, token }) => {
        setIsLoading(false);
        setIsLoggedIn(!(userName === null || token === null || tokenExpired(token)));
    });

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        onClose();
        registerCursorActionCreator.create();
    }, [isLoggedIn]);

    return (
        <Modal isOpen={isOpen} onClose={() => null} isCentered size={'xs'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Enter user name:</ModalHeader>

                <Formik
                    initialValues={{ userName: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={userNameValidationSchema}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <ModalBody>
                                <Flex direction={'column'} gap={3}>
                                    <InputControl name="userName" />
                                </Flex>
                            </ModalBody>

                            <ModalFooter>
                                <Button type="submit" colorScheme="blue" mr={'3'} isLoading={isLoading}>
                                    Start playing
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
};
