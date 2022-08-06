import React, { useEffect, useState } from 'react';
import { Card, Container, Button, Image, Header, Modal, Form } from 'semantic-ui-react';
import ChunkedFileUpload from '../FileUpload/chunkedFileUpload';
import FileUploadConnector from './fileUploadConnector';
import S3Connector from './s3Connector';

const Connector = (props) => {
  const [detailsOpen, setDetailsOpen] = React.useState(false)
  const [connector, setConnector] = React.useState(props.connector)
  const onDetailsClick = () => {
    setDetailsOpen(!detailsOpen);
  }
  const sftpConnector = (connector) => {
    return (
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='images/sftpLogo.jpeg'
          />
          <Card.Header>{connector ? connector.name : "sFtp"}</Card.Header>
          <Card.Meta>{connector ? "sFtp" : ""}</Card.Meta>
          <Card.Description>
            {connector ? connector.description : "Pull the files on scheduled basis from a connected sFTP source."}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button fluid basic color={connector ? 'gray' : 'green'} onClick={onDetailsClick}>
            {connector ? "Details" : "Connect"}
          </Button>
        </Card.Content>
      </Card>
    )
  }
  const razorpayConnector = (connector) => {
    return (
      <Card key={connector ? connector.key : ''}>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='images/razorpayLogo.png'
          />
          <Card.Header>{connector ? connector.name : "Razorpay API"}</Card.Header>
          <Card.Meta>{connector ? "Razorpay API" : ""}</Card.Meta>
          <Card.Description>
            {connector ? connector.description : "Pull the data on scheduled basis from a connected Razorpay account using APIs."}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button fluid basic color={connector ? 'gray' : 'green'} onClick={onDetailsClick}>
            {connector ? "Details" : "Connect"}
          </Button>
        </Card.Content>
      </Card>
    )
  }
  if (props.type === 'aws_s3') return <S3Connector connector={connector} />;
  else if (props.type === 'sftp') return sftpConnector(props.connector);
  else if (props.type === 'fileUpload') return <FileUploadConnector connector={connector} />;
  else return razorpayConnector(props.connector);
}

export default Connector;