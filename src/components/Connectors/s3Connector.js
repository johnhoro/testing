import React, { useEffect, useState } from 'react';
import { Card, Container, Button, Image, Header, Modal, Form } from 'semantic-ui-react';

const S3Connector = (props) => {
  const [detailsOpen, setDetailsOpen] = React.useState(props.isOpen ?? false)
  const [connector, setConnector] = React.useState(props.connector)
  const onDetailsClick = () => {
    setDetailsOpen(!detailsOpen);
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
          <Form.Input
            placeholder='s3 Folder Path'
            label='Folder Path'
            name='s3FolderPath'
          // value={s3FolderPath}
          // onChange={this.handleChange}
          />
          <Form.Input
            placeholder='Access ID'
            label='Access ID'
            name='s3AccessId'
          // value={s3FolderPath}
          // onChange={this.handleChange}
          />
          <Form.Input
            placeholder='Access Key'
            label='Access Key'
            name='s3AccessKey'
          // value={s3FolderPath}
          // onChange={this.handleChange}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Save"
          onClick={() => setDetailsOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}
export default S3Connector;