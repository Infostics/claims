import { useEffect, useState } from "react";
import ErrorPageContent from "./ErrorPageContent";
import toast from "react-hot-toast";
import axios from "axios";

const Index = () => {
  const [feeReport, setFeeReport] = useState({});
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const url = window.location.pathname;
    const leadId = url.split("/bill-document/")[1];
    toast.loading("Fetching details!!!");
    axios
      .get("/api/getFeeReport", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
        params: {
          LeadId: leadId,
        },
      })
      .then((res) => {
        toast.dismiss();
        setFeeReport(res.data.data);
        toast.success("Successfully Fetched !!");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err);
      });
  }, []);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="bg-gray-800 text-white">
          {" "}
          {/* <div className="col-lg-12 d-flex justify-content-between">
            <div>
              <h5>MT Engineer</h5>
            </div>
            <div>
              <span>MSL/HMH/2024/11/10043 - RJ31CA6796</span>
            </div>
          </div>
          <div style={{ border: "1px solid black" }} className="mb-2"></div> */}
        </header>
        <main className="flex-grow p-4">
          {" "}
          <div className="col-lg-12">
            <ErrorPageContent feeReport={feeReport} />
          </div>
        </main>
        <footer className="bg-gray-800 text-white">
          {/* common footer content */}
          <hr style={{ border: "2px solid black" }} />
          <div className="text-dark">
            <h5 className="text-center text-dark">
              H.O. Address : 58-Gandhi Nagar,Near Bal Niketan School ,Sri
              Ganganagar(Raj.)-335001
            </h5>
            <h5 className="text-center text-dark">
              Ofce: B-43,NFL Society,Sector-PI,Gr Noida-201310./E-201,MAPSKO
              Mountville,Sector-79,Gurugram(Hr)
            </h5>
          </div>
          {/* common footer content */}
        </footer>
        {/* Print-specific styles */}
        <style>
          {`
          @media print {
            footer {
              position: fixed;
              bottom: 0;
              width: 100%;
              background-color: #333; /* Customize as needed */
              color: white; /* Customize as needed */
            }
          }
        `}
        </style>
      </div>
      {/* <section className="" style={{ paddingTop: "10px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ErrorPageContent feeReport={feeReport} />
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Index;
