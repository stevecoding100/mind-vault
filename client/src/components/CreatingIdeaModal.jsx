import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";

export default function CreatingIdeaModal() {
    const { isOpen, onOpenChange } = useDisclosure();

    return (
        <>
            {/* <Button onPress={onOpen}>Open Modal</Button> */}
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop:
                        "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Modal Title
                            </ModalHeader>
                            <ModalBody>
                                <label htmlFor="title">Idea Title</label>
                                <input type="text" />
                                <label htmlFor="idea">Category</label>
                                <select name="category" id="category">
                                    <option value="In Progress">
                                        In Progess
                                    </option>
                                    <option value="In Progress">
                                        Complete
                                    </option>
                                </select>
                                <label htmlFor="description">
                                    Idea Description
                                </label>
                                <input type="text" />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
