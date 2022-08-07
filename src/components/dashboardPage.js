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
          border: "1px solid #bbbbbb",
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
          border: "1px solid #bbbbbb",
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
          border: "1px solid #bbbbbb",
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

      {mosaicTestTenants.includes(TENANTS(subDomain)) && (
        <>
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
                border: "1px solid #BBBBBB",
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
              {/* <PieChartMosaicTest
                subDomain={subDomain}
                dataID={["mosaicTestOrderDistribution"]}
              /> */}
              <PieChartBetel />
            </Grid.Column>
            <Grid.Column
              style={{
                width: "32.6%",
                border: "1px solid #BBBBBB",
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
                border: "1px solid #BBBBBB",
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
              {/* <PieChart2
                subDomain={subDomain}
                dataID={["mosaicTestBrandDistribution"]}
              /> */}
              <PieChartBetel type="all" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column
              style={{
                border: "1px solid #BBBBBB",
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
              {/* <Bar subDomain={subDomain} dataID="mosaicTestDailyOrderTrend" /> */}
              <BarChartMosaicTest
                subDomain={subDomain}
                dataID="mosaicTestDailyOrderTrend"
              />
            </Grid.Column>
          </Grid.Row>
        </>
      )}

      {mosaicTenants.includes(TENANTS(subDomain)) && (
        <>
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
                border: "1px solid #BBBBBB",
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
                  }}
                >
                  Order Distribution
                </p>
                <CustomizedSwitches />
              </div>
              <PieChart1 />
            </Grid.Column>
            <Grid.Column
              style={{
                width: "32.6%",
                border: "1px solid #BBBBBB",
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
                <p>Product Distribution</p>
              </div>
              <HeatMapWidget dataID={["mosaicProductDistribution"]} />
            </Grid.Column>
            <Grid.Column
              style={{
                width: "32.6%",
                border: "1px solid #BBBBBB",
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
                <p>Brand Distribution</p>
              </div>
              <PieChart2 dataID={["mosaicBrandDistribution"]} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column
              style={{
                border: "1px solid #BBBBBB",
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
                <p>Daily Order Trend</p>
              </div>
              {/* <MosaicBarChart /> */}
              <Bar
                // dataID={[
                //   "mosaicDailyOrderTrendUniware",
                //   "mosaicDailyOrderTrendAmazon",
                // ]}
                dataID="mosaicDailyOrderTrend"
              />
            </Grid.Column>
          </Grid.Row>
        </>
      )}

      {/* {mosaicTestTenants.includes(TENANTS(subDomain)) ? (
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
                    dataId="mosaicTestCountByAllOrders"
                    isMosaicTest={isMosaicTest}
                    subDomain={subDomain}
                    navigateTo="/order"
                  />
                </Grid.Column>
              </div>
              <div className="SubBox2">
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByPaidByUserOrder"
                    isMosaic={isMosaic}
                    format="currency"
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByCommissionAllOrder"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByGovtTaxAllOrders"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByNetPayableAllOrders"
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
                    dataId="mosaicTestCountByUniwareNbdChannel"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                    navigateTo="/order"
                  />
                </Grid.Column>
              </div>
              <div className="SubBox2">
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByPaidByUserUniwareAndChannel"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByCommissionUniwareNbdChannel"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByGovtTaxUniwareAndChannel"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByNetPayableUniwareAndChannel"
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
                    dataId="mosaicTestCountByChannelOnly"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                    navigateTo="/order"
                  />
                </Grid.Column>
              </div>
              <div className="SubBox2">
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByPaidByUserChannelOnly"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByCommissionChannelOnly"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByGovtTaxChannelOnly"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByNetPayableChannelOnly"
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
                    dataId="mosaicTestCountByUniwareOnly"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                    navigateTo="/order"
                  />
                </Grid.Column>
              </div>
              <div className="SubBox2">
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByPaidByUserUniwareOnly"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByCommissionUniwareOnly"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByGovtTaxUniwareOnly"
                    format="currency"
                    isMosaic={isMosaic}
                    subDomain={subDomain}
                  />
                </Grid.Column>
                <Grid.Column>
                  <StatisticsWidget
                    dataId="mosaicTestCountByNetPayableUniwareOnly"
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
      )} */}

      {indifiTenants.includes(TENANTS(subDomain)) ? (
        <>
          <Grid>
            <Grid.Row>
              <Grid.Column
                width={indifiTenants.includes(TENANTS(subDomain)) ? 11 : 10}
              >
                <Grid>
                  <Grid.Row
                    columns={indifiTenants.includes(TENANTS(subDomain)) ? 4 : 2}
                  >
                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countByFoundInCreadit"
                        color="rotary-green"
                        navigateTo="/transaction"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countByFoundInDebit"
                        color="rotary-green"
                        navigateTo="/transaction"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countByReconciled"
                        color="rotary-green"
                        navigateTo="/transaction"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countBySettledWithinTwoDays"
                        color="rotary-red"
                        navigateTo="/transaction"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row
                    columns={indifiTenants.includes(TENANTS(subDomain)) ? 4 : 2}
                  >
                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countByNotFoundInCreadit"
                        color="rotary-red"
                        navigateTo="/transaction"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countByNotFoundInDebit"
                        color="rotary-red"
                        navigateTo="/transaction"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countByNotReconciled"
                        color="rotary-red"
                        navigateTo="/transaction"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countBySettledAfterTwoDays"
                        color="rotary-red"
                        navigateTo="/transaction"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column
                width={indifiTenants.includes(TENANTS(subDomain)) ? 3 : 6}
              >
                <Grid className="revenuindifi">
                  <Grid.Row>
                    <StatisticsWidget
                      horizontal
                      dataId={
                        indifiTenants.includes(TENANTS(subDomain))
                          ? "sumByTotalCreditAmount"
                          : "revenueMetricsBankit"
                      }
                      color="green"
                      format="currency"
                      isMygate={isMygate}
                      subDomain={subDomain}
                      className="indifiRevenue"
                    />
                  </Grid.Row>
                  <Grid.Row>
                    <StatisticsWidget
                      horizontal
                      dataId={
                        indifiTenants.includes(TENANTS(subDomain))
                          ? "sumByTotalDebitAmount"
                          : "revenueMetricsBankit"
                      }
                      color="green"
                      format="currency"
                      subDomain={subDomain}
                      className="indifiRevenue"
                    />
                  </Grid.Row>
                  <Grid.Row>
                    <StatisticsWidget
                      horizontal
                      dataId={
                        indifiTenants.includes(TENANTS(subDomain))
                          ? "sumByTotalNotInDebitAmount"
                          : "revenueMetricsBankit"
                      }
                      color="green"
                      format="currency"
                      isMygate={isMygate}
                      subDomain={subDomain}
                      className="indifiRevenue"
                    />
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      ) : (
        " "
      )}
      {indifiTenants.includes(TENANTS(subDomain)) ? (
        <>
          <Grid.Row
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
            columns={3}
          >
            <Grid.Column
              className="indifiCharts"
              style={{
                width: "32%",
                marginTop: "2rem",
                height: "415px",
              }}
            >
              <PieChartWidget
                title="All Credit Transactions"
                type="all"
                data={["countByFoundInCreadit", "countByNotFoundInCreadit"]}
                reuse={true}
                color={true}
              />
            </Grid.Column>
            <Grid.Column
              className="indifiCharts"
              style={{
                width: "32%",
                marginTop: "2rem",
                height: "415px",
              }}
            >
              <PieChartWidget
                title="Debit Transactions"
                data={["countByFoundInDebit", "countByNotFoundInDebit"]}
                color={true}
              />
            </Grid.Column>
            <Grid.Column
              className="indifiCharts"
              style={{
                width: "32%",
                marginTop: "2rem",
                marginBottom: "1rem",
                height: "415px",
              }}
            >
              <BarChartIndifi
                dataID="indifiSettlementDuration"
                title="Distirbution by Settlement Duration"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column className="indifiCharts">
              <LineChartIndifi
                title="Daily Transactions Trend"
                dataID="IndifiTransactionsByDate"
              />
            </Grid.Column>
          </Grid.Row>
        </>
      ) : (
        ""
      )}
      <Grid>
        <Grid.Row>
          {bankitTenants.includes(TENANTS(subDomain)) ? (
            <Grid.Column width={16}>
              {" "}
              <Grid>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="BankitCountByCapturedStatus"
                      color="green"
                      navigateTo="/reconciliation"
                      isMygate={isMygate}
                      subDomain={subDomain}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="BankitCountByInACStatement"
                      color="green"
                      navigateTo="/reconciliation"
                      isMygate={isMygate}
                      subDomain={subDomain}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="BankitCountByReconciled"
                      color="green"
                      navigateTo="/reconciliation"
                      isMygate={isMygate}
                      subDomain={subDomain}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="BankitCountByNotCapturedStatus"
                      color="red"
                      navigateTo="/reconciliation"
                      isMygate={isMygate}
                      subDomain={subDomain}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="BankitCountByNotInACStatement"
                      color="red"
                      navigateTo="/reconciliation"
                      isMygate={isMygate}
                      subDomain={subDomain}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="BankitCountByNotReconciled"
                      color="red"
                      navigateTo="/reconciliation"
                      isMygate={isMygate}
                      subDomain={subDomain}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          ) : (
            " "
          )}
          {mygateTenants.includes(TENANTS(subDomain)) && (
            <Grid.Column
              width={12}
              // width={mygateTenants.includes(TENANTS(subDomain)) ? 12 : 10}
            >
              <Grid>
                <Grid.Row
                  columns={mygateTenants.includes(TENANTS(subDomain)) ? 4 : 2}
                >
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="countByCapturedStatus"
                      color="green"
                      navigateTo="/reconciliation"
                      isMygate={isMygate}
                      subDomain={subDomain}
                    />
                  </Grid.Column>
                  {mygateTenants.includes(TENANTS(subDomain)) && (
                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countByReceiptStatus"
                        color="green"
                        navigateTo="/reconciliation"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>
                  )}
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="countBySettlementStatus"
                      color="green"
                      navigateTo="/reconciliation"
                      isMygate={isMygate}
                      subDomain={subDomain}
                    />
                  </Grid.Column>
                  {mygateTenants.includes(TENANTS(subDomain)) && (
                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countByPaidoutStatus"
                        color="green"
                        navigateTo="/reconciliation"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>
                  )}
                </Grid.Row>
                <Grid.Row
                  columns={mygateTenants.includes(TENANTS(subDomain)) ? 4 : 2}
                >
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="countByNotCapturedStatus"
                      color="red"
                      navigateTo="/reconciliation"
                      isMygate={isMygate}
                      subDomain={subDomain}
                    />
                  </Grid.Column>
                  {mygateTenants.includes(TENANTS(subDomain)) && (
                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countByNotReceiptStatus"
                        color="red"
                        navigateTo="/reconciliation"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>
                  )}
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="countByNotSettlementStatus"
                      color="red"
                      navigateTo="/reconciliation"
                      isMygate={isMygate}
                      subDomain={subDomain}
                    />
                  </Grid.Column>
                  {mygateTenants.includes(TENANTS(subDomain)) && (
                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countByNotPaidoutStatus"
                        color="red"
                        navigateTo="/reconciliation"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>
                  )}
                </Grid.Row>
              </Grid>
            </Grid.Column>
          )}
          {mygateTenants.includes(TENANTS(subDomain)) && (
            <Grid.Column
              width={4}
              // width={mygateTenants.includes(TENANTS(subDomain)) ? 4 : 6}
            >
              <StatisticsWidget
                horizontal
                dataId={
                  mygateTenants.includes(TENANTS(subDomain))
                    ? "revenueMetricsMygate"
                    : "revenueMetricsBankit"
                }
                color="green"
                format="currency"
                navigateTo="/commission"
                isMygate={isMygate}
                subDomain={subDomain}
              />
            </Grid.Column>
          )}
          {(demoTenants.includes(TENANTS(subDomain)) ||
            mygateTestTenants.includes(TENANTS(subDomain)) ||
            intldemoTenants.includes(TENANTS(subDomain))) && (
            <Grid.Column
              width={
                demoTenants.includes(TENANTS(subDomain)) ||
                mygateTestTenants.includes(TENANTS(subDomain)) ||
                intldemoTenants.includes(TENANTS(subDomain))
                  ? 11
                  : 10
              }
            >
              <Grid className="demo_statistic">
                <Grid.Row
                  columns={
                    demoTenants.includes(TENANTS(subDomain)) ||
                    mygateTestTenants.includes(TENANTS(subDomain)) ||
                    intldemoTenants.includes(TENANTS(subDomain))
                      ? 4
                      : 2
                  }
                >
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="countByCapturedStatus"
                      color="green"
                      navigateTo="/reconciliation"
                      format="currencyEN"
                      isMygate={isMygate}
                      subDomain={subDomain}
                    />
                  </Grid.Column>
                  {(demoTenants.includes(TENANTS(subDomain)) ||
                    mygateTestTenants.includes(TENANTS(subDomain)) ||
                    intldemoTenants.includes(TENANTS(subDomain))) && (
                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countByReceiptStatus"
                        color="green"
                        navigateTo="/reconciliation"
                        format="currencyEN"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>
                  )}
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="countBySettlementStatus"
                      color="green"
                      navigateTo="/reconciliation"
                      isMygate={isMygate}
                      subDomain={subDomain}
                      format="currencyEN"
                    />
                  </Grid.Column>
                  {(demoTenants.includes(TENANTS(subDomain)) ||
                    mygateTestTenants.includes(TENANTS(subDomain)) ||
                    intldemoTenants.includes(TENANTS(subDomain))) && (
                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countByPaidoutStatus"
                        color="green"
                        navigateTo="/reconciliation"
                        format="currencyEN"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>
                  )}
                </Grid.Row>
                <Grid.Row
                  columns={
                    demoTenants.includes(TENANTS(subDomain)) ||
                    mygateTestTenants.includes(TENANTS(subDomain)) ||
                    intldemoTenants.includes(TENANTS(subDomain))
                      ? 4
                      : 2
                  }
                >
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="countByNotCapturedStatus"
                      color="red"
                      format="currencyEN"
                      navigateTo="/reconciliation"
                      isMygate={isMygate}
                      subDomain={subDomain}
                    />
                  </Grid.Column>
                  {(demoTenants.includes(TENANTS(subDomain)) ||
                    mygateTestTenants.includes(TENANTS(subDomain)) ||
                    intldemoTenants.includes(TENANTS(subDomain))) && (
                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countByNotReceiptStatus"
                        color="red"
                        navigateTo="/reconciliation"
                        format="currencyEN"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>
                  )}
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="countByNotSettlementStatus"
                      color="red"
                      navigateTo="/reconciliation"
                      isMygate={isMygate}
                      format="currencyEN"
                      subDomain={subDomain}
                    />
                  </Grid.Column>
                  {(demoTenants.includes(TENANTS(subDomain)) ||
                    mygateTestTenants.includes(TENANTS(subDomain)) ||
                    intldemoTenants.includes(TENANTS(subDomain))) && (
                    <Grid.Column>
                      <StatisticsWidget
                        dataId="countByNotPaidoutStatus"
                        color="red"
                        navigateTo="/reconciliation"
                        format="currencyEN"
                        isMygate={isMygate}
                        subDomain={subDomain}
                      />
                    </Grid.Column>
                  )}
                </Grid.Row>
              </Grid>
            </Grid.Column>
          )}
          {(demoTenants.includes(TENANTS(subDomain)) ||
            mygateTestTenants.includes(TENANTS(subDomain)) ||
            intldemoTenants.includes(TENANTS(subDomain))) && (
            <Grid.Column
              className="demo_revenu"
              width={
                demoTenants.includes(TENANTS(subDomain)) ||
                mygateTestTenants.includes(TENANTS(subDomain)) ||
                intldemoTenants.includes(TENANTS(subDomain))
                  ? 5
                  : 6
              }
            >
              <StatisticsWidget
                horizontal
                dataId={
                  demoTenants.includes(TENANTS(subDomain)) ||
                  mygateTestTenants.includes(TENANTS(subDomain)) ||
                  intldemoTenants.includes(TENANTS(subDomain))
                    ? "revenueMetricsMygate"
                    : "revenueMetricsBankit"
                }
                color="green"
                format="currency"
                navigateTo="/commission"
                isMygate={isMygate}
                subDomain={subDomain}
              />
            </Grid.Column>
          )}
        </Grid.Row>

        {bankitTenants.includes(TENANTS(subDomain)) && (
          <>
            <Grid.Row columns={3}>
              <Grid.Column>
                <PieChartWidget
                  title="All Transactions"
                  data={[
                    "BankitCountByCapturedStatus",
                    "BankitCountByNotCapturedStatus",
                  ]}
                  reuse={true} //use this flag to call queries or reuse existing querie response, implementation pending
                />
              </Grid.Column>
              <Grid.Column>
                <PieChartWidget
                  title="Captured Transactions"
                  data={[
                    "BankitCountByInACStatement",
                    "BankitCountByNotInACStatement",
                  ]}
                />
              </Grid.Column>
              <Grid.Column>
                <PieChartWidget
                  title="In A/C Stament"
                  data={[
                    "BankitCountByReconciled",
                    "BankitCountByNotReconciled",
                  ]}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column>
                <LineChartWidget
                  title="Daily Payment Trend"
                  dataID="BankitTransactionsByDate"
                />
              </Grid.Column>
            </Grid.Row>
          </>
        )}

        {mygateTenants.includes(TENANTS(subDomain)) && (
          <Grid.Row columns={2}>
            <Grid.Column>
              <BarChartWidget
                dataId="commissionByPaymentMethod"
                title="Transaction charges and commission by payment mode"
                xAxisKey="pg_pay_method"
                yAxisKey={[
                  { key: "Charges", color: "#8884d8" },
                  { key: "Commission", color: "#82ca9d" },
                ]}
                format="currency"
                navigateTo="/commission"
              />
            </Grid.Column>
            <Grid.Column>
              <BarChartWidget
                dataId="commissionByPaymentNetwork"
                title="Transaction charges and commission by card network"
                xAxisKey="pg_pay_card_network"
                yAxisKey={[
                  { key: "Charges", color: "#8884d8" },
                  { key: "Commission", color: "#82ca9d" },
                ]}
                format="currency"
                navigateTo="/commission"
              />
            </Grid.Column>
          </Grid.Row>
        )}
        {(demoTenants.includes(TENANTS(subDomain)) ||
          mygateTestTenants.includes(TENANTS(subDomain)) ||
          intldemoTenants.includes(TENANTS(subDomain))) && (
          <Grid.Row className="demo_Graph" columns={2}>
            <Grid.Column>
              <BarChartWidget
                dataId="commissionByPaymentMethod"
                title="Transaction charges and commission by payment mode"
                xAxisKey="pg_pay_method"
                yAxisKey={[
                  { key: "Charges", color: "#6A4C93" },
                  { key: "Commission", color: "#8AC926" },
                ]}
                format="currency"
                navigateTo="/commission"
              />
            </Grid.Column>
            <Grid.Column>
              <BarChartWidget
                dataId="commissionByPaymentNetwork"
                title="Transaction charges and commission by card network"
                xAxisKey="pg_pay_card_network"
                yAxisKey={[
                  { key: "Charges", color: "#6A4C93" },
                  { key: "Commission", color: "#8AC926" },
                ]}
                format="currency"
                navigateTo="/commission"
              />
            </Grid.Column>
          </Grid.Row>
        )}
        {mygateTenants.includes(TENANTS(subDomain)) && (
          <Grid.Row columns={2}>
            <Grid.Column>
              <NodalDataWidget subDomain={subDomain} />
            </Grid.Column>
          </Grid.Row>
        )}
        {(demoTenants.includes(TENANTS(subDomain)) ||
          mygateTestTenants.includes(TENANTS(subDomain)) ||
          intldemoTenants.includes(TENANTS(subDomain))) && (
          <Grid.Row columns={2}>
            <Grid.Column>
              <NodalDataWidget subDomain={subDomain} />
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>

      {treeboTenants.includes(TENANTS(subDomain)) ? (
        <Grid>
          <Grid.Row>
            <Grid.Column width={11}>
              <Grid>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="TreeboTransactionsByRazorpay"
                      isMosaic={isMosaic}
                      color="rotary-green"
                      subDomain={subDomain}
                      navigateTo="/reconciliation"
                      className="rotaryStatistics"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="TreeboInRazorPayData"
                      color="rotary-green"
                      isMosaic={isMosaic}
                      subDomain={subDomain}
                      navigateTo="/reconciliation"
                      className="rotaryStatistics"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="TreeboReconciled"
                      color="rotary-green"
                      isMosaic={isMosaic}
                      subDomain={subDomain}
                      navigateTo="/reconciliation"
                      className="rotaryStatistics"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="TreeboTransactionsByOther"
                      isMosaic={isMosaic}
                      subDomain={subDomain}
                      color="rotary-red"
                      navigateTo="/reconciliation"
                      className="rotaryStatistics"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="TreeboNotInRazorPayData"
                      isMosaic={isMosaic}
                      color="rotary-red"
                      subDomain={subDomain}
                      navigateTo="/reconciliation"
                      className="rotaryStatistics"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <StatisticsWidget
                      dataId="TreeboNotReconciled"
                      isMosaic={isMosaic}
                      color="rotary-red"
                      subDomain={subDomain}
                      navigateTo="/reconciliation"
                      className="rotaryStatistics"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={5}>
              <StatisticsWidget
                dataId="TreeboReconSummary"
                color="rotary-green"
                subDomain={subDomain}
                horizontal
                format="currency"
                style={{ height: "100%" }}
                className="rotaryRevenue"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        " "
      )}
      {treeboTenants.includes(TENANTS(subDomain)) ? (
        <>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column>
                <PieChartWidget
                  title="All Transactions"
                  type="all"
                  data={[
                    "TreeboTransactionsByRazorpay",
                    "TreeboTransactionsByOther",
                  ]}
                  reuse={true}
                  className={"rotaryChart"}
                  color={true}
                />
              </Grid.Column>
              <Grid.Column>
                <PieChartWidget
                  title="Razorpay Transactions"
                  data={["TreeboInRazorPayData", "TreeboNotInRazorPayData"]}
                  className={"rotaryChart"}
                  color={true}
                />
              </Grid.Column>
              <Grid.Column>
                <PieChartWidget
                  title="Transactions in Razorpay date"
                  data={["TreeboReconciled", "TreeboNotReconciled"]}
                  className={"rotaryChart"}
                  color={true}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column>
                <LineChartTreebo
                  title="Daily Transactions Trend"
                  dataID="TreeboTransactionsByDate"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      ) : (
        ""
      )}

      {eatfitTenants.includes(TENANTS(subDomain)) ? (
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
                    dataId="EatfitCountByAllOrders"
                    subDomain={subDomain}
                    navigateTo="/order"
                  />
                </Grid.Column>
              </div>
            </div>
          </Grid.Row>
        </Grid>
      ) : (
        " "
      )}

      {rotaryTenants.includes(TENANTS(subDomain)) ? (
        <Grid>
          <Grid.Row>
            <Grid.Column width={11}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <StatisticsWidget
                      dataId="RotaryCapturedPayments"
                      isMosaic={isMosaic}
                      color="rotary-green"
                      subDomain={subDomain}
                      navigateTo="/reconciliation"
                      className="rotaryStatistics"
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <StatisticsWidget
                      dataId="RotarySettledPayments"
                      color="rotary-green"
                      isMosaic={isMosaic}
                      subDomain={subDomain}
                      navigateTo="/reconciliation"
                      className="rotaryStatistics"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <StatisticsWidget
                      dataId="RotaryFailedPayments"
                      isMosaic={isMosaic}
                      subDomain={subDomain}
                      color="rotary-red"
                      navigateTo="/reconciliation"
                      className="rotaryStatistics"
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <StatisticsWidget
                      dataId="RotaryNotSettledPayments"
                      isMosaic={isMosaic}
                      color="rotary-red"
                      subDomain={subDomain}
                      navigateTo="/reconciliation"
                      className="rotaryStatistics"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={5}>
              <StatisticsWidget
                dataId="RotaryReconSummary"
                color="rotary-green"
                subDomain={subDomain}
                horizontal={true}
                format="currency"
                style={{
                  height: "100%",
                }}
                className="rotaryRevenue"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        " "
      )}

      {rotaryTenants.includes(TENANTS(subDomain)) ? (
        <>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column>
                <PieChartWidget
                  title="All Payments"
                  type="all"
                  data={["RotaryCapturedPayments", "RotaryFailedPayments"]}
                  reuse={true}
                  className={"rotaryChart"}
                  color={true}
                />
              </Grid.Column>
              <Grid.Column>
                <PieChartWidget
                  title="Settled Payments"
                  data={["RotarySettledPayments", "RotaryNotSettledPayments"]}
                  className={"rotaryChart"}
                  color={true}
                />
              </Grid.Column>
              <Grid.Column>
                <BarChartRotary
                  dataID="RotaryGroupBySettlementPeriod"
                  title="Distirbution by Settlement Period"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid>
            <Grid.Row columns={1} style={{ paddingTop: "1rem" }}>
              <Grid.Column>
                <LineChartRotary
                  title="Daily Transactions Trend"
                  dataID="RotaryTransactionsByDate"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      ) : (
        ""
      )}

      {kiviTenants.includes(TENANTS(subDomain)) ? (
        <Grid>
          <Grid.Row>
            <Grid.Column width={11}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <StatisticsWidget
                      dataId="RotaryCapturedPayments"
                      isMosaic={isMosaic}
                      color="rotary-green"
                      subDomain={subDomain}
                      navigateTo="/reconciliation"
                      className="rotaryStatistics"
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <StatisticsWidget
                      dataId="RotarySettledPayments"
                      color="rotary-green"
                      isMosaic={isMosaic}
                      subDomain={subDomain}
                      navigateTo="/reconciliation"
                      className="rotaryStatistics"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <StatisticsWidget
                      dataId="RotaryFailedPayments"
                      isMosaic={isMosaic}
                      subDomain={subDomain}
                      color="rotary-red"
                      navigateTo="/reconciliation"
                      className="rotaryStatistics"
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <StatisticsWidget
                      dataId="RotaryNotSettledPayments"
                      isMosaic={isMosaic}
                      color="rotary-red"
                      subDomain={subDomain}
                      navigateTo="/reconciliation"
                      className="rotaryStatistics"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={5}>
              <StatisticsWidget
                dataId="RotaryReconSummary"
                color="rotary-green"
                subDomain={subDomain}
                horizontal={true}
                format="currency"
                style={{
                  height: "100%",
                }}
                className="rotaryRevenue"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        " "
      )}

      {kiviTenants.includes(TENANTS(subDomain)) ? (
        <>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column>
                <PieChartWidget
                  title="All Payments"
                  type="all"
                  data={["RotaryCapturedPayments", "RotaryFailedPayments"]}
                  reuse={true}
                  className={"rotaryChart"}
                  color={true}
                />
              </Grid.Column>
              <Grid.Column>
                <PieChartWidget
                  title="Settled Payments"
                  data={["RotarySettledPayments", "RotaryNotSettledPayments"]}
                  className={"rotaryChart"}
                  color={true}
                />
              </Grid.Column>
              <Grid.Column>
                <BarChartRotary
                  dataID="RotaryGroupBySettlementPeriod"
                  title="Distirbution by Settlement Period"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid>
            <Grid.Row columns={1} style={{ paddingTop: "1rem" }}>
              <Grid.Column>
                <LineChartRotary
                  title="Daily Transactions Trend"
                  dataID="RotaryTransactionsByDate"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default DashboardPage;
