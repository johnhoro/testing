import React, { useState } from "react";
import { Menu, Grid } from "semantic-ui-react";
import {
  demoTenants,
  intldemoTenants,
  mygateTestTenants,
  rotaryTenants,
  treeboTenants,
  kiviTenants,
  TENANTS,
  indifiTenants,
} from "../utils/constants";
import SetupMonitorPage from "./setupMonitor";
import SetupSources from "./setupSources";

const SetupPage = ({ isMygate = false, subDomain }) => {
  const [activeMenu, setActiveMenu] = useState("sources");

  return (
    <Grid
      columns={2}
      style={{ height: "100%", minHeight: "400px", padding: "0em" }}
    >
      <Grid.Column width={2} style={{ height: "100%", padding: "0em" }}>
        <Menu
          vertical
          fluid
          style={{
            height: "100%",
            minHeight: "600px",
            backgroundColor:
              demoTenants.includes(TENANTS(subDomain)) ||
              mygateTestTenants.includes(TENANTS(subDomain)) ||
              intldemoTenants.includes(TENANTS(subDomain)) ||
              indifiTenants.includes(TENANTS(subDomain)) ||
              rotaryTenants.includes(TENANTS(subDomain)) ||
              treeboTenants.includes(TENANTS(subDomain)) ||
              kiviTenants.includes(TENANTS(subDomain))
                ? "#f7f8fa"
                : " ",
          }}
          color="violet"
        >
          <Menu.Item
            name="sources"
            active={activeMenu === "sources"}
            onClick={() => setActiveMenu("sources")}
          >
            Manage Sources
          </Menu.Item>
          <Menu.Item
            name="monitor"
            active={activeMenu === "monitor"}
            onClick={() => setActiveMenu("monitor")}
          >
            Monitor Progress
          </Menu.Item>
        </Menu>
      </Grid.Column>
      <Grid.Column width={14} style={{ padding: "0em" }}>
        {activeMenu === "sources" ? (
          <SetupSources isMygate={isMygate} subDomain={subDomain} />
        ) : null}
        {activeMenu === "monitor" ? (
          <SetupMonitorPage isMygate={isMygate} subDomain={subDomain} />
        ) : null}
      </Grid.Column>
    </Grid>
  );
};

export default SetupPage;
