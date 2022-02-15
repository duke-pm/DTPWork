import React, {useState} from "react";
import {DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem} from "reactstrap";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import SalesStatistics from "../../../components/partials/default/SalesStatistics";
import OrderStatistics from "../../../components/partials/default/OrderStatistics";
import StoreStatistics from "../../../components/partials/default/StoreStatistics";
import RecentOrders from "../../../components/partials/default/recent-orders/RecentOrders";
import TopProducts from "../../../components/partials/default/top-products/TopProducts";
import DataCard from "../../../components/partials/default/DataCard";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  BlockBetween,
} from "../../../components/Component";
import {
  DefaultCustomerChart,
  DefaultOrderChart,
  DefaultRevenueChart,
  DefaultVisitorChart,
} from "../../../components/partials/charts/default/DefaultCharts";

const Homepage = () => {
  const [sm, updateSm] = useState(false);
  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Homepage
              </BlockTitle>
            </BlockHeadContent>
            
          </BlockBetween>
        </BlockHead>
        <Block>
          
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default Homepage;
