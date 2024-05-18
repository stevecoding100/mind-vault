import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import ideaAPI from "../../../utils/ideaAPI";
import { useState, useEffect } from "react";

export default function CreatingIdeaModal({
    isOpen,
    onOpenChange,
    onCreateIdea,
    handleEdit,
    selectedIdea,
    handleDelete,
}) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (selectedIdea) {
            setTitle(selectedIdea.title);
            setCategory(selectedIdea.category);
            setDescription(selectedIdea.description);
        }
    }, [selectedIdea]);

    const handleCloseModal = () => {
        onOpenChange(false);
        setTitle("");
        setCategory("");
        setDescription("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedIdea) {
                await handleEdit(selectedIdea.idea_id, {
                    title,
                    description,
                    category,
                });
            } else {
                await onCreateIdea(title, description, category);
            }
            handleCloseModal(); // Close the modal and reset state
        } catch (error) {
            setError("All field must be completed!");
        }
    };

    const handleDeleteClick = async () => {
        try {
            if (selectedIdea) {
                await handleDelete(selectedIdea.idea_id);
                handleCloseModal(); // Close the modal after deleting
            }
        } catch (error) {
            setError("Error deleting idea");
        }
    };
    return (
        <>
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
                                {selectedIdea
                                    ? "Editing Idea"
                                    : "Creating Idea"}
                            </ModalHeader>
                            <ModalBody>
                                <label htmlFor="title" className="font-bold">
                                    Idea Title
                                </label>
                                <input
                                    type="text"
                                    className="p-3 my-2 bg-gray-200 rounded"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <label htmlFor="idea" className="font-bold">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    className="p-3 my-2 bg-gray-200 rounded"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                >
                                    <option value="Select">Select</option>
                                    <option value="In Progress">
                                        In Progess
                                    </option>
                                    <option value="Complete">Complete</option>
                                </select>
                                <label
                                    htmlFor="description"
                                    className="font-bold"
                                >
                                    Idea Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    cols="30"
                                    rows="10"
                                    className="bg-slate-200 p-2"
                                    placeholder="Write your idea..."
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    required
                                ></textarea>
                            </ModalBody>
                            <ModalFooter>
                                {selectedIdea && (
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onClick={handleDeleteClick}
                                    >
                                        Delete
                                    </Button>
                                )}

                                <Button color="primary" onClick={handleSubmit}>
                                    {selectedIdea ? "Edit" : "Create"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
