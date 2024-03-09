// import CopyrightFooter from "../common/footer/CopyrightFooter";
// import Footer from "../common/footer/Footer";
// import Header from "../common/header/DefaultHeader";
// import MobileMenu from "../common/header/MobileMenu";
// import PopupSignInUp from "../common/PopupSignInUp";
import { useEffect, useState } from "react";
import ErrorPageContent from "./ErrorPageContent";
import axios from "axios";

const Index = () => {
  const [allInfo, setAllInfo] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    const url = window.location.pathname;
    const leadId = url.split("/report-document/")[1];

    console.log(leadId);
    axios
      .get("/api/getReportInfo", {
        headers: {
          Authorization: `Bearer ${userData[0].Token}`,
        },
        params: {
          LeadId: leadId,
        },
      })
      .then((res) => {
        setAllInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      {/* <Header /> */}

      {/* <!--  Mobile Menu --> */}
      {/* <MobileMenu /> */}

      {/* <!-- Modal --> */}
      {/* <PopupSignInUp /> */}
      {/* <!-- Our Error Page --> */}

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
            <ErrorPageContent allInfo={allInfo} />
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
              <ErrorPageContent allInfo={allInfo} />
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Index;
