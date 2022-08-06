import React, { useEffect, useState } from 'react';
import { Card, Container, Button, Image, Header, Modal, Form } from 'semantic-ui-react';
import ChunkedFileUpload from '../FileUpload/chunkedFileUpload';
import FileUploadConnector from './fileUploadConnector';
import S3Connector from './s3Connector';
import { set } from 'lodash';
import slugify from 'slugify';
import { connectionTypes, sourceToDataTypeMap, sourceTypes } from '../../utils/constants';

const ConnectorAction = (props) => {
  const [detailsOpen, setDetailsOpen] = React.useState(props.isOpen)
  const [connector, setConnector] = React.useState(props.connector ?? { id: '', name: '', dataType: '', description: '', type: 'razorpay_gateway', connectionType: 'file_upload', config: {} })
  const [title, setTitle] = useState("Razorpay Gateway")

  useEffect(() => {
    let updatedConnector = Object.assign({}, connector)
    let title = sourceTypes(connector.type)?.title

    set(updatedConnector, "dataTypes", sourceToDataTypeMap[connector.type]||updatedConnector.dataTypes);
    setConnector(updatedConnector);
    setTitle(title);
  }, [])

  const onFieldChange = (e, v) => {
    let updatedConnector = Object.assign({}, connector)
    set(updatedConnector, v.name, v.value)
    set(updatedConnector, 'id', slugify(updatedConnector.name, {lower: true}));
    setConnector(updatedConnector);
  }

  const modalTitle = (type) => {
    
    return title;
  }

  const s3Fields = () => (
    <>
      <Form.Input
        placeholder='s3 Folder Path'
        label='Folder Path'
        name='config.s3FolderPath'
        value={connector ? connector.config['s3FolderPath'] : ''}
        onChange={onFieldChange}
      />
      <Form.Input
        placeholder='Access ID'
        label='Access ID'
        name='config.s3AccessId'
        value={connector ? connector.config['s3AccessID'] : ''}
        onChange={onFieldChange}
      />
      <Form.Input
        placeholder='Access Key'
        label='Access Key'
        name='config.s3AccessKey'
        value={connector ? connector.config['s3AccessKey'] : ''}
        onChange={onFieldChange}
      />
    </>
  )
  const apiFields = () => (
    <>
      <Form.Input
        placeholder='Api Key ID'
        label='API Key ID'
        name='config.keyId'
        value={connector ? connector.config['keyId'] : ''}
        onChange={onFieldChange}
      />
      <Form.Input
        placeholder='Api Key Secret'
        label='API Key Secret'
        name='config.keySecret'
        value={connector ? connector.config['keySecret'] : ''}
        onChange={onFieldChange}
      />
    </>
  )



  return (
    <Modal open={true}>
      <Modal.Header>{modalTitle(connector.type)}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={() => props.onSave(connector)}>
          <Form.Input
            placeholder="Unique Id"
            label='Id'
            name="id"
            value={connector.id}
            // style={{ display: "none" }}
          />
          <Form.Input
            required
            placeholder="Name"
            label="Name"
            name="name"
            value={connector.name}
            onChange={onFieldChange}
          />
          <Form.Input
            placeholder="Description"
            label="Description"
            name="description"
            value={connector.description}
            onChange={onFieldChange}
          />
          <Form.Input
            placeholder="Data Types"
            label='Data Types'
            name="dataTypes"
            value={connector.dataTypes.join(", ")}
            // style={{ display: "none" }}
          />
          <Form.Select
            label="Connection Type"
            name="connectionType"
            options={connectionTypes}
            placeholder="Connection Type"
            value={connector.connectionType}
            onChange={onFieldChange}
          />
          {connector.connectionType === "aws_s3" ? s3Fields() : ""}
          {connector.connectionType === "api" ? apiFields() : ""}
          <Button content="Save" positive />
          <Button content="Cancel" onClick={props.onCancel} />
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default ConnectorAction;