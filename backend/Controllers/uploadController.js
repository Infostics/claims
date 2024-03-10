const db = require("../Config/dbConfig");
const generateUniqueToken = require("../Config/generateToken");
const uploadToAWS = require("../Middleware/awsUpload");
const uploadToAWSVideo = require("../Middleware/awsUploadVideo");

const getReportDocument = (req, res) => {
  const LeadId = req.query.leadId;
  const sql = "SELECT * FROM ReportDocuments WHERE LeadId =?";
  db.query(sql, [LeadId], (error, results) => {
    if (error) {
      console.error("Error while fetching the report documents:", error);
      return res
        .status(500)
        .json({ error: "Error inserting data into VehicleDetails." });
    }

    return res.status(200).json({ results });
  });
};

// const getDocuments = (req, res) => {
//   const LeadId = req.query.LeadId;
//   console.log("get", LeadId);
//   const sql = "SELECT * FROM DocumentList WHERE LeadId =?";
//   db.query(sql, [LeadId], (err, result) => {
//     if (err) {
//       // console.error(err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }
//     res.send(result);
//   });
// };

const getDocuments = (req, res) => {
  const LeadId = req.query.LeadId;
  console.log("get", LeadId);
  const sql = "SELECT DocumentName, GROUP_CONCAT(Photo1) as doc_url, GROUP_CONCAT(Attribute1) as file_name, GROUP_CONCAT(Photo1Latitude) as latitude, GROUP_CONCAT(Photo1Longitude) as longitude, GROUP_CONCAT(Photo1Timestamp) as timestamp  FROM DocumentList  WHERE LeadID = ?  GROUP BY DocumentName;";
  db.query(sql, [LeadId], (err, result) => {
    if (err) {
      // console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }else {
      console.log('Documents result ',result);
    }
    res.send(result);
  });
};

const uploadClaimMedia = (req, res) => {
  const {
    garage,
    fileUrl,
    fileName,
    reportType,
    LeadId,
    isLastChunk,
    uploadedBy,
    file,
  } = req.body;

  uploadToAWS(file, fileName)
    .then((Location) => {
      const insertUploadDetails = `
          INSERT INTO ReportDocuments (
            LeadId,
            FileName,
            FilePath,
            UploadedBy,
            GarageName,
            ReportType
          ) VALUES (
            '${LeadId}',
            '${fileName}',
            '${Location}',
            '${uploadedBy}',
            '${garage}',
            '${reportType}'
          );
        `;

      // Execute the SQL queries individually

      db.query(insertUploadDetails, (error, results) => {
        if (error) {
          console.error("Error inserting data into VehicleDetails:", error);
          return res
            .status(500)
            .json({ error: "Error inserting data into VehicleDetails." });
        }

        return res.status(200).json({ Location });
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    });
};
const uploadDocument = (req, res) => {
  const data = req.body;

<<<<<<< Updated upstream
  
  const type = data.type;
  const file = data;

  if(!file){
    res.status(500)
    .json({ error: "Error uploading documents ." });
  }
  

      const Location = file.data[0].Location;
      const latitude= Location?.split(",")[0];
      const longitude = Location?.split(",")[1];
      const insertUploadDetails = `
      INSERT INTO DocumentList (
        LeadId,
        DocumentName,
        Photo1,
        Attribute1,
        Photo1Latitude,
        Photo1Longitude,
        Photo1Timestamp
      ) VALUES (
        '${file.leadId}',
        '${file.docName}',
        '${file.data[0].url}',
        '${file.data[0].name}',
        '${latitude}',
        '${longitude}',
        '${file.data[0].Timestamp}'
      );
    `;

      db.query(insertUploadDetails, (error, results) => {
        if (error) {
          console.error("Error inserting data into Upload Details:", error);
          return res
            .status(500)
            .json({ error: "Error inserting data into DocumentDetails." });
        }
        return res.status(200).json({ message: "Data inserted successfully." });
      });
=======
  console.log(data);
  return ;

  const type = data.type;
  if(!data){
    res.status(500)
    .json({ error: "Error uploading documents ." });
  }
  const currentLeadId = data.leadId || data.data[0]?.leadId;

  const currentData = data.data;
  let LeadId = currentData[0]?.leadId;
  currentData?.forEach((data, idx) => {
    let files;

    if (data.data) {
      // Format 1: When data is an array
      files = data.data.flat().map((file) => {
        console.log("file", file.url);
        return {
          Photo1: file.url,
          Attribute1: file.name,
          leadID: LeadId,
          docName: data.docName,
          Location: file.location,
          photo1Timestamp: file.time,
          Photo1Latitude: file.location?.split(",")[0],
          Photo1Longitude: file.location?.split(",")[1],
        };
      });
       const claimToken = generateUniqueToken();


  const insertTokeDteials =  String(type) === "1" ?  `
    UPDATE ClaimDetails
    SET InsuredToken='${claimToken}'
    WHERE LeadId = ${LeadId};
      ` : String(type) === "2" ?  `
      UPDATE ClaimDetails
      SET ImageToken='${claimToken}'
      WHERE LeadId = ${LeadId};
    `
    :  `
    UPDATE ClaimDetails
    SET VideoToken='${claimToken}'
    WHERE LeadId = ${LeadId};
    `;

  db.query(insertTokeDteials, (error, results) => {
    if (error) {
      console.error("Error inserting data into CL Details:", error);
      return res.status(500).json({ error: "Error." });
    }
  });
    } else {
      // Format 2: When url is directly provided
     
      files = [
        {
          Photo1: data.url,
          Attribute1: data.name,
          leadID: data.leadId,
          docName: data.docName,
          Location: data.Location,
          photo1Timestamp: data.Timestamp,
          Photo1Latitude: data.Location?.split(",")[0],
          Photo1Longitude: data.Location?.split(",")[1],
        },
      ];
    }
    console.log("FILSE------", files);
>>>>>>> Stashed changes

};


const uploadDocumentV2 = (req, res) => {
  const data = req.body;



  const type = data.type;
  const files = data.data;

  if(!files){
    res.status(500)
    .json({ error: "Error uploading documents ." });
  }
  
  const LeadId = files[0].leadId;

  files?.map((file,index)=>{
    const insideData = file.data;
    const docName = file.docName;

    insideData?.map((tempData,idx)=>{
      const Location = tempData[0]?.location;
      const latitude= Location?.split(",")[0];
      const longitude = Location?.split(",")[1];
      const insertUploadDetails = `
      INSERT INTO DocumentList (
        LeadId,
        DocumentName,
        Photo1,
        Attribute1,
        Photo1Latitude,
        Photo1Longitude,
        Photo1Timestamp
      ) VALUES (
        '${LeadId}',
        '${docName}',
        '${tempData[0].url}',
        '${tempData[0].name}',
        '${latitude}',
        '${longitude}',
        '${tempData[0].time}'
      );
    `;

   
      db.query(insertUploadDetails, (error, results) => {
        if (error) {
          console.error("Error inserting data into Upload Details:", error);
          return res
            .status(500)
            .json({ error: "Error inserting data into DocumentDetails." });
        }
         return res.status(200).json({ message: "Data inserted successfully." });
      });
    })
   

  });

<<<<<<< Updated upstream
  const claimToken = generateUniqueToken();


    const insertTokeDteials =  String(type) === "1" ?  `
      UPDATE ClaimDetails
      SET InsuredToken='${claimToken}'
      WHERE LeadId = ${LeadId};
        ` : String(type) === "2" ?  `
        UPDATE ClaimDetails
        SET ImageToken='${claimToken}'
        WHERE LeadId = ${LeadId};
      `
      :  `
      UPDATE ClaimDetails
      SET VideoToken='${claimToken}'
      WHERE LeadId = ${LeadId};
      `;
  
     
      
    db.query(insertTokeDteials, (error, results) => {
      if (error) {
        console.error("Error updating token in claim Details:", error);
        return res.status(500).json({ error: "Error." });
      }
      return res.status(200).json({ message: "Data inserted successfully." });
    });

  

 
=======
>>>>>>> Stashed changes
};

const uploadMedia = async (req, res) => {
  try {
    const { file, name } = req.body;
    const filesData = file;
    const nameInfo = name;

    const results = [];

    for (let i = 0; i < filesData.length; i++) {
      const fileData = filesData[i]; // Use a different name for the loop iteration
      const fileName = nameInfo[i];

      // Check if the file data starts with "data:image/"
      if (
        fileData.startsWith("data:image/") ||
        fileData.startsWith("'data:application/pdf")
      ) {
        const data = await uploadToAWS(fileData, fileName);
        results.push(data);
      } else if (fileData.startsWith("data:video/")) {
        const prefixToRemove = "data:video/webm;base64,";
        const dataWithoutPrefix = fileData.substring(prefixToRemove.length);

        const data = await uploadToAWSVideo(dataWithoutPrefix, fileName);
        // const data = await uploadToAWSVideo(fileData, fileName);
        // console.log('BLOBB',fileData);
        results.push(data);
      } else {
        console.log(`Unsupported file format for ${fileName}`);
        // Optionally handle the error or skip the file
        continue;
      }
    }
    console.log("result", results);
    return res.status(200).json({ data: results });
  } catch (error) {
    console.log("Error log", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const verifyReportUpload = (req, res) => {
  const { userName, reportId } = req.body;
  const updateVerifyReport = `
    UPDATE ReportDocuments
          SET
          VerifiedBy = '${userName}',
          IsVerified = '${1}'
          WHERE ReportId = ${reportId};
    `;
  db.query(updateVerifyReport, (err, result2) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send("Internal Server Error while updating the verified status");
      return;
    }
    // console.log(result2[0].Token === token);
    res.status(200).send("Successfully Updated!!");
  });
};

module.exports = {
  getReportDocument,
  getDocuments,
  uploadClaimMedia,
  uploadDocument,
  uploadMedia,
  verifyReportUpload,
<<<<<<< Updated upstream
  uploadDocumentV2
};
=======
};
>>>>>>> Stashed changes
