import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Container, Button, Image, Header, Modal, Form } from 'semantic-ui-react';
import { addConnectorAction } from '../../actions/connectorActions';
import SignedFileUpload from '../FileUpload/signedFileUpload';

const FileUploadConnector = (props) => {
  const dispatch = useDispatch();
  const [detailsOpen, setDetailsOpen] = React.useState(props.isOpen ?? false)
  const [connector, setConnector] = React.useState(props.connector)
  const onDetailsClick = () => {
    setDetailsOpen(!detailsOpen);
  }
  const onSave = () => {
    setDetailsOpen(false);
    let connector = {name: "name", description: "description", type: 'fileUpload'};
    dispatch(addConnectorAction(connector));
  }

  return (
    <Modal
        onClose={() => setDetailsOpen(false)}
        onOpen={() => setDetailsOpen(true)}
        open={detailsOpen}
      >
        <Modal.Header>Connector Source Details</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              placeholder='Name'
              label='Name'
              name='name'
            // value={s3FolderPath}
            // onChange={this.handleChange}
            />
            <Form.Input
              placeholder='Description'
              label='Description'
              name='description'
            // value={s3FolderPath}
            // onChange={this.handleChange}
            />
            <SignedFileUpload />
          </Form>
        </Modal.Content>
        <Modal.Actions>

          <Button color='red' onClick={() => setDetailsOpen(false)}>
            Delete
          </Button>
          <Button
            content="Save"
            onClick={onSave}
            positive
          />
        </Modal.Actions>
      </Modal>
  )
}
export default FileUploadConnector;