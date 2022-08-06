import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//import axios from "axios";
import { Button, Icon, Input, Dropdown, Label } from "semantic-ui-react";
import {
  getSignedUploadUrl,
  uploadFile,
} from "../../services/uploadDataService";

const chunkSize = 1048576 * 3; //its 3MB, increase the number measure in mb
const SignedFileUpload = (props) => {
  const [showProgress, setShowProgress] = useState(false);
  const [fileTypeOption, setFileTypeOption] = useState("rp_payments");
  const [counter, setCounter] = useState(1);
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

  const options = [
    { key: "rp_payments", text: "Payments", value: "rp_payments" },
    { key: "mygate_receipts", text: "Receipts", value: "mygate_receipts" },
    { key: "rp_settlements", text: "Settlements", value: "rp_settlements" },
    { key: "rp_payouts", text: "PG Payouts", value: "rp_payouts" },
    {
      key: "mygate_payouts",
      text: "Customer Payouts",
      value: "mygate_payouts",
    },
  ];

  return (
    <>
      <Button as="div" labelPosition="left" floated="right">
        <Label basic>
          <Dropdown
            value={fileTypeOption}
            options={options}
            onChange={onFileTypeChanged}
          />
        </Label>

        <Button icon onClick={onUploadButtonClicked} progress={showProgress}>
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
  );
};

export default SignedFileUpload;
