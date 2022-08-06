import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, Progress } from 'semantic-ui-react';

const chunkSize = 1048576 * 3;//its 3MB, increase the number measure in mb
const ChunkedFileUpload = (props) => {
    const [showProgress, setShowProgress] = useState(false)
    const [counter, setCounter] = useState(1)
    const [fileToBeUpload, setFileToBeUpload] = useState({})
    const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0)
    const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize)
    const [progress, setProgress] = useState(0)
    const [fileGuid, setFileGuid] = useState("")
    const [fileSize, setFileSize] = useState(0)
    const [chunkCount, setChunkCount] = useState(0)

    useEffect(() => {
        if (fileSize > 0) {
            fileUpload(counter);
        }
    }, [fileToBeUpload, progress])

    const getFileContext = (e) => {
        resetChunkProperties();
        const _file = e.target.files[0];
        setFileSize(_file.size)

        const _totalCount = _file.size % chunkSize == 0 ? _file.size / chunkSize : Math.floor(_file.size / chunkSize) + 1; // Total count of chunks will have been upload to finish the file
        setChunkCount(_totalCount)

        setFileToBeUpload(_file)
        const _fileID = uuidv4() + "." + _file.name.split('.').pop();
        setFileGuid(_fileID)
    }


    const fileUpload = () => {
        setCounter(counter + 1);
        if (counter <= chunkCount) {
            var chunk = fileToBeUpload.slice(beginingOfTheChunk, endOfTheChunk);
            uploadChunk(chunk)
        }
    }

    const uploadChunk = async (chunk) => {
        try {
            // const response = await axios.post("api/v1/chunkUpload", chunk, {
            //     params: {
            //         id: counter,
            //         fileName: fileGuid,
            //     },
            //     headers: { 'Content-Type': 'application/json' }
            // });
            const response = await fetch('api/v1/chunkUpload?id='+counter+'&fileName='+fileGuid, {
                method: 'POST',
                headers: {
                  'Content-Type': 'octet'
                },
                body: chunk
              });
            const data = await response.json();
            if (response.ok) {
                setBeginingOfTheChunk(endOfTheChunk);
                setEndOfTheChunk(endOfTheChunk + chunkSize);
                if (counter == chunkCount) {
                    console.log('Process is complete, counter', counter)

                    await uploadCompleted();
                } else {
                    var percentage = (counter / chunkCount) * 100;
                    console.log("counter - " + counter + ", chunkCount - " + chunkCount + ", percentage - " + percentage);
                    setProgress(percentage);
                }
            } else {
                console.log('Error Occurred:', data.errorMessage)
            }

        } catch (error) {
            debugger
            console.log('error', error)
        }
    }

    const uploadCompleted = async () => {
        var formData = new FormData();
        formData.append('fileName', fileGuid);

        // const response = await axios.post("https://localhost:44356/weatherforecast/UploadComplete", {}, {
        //     params: {
        //         fileName: fileGuid,
        //     },
        //     data: formData,
        // });

        const response = await fetch('api/v1/uploadComplete?fileName='+fileGuid, {
            method: 'POST',
            headers: {
              'Content-Type': 'octet'
            },
            body: formData
          });
        const data = await response.json();
        if (response.ok) {
            setProgress(100);
        }
    }

    const resetChunkProperties = () => {
        setShowProgress(true)
        setProgress(0)
        setCounter(1)
        setBeginingOfTheChunk(0)
        setEndOfTheChunk(chunkSize)
    }

    return (
            <Form>
                <Form.Group widths={1}>
                    <Form.Input width={16} id="exampleFormControlFile1" onChange={getFileContext} label="Data File" type='file' />
                </Form.Group>
                <Form.Group style={{ display: showProgress ? "block" : "none" }}>
                <Progress autoSuccess percent={progress} progess={'percent'} />
                </Form.Group>
            </Form>
    );
}


export default ChunkedFileUpload;