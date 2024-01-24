import React, { useState } from "react";
import { data } from "./data";
import axios from "axios";
import { useRouter } from "next/router";

const CreateList = ({ leadId , email,policyNo , Insured,vehicleNo }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [emailAddress, setEmailAddress] = useState(email ? email : "");
  const [policyNos, setPolicyNo] = useState(policyNo ? policyNo : "");
  const [date, setDate] = useState("");

  const router = useRouter();

  console.log(leadId,email,policyNo)
  const handleCheckboxChange = (id, value, checked) => {
    if (checked) {
      // If checked, add the item to the selectedItems list
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        { id, value },
      ]);
    } else {
      // If unchecked, remove the item from the selectedItems list
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item.id !== id)
      );
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // ... your existing code
  };

  const createStringFromSelectedItems = (selectedItems) => {
    return selectedItems.map((item, index) => {
      return `${index + 1}) ${item.value}`;
    }).join('\n');
  };
  const createStringFromSelectedItems2 = (selectedItems) => {
    return selectedItems.map((item, index) => {
      return `${item.value},`;
    }).join('');
  };

  const handleSubmit = () => {
    
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(selectedItems)
   const payload = {
    toMail : emailAddress ? emailAddress : email,
    PolicyNo : policyNos ? policyNos : policyNo,
    Date : date ? date : new Date(),
    vehicleNo : vehicleNo,
    Insured:Insured,
    content : createStringFromSelectedItems(selectedItems),
    content2:createStringFromSelectedItems2(selectedItems),
    leadId:leadId
   }

   axios.post("/api/sendCustomEmail",payload,{
    headers:{
      Authorization : `Bearer ${userInfo[0].Token}`,
      "Content-Type":"application/json"
    }
   }).then((res)=>{
    alert("Successfully sent!!");
    router.push(`/claim-details?leadId=${leadId}`)
   }).catch((Err)=>{
    alert("Try again!");
   })
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-4">
          <div className="row mt-3 mb-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color mt-1"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Type of Documents:
              </label>
            </div>
            <div className="col-lg-7">
              {data?.map((stat, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    data-tokens="Status1"
                    value={stat.serial_num}
                    onChange={(e) =>
                      handleCheckboxChange(stat.serial_num, stat.doc_name, e.target.checked)
                    }
                  />
                  <label htmlFor={`checkbox-${index}`}>{stat.doc_name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="row mt-3 mb-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color mt-1"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Email Address :
              </label>
            </div>
            <div className="col-lg-7">
              <input
                required
                type="text"
                className="form-control"
                id="otherInput"
                name="otherInput"
                placeholder = {email}
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="row mt-3 mb-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color mt-1"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Policy No. :
              </label>
            </div>
            <div className="col-lg-7">
              <input
                required
                type="text"
                className="form-control"
                id="otherInput"
                name="otherInput"
                placeholder={policyNo}
                value={policyNos}
                onChange={(e) => setPolicyNo(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="row mt-3 mb-1">
            <div className="col-lg-4 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color mt-2"
                style={{
                  color: "#2e008b",
                  fontWeight: "",
                }}
              >
                Date :
              </label>
            </div>
            <div className="col-lg-7">
              <input
                required
                type="date"
                className="form-control"
                id="otherInput"
                name="otherInput"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3 mt-2">
          <button className="btn btn-color" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      <div>
        <h4>Selected Items:</h4>
        <ul>
          {selectedItems.map((item) => (
            <li key={item.id}>{item.value}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CreateList;