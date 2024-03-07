import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const StatusLog = ({leadId,status,statusOptions,subStatus,claim,documents}) => {

  const [stat , setStat] = useState(0);
  const [subStage,setSubStage] = useState(0);
  const [currentStatus,setCurrentStatus]=useState(1);

  console.log("status",documents);

  let data = [
    {
      serial_num: "1",
      doc_name: "Driving licence",
    },
    {
      serial_num: "2",
      doc_name: "Certificate of registration",
    },
    {
      serial_num: "3",
      doc_name: "Repair Estimate",
    },
    {
      serial_num: "4",
      doc_name: "Claim form",
    },
    {
      serial_num: "5",
      doc_name: "Insurance policy",
    },
    {
      serial_num: "6",
      doc_name: "Damage vehicle photographs/video",
    },
    {
      serial_num: "7",
      doc_name: "Aadhar card",
    },
    {
      serial_num: "8",
      doc_name: "Pan card",
    },
    {
      serial_num: "9",
      doc_name: " Cancel cheque",
    },
    {
      serial_num: "10",
      doc_name: " Satisfaction voucher",
    },
    {
      serial_num: "11",
      doc_name: "Discharge voucher",
    },
    {
      serial_num: "12",
      doc_name: "Dismantle photographs",
    },
    {
      serial_num: "13",
      doc_name: "Reinspection photographs",
    },
    {
      serial_num: "14",
      doc_name: "Repair Invoice",
    },
    {
      serial_num: "15",
      doc_name: "Payment/cash receipt",
    },
    {
      serial_num: "16",
      doc_name: "Images",
    },
    {
      serial_num: "17",
      doc_name: "Videos",
    },
  ];

  useEffect(()=>{
    let stat2 = {};
    if(status.length <= 0){
    }
    else{

    status?.map((stat,index)=>{
      if(String(stat.LeadId) === String(leadId)){
        stat2=stat;
      }
    });
  }

    setCurrentStatus(stat2?.Status);

  },[status.length]);

  const getValueFromDocName=(docName)=>{
    let value = -1;
    
    data.map((temp,index)=>{
      
      if(String(temp.doc_name) === String(docName)){
        value = temp.serial_num;
      }
    })

    return value;
  }

  const getUpperBound = ()=>{
    if(String(stat)=== "1")
      return 5;
    if(String(stat)=== "2")
      return 8;
    if(String(stat)=== "3")
      return 11;
    if(String(stat)=== "4")
      return 14;
    if(String(stat)=== "5")
      return 17;
  }


  //function to update the status on documents validation
  const checkIsValidated = ()=>{
      let arr = new Array(18).fill(0);
      arr[0]=1;
      console.log(documents)
      documents?.map((doc,index)=>{
        const value = getValueFromDocName(doc.docName);
        arr[value]++;
      })

      const upperValue = getUpperBound();
      console.log(upperValue,arr);

      let canUpdateStatus = 0;
      arr.map((value,index)=>{
        if(Number(index) <= Number(upperValue)  && value){
         canUpdateStatus +=1;
        }
      })

      return (canUpdateStatus -1) === upperValue;

      
  }
  const onSubmitHandler = ()=>{

    const canUpdate = checkIsValidated();
 
    if(!canUpdate && stat>1){
      toast.error("Cannot update Status as documents are filled !");
    }
    else{
    
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const payload = {
      LeadId : Number(leadId),
      Status :  (stat) ,
      subStage : subStage ?Number(subStage) : Number(3),
      token : Number(userInfo[0].Token)
    };

    axios.put("/api/updateStatus",payload,{
      headers:{
        Authorization:`Bearer ${userInfo[0].Token}`,
        "Content-Type":"application/json"
      }
    }).then((res)=>{
      alert("Successfully Updated!!");
      window.location.reload();
    }).catch((err)=>{
      alert(err);
    });
  }
  }
  const getCurrentStatus=()=>{
    let status = "";
    statusOptions.map((stat,index)=>{
      if(stat.id === currentStatus)
       status = stat;
    });
    return status;
  }
  console.log(stat);
  return (
    <>
      <div className="col-lg-12">
        <div className="row my_profile_setting_input form-group">
          <div className="col-lg-12 mb-2 mt-2">
            <select
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
              value={stat ? stat : currentStatus}
              onChange={(e)=>setStat(e.target.value)}
            >
              {statusOptions.map((stat,index)=>{
                return   <option key={index} data-tokens="Status1" value={stat.id} >{stat.value}</option>

              })}
            </select>
          </div>
        
          <div className="col-lg-12 text-center mt-2">
            <div className="my_profile_setting_input">
              <button className="btn btn-color w-100" onClick={onSubmitHandler}>Update Status</button>
            </div>
          </div>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default StatusLog;
