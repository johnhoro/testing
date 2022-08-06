import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//import axios from "axios";
import { Button, Icon, Input, Dropdown, Image, Label } from "semantic-ui-react";
import {
  getSignedUploadUrl,
  uploadFile,
} from "../../services/uploadDataService";
import {
  dataTypes,
  demoTenants,
  indifiTenants,
  intldemoTenants,
  mygateTestTenants,
  TENANTS,
} from "../../utils/constants";

const chunkSize = 1048576 * 3; //its 3MB, increase the number measure in mb
const SignedFileUploadForType = (props) => {
  const [showProgress, setShowProgress] = useState(false);
  const [counter, setCounter] = useState(1);
  const [fileTypeOption, setFileTypeOption] = useState(props.dataTypes[0]);
  const [fileToBeUpload, setFileToBeUpload] = useState({});
  const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0);
  const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize);
  const [progress, setProgress] = useState(0);
  const [fileGuid, setFileGuid] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);
  var fileUpload = React.createRef();
  //this.onUploadButtonClicked = this.onUploadButtonClicked.bind(this);

  useEffect(() => {
    if (fileSize > 0) {
      startSignedUpload(counter);
    }
  }, [fileToBeUpload]);
  const onFileTypeChanged = (e, f) => {
    setFileTypeOption(f.value);
  };
  const getFileContext = (e) => {
    setShowProgress(true);
    resetChunkProperties();
    const _file = e.target.files[0];
    setFileSize(_file.size);

    const _totalCount =
      _file.size % chunkSize == 0
        ? _file.size / chunkSize
        : Math.floor(_file.size / chunkSize) + 1; // Total count of chunks will have been upload to finish the file
    setChunkCount(_totalCount);

    setFileToBeUpload(_file);
    //const _fileID = fileTypeOption + "_" + uuidv4() + "_" + _file.name;
    setFileGuid(uuidv4());
  };

  const onUploadButtonClicked = (e) => {
    //$("#fileUploadBtn").trigger('click')
    fileUpload.current.click();
    fileUpload.current.value = null;
  };

  const startSignedUpload = () => {
    uploadFile(
      props.sourceId,
      fileTypeOption,
      fileGuid,
      fileToBeUpload,
      (response) => {
        setShowProgress(false);
        setProgress(100);
      },
      (error) => {
        setShowProgress(false);
        setProgress(100);
      }
    );
  };

  const resetChunkProperties = () => {
    setShowProgress(true);
    setProgress(0);
    setCounter(1);
    setBeginingOfTheChunk(0);
    setEndOfTheChunk(chunkSize);
  };

  return (
    <>
      {demoTenants.includes(TENANTS(props.subDomain)) ||
      mygateTestTenants.includes(TENANTS(props.subDomain)) ||
      indifiTenants.includes(TENANTS(props.subDomain)) ||
      intldemoTenants.includes(TENANTS(props.subDomain)) ? (
        <>
          <Button as="div" className="Config_chevron" labelPosition="left">
            <Label
              style={{
                padding: "0",
                width: `${
                  indifiTenants.includes(TENANTS(props.subDomain))
                    ? `40%`
                    : `100%`
                }`,
              }}
              basic
            >
              <Dropdown
                icon="chevron down"
                value={fileTypeOption}
                options={dataTypes().filter((type) =>
                  props.dataTypes.includes(type.key)
                )}
                onChange={onFileTypeChanged}
              />
            </Label>

            <Button
              icon
              style={{
                padding: "0",
                backgroundColor: "#F7F8FA",
                border: "1px solid #CCCFD9",
              }}
              onClick={onUploadButtonClicked}
              progress={showProgress}
            >
              {/* <Icon name="cloud upload" /> */}
              <Image
                src="images/upload.png"
                size="mini"
                style={{ width: "16px", height: "16px", margin: "7px" }}
              />
            </Button>
          </Button>
          <input
            ref={fileUpload}
            id="fileUploadBtn"
            style={{ display: "none" }}
            type="file"
            onChange={getFileContext}
            on
          ></input>
        </>
      ) : (
        <>
          <Button as="div" labelPosition="left">
            <Label basic>
              <Dropdown
                value={fileTypeOption}
                options={dataTypes().filter((type) =>
                  props.dataTypes.includes(type.key)
                )}
                onChange={onFileTypeChanged}
              />
            </Label>

            <Button
              icon
              onClick={onUploadButtonClicked}
              progress={showProgress}
            >
              <Icon name="cloud upload" />
            </Button>
          </Button>
          <input
            ref={fileUpload}
            id="fileUploadBtn"
            style={{ display: "none" }}
            type="file"
            onChange={getFileContext}
            on
          ></input>
        </>
      )}
    </>
  );
};

export default SignedFileUploadForType;
