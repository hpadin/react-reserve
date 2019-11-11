import { Icon, Segment, Divider, Button } from 'semantic-ui-react'

function CartSummary() {
  return <>
    <Divider />
    <Segment clearing size="large">
      <strong>Sub total: </strong> $0.00
      <Button
        icon="cart"
        color="teal"
        floated="right"
        content="Checkout">
      </Button>
    </Segment>
  </>;
}

export default CartSummary;
