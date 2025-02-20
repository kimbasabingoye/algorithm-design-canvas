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

import { type ApiError, type CanvasCreate, CanvasesService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

interface AddCanvasProps {
  isOpen: boolean
  onClose: () => void
}

const AddCanvas = ({ isOpen, onClose }: AddCanvasProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CanvasCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      problem_name: "",
      problem_url: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: CanvasCreate) =>
      CanvasesService.createCanvas({ requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Canvas created successfully.", "success")
      reset()
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["canvases"] })
    },
  })

  const onSubmit: SubmitHandler<CanvasCreate> = (data) => {
    mutation.mutate(data)
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
          <ModalHeader>Add Canvas</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!!errors.problem_name}>
              <FormLabel htmlFor="Problem Name">Problem Name</FormLabel>
              <Input
                id="problem_name"
                {...register("problem_name", {
                  required: "Problem Name is required.",
                })}
                placeholder="Problem Name"
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
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddCanvas