import { useAuth } from '../../auth/useAuth';
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
import Yup from '../../shared/yup';
import { useEffect } from 'react';
import { applicationBus } from '../../infrastructure/eda';
import { BoardUserLoggedInEvent } from '../../core/events/board-user-logged-in.event';

export const userNameValidationSchema = Yup.object({
    userName: Yup.string().required().min(5).max(20),
});

export const LoginModal = () => {
    const { loginMutation } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSubmit = (values: { userName: string }) => {
        loginMutation.mutate(values.userName);
    };

    useEffect(() => {
        onOpen();
    }, []);

    useEffect(() => {
        if (loginMutation.isSuccess) {
            onClose();
            applicationBus.dispatch(new BoardUserLoggedInEvent());
        }
    }, [loginMutation.isSuccess]);

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
                                <Button type="submit" colorScheme="blue" mr={'3'} isLoading={loginMutation.isLoading}>
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
