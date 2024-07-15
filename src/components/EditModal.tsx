import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent: string;
  onUpdate: (newContent: string) => void;
}

// test

interface FormData {
  content: string;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  initialContent,
  onUpdate,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      content: initialContent,
    },
  });

  const onSubmit = handleSubmit(({ content }) => {
    onUpdate(content);
    onClose();
  });

  // Reset form with initial content when modal closes or initialContent changes
  React.useEffect(() => {
    if (!isOpen) {
      reset({ content: initialContent });
    }
  }, [isOpen, initialContent, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={onSubmit}>
        <ModalHeader>Update Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={Boolean(errors.content)}>
            <Textarea
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 20,
                  message: "Content must be at least 20 characters",
                },
                maxLength: {
                  value: 300,
                  message: "Content must be less than 300 characters",
                },
              })}
              placeholder="Edit your note here..."
            />
            <FormErrorMessage>
              {errors.content && errors.content.message}
            </FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            type="submit"
            isLoading={isSubmitting}
          >
            Confirm
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
