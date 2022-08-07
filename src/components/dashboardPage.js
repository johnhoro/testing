import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Statistic, Grid, Segment } from "semantic-ui-react";
import BarChartWidget from "./Widgets/barChartWidget";
import StatisticsWidget, {
  BankitStatisticsWidget,
} from "./Widgets/statisticsWidget";
import PieChartWidget from "./Widgets/pieChartWidget";
import SingleBarChartWidget from "./Widgets/singleBarChartWidget";
import LineChartWidget from "./Widgets/lineChartWidget";
import LineChartIndifi from "./Widgets/lineChartindifi";
import LineChartTreebo from "./Widgets/lineChartTreebo";
import LineChartRotary from "./Widgets/lineChartRotary";
import HeatMapWidget from "./Widgets/HeatMapWidget";
import PieChart from "./Widgets/pieChartWidget";
import Bar from "./Widgets/barChart";
import PieChart1 from "./Widgets/pieChartWidget1";
import PieChart2 from "./Widgets/pieChartWidget2";
import CustomizedSwitches from "./Widgets/toggleSwitch";
import PieChartMosaicTest from "./Widgets/PieChartMosaicTest";
import MosaicBarChart from "./Widgets/mosaicBarChart";
import BarChartIndifi from "./Widgets/BarChartindifi";
import BarChartMosaicTest from "./Widgets/BarChartMosaicTest";
import BarChartRotary from "./Widgets/barChartRotary";
import {
  bankitTenants,
  mygateTenants,
  mosaicTenants,
  indifiTenants,
  treeboTenants,
  kiviTenants,
  demoTenants,
  TENANTS,
  TENANT_IDs,
  eatfitTenants,
  rotaryTenants,
  intldemoTenants,
  mosaicTestTenants,
  mygateTestTenants,
  eatFitData,
} from "../utils/constants";
import NodalDataWidget from "./Widgets/nodalDataWidget";
import PieChartBetel from "./Widgets/barchartBetel";

let allData = eatFitData;

const DashboardPage = ({
  isMygate,
  isBankit,
  isMosaic,
  isTreebo,
  isMosaicTest,
  subDomain,
}) => {
  return (
    <>
      {mosaicTenants.includes(TENANTS(subDomain)) ? (
        <Grid>
          <Grid.Row
            columns={5}
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "0",
            }}
          >
            <div className="cardBox">
              <div className="SubBox1">
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByAllOrders"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                    navigateTo="/order"
                  />
                </Grid.Column>
              </div>
              <div className="SubBox2">
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByPaidByUserOrder"
                    isMosaic={isMosaic}
                    format="currency"
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByCommissionAllOrder"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByGovtTaxAllOrders"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByNetPayableAllOrders"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
              </div>
            </div>
          </Grid.Row>
          <Grid.Row
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "0",
            }}
            columns={5}
          >
            <div className="cardBox">
              <div className="SubBox1">
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByUniwareNbdChannel"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                    navigateTo="/order"
                  />
                </Grid.Column>
              </div>
              <div className="SubBox2">
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByPaidByUserUniwareAndChannel"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByCommissionUniwareNbdChannel"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByGovtTaxUniwareAndChannel"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByNetPayableUniwareAndChannel"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
              </div>
            </div>
          </Grid.Row>
          <Grid.Row
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "0",
            }}
            columns={5}
          >
            <div className="cardBox">
              <div className="SubBox1">
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByChannelOnly"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                    navigateTo="/order"
                  />
                </Grid.Column>
              </div>
              <div className="SubBox2">
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByPaidByUserChannelOnly"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByCommissionChannelOnly"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByGovtTaxChannelOnly"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByNetPayableChannelOnly"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
              </div>
            </div>
          </Grid.Row>
          <Grid.Row
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "0",
            }}
            columns={5}
          >
            <div className="cardBox">
              <div className="SubBox1">
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByUniwareOnly"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                    navigateTo="/order"
                  />
                </Grid.Column>
              </div>
              <div className="SubBox2">
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByPaidByUserUniwareOnly"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByCommissionUniwareOnly"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByGovtTaxUniwareOnly"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="countByNetPayableUniwareOnly"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
              </div>
            </div>
          </Grid.Row>
        </Grid>
      ) : (
        " "
      )}

      <div
        style={{
          display: "flex",
          // justifyContent: "space-between",
          border: "1px solid rgb(221,221,221)",
          padding: "1em",
          marginBottom: "1rem",
        }}
      >
        <div className="order">
          <h1>2,68,910</h1>
          <p>ALL ORDERS</p>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            // justifyContent: "space-between",
            justifyContent: "space-evenly",
          }}
        >
          <div className="sub_order">
            <h1>₹ 7,83,00,241.00</h1>
            <p>Paid by Users</p>
          </div>
          <div className="sub_order">
            <h1>₹ 1,18,07,879.00</h1>
            <p>Commission</p>
          </div>
          <div className="sub_order">
            <h1>₹ 35,92,440.00</h1>
            <p>Govt. Tax</p>
          </div>
          <div className="sub_order">
            <h1>₹ 6,28,95,954.00</h1>
            <p>Net Payable</p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          // justifyContent: "space-between",
          // border: "1px solid #bbbbbb",
          border: "1px solid rgb(221,221,221)",
          padding: "1em",
          marginBottom: "1rem",
        }}
      >
        <div className="order">
          <h1>2,04,441</h1>
          <p>ORDERS IN POS & CHANNEL</p>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            // justifyContent: "space-between",
            justifyContent: "space-evenly",
          }}
        >
          <div className="sub_order">
            <h1>₹ 7,79,10,688.00</h1>
            <p>Paid by Users</p>
          </div>
          <div className="sub_order">
            <h1>₹ 1,17,49,134.00</h1>
            <p>Commission</p>
          </div>
          <div className="sub_order">
            <h1>₹ 35,74,567.00</h1>
            <p>Govt. Tax</p>
          </div>
          <div className="sub_order">
            <h1>₹ 6,25,86,987.00</h1>
            <p>Net Payable</p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          // justifyContent: "space-between",
          // border: "1px solid #bbbbbb",
          border: "1px solid rgb(221,221,221)",
          padding: "1em",
          marginBottom: "1rem",
        }}
      >
        <div className="order">
          <h1>38,709</h1>
          <p>ORDERS IN CHANNEL ONLY</p>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            // justifyContent: "space-between",
            justifyContent: "space-evenly",
          }}
        >
          <div className="sub_order">
            <h1>₹ 2,87,490.00</h1>
            <p>Paid by Users</p>
          </div>
          <div className="sub_order">
            <h1>₹ 43,354.00</h1>
            <p>Commission</p>
          </div>
          <div className="sub_order">
            <h1>₹ 13,190.00</h1>
            <p>Govt. Tax</p>
          </div>
          <div className="sub_order">
            <h1>₹ 2,31,404.00</h1>
            <p>Net Payable</p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          // justifyContent: "space-between",
          // border: "1px solid #bbbbbb",
          border: "1px solid rgb(221,221,221)",
          padding: "1em",
          marginBottom: "1rem",
        }}
        className=" dashboard flex justify-bw align-center"
      >
        <div className="order">
          <h1>25,760</h1>
          <p>ORDERS IN POS ONLY</p>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            // justifyContent: "space-between",
            justifyContent: "space-evenly",
            // justifyContent: "flex-start",
          }}
        >
          <div className="sub_order">
            <h1>₹ 96,531.00</h1>
            <p>Paid by Users</p>
          </div>
          <div className="sub_order">
            <h1>₹ 14,557.00</h1>
            <p>Commission</p>
          </div>
          <div className="sub_order">
            <h1>₹ 4,428.00</h1>
            <p>Govt. Tax</p>
          </div>
          <div className="sub_order">
            <h1>₹ 77,563.00</h1>
            <p>Net Payable</p>
          </div>
        </div>
      </div>

      <Grid.Row
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
        columns={3}
      >
        <Grid.Column
          style={{
            width: "32.6%",
            border: "1px solid rgb(221,221,221)",
            // marginTop: "1rem",
            padding: "1em",
            height: "415px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                marginBottom: "0",
                fontWeight: 700,
              }}
            >
              Order Distribution
            </p>
            <CustomizedSwitches />
          </div>
          <PieChartBetel />
        </Grid.Column>
        <Grid.Column
          style={{
            width: "32.6%",
            // border: "1px solid #BBBBBB",
            border: "1px solid rgb(221,221,221)",
            // marginTop: "1rem",
            padding: "1em",
            height: "415px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p style={{ fontWeight: 700 }}>Product Distribution</p>
          </div>
          <HeatMapWidget
            subDomain={subDomain}
            dataID={["mosaicTestProductDistribution"]}
          />
        </Grid.Column>
        <Grid.Column
          style={{
            width: "32.6%",
            // border: "1px solid #BBBBBB",
            border: "1px solid rgb(221,221,221)",
            // marginTop: "1rem",
            padding: "1em",
            paddingBottom: "2em",
            height: "415px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p style={{ fontWeight: 700 }}>Brand Distribution</p>
          </div>
          <PieChartBetel type="all" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column
          style={{
            // border: "1px solid #BBBBBB",
            border: "1px solid rgb(221,221,221)",
            marginTop: "1rem",
            padding: "1em",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <p style={{ fontWeight: 700 }}>Daily Order Trend</p>
          </div>
          <BarChartMosaicTest
            subDomain={subDomain}
            dataID="mosaicTestDailyOrderTrend"
          />
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default DashboardPage;
