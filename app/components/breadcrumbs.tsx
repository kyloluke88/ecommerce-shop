import { Breadcrumb, Box } from "@chakra-ui/react"
import { LiaSlashSolid } from "react-icons/lia"


const Breadcrumbs = () => {
  return (
        <Box p={{ base: 4, md: 8 }} maxW="7xl" mx="auto">
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <LiaSlashSolid />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <LiaSlashSolid />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
    </Box>
  )
}

export default Breadcrumbs