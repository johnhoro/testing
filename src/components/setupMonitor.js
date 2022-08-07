import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Loader, Dimmer } from "semantic-ui-react";
import {
  demoTenants,
  intldemoTenants,
  mygateTestTenants,
  rotaryTenants,
  kiviTenants,
  treeboTenants,
  TENANTS,
  indifiTenants,
  mosaicTestTenants,
} from "../../src/utils/constants";

import { getDataStatuses } from "../services/uploadDataService";
import { dataTypes, sourceTypes } from "../utils/constants";
import { formatDateString } from "../utils/formatingUtil";
import BasicList from "./DataList/basicList";

const SetupMonitorPage = ({ isMygate = false, subDomain }) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [dataStatusList, setDataStatusList] = useState([]);
  const fetchStatuses = () => {
    // Set the loading state
    setIsStatusLoading(true);
    getDataStatuses(
      (data) => {
        setIsStatusLoading(false);
        setDataStatusList(data);
      },
      (error) => {
        setIsStatusLoading(false);
      }
    );
  };

  const headerRow = (
    <Table.Row>
      <Table.HeaderCell
        style={{
          backgroundColor: `${
            demoTenants.includes(TENANTS(subDomain)) ||
            mygateTestTenants.includes(TENANTS(subDomain)) ||
            intldemoTenants.includes(TENANTS(subDomain)) ||
            indifiTenants.includes(TENANTS(subDomain)) ||
            mosaicTestTenants.includes(TENANTS(subDomain)) ||
            rotaryTenants.includes(TENANTS(subDomain)) ||
            treeboTenants.includes(TENANTS(subDomain)) ||
            kiviTenants.includes(TENANTS(subDomain))
              ? `white`
              : ``
          }`,
        }}
        colSpan="6"
      >
        <Button
          floated="right"
          icon="refresh"
          onClick={fetchStatuses}
          loading={isStatusLoading}
        />
      </Table.HeaderCell>
    </Table.Row>
  );
  const columns = [
    {
      key: "sourceId",
      name: "Source",
    },
    {
      key: "type",
      name: "Type",
      template: (row) => sourceTypes(row.type)?.text,
    },
    {
      key: "fileType",
      name: "File Type",
      template: (row) => dataTypes(row.fileType)?.text,
    },
    {
      key: "fileName",
      name: "File Name",
    },
    {
      key: "lastUpdateAt",
      name: "Updated At",
      template: (row, value) => {
        return formatDateString(value);
      },
    },
    {
      key: "status",
      name: "Status",
    },
  ];

  const j_data = [];

  useEffect(() => {
    fetchStatuses();
  }, []);

  return isStatusLoading ? (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  ) : (
    <>
      <BasicList
        data={j_data}
        columns={columns}
        headerRow={headerRow}
        subDomain={subDomain}
      />
    </>
  );
};

export default SetupMonitorPage;
