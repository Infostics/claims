import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Video = ({ videos }) => {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [capturedImages, setCapturedImages] = useState([]);

  const [allLocations, setAllLocations] = useState([]);


  const handleVideoEnded = () => {
    setCapturedImages([]);
    setOpen(false);
  };

  const handleVideoPause = () => {
    setOpen(false);
  };

  console.log("videos", videos);
  const handleCaptureSnapshot = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas not initialized.");
      return;
    }

    // Get the context of the canvas
    const context = canvas.getContext("2d");

    // Draw the current frame of the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Capture snapshot from canvas
    const snapshotImage = canvas.toDataURL("image/png");

    // Update state with captured snapshot
    setCapturedImages((prevImages) => [...prevImages, snapshotImage]);

    // Show custom popup
    setPopupContent("Snapshot captured successfully!");
    setShowPopup(true);
  };

  const handleSelectedVudeo = (id) => {
    setSelectedVideo(id);
    setOpen(true);
  };

  console.log("selectedVideoIndex", selectedVideo, videos[selectedVideo]);

  const handleGeneratePDF = () => {
    if (!capturedImages) {
      alert("First please click the snapshots!!");
    } else {
      const pdf = new jsPDF();

      // Loop through captured images and add to PDF
      capturedImages.forEach((image, index) => {
        if (index > 0) {
          pdf.addPage();
        }
        pdf.addImage(image, "PNG", 10, 10, 180, 100);
      });

      // Save PDF
      pdf.save(`${videos[selectedVideo].name}_snapshots.pdf`);

      // Show custom popup
      setPopupContent("PDF downloaded successfully!");
      setShowPopup(true);

      setCapturedImages([]);
      setOpen(false);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleNextVideo = () => {
    if (selectedVideo < videos.length - 1) {
      setSelectedVideo((prevSelected) => prevSelected + 1);
      setCapturedImages([]);
      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const locationsPromises = videos.map((video) =>
        getLocationFromCoordinates(video.latitude, video.longitude)
      );

      try {
        const resolvedLocations = await Promise.all(locationsPromises);
        setAllLocations(resolvedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [videos]);

  console.log("allLoction", allLocations);

  const handlePreviousVideo = () => {
    if (selectedVideo > 0) {
      setSelectedVideo((prevSelected) => prevSelected - 1);
      setCapturedImages([]);
      setOpen(false);
    }
  };

  const convertTimestampToReadableTime = (timestamp) => {
    // Create a new Date object using the timestamp
    const date = new Date(timestamp);

    // Get month names
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Extract individual components of the date
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const period = date.getHours() < 12 ? "AM" : "PM";

    // Format the time string
    const formattedTime = `${day} ${month} ${year}, ${hours}:${minutes} ${period}`;

    return formattedTime;
  };

  async function getLocationFromCoordinates(latitude, longitude) {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.display_name) {
        // Extract the formatted address
        const formattedAddress = data.display_name;
        return formattedAddress;
      } else {
        throw new Error("Failed to retrieve location information.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  }

  return (
    <>
      <div className="faq_according row">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSix">
              <button
                className="btn accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="false"
                aria-controls="collapseSix"
                style={{ padding: "10px 10px 0 25px" }}
              >
                <h4 className="">Videos</h4>
              </button>
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse collapse"
              aria-labelledby="headingSix"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body bgc-f6">
                <div className="row">
                  <div className="col-lg-4 text-start mb-2">
                    <table>
                      <tr>
                        <th
                          style={{
                            border: "1px solid black",
                            padding: "10px",
                            minWidth: "25%", // Adjust the minimum width as needed
                            width: "25%",
                          }}
                        >
                          Video Id
                        </th>
                        <th
                          style={{ border: "1px solid black", padding: "10px" }}
                        >
                          Video Name
                        </th>
                        <th
                          style={{ border: "1px solid black", padding: "10px" }}
                        >
                          Uploaded At
                        </th>
                      </tr>

                      {videos?.map((video, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "10px",
                            }}
                          >
                            {index}
                          </td>
                          <td
                            onClick={() => handleSelectedVudeo(index)}
                            style={{
                              border: "1px solid black",
                              padding: "10px",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            {video.name}
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "10px",
                            }}
                          >
                            {convertTimestampToReadableTime(video?.timestamp)}
                          </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                  <div className="col-lg-7">
                    <div className="row">
                      <div className="container">
                        <div className="property_video">
                          {/* Video container */}
                          <div
                            className={`thumb ${open ? "video-container" : ""}`}
                          >
                            {open ? (
                              <>
                                <video
                                  ref={videoRef}
                                  width={492}
                                  height={190}
                                  controls
                                  autoPlay
                                  muted
                                  // onEnded={handleVideoEnded}
                                  // onPause={handleVideoPause}
                                  crossOrigin="anonymous"
                                >
                                  <source
                                    src={videos[selectedVideo]?.url}
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                                <canvas
                                  ref={canvasRef}
                                  style={{ display: "none" }}
                                ></canvas>
                              </>
                            ) : (
                              videos.length <=0 ?
                              <p>No Videos Found !!</p>
                              :
                              <>
                              <Image
                                width={492}
                                height={190}
                                className="pro_img w100 w-100 cover"
                                src="/assets/images/background/7.jpg"
                                alt="7.jpg"
                              />
                              <div className="overlay_icon">
                                <div
                                  onClick={() => setOpen(!open)}
                                  role="button"
                                  className="video_popup_btn red popup-youtube"
                                >
                                  <span className="flaticon-play"></span>
                                </div>
                              </div>
                              </>
                             
                            )}
                           
                          </div>
                        </div>
                      </div>
                    </div>
                    {open && (
                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <button
                            className="btn btn-thm m-1"
                            onClick={handleCaptureSnapshot}
                          >
                            Capture
                          </button>
                          <button
                            className="btn btn-thm m-1"
                            onClick={handleGeneratePDF}
                          >
                            Generate Pdf
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Custom Popup */}
      {showPopup && (
        <div className="custom-popup">
          <div className="popup-content">
            <p>{popupContent}</p>
            <button onClick={handlePopupClose}>Close</button>
            <><table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Media FileName</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.column1}</td>
                  <td>{item.column2}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
          </div>
          
        
        </div>
      )}
    </>
  );
};

export default Video;
