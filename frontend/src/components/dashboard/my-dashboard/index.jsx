import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu_01";
import MobileMenu from "../../common/header/MobileMenu";
import Activities from "./Activities";
import AllStatistics from "./AllStatistics";
import StatisticsChart from "./StatisticsChart";
import Exemple from "./Exemple";
import CreateList from "./CreateList";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import Pagination from "./Pagination";
import { useRouter } from "next/router";

const Index = () => {
  const [start, setStart] = useState(0);

  const [properties, setProperties] = useState([]);
  const [allClaims, setAllClaims] = useState([]);
  const [filterCardClaim, setFilterCardClaim] = useState([]);
  const [selectedCard, setSelectedCard] = useState(0);
  const [end, setEnd] = useState(10);
  const [type, setType] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const [filterClaims, setFilterClaims] = useState([]);
  const [majorSearch, setMajorSearch] = useState("");

  const [status, setStatus] = useState([]);
  const [isRegionChange, setIsRegionChange] = useState(false);
  const [regionSearchValue, setRegionSearchValue] = useState();

  useEffect(() => {
    let filterClaim;
    if (type === 1) {
      filterClaim = allClaims.filter((claim, index) =>
        claim?.PolicyNo?.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else if (type === 2) {
      filterClaim = allClaims.filter((claim, index) =>
        claim?.RegistrationNo?.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else {
      filterClaim = allClaims.filter((claim, index) =>
        claim?.ReferenceID?.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    setFilterClaims(filterClaim);
  }, [searchInput]);
  console.log("regionSearchValue", regionSearchValue);

  const [filterAccordingClaim, setFilterAccordingClaim] = useState([]);
  const [showRegionClaim, setShowRegionClaim] = useState(false);
  useEffect(() => {
    const region = JSON.parse(localStorage.getItem("regionType"));
    if (region) {
      setShowRegionClaim(true);

      const filterAccordingToRegion = allClaims.filter((claim) => {
        console.log("all Claims", claim.Region, region);
        if (claim.Region == region) {
          return true;
        } else {
          return false;
        }
      });
      console.log(filterAccordingToRegion);
      setFilterClaims(filterAccordingToRegion);
      setFilterAccordingClaim(filterAccordingToRegion);
    } else {
      setShowRegionClaim(false);
    }
  }, [regionSearchValue]);
  console.log("isRegionChange", isRegionChange);
  useEffect(() => {
    let filterClaim;

    filterClaim = allClaims.filter(
      (claim, index) =>
        claim?.PolicyNo?.toLowerCase().includes(majorSearch.toLowerCase()) ||
        claim?.PolicyHolder?.toLowerCase().includes(
          majorSearch.toLowerCase()
        ) ||
        claim?.ReferenceID?.toLowerCase().includes(majorSearch.toLowerCase()) ||
        claim?.RegistrationNo?.toLowerCase().includes(
          majorSearch.toLowerCase()
        ) ||
        claim?.AssignedGarage?.toLowerCase().includes(
          majorSearch.toLowerCase()
        ) ||
        claim?.Region?.toLowerCase().includes(majorSearch.toLowerCase())
    );

    // console.log("claims",filterClaim);
    setFilterClaims(filterClaim);
  }, [majorSearch]);

  // useEffect(() => {
  //   let filterClaim;
  //   const region = JSON.parse(localStorage.getItem("regionType"));

  //   if (region) {
  //     filterClaim = allClaims.filter((claim, index) => {
  //       const regiontest = claim?.reference_id?.split("/")[0];
  //       if (region.toLowerCase().includes(regiontest?.toLowerCase())) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });

  //     setFilterClaims(filterClaim);
  //   }
  // }, [isRegionChange]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    console.log(userInfo);
    if (userInfo === "") {
      router.push("/login");
    } else {
      const { Region1, Region2, Region3, CalimStatus } = userInfo[0];
      console.log(userInfo[0])
      toast.loading("Fetching all the claims!!");
      axios
        .get("/api/getAllClaims", {
          params: {
            Region1,
            Region2,
            Region3,
            CalimStatus,
          },
          headers: {
            Authorization: `Bearer ${userInfo[0]?.Token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          toast.success("Successfully fetched!");
          toast.dismiss();
          setAllClaims(res.data.data[0]);
        })
        .catch((err) => {
          toast.error("error while fetching all claims!");
        });

      axios
        .get("/api/getStatus", {
          headers: {
            Authorization: `Bearer ${userInfo[0].Token}`,
            "Content-Type": "application/json",
          },
          params: {
            leadId: "",
          },
        })
        .then((res) => {
          const temp = res.data.data;

          setStatus(temp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const getCurrentLinkedClaim = (id)=>{
    let tempClaim = {};
    allClaims?.map((claim,index)=>{
      if(String(claim.LeadID) === String(id)){
        tempClaim = claim;
      }
    })
    return tempClaim;
  }

  useEffect(() => {
    let temp = [];
    if (selectedCard === 0) {
      temp = allClaims;
    } else {

     
      status.filter((status, index) => {
        if (String(status.Status) === String(selectedCard)) {
          temp.push(getCurrentLinkedClaim(status.LeadId));
        } else {
          return false;
        }
      });
    }

    console.log(temp);

    setFilterCardClaim(temp.sort((a, b) => a.LeadID - b.LeadID));
  }, [selectedCard]);
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header
        setIsRegionChange={setIsRegionChange}
        isDashboard={true}
        setRegionSearchValue={setRegionSearchValue}
      />
      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
          {/* <Sidebar /> */}
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                {/* <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Howdy, Hasan</h2>
                    <p>We are glad to see you again!</p>
                  </div>
                </div> */}
              </div>
              {/* End .row */}

              <div
                className="row mt-2"
                style={{ justifyContent: "space-between" }}
              >
                <AllStatistics
                  allClaims={
                    searchInput || majorSearch || isRegionChange
                      ? filterClaims
                      : status
                  }
                  setSelectedCard={setSelectedCard}
                />
              </div>
              {/* End .row Dashboard top statistics */}
              <div
                className=" bg-dark"
                style={{
                  width: "101%",
                  height: "3px",
                  color: "blue",
                  border: "1px solid",
                  marginBottom: "5px",
                  marginLeft: "-12px",
                }}
              ></div>
              <div className="row">
                <CreateList setSearchInput={setSearchInput} setType={setType} />
              </div>
              <div
                className="bg-dark"
                style={{
                  width: "101%",
                  height: "3px",
                  color: "blue",
                  border: "1px solid blue",
                  marginLeft: "-12px",
                }}
              ></div>
              <div className="row">
                {/* <div className="col-xl-7">
                  <div className="application_statics">
                    <h4 className="mb-4">View Statistics</h4>
                    <StatisticsChart />
                  </div>
                </div> */}
                {/* End statistics chart */}
                <Exemple
                  claims={
                    searchInput || majorSearch || isRegionChange
                      ? filterClaims
                      : selectedCard
                      ? filterCardClaim
                      : allClaims
                  }
                  start={start}
                  end={end}
                  setMajorSearch={setMajorSearch}
                  status={status}
                />
                {/* <div className="col-xl-5">
                  <div className="recent_job_activity">
                    <h4 className="title mb-4">Recent Activities</h4>
                    <Activities />
                  </div>
                </div> */}
              </div>
              {/* End .row  */}

              <div className="row">
                <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <Pagination
                      setStart={setStart}
                      setEnd={setEnd}
                      properties={
                        searchInput || majorSearch || isRegionChange
                          ? filterClaims
                          : selectedCard > 0
                          ? filterCardClaim
                          : showRegionClaim
                          ? filterAccordingClaim
                          : allClaims
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>
                      {" "}
                      &copy; {new Date().getFullYear()} Infostics. Made with
                      love.
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
