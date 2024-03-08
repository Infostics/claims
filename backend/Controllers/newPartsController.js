const db = require("../Config/dbConfig");


const getSpecificNewParts = (req,res)=>{
    const leadId = req.params.leadId;
    db.query("SELECT * FROM NewPartsReport", (err, result2) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(200).send(result2);
    });
  };

 const updateNewParts1 = async (req, res) => {
 
    try {
      const leadId = req.params.leadId;
  
      
      const data = JSON.parse(req.body.allRows);
 
  
      const promises = data.map((row,index) => {
        return new Promise((resolve, reject) => {
          const insertQuery = `
            INSERT INTO NewPartsReport (
              DepreciationPct,
              SNO,
              ItemName,
              HSNCode,
              Remark,
              Estimate,
              Assessed,
              QE,
              QA,
              BillSr,
              GSTPct,
              TypeOfMaterial,
              WithTax,
              IsActive,
              LeadID
            ) VALUES (
              '${row.dep}',
               ${row.sno},
              '${row.description}',
              '${row.sac}',
              '${row.remark}',
              '${row.estimate}',
              '${row.assessed}',
              '${row.qe}',
              '${row.qa}',
              '${row.bill_sr}',
              '${row.gst}',
              '${row.type}',
              '${row.total}',
              '${row.isActive}',
              '${parseInt(leadId)}'
            );
          `;
  
          const updateQuery = `
            UPDATE NewPartsReport
            SET
              DepreciationPct = '${row.dep}',
              SNO=${row.sno},
              ItemName = '${row.description}',
              HSNCode='${row.sac}',
              Remark='${row.remark}',
              Estimate = '${row.estimate}',
              Assessed = '${row.assessed}',
              QA='${row.qa}',
              QE = '${row.qe}',
              BillSr = '${row.Bill_sr}',
              GSTPct='${row.gst}',
              TypeOfMaterial='${row.type}',
              WithTax='${row.total}',
              IsActive='${row.isActive}'
            WHERE ReportID = '${row.sno}' AND
            LeadID = '${leadId}';
          `;
  
  
         
          db.query("SELECT * FROM NewPartsReport WHERE ReportID = ? AND LeadID =?", [row.sno,leadId], (err, result2) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }
  
           
            if (result2.length ) {
              db.query(updateQuery, (err) => {
                if (err) {
                  console.error(err);
                  reject(err);
                  return;
                }
                resolve();
              });
            } else {
              db.query(insertQuery, (err) => {
                if (err) {
                  console.error(err);
                  reject(err);
                  return;
                }
                resolve();
              });
            }
          });
        
        });
      });
  
      await Promise.all(promises);
  
      res.status(200).send("Successfully updated!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
    
  };
  

  module.exports={getSpecificNewParts,updateNewParts1}
  
