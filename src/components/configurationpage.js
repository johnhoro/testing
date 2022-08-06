import { useRef, useState } from "react";
import {
  mygateTenants,
  TENANTS,
  TENANT_IDs,
  eatFitData,
} from "../utils/constants";
import { format } from "date-fns";

const configData = eatFitData[2].configuration;
console.log(configData);

function Configuration() {
  let [data, setData] = useState(null);
  let [upload, setUpload] = useState(false);
  let [addRow, setAddRow] = useState(1);
  let [filename, setName] = useState("");
  let fileRef = useRef();

  function handleUpload() {
    setUpload(!upload);
  }

  const fileHandler = () => {
    if (fileRef.current && fileRef.current.files.length > 0) {
      const file = fileRef.current.files[0];
      // console.log(fileRef.current.files);
      setName(file.name);
    }
  };

  const addFile = () => {
    if (fileRef.current && fileRef.current.files.length > 0) {
      const file = fileRef.current.files[0];
      setName(file.name);
      let fr = new FileReader();

      fr.onload = (e) => {
        const result = JSON.parse(JSON.stringify(e.target.result));
        setData(JSON.parse(result));
      };

      fr.readAsText(file);

      let obj = {
        channel: `Swiggy`,
        uploadDate: format(new Date(), `d MMM yyyy`),
        status: "Reconcile",
        image:
          "https://i.pinimg.com/originals/7b/dd/1b/7bdd1bc7db7fd48025d4e39a0e2f0fd8.jpg",
        fileName: filename,
      };
      configData.push(obj);
      console.log(configData);
    }

    setUpload(false);
  };

  return (
    <>
      <section>
        <div className="config">
          <div className="flex justify-bw upload-file align-center">
            <button onClick={handleUpload}>Upload New File</button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "55%",
                justifyContent: "space-between",
              }}
            >
              <p className="margin-l16">Showing 1-100 of 2,86,988</p>
              <div className="flex">
                <form action="">
                  <label for="search">Search: </label>
                  <select className="w-150p" name="search">
                    <option value="All">Order ID</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Swiggy">Swiggy</option>
                    <option value="Zomato">Zomato</option>
                    <option value="EatFit">EatFit</option>
                  </select>
                  <input type="text" placeholder="Enter transaction ID" />
                </form>
              </div>
            </div>
          </div>
          <ul className="flex config-nav justify-bw">
            <li className="w-10">Channel</li>
            <li className="w-20">File Name</li>
            <li className="w-20">Upload Date</li>
            <li className="w-30">Status</li>
          </ul>
          <div>
            {configData.map((elm, i) => (
              <ul className="flex justify-bw">
                <li className="w-10">{elm.channel} </li>
                <li className="w-20">{elm.fileName}</li>
                <li className="w-20">{elm.uploadDate}</li>
                <li className="w-30 flex align-center">
                  <img className="right-mark" src={elm.image} alt="" />
                  <span>{elm.status}</span>
                </li>
              </ul>
            ))}
          </div>
        </div>
        {upload ? (
          <section className="upload-section">
            <div className="upload">
              <div className="upload-box">
                <h2>Upload New File</h2>
                <p>Select files to upload</p>
                {Array.from(new Array(addRow)).map((_, i) => (
                  <form className="flex justify-bw">
                    <select className="w-150p" name="cars">
                      <option value="All">Channel</option>
                      <option value="Amazon">Amazon</option>
                      <option value="Swiggy">Swiggy</option>
                      <option value="Zomato">Zomato</option>
                      <option value="EatFit">EatFit</option>
                    </select>
                    <input type="text" placeholder="" value={filename} />
                    <label htmlFor="browse" className="browse-btn">
                      Browse
                    </label>
                    <input
                      type="file"
                      className="d-none"
                      id="browse"
                      accept="application/json"
                      onChange={fileHandler}
                      ref={fileRef}
                    />
                  </form>
                ))}
                <p
                  onClick={() => {
                    setAddRow(addRow + 1);
                  }}
                  className="add-row"
                >
                  + Add Row
                </p>
              </div>

              <div className="flex justify-end">
                <button onClick={handleUpload} className="browse-btn">
                  Cancle
                </button>
                <button
                  className="browse-btn margin-r blue-btn white"
                  onClick={addFile}
                >
                  Upload & Reconcile
                </button>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
      </section>
    </>
  );
}

export default Configuration;
