import Header from "../../common/header/dashboard/Header_01";
import { useEffect, useState } from "react";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import ChatboxContent from "./ChatboxContent";
// import CreateList from "./CreateList";
import Form from "./Form";
import Form_01 from "./Form_01";
import Form_02 from "./Form_02";
import axios from "axios";
import StatusLog from "./StatusLog";
import Exemple from "./Exemple";
import UploadReort from "./UploadReport";
import PaymentDetails from "./PaymentDetails";
import GarageDetails from "./GarageDetails";
import CreateList from "./CreateList";
import CreateList_01 from "./CreateList_01";
import Video from "./Video";
import EstimateList from "./EstimateList";
import CreateList_02 from "./CreateList_02";
import CreateList_03 from "./CreateList_03";
import { toast, Toaster } from "react-hot-toast";
import CreateList_04 from "./CreateList_04";
import Loader from "../../common/Loader";
import { useRouter } from "next/router";
// import FloorPlans from "./FloorPlans";
// import LocationField from "./LocationField";
// import PropertyMediaUploader from "./PropertyMediaUploader";

const Index = ({}) => {
  const url = window.location.href;
  const leadId = url.split("/claim-details?leadId=")[1];
  const [claim, setClaim] = useState({});

  console.log("GETSPACIFIEDCLAIMS", claim);

  const [videosList, setVideosList] = useState([]);

  const [reload, setReload] = useState(false);

  const [policyIssuingOffice, setPolicyIssuingOffice] = useState("");

  const [claimRegion, setClaimRegion] = useState("");

  const [claimServicingOffice, setClaimServicingOffice] = useState("");

  const [policyStartDate, setPolicyStartDate] = useState("");
  const [policyEndDate, setPolicyEndDate] = useState("");
  const [insuranceCompanyNameAddress, setInsuranceCompanyNameAddress] =
    useState("");
  const [insuredAddedBy, setInsuredAddedBy] = useState("");

  const formatDate = (dateString) => {
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const [InsuredName, setInsuredName] = useState("");
  const [InsuredMailAddress, setInsuredMailAddress] = useState("");
  const [InsuredMobileNo1, setInsuredMobileNo1] = useState("");
  const [InsuredMobileNo2, setInsuredMobileNo2] = useState("");

  const [subType, setSubType] = useState("Motor");
  const [inspectionType, setInspectionType] = useState("Final");

  const [documents, setDocuments] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ClaimNumber, setClaimNumber] = useState("");

  const [VehicleModel, setVehicleModel] = useState("");

  const [EngineType, setEngineType] = useState("");
  const [VehicleRegisteredOwner, setVehicleRegisteredOwner] = useState("");
  const [DateRegistration, setDateRegistration] = useState("");
  const [PUCNumber, setPUCNumber] = useState("");
  const [TransferDate, setTransferDate] = useState("");

  const [VehicleInsuranceUpto, setVehicleInsuranceUpto] = useState("");

  const [EngineNumber, setEngineNumber] = useState("");
  const [AddedBy, setAddedBy] = useState("");
  const [IssuingAuthority, setIssuingAuthority] = useState("");

  const [LicenseNumber, setLicenseNumber] = useState("");
  const [LicenseType, setLicenseType] = useState("");
  const [VehicleChassisNumber, setVehicleChassisNumber] = useState("");
  const [VehicleFuelType, setVehicleFuelType] = useState("");

  const [DriverName, setDriverName] = useState("");
  const [DriverAddedDate, setDriverAddedDate] = useState("");
  const [Verification, setVerification] = useState("verified By Online");

  const [status, setStatus] = useState("");

  const [GarageNameAndAddress, setGarageNameAndAddress] = useState("");
  const [GarageContactNo1, setGarageContactNo1] = useState("");
  const [GarageContactNo2, setGarageContactNo2] = useState("");
  const [GarageAddedBy, setGarageAddedBy] = useState("");

  const [editCase, setEditCase] = useState(false);
  const [editCase_01, setEditCase_01] = useState(false);
  const [editCase_02, setEditCase_02] = useState(false);
  const [editVechile, setEditVehichle] = useState(false);
  const [edit, setEdit] = useState(false);

  const getNextYear = () => {
    const oneYearLater = new Date(policyStartDate);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    oneYearLater.setMonth(oneYearLater.getMonth());
    oneYearLater.setDate(oneYearLater.getDate() - 1);

    return oneYearLater;
  };

  const getDateConversion = (date) => {
    const formattedOneYearLater = date?.split("T")[0];
    return formattedOneYearLater;
  };

  //New Fields
  const [VehicleClassDescription, setVehicleClassDescription] = useState("");
  const [MakerDesc, setMakerDesc] = useState("");
  const [MakerModel, setMakerModel] = useState(
    claim?.vehicleOnlineDetails?.MakerModel
  );

  // console.log("CONTANT11111", MakerModel);

  const [ManufactureMonthYear, setManufactureMonthYear] = useState("");
  const [VehicleGvw, setVehicleGvw] = useState("");
  const [CubicCapacity, setCubicCapacity] = useState(
    claim?.vehicleDetails?.VehicleCubicCapacity
  );
  const [BancsBodyType, setBancsBodyType] = useState("");
  const [BancsMakeCode, setBancsMakeCode] = useState("");
  const [BancsModelCode, setBancsModelCode] = useState("");
  const [BancsSubtypeCode, setBancsSubtypeCode] = useState("");
  const [BancsVehicleClass, setBancsVehicleClass] = useState("");
  const [BancsVehicleSegment, setBancsVehicleSegment] = useState("");
  const [FitUpto, setFitUpto] = useState("");
  const [PasiaModelCode, setPasiaModelCode] = useState("");
  const [VehiclePermanentAddress, setVehiclePermanentAddress] = useState("");
  const [RcRtoCode, setRcRtoCode] = useState("");
  const [VehicleInsuranceCompany, setVehicleInsuranceCompany] = useState("");
  const [VehicleSeatingCapacity, setVehicleSeatingCapacity] = useState("");
  const [RcInsuranceComp, setRcInsuranceComp] = useState("");
  const [RcInsuranceUpto, setRcInsuranceUpto] = useState("");
  const [RcVehicleType, setRcVehicleType] = useState("");
  const [VehicleRcStatus, setVehicleRcStatus] = useState("");
  const [VehicleBlackListStatus, setVehicleBlackListStatus] = useState("");
  const [VehicleRegistedAt, setVehicleRegistedAt] = useState("");
  const [PermanentAddress, setPermanentAddress] = useState("");
  const [ClassOfVehicle, setClassOfVehicle] = useState("");

  //driver fetch details
  const [FatherName, setFatherName] = useState("");
  const [Gender, setGender] = useState("");
  const [BloodGroup, setBloodGroup] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Address, setAddress] = useState("");
  const [RtoName, setRtoName] = useState("");
  const [ValidUpto, setValidUpto] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [DateOfIssue, setDateOfIssue] = useState("");
  const [Vov, setVov] = useState("");
  const [Pht, setPht] = useState("");
  const [Photo, setPhoto] = useState("");

  const [IsRcDetailsFetched, setIsRcDetailsFetched] = useState(1);
  const [IsDriverDetailsFetched, setIsDriverDetailsFetched] = useState(1);

  const statusOptions = [
    {
      id: 1,
      value: "Claim Appointment",
    },
    {
      id: 2,
      value: "Estimate Approval Pending",
    },
    {
      id: 3,
      value: "Vehicle Under repair",
    },
    {
      id: 4,
      value: "Invoice Approval Pending",
    },
    {
      id: 5,
      value: "Surveyor Report Pending",
    },
    {
      id: 6,
      value: "Hard Copies Pending",
    },
    {
      id: 7,
      value: "Soft Copy Completed",
    },
    {
      id: 8,
      value: "Payment Pending",
    },
    {
      id: 9,
      value: "Settled Cases",
    },
    {
      id: 10,
      value: "Withdrawl/Rejected",
    },
    {
      id: 11,
      value: "More Info Required",
    },
    {
      id: 12,
      value: "My Claims",
    },
  ];

  const subStatus = [
    {
      id: 1,
      value: "Withdrawl/Reject",
    },
    {
      id: 2,
      value: "More Info Required",
    },
    {
      id: 3,
      value: "More forward!",
    },
  ];

  useEffect(() => {
    // const oneYearLater = (policyStartDate);
    // oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    // oneYearLater.setMonth(oneYearLater.getMonth());
    // oneYearLater.setDate(oneYearLater.getDate() - 1);
    // const formattedOneYearLater = oneYearLater.toISOString().split("T")[0];
    // setPolicyEndDate(formattedOneYearLater);
  }, [policyStartDate]);

  useEffect(() => {
    setPolicyIssuingOffice(
      claim?.claimDetails?.PolicyIssuingOffice
        ? claim?.claimDetails?.PolicyIssuingOffice
        : policyIssuingOffice
    );
    setClaimRegion(
      claim?.claimDetails?.Region ? claim?.claimDetails?.Region : claimRegion
    );
    setClaimServicingOffice(
      claim?.claimDetails?.ClaimServicingOffice
        ? claim?.claimDetails?.ClaimServicingOffice
        : claimServicingOffice
    );

    setMobile(claim?.driverDetails?.Mobile ? claim?.driverDetails?.Mobile : "");
    setPolicyStartDate(
      claim?.claimDetails?.PolicyPeriodStart
        ? claim?.claimDetails?.PolicyPeriodStart
        : policyStartDate
    );
    setPolicyEndDate(
      claim?.claimDetails?.PolicyPeriodEnd
        ? claim?.claimDetails?.PolicyPeriodEnd
        : policyEndDate
    );

    setInsuranceCompanyNameAddress(
      claim?.claimDetails?.InsuranceCompanyNameAddress
        ? claim?.claimDetails?.InsuranceCompanyNameAddress
        : insuranceCompanyNameAddress
    );
    setSubType(
      claim?.claimDetails?.SurveyType
        ? claim?.claimDetails?.SurveyType
        : subType
    );
    setLicenseNumber(
      claim?.driverDetails?.LicenseNumber
        ? claim?.driverDetails?.LicenseNumber
        : LicenseNumber
    );
    setIssuingAuthority(
      claim?.driverDetails?.IssuingAuthority
        ? claim?.driverDetails?.IssuingAuthority
        : IssuingAuthority
    );
    setInsuredAddedBy(
      claim?.insuredDetails?.AddedBy
        ? claim?.insuredDetails?.AddedBy
        : insuredAddedBy
    );
    setVehicleRegisteredNumber(
      claim?.vehicleDetails?.RegisteredNumber
        ? claim?.vehicleDetails?.RegisteredNumber
        : VehicleRegisteredNumber
    );
    setInsuredName(
      claim?.insuredDetails?.InsuredName
        ? claim?.insuredDetails?.InsuredName
        : InsuredName
    );
    setPolicyIssuingOffice(
      claim?.claimDetails?.PolicyIssuingOffice
        ? claim?.claimDetails?.PolicyIssuingOffice
        : policyIssuingOffice
    );

    setInsuredMailAddress(
      claim?.insuredDetails?.InsuredMailAddress
        ? claim?.insuredDetails?.InsuredMailAddress
        : InsuredMailAddress
    );
    setInsuredMobileNo1(
      claim?.insuredDetails?.InsuredMobileNo1
        ? claim?.insuredDetails?.InsuredMobileNo1
        : InsuredMobileNo1
    );
    setInsuredMobileNo2(
      claim?.insuredDetails?.InsuredMobileNo2
        ? claim?.insuredDetails?.InsuredMobileNo2
        : InsuredMobileNo2
    );
    setSubType(
      claim?.claimDetails?.SurveyType
        ? claim?.claimDetails?.SurveyType
        : subType
    );
    setInspectionType(
      claim?.claimDetails?.InspectionType
        ? claim?.claimDetails?.InspectionType
        : inspectionType
    );
    setVehicleModel(
      claim.vehicleDetails?.TypeOfBody
        ? claim.vehicleDetails?.TypeOfBody
        : VehicleModel
    );
    setEngineType(
      claim?.vehicleDetails?.ModeOfCheck
        ? claim?.vehicleDetails?.ModeOfCheck
        : EngineType
    );
    setVehicleRegisteredOwner(
      claim?.vehicleDetails?.RegisteredOwner
        ? claim?.vehicleDetails?.RegisteredOwner
        : VehicleRegisteredOwner
    );
    setDateRegistration(
      claim?.vehicleDetails?.DateOfRegistration
        ? claim?.vehicleDetails?.DateOfRegistration
        : DateRegistration
    );
    setPUCNumber(
      claim?.vehicleDetails?.PucNumber
        ? claim?.vehicleDetails?.PucNumber
        : PUCNumber
    );
    setTransferDate(
      claim?.vehicleDetails?.TransferDate
        ? claim?.vehicleDetails?.TransferDate
        : TransferDate
    );
    setEngineNumber(
      claim?.vehicleDetails?.EngineNumber
        ? claim?.vehicleDetails?.EngineNumber
        : EngineNumber
    );
    setAddedBy(
      claim?.vehicleDetails?.AddedBy ? claim?.vehicleDetails?.AddedBy : AddedBy
    );
    setLicenseType(
      claim?.driverDetails?.LicenseType
        ? claim?.driverDetails?.LicenseType
        : LicenseType
    );
    setVehicleChassisNumber(
      claim?.vehicleDetails?.ChassisNumber
        ? claim?.vehicleDetails?.ChassisNumber
        : VehicleChassisNumber
    );
    setVehicleFuelType(
      claim?.vehicleDetails?.FuelType
        ? claim?.vehicleDetails?.FuelType
        : claim?.vehicleDetails?.BancsFuelType
        ? claim?.vehicleDetails?.BancsFuelType
        : VehicleFuelType
    );

    setDriverName(
      claim?.driverDetails?.DriverName
        ? claim?.driverDetails?.DriverName
        : DriverName
    );
    setDriverAddedDate(
      claim?.driverDetails?.AddedDate
        ? claim?.driverDetails?.AddedDate
        : DriverAddedDate
    );
    setVerification(
      claim?.driverDetails?.TypeOfVerification === 0
        ? "Verified By Online"
        : "Verified Manually"
    );
    setGarageNameAndAddress(
      claim?.garageDetails?.GarageNameAndAddress
        ? claim?.garageDetails?.GarageNameAndAddress
        : GarageNameAndAddress
    );
    setGarageContactNo1(
      claim?.garageDetails?.GarageContactNo1
        ? claim?.garageDetails?.GarageContactNo1
        : GarageContactNo1
    );
    setGarageContactNo2(
      claim?.garageDetails?.GarageContactNo2
        ? claim?.garageDetails?.GarageContactNo2
        : GarageContactNo2
    );
    setGarageAddedBy(
      claim?.garageDetails?.AddedBy
        ? claim?.garageDetails?.AddedBy
        : GarageAddedBy
    );

    // New Fields
    setVehicleClassDescription(
      claim?.vehicleDetails?.ClassDescription
        ? claim?.vehicleDetails?.ClassDescription
        : VehicleClassDescription
    );
    setMakerDesc(
      claim?.vehicleDetails?.MakerDesc
        ? claim?.vehicleDetails?.MakerDesc
        : MakerDesc
    );
    setMakerModel(
      claim?.vehicleDetails?.MakerModel
        ? claim?.vehicleDetails?.MakerModel
        : MakerModel
    );
    setManufactureMonthYear(
      claim?.vehicleDetails?.ManufactureMonthYear
        ? claim?.vehicleDetails?.ManufactureMonthYear
        : ManufactureMonthYear
    );
    setVehicleGvw(
      claim?.vehicleDetails?.VehicleGvw
        ? claim?.vehicleDetails?.VehicleGvw
        : VehicleGvw
    );
    setCubicCapacity(
      claim?.vehicleDetails?.CubicCapacity
        ? claim?.vehicleDetails?.CubicCapacity
        : CubicCapacity
    );
    setBancsBodyType(
      claim?.vehicleDetails?.BancsBodyType
        ? claim?.vehicleDetails?.BancsBodyType
        : BancsBodyType
    );
    setBancsMakeCode(
      claim?.vehicleDetails?.BancsMakeCode
        ? claim?.vehicleDetails?.BancsMakeCode
        : BancsMakeCode
    );
    setBancsModelCode(
      claim?.vehicleDetails?.BancsModelCode
        ? claim?.vehicleDetails?.BancsModelCode
        : BancsModelCode
    );
    setBancsSubtypeCode(
      claim?.vehicleDetails?.BancsSubtypeCode
        ? claim?.vehicleDetails?.BancsSubtypeCode
        : BancsSubtypeCode
    );
    setBancsVehicleClass(
      claim?.vehicleDetails?.BancsVehicleClass
        ? claim?.vehicleDetails?.BancsVehicleClass
        : BancsVehicleClass
    );
    setBancsVehicleSegment(
      claim?.vehicleDetails?.BancsVehicleSegment
        ? claim?.vehicleDetails?.BancsVehicleSegment
        : BancsVehicleSegment
    );
    setFitUpto(
      claim?.vehicleDetails?.FitUpto ? claim?.vehicleDetails?.FitUpto : FitUpto
    );
    setPasiaModelCode(
      claim?.vehicleDetails?.PasiaModelCode
        ? claim?.vehicleDetails?.PasiaModelCode
        : PasiaModelCode
    );
    setVehiclePermanentAddress(
      claim?.vehicleDetails?.PermanentAddress
        ? claim?.vehicleDetails?.PermanentAddress
        : PermanentAddress
    );
    setRcRtoCode(
      claim?.vehicleDetails?.RcRtoCode
        ? claim?.vehicleDetails?.RcRtoCode
        : RcRtoCode
    );
    setVehicleInsuranceCompany(claim?.vehicleDetails?.VehicleInsuranceCompany);
    setVerification(
      claim?.driverDetails?.TypeOfVerification || "Verified By Online"
    );
    setVehicleSeatingCapacity(
      claim?.vehicleDetails?.SeatingCapacity
        ? claim?.vehicleDetails?.SeatingCapacity
        : VehicleSeatingCapacity
    );
    setRcInsuranceComp(
      claim?.vehicleDetails?.VehicleInsuranceCompany
        ? claim?.vehicleDetails?.VehicleInsuranceCompany
        : VehicleInsuranceCompany
    );
    setRcInsuranceUpto(
      claim?.vehicleDetails?.VehicleInsuranceUpto
        ? claim?.vehicleDetails?.VehicleInsuranceUpto
        : VehicleInsuranceUpto
    );
    setRcVehicleType(
      claim?.vehicleDetails?.VehicleType
        ? claim?.vehicleDetails?.VehicleType
        : RcVehicleType
    );
    setVehicleRcStatus(
      claim?.vehicleDetails?.VehicleRcStatus
        ? claim?.vehicleDetails?.VehicleRcStatus
        : VehicleRcStatus
    );
    setVehicleBlackListStatus(
      claim?.vehicleDetails?.VehicleRcStatus
        ? claim?.vehicleDetails?.VehicleRcStatus
        : VehicleBlackListStatus
    );
    setVehicleRegistedAt(
      claim?.vehicleDetails?.VehicleRegistedAt
        ? claim?.vehicleDetails?.VehicleRegistedAt
        : VehicleRegistedAt
    );
    setPermanentAddress(
      claim?.vehicleDetails?.PermanentAddress
        ? claim?.vehicleDetails?.PermanentAddress
        : PermanentAddress
    );
    setClassOfVehicle(
      claim?.vehicleDetails?.ClassOfVehicle
        ? claim?.vehicleDetails?.ClassOfVehicle
        : ClassOfVehicle
    );
    // getNextYear();

    //driver details fetched
    setFatherName(
      claim?.driverDetails?.FatherName
        ? claim?.driverDetails?.FatherName
        : FatherName
    );
    setGender(
      claim?.driverDetails?.Gender ? claim?.driverDetails?.Gender : Gender
    );
    setBloodGroup(
      claim?.driverDetails?.BloodGroup
        ? claim?.driverDetails?.BloodGroup
        : BloodGroup
    );
    setAddress(
      claim?.driverDetails?.Address ? claim?.driverDetails?.Address : Address
    );
    setRtoName(
      claim?.driverDetails?.RtoName ? claim?.driverDetails?.RtoName : RtoName
    );
    setVov(claim?.driverDetails?.Vov ? claim?.driverDetails?.Vov : Vov);
    setPht(claim?.driverDetails?.Pht ? claim?.driverDetails?.Pht : Pht);
    setPhoto(claim?.driverDetails?.Photo ? claim?.driverDetails?.Photo : Photo);
    setValidUpto(
      claim.driverDetails?.ValidUpto
        ? formatDate(claim.driverDetails?.ValidUpto)
        : ValidUpto
    );

    setDateOfBirth(
      claim?.driverDetails?.DateOfBirth
        ? formatDate(claim?.driverDetails?.DateOfBirth)
        : DateOfBirth
    );
    setDateOfIssue(
      claim?.driverDetails?.DateOfIssue
        ? formatDate(claim?.driverDetails?.DateOfIssue)
        : DateOfIssue
    );

    setIsDriverDetailsFetched(
      claim?.claimDetails?.IsDriverDetailsFetched
        ? claim?.claimDetails?.IsDriverDetailsFetched
        : IsDriverDetailsFetched
    );
    setIsRcDetailsFetched(
      claim?.claimDetails?.IsRcDetailsFetched
        ? claim?.claimDetails?.IsRcDetailsFetched
        : IsRcDetailsFetched
    );
  }, [claim]);

  // console.log("datat ", VehicleInsuranceCompany);

  const generateRegion = (region) => {
    const firstThreeLetters = region?.slice(0, 3);

    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const result = `${firstThreeLetters}/${mm}/${dd}${hh}${min}${ss}`;

    return result;
  };
  console.log("policyStartDate", policyStartDate);

  const [VehicleRegisteredNumber, setVehicleRegisteredNumber] = useState("");

  const calculateTheUpdateType = (type) => {
    if (String(type) === "1") return "updateClaimDetails";
    else if (String(type) === "2") return "updateVehicleDetails";
    else if (String(type) === "3") return "updateDriverDetails";
    return "updategarageDetails";
  };

  const [isClaimLoading, setIsClaimLoading] = useState(false);

  function convertAndFormatDate(inputDate) {
    // Remove leading whitespaces, if any
    const trimmedDate = inputDate;

    // Convert the date string to a Date object
    const dateObject = new Date(trimmedDate);

    // Format the date to "dd/mm/yyyy"
    const formattedDate = dateObject.toLocaleDateString("en-GB");

    return formattedDate;
  }

  const onSaveHandler = (APItype, func, func2) => {
    const type = calculateTheUpdateType(APItype);

    console.log(insuranceCompanyNameAddress);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const vehicleParts = VehicleModel?.split(",");

    const region = JSON.parse(localStorage.getItem("regionType"));

    const payload = {
      InsuredName: InsuredName
        ? InsuredName
        : claim.insuredDetails?.InsuredName,
      InsuredMailAddress: InsuredMailAddress
        ? InsuredMailAddress
        : claim.insuredDetails?.InsuredMailAddress,
      InsuredMobileNo1: InsuredMobileNo1
        ? InsuredMobileNo1
        : claim.insuredDetails?.InsuredMobileNo1,
      PolicyIssuingOffice: policyIssuingOffice
        ? policyIssuingOffice
        : claim.claimDetails?.PolicyIssuingOffice,
      ClaimRegion: claimRegion ? claimRegion : claim.claimDetails?.ClaimRegion,
      ClaimServicingOffice: claimServicingOffice
        ? claimServicingOffice
        : claim.claimDetails?.ClaimServicingOffice,
      PolicyPeriodStart: policyStartDate,
      PolicyPeriodEnd: policyEndDate,
      InsuranceCompanyNameAddress: insuranceCompanyNameAddress
        ? insuranceCompanyNameAddress
        : claim.claimDetails?.InsuranceCompanyNameAddress,
      InsuredAddedBy: insuredAddedBy
        ? insuredAddedBy
        : claim.claimDetails?.InsuredAddedBy,
      InsuredMobileNo2: InsuredMobileNo2
        ? InsuredMobileNo2
        : claim.insuredDetails?.InsuredMobileNo2,
      ClaimNumber: ClaimNumber ? ClaimNumber : claim.claimDetails?.ClaimNumber,
      VehicleTypeOfBody: VehicleModel
        ? VehicleModel
        : claim.claimDetails?.VehicleModel,
      SurveyType: subType ? subType : "Motor",
      InspectionType: inspectionType ? inspectionType : "Final",
      VehicleDateOfRegistration: DateRegistration,
      VehiclePucNumber: PUCNumber
        ? PUCNumber
        : claim.vehicleDetails?.VehiclePucNumber,
      VehicleTransferDate: TransferDate,
      VehicleEngineNumber: EngineNumber
        ? EngineNumber
        : claim.vehicleDetails?.VehicleEngineNumber,
      VehicleAddedBy: AddedBy ? AddedBy : claim.vehicleDetails?.VehicleAddedBy,
      IssuingAuthority: IssuingAuthority
        ? IssuingAuthority
        : claim.driverDetails?.IssuingAuthority,
      LicenseNumber: LicenseNumber
        ? LicenseNumber
        : claim.driverDetails?.LicenseNumber,
      LicenseType: LicenseType ? LicenseType : claim.driverDetails?.LicenseType,
      VehicleChassisNumber: VehicleChassisNumber
        ? VehicleChassisNumber
        : claim.vehicleDetails?.VehicleChassisNumber,
      VehicleFuelType: VehicleFuelType
        ? VehicleFuelType
        : claim.vehicleDetails?.VehicleFuelType,
      DriverName: DriverName ? DriverName : claim.driverDetails?.DriverName,
      DriverAddedDate: DriverAddedDate,
      DriverTypeOfVerification: Verification
        ? Verification
        : claim.driverDetails?.DriverTypeOfVerification,
      GarageNameAndAddress: GarageNameAndAddress
        ? GarageNameAndAddress
        : claim.garageDetails?.GarageNameAndAddress,
      GarageAddedBy: GarageAddedBy
        ? GarageAddedBy
        : claim.garageDetails?.GarageAddedBy,
      GarageContactNo1: GarageContactNo1
        ? GarageContactNo1
        : claim.garageDetails?.GarageContactNo1,
      GarageContactNo2: GarageContactNo2
        ? GarageContactNo2
        : claim.garageDetails?.GarageContactNo2,
      LeadId: claim.claimDetails?.LeadID,

      VehicleClassDescription,
      MakerDesc,
      MakerModel,
      VehicleGvw,
      CubicCapacity,
      VehicleSeatingCapacity,
      VehiclePermanentAddress,
      FitUpto: FitUpto !== "" ? FitUpto : claim?.vehicleDetails?.FitUpto,
      PasiaModelCode,
      RcInsuranceComp,
      RcInsuranceUpto,
      RcVehicleType,
      BancsModelCode,
      BancsMakeCode,
      BancsSubtypeCode,
      BancsBodyType,
      BancsVehicleClass,
      BancsVehicleSegment,
      RcRtoCode,
      VehicleRcStatus,
      VehicleBlackListStatus,
      VehicleRegistedAt,
      VehicleInsuranceCompany,
      ManufactureMonthYear,
      PermanentAddress,
      ClassOfVehicle,
      insuredAddedBy,
      VehicleRegisteredNumber,
      VehicleRegisteredOwner,

      FatherName,
      Gender,
      BloodGroup,
      Mobile,
      Address,
      RtoName,
      ValidUpto: ValidUpto ? convertAndFormatDate(ValidUpto) : "",
      Vov,
      Photo,
      Pht,
      DateOfBirth: DateOfBirth ? convertAndFormatDate(DateOfBirth) : "",
      ClassOfVehicle,
      DateOfIssue: DateOfIssue ? convertAndFormatDate(DateOfIssue) : "",
      SeatingCapacity: VehicleSeatingCapacity,
      IsDriverDetailsFetched,
      IsRcDetailsFetched,

      token: userInfo[0].Token,
    };

    toast.loading("Updating the information!");
    axios
      .put("/api/updateClaimDetails", payload, {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
        params: {
          type: type,
        },
      })
      .then((res) => {
        // toast.loading();
        toast.dismiss();
        toast.success("Successfully Updated the Information !!", {
          // position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-loading-message",
        });
        // alert("Successfully Updated the Information !!");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Caught into Error ! Try Again.", {
          // position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-loading-message",
        });
        // alert("Caught into Error ! Try Again.");
      });
    if (func) {
      func(false);
    } else {
      setEditCase((prop) => !prop);
    }

    setClaim([]);

    axios
      .get("/api/getSpecificClaim", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
        params: {
          LeadId: leadId,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setClaim(res.data.data);
        // toast.success("Successfully Fetched !!")
      })
      .catch((err) => {
        toast.error(err);
      });

    func(false);
    func2(false);
  };

  const updateHandlerAfterFetching = () => {
    setClaim([]);

    axios
      .get("/api/getSpecificClaim", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
        params: {
          LeadId: leadId,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setClaim(res.data.data);
        // toast.success("Successfully Fetched !!")
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const editHandler = (value) => {
    if (value === 1) {
      setEditCase((prop) => !prop);
    } else if (value === 2) {
      setEditCase_01((prop) => !prop);
    } else if (value === 3) {
      setEditCase_02((prop) => !prop);
    }
  };

  const subTypeTypes = [
    { id: 1, type: "Motor", value: "Motor" },
    { id: 1, type: "Non-Motor", value: "Non-Motor" },
    { id: 1, type: "Motor-2W", value: "Motor-2W" },
    { id: 1, type: "Motor-4W", value: "Motor-4W" },
  ];

  const requestTypeTypes = [
    { id: 1, type: "SPOT", value: "SPOT" },
    { id: 1, type: "Final", value: "Final" },
    { id: 1, type: "re-inspection", value: "re-inspection" },
  ];

  const [isStatusModal, setIsStatusModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const handleStatusUpdateHandler = () => {};

  const router = useRouter();

  const closeStatusUpdateHandler = () => {
    setIsStatusModal(false);
  };

  const separateLinks = (linksString) => {
    // Split the input string into an array of links
    const linksArray = linksString.split(",");

    // Trim whitespaces from each link
    const trimmedLinks = linksArray.map((link) => link.trim());

    // Define the common prefix
    const prefix = "https://";

    // Filter and form the final array with the common prefix
    const finalArray = trimmedLinks.filter((link) => link.startsWith(prefix));

    return finalArray;
  };

  const separateStringToArray = (inputString) => {
    // Split the input string into an array using ','
    const resultArray = inputString.split(",");

    // Trim whitespaces from each element in the array
    const trimmedArray = resultArray.map((item) => item.trim());

    return trimmedArray;
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      router.push("/login");
    } else {
      axios
        .get("/api/getSpecificClaim", {
          headers: {
            Authorization: `Bearer ${userInfo[0].Token}`,
            "Content-Type": "application/json",
          },
          params: {
            LeadId: leadId,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          setClaim(res.data.data);
        })
        .catch((err) => {
          toast.error(err);
        });

      axios
        .get("/api/getDocumentList", {
          headers: {
            Authorization: `Bearer ${userInfo[0].Token}`,
            "Content-Type": "application/json",
          },
          params: {
            leadId: leadId,
          },
        })
        .then((res) => {
          console.log("Documents--------------->", res.data.data);
          const tempList = res.data.data;
          let requiredVideos = [];
          console.log("requiredDocumenstList", tempList);
          tempList.map((list, index) => {
            if (
              list.file_name.toLowerCase().includes(".mp4") ||
              list.file_name.toLowerCase().includes(".mp3")
            ) {
              const allList = separateLinks(list.doc_url);
              const allName = separateStringToArray(list.file_name);
              const allLatitude = separateStringToArray(list?.latitude);
              const allLongitude = separateStringToArray(list?.longitude);
              const allTimestamp = separateStringToArray(list?.timestamp);

              allList?.map((link, idx) => {
                requiredVideos.push({
                  name: allName[idx],
                  url: allList[idx],
                  longitude: allLongitude[idx],
                  latitude: allLatitude[idx],
                  timestamp: allTimestamp[idx],
                });
              });
            }
          });

          let requiredDocumenstList = [];
          tempList.map((temp, index) => {
            let indexTobeFinded = -1;
            requiredDocumenstList?.map((doc, idx) => {
              if (String(temp.DocumentName) === String(doc.docName)) {
                indexTobeFinded = idx;
              }
            });

            if (indexTobeFinded !== -1) {
              const newDocListWithinWhole =
                requiredDocumenstList[indexTobeFinded];
              const newDocListWithin = newDocListWithinWhole.data;

              newDocListWithin.push({
                name: temp.file_name,
                url: temp.doc_url,
                location: temp.latitude + "," + temp.longitude,
                Timestamp: temp.timestamp,
              });

              const oldData = requiredDocumenstList;
              oldData[indexTobeFinded] = newDocListWithin;
              requiredDocumenstList = oldData;
            } else {
              let newDocListWithin = [];

              // Split the doc_url string into an array of URLs
              let urlArray = temp.doc_url.split(",");

              // Split the file_name string into an array of file names
              let fileNameArray = temp.file_name.split(",");

              // Iterate over the arrays and push the corresponding values to newDocListWithin
              for (let i = 0; i < urlArray.length; i++) {
                newDocListWithin.push({
                  name: fileNameArray[i],
                  url: urlArray[i],
                  location: temp.latitude + "," + temp.longitude,
                  Timestamp: temp.timestamp,
                });
              }

              const oldData = requiredDocumenstList;
              oldData.push({
                leadId: temp.LeadId,
                docName: temp.DocumentName,
                data: newDocListWithin,
              });
              requiredDocumenstList = oldData;
            }
          });
          setVideosList(requiredVideos);
          setDocuments(requiredDocumenstList);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("/api/getStatus", {
          headers: {
            Authorization: `Bearer ${userInfo[0].Token}`,
            "Content-Type": "application/json",
          },
          params: {
            leadId: leadId,
          },
        })
        .then((res) => {
          const temp = res.data.data;
          let selectiveStat = [];
          temp.map((stat, index) => {
            if (String(stat.LeadId) === String(leadId)) {
              selectiveStat.push(stat);
            }
          });
          setStatus(selectiveStat);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [leadId]);

  useEffect(() => {
    setIsLoading(false);
  }, [claim]);

  return (
    <>
      <Toaster />
      {/* <!-- Main Header Nav --> */}
      <Header region={claim ? claim?.claimDetails?.ClaimRegion : "N.A."} />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu
            leadId={leadId}
            email={claim.insuredDetails?.InsuredMailAddress}
            policyNo={claim.claimDetails?.PolicyNumber}
            vehicleNo={claim.vehicleDetails?.VehicleEngineNumber}
            Insured={claim.insuredDetails?.InsuredName}
          />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section
        className="our-dashbord dashbord bgc-f7 pb50"
        style={{ marginRight: "-10px" }}
      >
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

                {/* <div className="col-lg-12 mb-2">
                  <div className="style2">
                    <button className="btn btn-color" onClick={editHandler}>
                      {edit ? "Save" : "Edit"}
                    </button>
                  </div>
                </div> */}
                {/* End .col */}

                {isLoading ? (
                  <Loader />
                ) : claim.claimDetails?.InsuredName ? (
                  <div className="row">
                    <div
                      className="smartTable-noDataFound col-12"
                      style={{ marginTop: "110px", marginBottom: "40px" }}
                    >
                      <div className="ring">
                        Loading
                        <span className="load"></span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-lg-9">
                      <div className="">
                        <div className="my_dashboard_review mb-2 bgc-f6">
                          <div className="col-lg-12">
                            <div className="row">
                              <div className="col-lg-2">
                                <h4 className="mt-2">Case Details</h4>
                              </div>
                              {editCase ? (
                                <div className="col-lg-2">
                                  {" "}
                                  <button
                                    className="btn-thm m-1"
                                    style={{}}
                                    onClick={() => {
                                      setIsClaimLoading(true);
                                      onSaveHandler(
                                        1,
                                        setEditCase,
                                        setIsClaimLoading
                                      );
                                    }}
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditCase(false)}
                                    className="btn-thm flaticon-close"
                                    style={{ fontSize: "14px" }}
                                  ></button>
                                </div>
                              ) : (
                                claim?.claimDetails?.PolicyNumber && (
                                  <button
                                    className="col-lg-1 btn-thm m-1"
                                    style={{}}
                                    onClick={() => editHandler(1)}
                                  >
                                    <span
                                      className="flaticon-edit"
                                      style={{ fontSize: "14px" }}
                                    ></span>
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                          <div
                            className=" bg-dark"
                            style={{
                              width: "100%",
                              height: "3px",
                              color: "blue",
                              border: "1px solid",
                              marginBottom: "5px",
                            }}
                          ></div>
                          {isClaimLoading ? (
                            <Loader />
                          ) : !editCase ? (
                            <div className="col-lg-12">
                              <CreateList_02
                                claim={claim}
                                InsuredName={InsuredName}
                                inspectionType={inspectionType}
                                setInspectionType={setInspectionType}
                                setInsuredName={setInsuredName}
                                InsuredMailAddress={InsuredMailAddress}
                                setInsuredMailAddress={setInsuredMailAddress}
                                InsuredMobileNo1={InsuredMobileNo1}
                                setInsuredMobileNo1={setInsuredMobileNo1}
                                InsuredMobileNo2={InsuredMobileNo2}
                                setInsuredMobileNo2={setInsuredMobileNo2}
                                requestTypeTypes={requestTypeTypes}
                                subTypeTypes={subTypeTypes}
                                setRequestType={setInspectionType}
                                requestType={inspectionType}
                                setSubType={setSubType}
                                subType={subType}
                                ClaimNumber={ClaimNumber}
                                setClaimNumber={setClaimNumber}
                                edit={editCase}
                                setIsStatusModal={setIsStatusModal}
                                policyIssuingOffice={policyIssuingOffice}
                                setPolicyIssuingOffice={setPolicyIssuingOffice}
                                claimRegion={claimRegion}
                                setClaimRegion={setClaimRegion}
                                claimServicingOffice={claimServicingOffice}
                                setClaimServicingOffice={
                                  setClaimServicingOffice
                                }
                                policyStartDate={policyStartDate}
                                setPolicyStartDate={setPolicyStartDate}
                                policyEndDate={policyEndDate}
                                setPolicyEndDate={setPolicyEndDate}
                                insuranceCompanyNameAddress={
                                  insuranceCompanyNameAddress
                                }
                                setInsuranceCompanyNameAddress={
                                  setInsuranceCompanyNameAddress
                                }
                                insuredAddedBy={insuredAddedBy}
                                setInsuredAddedBy={setInsuredAddedBy}
                                VehicleRegisteredNumber={
                                  VehicleRegisteredNumber
                                }
                                setVehicleRegisteredNumber={
                                  setVehicleRegisteredNumber
                                }
                              />
                            </div>
                          ) : (
                            <CreateList
                              claim={claim}
                              inspectionType={inspectionType}
                              setInspectionType={setInspectionType}
                              InsuredName={InsuredName}
                              setInsuredName={setInsuredName}
                              InsuredMailAddress={InsuredMailAddress}
                              setInsuredMailAddress={setInsuredMailAddress}
                              InsuredMobileNo1={InsuredMobileNo1}
                              setInsuredMobileNo1={setInsuredMobileNo1}
                              InsuredMobileNo2={InsuredMobileNo2}
                              setInsuredMobileNo2={setInsuredMobileNo2}
                              requestTypeTypes={requestTypeTypes}
                              subTypeTypes={subTypeTypes}
                              setRequestType={setInspectionType}
                              requestType={inspectionType}
                              setSubType={setSubType}
                              subType={subType}
                              ClaimNumber={ClaimNumber}
                              setClaimNumber={setClaimNumber}
                              edit={editCase}
                              setIsStatusModal={setIsStatusModal}
                              policyIssuingOffice={policyIssuingOffice}
                              setPolicyIssuingOffice={setPolicyIssuingOffice}
                              claimRegion={claimRegion}
                              setClaimRegion={setClaimRegion}
                              claimServicingOffice={claimServicingOffice}
                              setClaimServicingOffice={setClaimServicingOffice}
                              policyStartDate={policyStartDate}
                              setPolicyStartDate={setPolicyStartDate}
                              policyEndDate={policyEndDate}
                              setPolicyEndDate={setPolicyEndDate}
                              insuranceCompanyNameAddress={
                                insuranceCompanyNameAddress
                              }
                              setInsuranceCompanyNameAddress={
                                setInsuranceCompanyNameAddress
                              }
                              insuredAddedBy={insuredAddedBy}
                              setInsuredAddedBy={setInsuredAddedBy}
                              VehicleRegisteredNumber={VehicleRegisteredNumber}
                              setVehicleRegisteredNumber={
                                setVehicleRegisteredNumber
                              }
                            />
                          )}
                        </div>
                        <div
                          className="row mt-2 mb-2"
                          style={{ marginLeft: "-15px" }}
                        >
                          <div className="col-lg-12">
                            <Video videos={videosList} />
                          </div>
                        </div>
                        {/* <div className="my_dashboard_review mb-2">
                        <div className="col-lg-12">
                          <div className="row">
                            <h4 className="">
                              Vehicle Details
                              {editCase_01 ? (
                                <button
                                  className="btn-thm m-1"
                                  style={{}}
                                  onClick={() => onSaveHandler()}
                                >
                                  Save
                                </button>
                              ) : (
                                <button
                                  className="btn-thm m-1"
                                  style={{}}
                                  onClick={() => editHandler(2)}
                                >
                                  <span
                                    className="flaticon-edit"
                                    style={{ fontSize: "14px" }}
                                  ></span>
                                </button>
                              )}
                            </h4>
                          </div>
                        </div>
                        <div
                          className=" bg-dark"
                          style={{
                            width: "100%",
                            height: "3px",
                            color: "blue",
                            border: "1px solid",
                            marginBottom: "5px",
                          }}9
                        ></div>
                        {!editCase_01 ? (
                          <div className="col-lg-12">
                            <CreateList_02
                              claim={claim}
                              InsuredName={InsuredName}
                              RegisteredNumber={RegisteredNumber}
                              subType={subType}
                              InsuredMobileNo1={InsuredMobileNo1}
                              ClaimNumber={ClaimNumber}
                              InsuredMailAddress={InsuredMailAddress}
                              requestType={requestType}
                            />
                          </div>
                        ) : (
                          <Form
                            claim={claim}
                            edit={editCase_01}
                            editHandler={editHandler}
                            VehicleModel={VehicleModel}
                            setVehicleModel={setVehicleModel}
                            RegisteredNumber={RegisteredNumber}
                            setRegisteredNumber={setRegisteredNumber}
                            setEngineType={setEngineType}
                            EngineType={EngineType}
                            RegisteredOwner={RegisteredOwner}
                            setRegisteredOwner={setRegisteredOwner}
                            DateRegistration={DateRegistration}
                            setDateRegistration={setDateRegistration}
                            PUCNumber={PUCNumber}
                            setPUCNumber={setPUCNumber}
                            TransferDate={TransferDate}
                            setTransferDate={setTransferDate}
                            EngineNumber={EngineNumber}
                            setEngineNumber={setEngineNumber}
                            AddedBy={AddedBy}
                            setAddedBy={setAddedBy}
                            IssuingAuthority={IssuingAuthority}
                            setIssuingAuthority={setIssuingAuthority}
                            LicenseNumber={LicenseNumber}
                            setLicenseNumber={setLicenseNumber}
                            LicenseType={LicenseType}
                            setLicenseType={setLicenseType}
                            VehicleChassisNumber={VehicleChassisNumber}
                            setVehicleChassisNumber={setVehicleChassisNumber}
                            VehicleFuelType={VehicleFuelType}
                            setVehicleFuelType={setVehicleFuelType}
                          />
                        )}
                      </div> */}
                        <div
                          className="row mt-2 mb-2"
                          style={{ marginLeft: "-15px" }}
                        >
                          <div className="col-lg-12">
                            {/* <h4 className="mb10">Case Details</h4> */}

                            {/* <div
                          className=" bg-dark"
                          style={{
                            width: "100%",
                            height: "3px",
                            color: "blue",
                            border: "1px solid",
                            marginBottom: "5px",
                          }}
                        ></div> */}
                            <Form
                              onSaveHandler={onSaveHandler}
                              claim={claim}
                              edit={editCase_01}
                              editHandler={editHandler}
                              VehicleModel={VehicleModel}
                              setVehicleModel={setVehicleModel}
                              setEngineType={setEngineType}
                              EngineType={EngineType}
                              VehicleRegisteredNumber={VehicleRegisteredNumber}
                              setVehicleRegisteredNumber={
                                setVehicleRegisteredNumber
                              }
                              VehicleRegisteredOwner={VehicleRegisteredOwner}
                              setVehicleRegisteredOwner={
                                setVehicleRegisteredOwner
                              }
                              DateRegistration={DateRegistration}
                              setDateRegistration={setDateRegistration}
                              PUCNumber={PUCNumber}
                              setPUCNumber={setPUCNumber}
                              TransferDate={TransferDate}
                              setTransferDate={setTransferDate}
                              EngineNumber={EngineNumber}
                              setEngineNumber={setEngineNumber}
                              AddedBy={AddedBy}
                              setAddedBy={setAddedBy}
                              IssuingAuthority={IssuingAuthority}
                              setIssuingAuthority={setIssuingAuthority}
                              LicenseNumber={LicenseNumber}
                              setLicenseNumber={setLicenseNumber}
                              LicenseType={LicenseType}
                              setLicenseType={setLicenseType}
                              VehicleChassisNumber={VehicleChassisNumber}
                              setVehicleChassisNumber={setVehicleChassisNumber}
                              VehicleFuelType={VehicleFuelType}
                              setVehicleFuelType={setVehicleFuelType}
                              // New Fields
                              updateHandlerAfterFetching={
                                updateHandlerAfterFetching
                              }
                              setVehicleClassDescription={
                                setVehicleClassDescription
                              }
                              setMakerDesc={setMakerDesc}
                              setMakerModel={setMakerModel}
                              setVehicleGvw={setVehicleGvw}
                              setCubicCapacity={setCubicCapacity}
                              setVehicleSeatingCapacity={
                                setVehicleSeatingCapacity
                              }
                              setVehiclePermanentAddress={
                                setVehiclePermanentAddress
                              }
                              setFitUpto={setFitUpto}
                              setPasiaModelCode={setPasiaModelCode}
                              setRcInsuranceComp={setRcInsuranceComp}
                              setRcInsuranceUpto={setRcInsuranceUpto}
                              setRcVehicleType={setRcVehicleType}
                              setBancsModelCode={setBancsModelCode}
                              setBancsMakeCode={setBancsMakeCode}
                              setBancsSubtypeCode={setBancsSubtypeCode}
                              setBancsBodyType={setBancsBodyType}
                              setBancsVehicleClass={setBancsVehicleClass}
                              setBancsVehicleSegment={setBancsVehicleSegment}
                              setRcRtoCode={setRcRtoCode}
                              VehicleClassDescription={VehicleClassDescription}
                              MakerDesc={MakerDesc}
                              MakerModel={MakerModel}
                              ManufactureMonthYear={ManufactureMonthYear}
                              setManufactureMonthYear={setManufactureMonthYear}
                              VehicleGvw={VehicleGvw}
                              CubicCapacity={CubicCapacity}
                              VehicleSeatingCapacity={VehicleSeatingCapacity}
                              VehiclePermanentAddress={VehiclePermanentAddress}
                              FitUpto={FitUpto}
                              PasiaModelCode={PasiaModelCode}
                              RcInsuranceComp={RcInsuranceComp}
                              RcInsuranceUpto={RcInsuranceUpto}
                              RcVehicleType={RcVehicleType}
                              BancsModelCode={BancsModelCode}
                              BancsMakeCode={BancsMakeCode}
                              BancsSubtypeCode={BancsSubtypeCode}
                              BancsBodyType={BancsBodyType}
                              BancsVehicleClass={BancsVehicleClass}
                              BancsVehicleSegment={BancsVehicleSegment}
                              RcRtoCode={RcRtoCode}
                              setVehicleRcStatus={setVehicleRcStatus}
                              VehicleRcStatus={VehicleRcStatus}
                              VehicleBlackListStatus={VehicleBlackListStatus}
                              setVehicleBlackListStatus={
                                setVehicleBlackListStatus
                              }
                              setVehicleRegistedAt={setVehicleRegistedAt}
                              VehicleRegistedAt={VehicleRegistedAt}
                              setVehicleInsuranceCompany={
                                setVehicleInsuranceCompany
                              }
                              VehicleInsuranceCompany={VehicleInsuranceCompany}
                              PermanentAddress={PermanentAddress}
                              setPermanentAddress={setPermanentAddress}
                              ClassOfVehicle={ClassOfVehicle}
                              setClassOfVehicle={setClassOfVehicle}
                              VehicleInsuranceUpto={VehicleInsuranceUpto}
                              setVehicleInsuranceUpto={setVehicleInsuranceUpto}
                            />
                          </div>
                        </div>
                        <div
                          className="row mt-2"
                          style={{ marginLeft: "-15px" }}
                        >
                          <div className="col-lg-12">
                            {/* <h4 className="mb10">Case Details</h4> */}

                            {/* <div
                          className=" bg-dark"
                          style={{
                            width: "100%",
                            height: "3px",
                            color: "blue",
                            border: "1px solid",
                            mar`ginBottom: "5px",
                          }}
                        ></div> */}
                            <Form_01
                              onSaveHandler={onSaveHandler}
                              claim={claim}
                              edit={editCase_02}
                              LicenseNumber={LicenseNumber}
                              setLicenseNumber={setLicenseNumber}
                              LicenseType={LicenseType}
                              setLicenseType={setLicenseType}
                              IssuingAuthority={IssuingAuthority}
                              setIssuingAuthority={setIssuingAuthority}
                              editHandler={editHandler}
                              DriverName={DriverName}
                              setDriverName={setDriverName}
                              DriverAddedDate={DriverAddedDate}
                              setDriverAddedDate={setDriverAddedDate}
                              Verification={Verification}
                              setVerification={setVerification}
                              FatherName={FatherName}
                              setFatherName={setFatherName}
                              Gender={Gender}
                              setGender={setGender}
                              BloodGroup={BloodGroup}
                              setBloodGroup={setBloodGroup}
                              setAddress={setAddress}
                              Address={Address}
                              setRtoName={setRtoName}
                              RtoName={RtoName}
                              Mobile={Mobile}
                              setMobile={setMobile}
                              ValidUpto={ValidUpto}
                              setValidUpto={setValidUpto}
                              Vov={Vov}
                              setVov={setVov}
                              setPht={setPht}
                              Pht={Pht}
                              Photo={Photo}
                              updateHandlerAfterFetching={
                                updateHandlerAfterFetching
                              }
                              setPhoto={setPhoto}
                              DateOfBirth={DateOfBirth}
                              setDateOfBirth={setDateOfBirth}
                              setDateOfIssue={setDateOfIssue}
                              DateOfIssue={DateOfIssue}
                              setIsDriverDetailsFetched={
                                setIsDriverDetailsFetched
                              }
                            />
                          </div>
                        </div>

                        <div
                          className="row mb-2"
                          style={{ marginLeft: "-15px" }}
                        >
                          {/* {editCase && */}
                          <div className="col-lg-12">
                            {/* <h4 className="mb10">Case Details</h4> */}

                            {/* <div
                          className=" bg-dark"
                          style={{
                            width: "100%",
                            height: "3px",
                            color: "blue",
                            border: "1px solid",
                            marginBottom: "5px",
                          }}
                        ></div> */}
                            <Form_02
                              onSaveHandler={onSaveHandler}
                              claim={claim}
                              editHandler={editHandler}
                              GarageNameAndAddress={GarageNameAndAddress}
                              setGarageNameAndAddress={setGarageNameAndAddress}
                              GarageContactNo1={GarageContactNo1}
                              setGarageContactNo1={setGarageContactNo1}
                              GarageContactNo2={GarageContactNo2}
                              setGarageContactNo2={setGarageContactNo2}
                              GarageAddedBy={GarageAddedBy}
                              setGarageAddedBy={setGarageAddedBy}
                            />
                          </div>
                        </div>

                        <div
                          className="row mb-2"
                          style={{ marginLeft: "-15px" }}
                        >
                          <div className="col-lg-12">
                            <EstimateList onSaveHandler={onSaveHandler} />
                          </div>
                        </div>

                        <div
                          className="row mb-2"
                          style={{ marginLeft: "-15px" }}
                        >
                          <div className="col-lg-12 text-center">
                            {/* <ErrorPageContent /> */}
                            <Exemple documents={documents} leadId={leadId} />
                          </div>
                        </div>
                        <div
                          className="row mb-2"
                          style={{ marginLeft: "-15px" }}
                        >
                          <div className="col-lg-12 text-center">
                            {/* <ErrorPageContent /> */}
                            <UploadReort leadId={leadId} />
                          </div>
                        </div>
                        <div
                          className="row mb-2"
                          style={{ marginLeft: "-15px" }}
                        >
                          <div className="col-lg-12 text-center">
                            {/* <ErrorPageContent /> */}
                            <PaymentDetails />
                          </div>
                        </div>
                        {/* <div className="row mb-2" style={{ marginLeft: "-15px" }}>
                        <div className="col-lg-12 text-center">
                          <ErrorPageContent />
                          <GarageDetails />
                        </div>
                      </div> */}
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="">
                        <div className="row" style={{ marginLeft: "0px" }}>
                          <div className="row mb-2 my_dashboard_review bgc-f6">
                            <div className="col-lg-12">
                              <h4 className="mb10">Status Log</h4>
                            </div>
                            <div
                              className=" bg-dark"
                              style={{
                                width: "100%",
                                height: "3px",
                                color: "blue",
                                border: "1px solid",
                                marginBottom: "5px",
                              }}
                            ></div>
                            <StatusLog
                              leadId={leadId}
                              status={status}
                              statusOptions={statusOptions}
                              subStatus={subStatus}
                              documents={documents}
                              claim={claim}
                            />
                            {/* <CreateList /> */}
                          </div>
                          {/* <hr /> */}
                          <div className="row mt-2 mb-2 my_dashboard_review bgc-f6">
                            <div className="col-lg-12">
                              <h4 className="mb10">Comment Log</h4>
                            </div>
                            <div
                              className=" bg-dark"
                              style={{
                                width: "100%",
                                height: "3px",
                                color: "blue",
                                border: "1px solid",
                                marginBottom: "5px",
                              }}
                            ></div>
                            <ChatboxContent />
                          </div>
                          {/* <hr /> */}
                          <div className="row mt-2 my_dashboard_review bgc-f6">
                            <div className="col-lg-12">
                              <h4 className="mb10">Previous Year Policy</h4>
                            </div>
                            <div
                              className=" bg-dark"
                              style={{
                                width: "100%",
                                height: "3px",
                                color: "blue",
                                border: "1px solid",
                                marginBottom: "5px",
                              }}
                            ></div>
                          </div>

                          {isStatusModal && (
                            <div className="modal">
                              <div className="modal-content">
                                <h3 className="text-center">
                                  Broker Status Update
                                </h3>
                                <hr />
                                <div className="d-flex justify-content-center">
                                  <select
                                    className="form-select"
                                    data-live-search="true"
                                    data-width="100%"
                                    // value={buildinRef}
                                    // onChange={(e) => setBuildinRef(e.target.value)}
                                    // onChange={(e) => setBuildinRef(e.target.value)}
                                    // disabled={isDisable}
                                    style={{
                                      paddingTop: "10px",
                                      paddingBottom: "10px",
                                      backgroundColor: "#E8F0FE",
                                      width: "300px",
                                    }}
                                  >
                                    {/* {BrokerStatus.map((item, index) => {
                          return (
                            <option key={item.id} value={item.value}>
                              {item.type}
                            </option>
                          );
                        })} */}
                                  </select>
                                </div>
                                <hr />
                                {/* <p>Are you sure you want to delete the property: {property.area}?</p> */}
                                <div className="text-center" style={{}}>
                                  <button
                                    className="btn w-25 btn-color"
                                    onClick={closeStatusUpdateHandler}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="btn btn-color w-25"
                                    style={{ marginLeft: "12px" }}
                                    onClick={handleStatusUpdateHandler}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* End .row */}

              <div className="row mt200">
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