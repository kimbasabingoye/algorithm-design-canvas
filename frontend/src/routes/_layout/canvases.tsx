import {
  Button,
  Container,
  Flex,
  Heading,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { z } from "zod"

import { CanvasesService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import AddCanvas from "../../components/Canvases/AddCanvas"

const canvasesSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout/canvases")({
  component: Canvases,
  validateSearch: (search) => canvasesSearchSchema.parse(search),
})

const PER_PAGE = 5

function getCanvasesQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      CanvasesService.readCanvases({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["canvases", { page }],
  }
}

function CanvasesTable() {
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, page }) })

  const {
    data: canvases,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getCanvasesQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage = !isPlaceholderData && canvases?.data.length === PER_PAGE
  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getCanvasesQueryOptions({ page: page + 1 }))
    }
  }, [page, queryClient, hasNextPage])

  return (
    <>
      <TableContainer>
        <Table size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Problem Name</Th>
              <Th>Problem URL</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          {isPending ? (
            <Tbody>
              <Tr>
                {new Array(4).fill(null).map((_, index) => (
                  <Td key={index}>
                    <SkeletonText noOfLines={1} paddingBlock="16px" />
                  </Td>
                ))}
              </Tr>
            </Tbody>
          ) : (
            <Tbody>
              {canvases?.data.map((canvas) => (
                <Tr key={canvas.id} opacity={isPlaceholderData ? 0.5 : 1}>
                  <Td>{canvas.id}</Td>
                  <Td isTruncated maxWidth="150px">
                    {canvas.problem_name}
                  </Td>
                  <Td
                    color={!canvas.problem_url ? "ui.dim" : "inherit"}
                    isTruncated
                    maxWidth="150px"
                  >
                    {canvas.problem_url || "N/A"}
                  </Td>
                  <Td>
                    <ActionsMenu type={"Canvas"} value={canvas} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
      <Flex
        gap={4}
        alignItems="center"
        mt={4}
        direction="row"
        justifyContent="flex-end"
      >
        <Button onClick={() => setPage(page - 1)} isDisabled={!hasPreviousPage}>
          Previous
        </Button>
        <span>Page {page}</span>
        <Button isDisabled={!hasNextPage} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </Flex>
    </>
  )
}

function Canvases() {
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
        Canvases Management
      </Heading>

      <Navbar type={"Canvas"} addModalAs={AddCanvas} />
      <CanvasesTable />
    </Container>
  )
}
