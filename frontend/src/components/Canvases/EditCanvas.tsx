import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import {
  type ApiError,
  type CanvasPublic,
  type CanvasUpdate,
  CanvasesService,
} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils/utils"

interface EditCanvasProps {
  canvas: CanvasPublic
  isOpen: boolean
  onClose: () => void
}

const EditCanvas = ({ canvas: canvas, isOpen, onClose }: EditCanvasProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<CanvasUpdate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: canvas,
  })

  const mutation = useMutation({
    mutationFn: (data: CanvasUpdate) =>
      CanvasesService.updateCanvas({ id: canvas.id, requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Canvas updated successfully.", "success")
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["canvases"] })
    },
  })

  const onSubmit: SubmitHandler<CanvasUpdate> = async (data) => {
    mutation.mutate(data)
  }

  const onCancel = () => {
    reset()
    onClose()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "md" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors.problem_name}>
              <FormLabel htmlFor="prolem_name">Problem Name</FormLabel>
              <Input
                id="problem_name"
                {...register("problem_name", {
                  required: "Problem Name is required",
                })}
                type="text"
              />
              {errors.problem_name && (
                <FormErrorMessage>{errors.problem_name.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="problem_url">Problem URL</FormLabel>
              <Input
                id="problem_url"
                {...register("problem_url")}
                placeholder="Problem URL"
                type="text"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isDirty}
            >
              Save
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditCanvas
