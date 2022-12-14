import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Container,
  Loader,
  Dimmer,
  Label,
  Icon,
  Dropdown,
  Image,
  Table,
  Button,
} from "semantic-ui-react";
import { addDataSource, getDataSources } from "../services/connectorService";
import {
  connectionTypes,
  sourceTypes,
  demoTenants,
  rotaryTenants,
  treeboTenants,
  kiviTenants,
  TENANTS,
  intldemoTenants,
  mygateTestTenants,
  indifiTenants,
  mosaicTestTenants,
} from "../utils/constants";
import { formatDateString } from "../utils/formatingUtil";
import ConnectorAction from "./Connectors/connectorAction";
import BasicList from "./DataList/basicList";
import SignedFileUploadForType from "./FileUpload/signedFileUploadForType";
import { triggerRecon } from "../services/queryDataService";

const SetupSources = ({ isMygate = false, subDomain = subDomain }) => {
  //const [connectors, setConnectors] = useState(getConnectorsAsArray());
  const dispatch = useDispatch();
  //const connectors = useSelector(state => state.connectors.response);
  const [selectedSourceOption, setSelectedSourceOption] = useState(
    sourceTypes()[0]?.key || "razorpay_gateway"
  );
  const [selectedConnector, setSelectedConnector] = useState({
    id: "",
    name: "",
    dataTypes: [],
    description: "",
    type: selectedSourceOption,
    connectionType: "file_upload",
    config: {},
  });
  const [connectorDetailVisible, setConnectorDetailVisible] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [dataSourcesList, setDataSourcesList] = useState([]);
  const [isReconciling, setIsReconciling] = useState(false);

  // useEffect(() => {
  //   dispatch(getConnectorsAction());

  // }, [connectors])

  const onAddSource = () => {
    setSelectedConnector({
      id: "",
      name: "",
      dataTypes: [],
      description: "",
      type: selectedSourceOption,
      connectionType: "file_upload",
      config: {},
    });
    setConnectorDetailVisible(true);
  };

  const onEditSource = (connector) => {
    setSelectedConnector(connector);
    setConnectorDetailVisible(true);
  };

  const onSelectedSourceChanged = (value, data) => {
    setConnectorDetailVisible(false);
    setSelectedSourceOption(data.value);
  };

  const onSourceSave = (connector) => {
    console.log(connector);
    setIsStatusLoading(true);
    addDataSource(
      connector,
      (data) => {
        setIsStatusLoading(false);
        setConnectorDetailVisible(false);
        fetchSources();
      },
      (error) => {
        setIsStatusLoading(false);
        setConnectorDetailVisible(false);
      }
    );
  };
  const onSourceCancel = () => {
    setConnectorDetailVisible(false);
  };
  const onReconcileClicked = () => {
    try {
      setIsReconciling(true);
      triggerRecon(
        (response) => {
          setIsReconciling(false);
        },
        (error) => {
          setIsReconciling(false);
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchSources = () => {
    // Set the loading state
    setIsStatusLoading(true);
    getDataSources(
      (data) => {
        setIsStatusLoading(false);
        setDataSourcesList(data);
      },
      (error) => {
        setIsStatusLoading(false);
      }
    );
  };
  useEffect(() => {
    fetchSources();
  }, []);

  let source_option = [
    {
      key: "eatfit_metabase",
      text: "POS",
      value: "eatfit_metabase",
    },
    {
      key: "eatfit_swiggy",
      text: "Swiggy",
      value: "eatfit_swiggy",
    },
    {
      key: "eatfit_zomato",
      text: "Zomato",
      value: "eatfit_zomato",
    },
  ];

  const headerRow = (
    <Table.Row>
      <Table.HeaderCell
        colSpan="9"
        style={{
          backgroundColor: "white",
          padding: "0",
          paddingBottom: "1em",
        }}
      >
        <Button
          primary
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#6A4C93",
            paddingRight: "1.5em",
            paddingLeft: "0.5em",
            paddingTop: "0",
            paddingBottom: "0",
          }}
          onClick={onReconcileClicked}
          loading={isReconciling}
        >
          <Image
            src="images/Union.png"
            size="mini"
            style={{ width: "16px", height: "16px", margin: "7px" }}
          />
          Reconcile
        </Button>
        <Button
          as="div"
          className="Config_chevron"
          labelPosition="left"
          floated="right"
        >
          <Label
            style={{
              padding: "0",
            }}
            basic
          >
            <Dropdown
              icon="chevron down"
              value={selectedSourceOption}
              options={sourceTypes()}
              onChange={onSelectedSourceChanged}
            />
          </Label>

          <Button
            style={{
              display: "flex",
              alignItems: "center",
              paddingRight: "1.5em",
              paddingLeft: "0.5em",
              backgroundColor: "#F7F8FA",
              border: "1px solid #CCCFD9",
              marginLeft: "1em",
              paddingBottom: "0",
              paddingTop: "0",
            }}
            icon
            onClick={onAddSource}
          >
            {/* <Icon name="plus" /> */}
            <Image
              src="images/plus.png"
              size="mini"
              style={{ width: "16px", height: "16px", margin: "7px" }}
            />
            Add New Source
          </Button>
        </Button>
      </Table.HeaderCell>
    </Table.Row>
  );

  const defaultColumn = [
    {
      key: "type",
      name: "Name",
      style: { textAlign: "right", borderLeft: "1px solid red" },
      template: (row) => sourceTypes(row.type)?.text,
    },
    {
      key: "connectionType",
      name: "Connection Type",
      template: (row) => {
        return connectionTypes.find((type) => row.connectionType === type.key)
          .text;
      },
    },
    {
      key: "actions",
      name: "Actions",
      style: { width: "70px", border: "1px solid black" },
      template: (row) => {
        return (
          <>
            {row.connectionType === "file_upload" ? (
              <SignedFileUploadForType
                subDomain={subDomain}
                sourceId={row.id}
                dataTypes={row.dataTypes}
              />
            ) : (
              ""
            )}
            {row.connectionType !== "file_upload" ? <Button icon="sync" /> : ""}
          </>
        );
      },
    },
  ];

  const columns = defaultColumn;

  const j_data = [];
  return isStatusLoading ? (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  ) : (
    <>
      {connectorDetailVisible ? (
        <ConnectorAction
          connector={selectedConnector}
          onSave={onSourceSave}
          onCancel={onSourceCancel}
        />
      ) : (
        ""
      )}
      <BasicList
        data={j_data}
        columns={columns}
        subDomain={subDomain}
        headerRow={headerRow}
      />
    </>
  );
};

export default SetupSources;
