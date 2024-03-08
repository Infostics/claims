import { useEffect, useState } from "react";
import MyDatePicker from "../../common/MyDatePicker";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Editor } from "draft-js";
import { Editor } from "primereact/editor";
import ReactEditor from "../../common/TextEditor";

const Summary = ({
  isEditMode,
  metaldepPct,
  ageOfVehicleTotal,
  claim,
  DepreciationValue,
  FinalReportNotes,
  setFinalReportNotes,
  totalPartsEstimate,
  totalLabrorEstimate,
  totalPartsAssessed,
  totalLabrorAssessed,
  setLessImposed,
  setEndurance,
  Endurance,
  lessImposed,
  setLessExcess,
  totalMetalRows,
  settotalMetalRows,
  OtherRemark,
  setOtherRemark,
  lessExcess,
  other,
  saveHandler,
  setOther,
  metalSalvageValue,
  setMetalSalvageValue,
  setLessImposedSum,
  LessImposed,

  calculateDepreciationOnMetal,
  calculateVehicleAge,


  TotalLabor,
  setTotalLabor,TotalEstimate,
  setTotalEstimate,
  LessExcess
  ,setLessExcessSum,
  ExpectedSalvage,
  setExpectedSalvage,
  MetalPercent,
  setMetalPercent,
  RemarkOnSalvage,
  setRemarkOnSalvage,
  TotalCostOfParts,
  setTotalCostOfParts,
  Other,
  setOtherSum,
  GrandTotal,
  setGrandTotal,
  DepreciationOnParts,
  setDepreciationOnParts,
  NetAssessedAmoun,
  setNetAssessedAmount,
  SavageDepreciationDetails,
  setSavageDepreciationDetails,
  CashLess,
  setCashLess,
  NoteOfSelf,
  setNoteOfSelf,
  RepairAutoDate,
  setRepairAutoDate,
  RepairCompletionDate,
  setRepairCompletionDate,
  PartyAgreed,
  setPartyAgreed,
  ReasonThereofDelay,
  setReasonThereofDelay,
  AnyFurtherConversation,
  setAnyFurtherConversation,
  RepairingPhotoDate,
  setRepairingPhotoDate,
  ReinspectionDate,
  setReinspectionDate,
  SalveDestroy,
   setSalveDestroy,
   BillNo,
   setBillNo,
   BillDate,
   setBillDate,
   BillAmount,
   setBillAmount
}) => {
  const [applicantNumber, setApplicantNumber] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isEdit,setIsEdit]=useState(false);

  const [metalSalvageTotal,setmetalSalvageTotal]=useState(0);

  const returnTotal = () => {
    const a =
      Number(totalLabrorAssessed) +
      Number(totalPartsAssessed) +
      (Number(LessExcess) - Number(LessImposed) + Number(Other));
    const b =
    ((totalMetalRows*MetalPercent)/100) 

    return a - b > 1 ? a - b : 0;
  };
  
  const roundOff = (value)=>{
    const roundedValue = parseFloat(value).toFixed(2);
    return roundedValue
  }


  console.log(totalMetalRows,"total",metalSalvageValue)

  useEffect(()=>{
    console.log(FinalReportNotes)
  },[FinalReportNotes]);
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Allow only numeric input
    const numericValue = inputValue.replace(/\D/g, "");

    // Restrict to 10 digits
    const truncatedValue = numericValue.slice(0, 10);
    if (truncatedValue.length === 10) {
      setApplicantNumber(truncatedValue);
    }

    setPhoneNumber(truncatedValue);
  };

  console.log("summ",FinalReportNotes)
 
  console.log("meta",totalMetalRows)

  const handleOtherValue=(val)=>{
    const finalVal = val===""?0 :val
    setOtherSum(finalVal)
  }

  // const Editor = SomeComponent.Editor;
  const [editorContent, setEditorContent] = useState("");

  const formatText = (command) => {
    if (typeof window !== "undefined") {
      const selectedText = window.getSelection().toString();

      const selection = window.getSelection();
      if (selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);

      // Create a span element
      const span = document.createElement("span");

      switch (command) {
        case "bold":
          span.style.fontWeight = "bold";
          break;
        case "italic":
          span.style.fontStyle = "italic";
          break;
        case "justifyCenter":
          span.style.textAlign = "center";
          break;
        case "justifyRight":
          span.style.textAlign = "right";
          break;
        case "justifyLeft":
          span.style.textAlign = "left";
          break;
        default:
          break;
      }

      // Surround the selected content with the created span element
      range.surroundContents(span);
    }
  };

  const [text, setText] = useState("");
  

  useEffect(()=>{
    setTotalEstimate(totalPartsEstimate + totalLabrorEstimate);
    setTotalLabor(totalLabrorAssessed);
    setTotalCostOfParts(totalPartsAssessed);
    setGrandTotal( Number(totalLabrorAssessed) +
    Number(totalPartsAssessed) -
    (Number(LessExcess) + Number(LessImposed) + Number(Other)));
    setMetalPercent(metalSalvageValue);
  setExpectedSalvage( (Number(totalLabrorAssessed + totalPartsAssessed) *
      Number(metalSalvageValue)) /
    100);
    setDepreciationOnParts( (Number(totalLabrorAssessed + totalPartsAssessed) *
    Number(metalSalvageValue)) /
    100);
    setNetAssessedAmount(returnTotal());

  console.log(LessExcess,LessImposed,Other)
  },[]);
  

  useEffect(()=>{
    setExpectedSalvage(roundOff((totalMetalRows*MetalPercent)/100) );
  },[MetalPercent])




  return (
    <>
      <div className="row mt-3">
        <div className="col-lg-2" style={{ borderRight: "1px solid black" }}>
          <div className="row">
            <div className="col-lg-12">
              <h4>Original Estimate :</h4>
              {/* <hr /> */}
            </div>
            <div className="col-lg-12">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Total Labour
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={roundOff(totalLabrorEstimate)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Total Cost of Parts
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={roundOff(totalPartsEstimate)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Total Estimate
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={roundOff(totalPartsEstimate + totalLabrorEstimate)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              {/*} <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Estimate Date
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    // placeholder="Enter Registration No."
                  />
                </div>
                  </div>*/}
            </div>
          </div>
          <hr />
        </div>
        <div className="col-lg-5" style={{ borderRight: "1px solid black" }}>
          <div className="row">
            <div className="col-lg-12">
              <h4>Assessed Value :</h4>
              {/* <hr /> */}
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Total Labour
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={roundOff(totalLabrorAssessed)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Total Cost of Parts
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={roundOff(totalPartsAssessed)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="col-lg-12">
                <div className="row mt-1 mb-1">
                  <div className="col-lg-12 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mb-0"
                      style={{
                        color: "#2e008b",
                        fontSize: "14px",
                      }}
                    >
                      Total
                    </label>
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="propertyTitle"
                      value={roundOff(totalLabrorAssessed + totalPartsAssessed)}
                      // placeholder="Enter Registration No."
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row mt-1 mb-1">
                  <div className="col-lg-12 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mb-0"
                      style={{
                        color: "#2e008b",
                        fontWeight: "",
                      }}
                    >
                      Less Excess
                    </label>
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="propertyTitle"
                      value={LessExcess}
                      onChange={(e) => setLessExcessSum(e.target.value)}
                      // placeholder="Enter Registration No."
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row mt-1 mb-1">
                  <div className="col-lg-12 my_profile_setting_input form-group">
                    <label
                      htmlFor=""
                      className="text-color mb-0"
                      style={{
                        color: "#2e008b",
                        fontWeight: "",
                      }}
                    >
                      Less Imposed
                    </label>
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="propertyTitle"
                      value={LessImposed}
                      onChange={(e) => setLessImposedSum(e.target.value)}
                      // placeholder="Enter Registration No."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Other
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={OtherRemark}
                    readOnly={!isEdit}
                    onChange={(e)=>setOtherRemark(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Other
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={Other}
                    onChange={(e) => setOtherSum(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8"></div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                    }}
                  >
                    Grand Total
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={
                      roundOff(Number(totalLabrorAssessed) +
                      Number(totalPartsAssessed) 
                        -Number(LessExcess)-Number(LessImposed)+Number(Other))
                      
                    }
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-12">
              <h5>Savage & Depreciation Details</h5>
              {/* <hr /> */}
            </div>
            <div className="col-lg-3">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                      fontSize: "14px",
                    }}
                  >
                    Metal %
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={MetalPercent}
                    onChange={(e)=>setMetalPercent(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                      fontSize: "14px",
                    }}
                  >
                    Expected Salvage
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={ExpectedSalvage
                    }
                    onChange={(e)=>setExpectedSalvage(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontWeight: "",
                      fontSize: "14px",
                    }}
                  >
                    Remark on Salvage
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    // placeholder="Enter Registration No."
                    value={RemarkOnSalvage}
                    onChange={(e)=>setRemarkOnSalvage(e.target.value)}
                    placeholder="This is a metal salvage depreciation %"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <hr />
            {/* <hr /> */}
          </div>
          <div className="row">
            <div className="col-lg-8 text-end">
              <label
                htmlFor=""
                className="text-color mb-0"
                style={{
                  paddingTop: "10px",
                  color: "#2e008b",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Depreciation on Parts
              </label>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group"></div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={
                      roundOff(DepreciationValue)
                    }
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 text-end">
              <label
                htmlFor=""
                className="text-color mb-0"
                style={{
                  paddingTop: "10px",
                  color: "#2e008b",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Net Assessed Amount
              </label>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group"></div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={ roundOff(Number(totalLabrorAssessed) +
                      Number(totalPartsAssessed) 
                        -Number(LessExcess)-Number(LessImposed)+Number(Other)
                        -ExpectedSalvage - DepreciationValue)
                      }
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="row">
            <div className="col-lg-6">
              <h4>Notes :</h4>
              {/* <hr /> */}
            </div>
            <div className="col-lg-6 text-end" style={{ marginTop: "-20px" }}>
              
            {!isEdit ? <button className="btn btn-color m-1" onClick={()=>setIsEdit(true)}>Edit</button>
            :<> <button className="btn btn-color m-1" onClick={()=>setIsEdit(false)}>Cancel</button>
                <button className="btn btn-color m-1" onClick={saveHandler}>Update</button>
                </>}
             
              {/* <button className="btn btn-color m-1">Add</button> */}
              {/* <button className="btn btn-color m-1" onClick={handleEditClick}>
            Modify
          </button> */}
            </div>
            <div className="col-lg-12">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group"></div>
                <div className="col-lg-12">
                  <div className="">
                    <ReactEditor 
                    index={8}
                  readOnly={!isEdit}
                  editorContent={FinalReportNotes}
                  setEditorContent={setFinalReportNotes}
                />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <h5>Enclosure, Remarks & Other Details </h5>
              {/* <hr /> */}
            </div>
            <div className="row">
              <span className="col-lg-7">Endurance :</span>
              <div className="col-lg-4">
              {!isEdit  ?
                <label> 
                {CashLess ? "CashLess" : "With Cash"}
                </label>
                :
                <>
                 <label htmlFor="" className="m-1" >
                  Cash Less
                </label>
               
                 <input
                  className="form-check-input mt-2"
                  type="checkbox"
                  value={CashLess}
                  readOnly={!isEdit}
                  onChange={(e)=>setCashLess(1-CashLess)}
                  // value={row.gst}
                  // onChange={(e) => handleChange(index, row.gst + 1, "gst")}
                  id="remeberMe"
                />
                </>
               }
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group"></div>
                <div className="col-lg-12">
                  <textarea name="" id="" cols="50" rows="3" 
                  value={Endurance}
                  readOnly={!isEdit}
                  onChange={(e)=>setEndurance(e.target.value)}></textarea>
                  {/* <div className="card">
                    <Editor />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <h5>Note Of Self : </h5>
              {/* <hr /> */}
            </div>
            <div className="col-lg-12">
              <div className="row mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group"></div>
                <div className="col-lg-12">
                  <textarea name="" id="" cols="50" rows="3" 
                  readOnly={!isEdit}
                  value={NoteOfSelf} 
                  onChange={(e)=>setNoteOfSelf(e.target.value)}></textarea>
                  {/* <div className="card">
                    <Editor />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Repair Auto Date
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="date"
                    className="form-control"
                    id="propertyTitle"
                    value={RepairAutoDate}
                    readOnly={!isEdit}
                    onChange={(e)=>setRepairAutoDate(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Repair Completion Date
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="date"
                    className="form-control"
                    id="propertyTitle"
                    value={RepairCompletionDate}
                    readOnly={!isEdit}
                    onChange={(e)=>setRepairCompletionDate(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Party Agreed
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={PartyAgreed}
                    readOnly={!isEdit}
                    onChange={(e)=>setPartyAgreed(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Reason thereof Delay
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={ReasonThereofDelay}
                    readOnly={!isEdit}
                    onChange={(e)=>setReasonThereofDelay(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Any Further Conversation
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={AnyFurtherConversation}
                    readOnly={!isEdit}
                    onChange={(e)=>setAnyFurtherConversation(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Repairin Photo Date
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="date"
                    className="form-control"
                    id="propertyTitle"
                    value={RepairingPhotoDate}
                    readOnly={!isEdit}
                    onChange={(e)=>setRepairingPhotoDate(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Reinspection Date
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="date"
                    className="form-control"
                    id="propertyTitle"
                    value={ReinspectionDate}
                    readOnly={!isEdit}
                    onChange={(e)=>setReinspectionDate(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Salve Destroy
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={SalveDestroy}
                    readOnly={!isEdit}
                    onChange={(e)=>setSalveDestroy(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Bill No.
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={BillNo}
                    readOnly={!isEdit}
                    onChange={(e)=>setBillNo(e.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Bill Date
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="date"
                    className="form-control"
                    id="propertyTitle"
                    value={BillDate}
                    readOnly={!isEdit}
                    onChange={(E)=>setBillDate(E.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row mt-1 mb-1">
                <div className="col-lg-12 my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color mb-0"
                    style={{
                      color: "#2e008b",
                      fontSize: "14px",
                    }}
                  >
                    Bill Amount
                  </label>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={BillAmount}
                    readOnly={!isEdit}
                    onChange={(E)=>setBillAmount(E.target.value)}
                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
          </div>

          <hr />
        </div>
        <div className="col-lg-12 mt-5">
          <div className="row mt-1">
            <div className="col-lg-5"></div>
            <div className="col-lg-2">
              {/*<div className="row mt-1">
                <div className="col-lg-7 my_profile_setting_input form-group text-end">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      // paddingTop: "15px",
                      color: "#2e008b",
                      fontWeight: "",
                      // marginTop: "-13px",
                      fontSize: "12px",
                    }}
                  >
                    Age of Vehicle
                  </label>
                </div>
                <div className="col-lg-5">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    
                    // value={props.assessed}
                    // readOnly={!isEditMode}
                    // onChange={(e) => setLicenseType(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
                  </div>*/}
            </div>
            <div className="col-lg-2">
              <div className="row mt-1">
                <div className="col-lg-7 my_profile_setting_input form-group text-end">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      // paddingTop: "15px",
                      color: "#2e008b",
                      fontWeight: "",
                      // marginTop: "-13px",
                      fontSize: "12px",
                    }}
                  >
                    Age of Policy
                  </label>
                </div>
                <div className="col-lg-5">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={calculateVehicleAge()}
                    // value={props.assessed}
                    // readOnly={!isEditMode}
                    // onChange={(e) => setLicenseType(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 ">
              <div className="row mt-1">
                <div className="col-lg-7 my_profile_setting_input form-group text-end">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      // paddingTop: "15px",
                      color: "#2e008b",
                      fontWeight: "",
                      // marginTop: "-13px",
                      fontSize: "12px",
                    }}
                  >
                    Depreciation on metal(%)
                  </label>
                </div>
                <div className="col-lg-4">
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={calculateDepreciationOnMetal()}
                    // value={props.difference}
                    // readOnly={!isEditMode}
                    // onChange={(e) => setLicenseType(e.target.value)}

                    // placeholder="Enter Registration No."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
