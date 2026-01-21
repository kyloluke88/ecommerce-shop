import {
  Button,
  CloseButton,
  Drawer,
  Kbd,
  Portal,
  Text,
} from "@chakra-ui/react"


const CartDrawer = ({open, setOpen}) => {
  return (
    <>
      <Drawer.Root placement={{ mdDown: "bottom", md: "end" }} open={open} onOpenChange={() => setOpen(!open)}>
        {/* <Drawer.Trigger asChild>
          <Button variant="outline" size="sm">
            Open Drawer
          </Button>
        </Drawer.Trigger> */}
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Drawer Title</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                Press the <Kbd>esc</Kbd> key to close the drawer.
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Drawer.ActionTrigger>
                <Button>Save</Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  )
}

export default CartDrawer