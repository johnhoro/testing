import {
  mygateTenants,
  TENANTS,
  TENANT_IDs,
  eatFitData,
} from "../utils/constants";
import {
  Button,
  Divider,
  Dropdown,
  Form,
  Grid,
  Icon,
  Input,
  Label,
  Menu,
  Modal,
  Image,
} from "semantic-ui-react";

function OrdersBetel() {
  let order = eatFitData[1].orders;
  console.log(order, "order");
  return (
    <>
      <section>
        <div className="order">
          <div className="flex justify-bw export align-center"></div>
          <table
            id="table"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead style={{ backgroundColor: "#C4C4C4" }}>
              <tr>
                <td>Order ID</td>
                <td>Order Status</td>
                <td>Date</td>
                <td>Channel</td>
                <td>Customer Payable</td>
                <td>Commission</td>
                <td>Charges</td>
                <td>Taxes</td>
                <td>Net-Receivable</td>
                <td>Reconcile Status</td>
              </tr>
            </thead>
            <tbody>
              {order.map((elm, i) => (
                <tr key={i}>
                  <td className="order-id">{elm.id} </td>
                  <td>{elm.orderStatus}</td>
                  <td>{elm.date}</td>
                  <td>{elm.channel}</td>
                  <td>{elm.payable}</td>
                  <td> {elm.commission}</td>
                  <td> {elm.charges}</td>
                  <td> {elm.taxes}</td>
                  <td> {elm.netReceivable}</td>
                  <td
                    style={{
                      paddingLeft: "4rem",
                    }}
                  >
                    <img width="15px" src={elm.image} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default OrdersBetel;
