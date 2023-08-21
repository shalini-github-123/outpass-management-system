import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listOutpassFaculty,
  listOutpassStudent,
  listOutpassWarden,
} from "../actions/outpassActions";
import { listRegister } from "../actions/registerActions";
import Navbar from "./Navbar";

export default function ViewHistory() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const outpassList = useSelector((state) => state.outpassList);
  const { loading, error, outpasses } = outpassList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const registerList = useSelector((state) => state.registerList);
  const { registers } = registerList;

  console.log("student outpass", outpasses);
  console.log("student userInfo", userInfo);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("userInfo.studentId : ", userInfo.objectId);
    if (userInfo.id[0] === "S") dispatch(listOutpassStudent(userInfo.objectId));
    else if (userInfo.id[0] === "F")
      dispatch(listOutpassFaculty(userInfo.objectId));
    else if (userInfo.id[0] === "W")
      dispatch(listOutpassWarden(userInfo.objectId));
    else dispatch(listRegister(userInfo.objectId));
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate]);

  console.log("this:", registers);
  let filteredOutpasses = [];
  let filteredRegisters = [];
  let DisplayData = null;
  if (outpasses && outpasses.length) {
    filteredOutpasses = outpasses.filter((outpass) => {
      return (
        outpass.classInchargeId.toLowerCase().includes(search.toLowerCase()) ||
        outpass.wardenId.toLowerCase().includes(search.toLowerCase()) ||
        outpass.from.toLowerCase().includes(search.toLowerCase()) ||
        outpass.to.toLowerCase().includes(search.toLowerCase()) ||
        outpass.place.toLowerCase().includes(search.toLowerCase()) ||
        outpass.reason.toLowerCase().includes(search.toLowerCase()) ||
        outpass.status.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  DisplayData = filteredOutpasses?.map((outpass) => {
    return (
      <tr key={outpass._id}>
        {userInfo.id[0] !== "S" && <td>{outpass.studentId?.id || ""}</td>}
        {userInfo.id[0] !== "S" && <td>{outpass.studentId?.name || ""}</td>}
        {userInfo.id[0] !== "F" && <td>{outpass.classInchargeId || ""}</td>}
        {userInfo.id[0] !== "W" && <td>{outpass.wardenId || ""}</td>}
        <td>{outpass.from}</td>
        <td>{outpass.to}</td>
        <td>{outpass.place}</td>
        <td>{outpass.reason}</td>
        <td>{outpass.status}</td>
      </tr>
    );
  });
  if (registers) {
    const filteredRegisters = registers.filter((register) => {
      const studentId = register.outpassId.studentId;
      const year =
        studentId && typeof studentId.year === "number"
          ? studentId.year.toString()
          : "";

      return (
        (studentId &&
          studentId.name.toLowerCase().includes(search.toLowerCase())) ||
        (studentId &&
          studentId.dept.toLowerCase().includes(search.toLowerCase())) ||
        (studentId &&
          studentId.room.toLowerCase().includes(search.toLowerCase())) ||
        year.includes(search.toLowerCase()) ||
        register.outpassId.from.toLowerCase().includes(search.toLowerCase()) ||
        register.outpassId.to.toLowerCase().includes(search.toLowerCase()) ||
        register.outpassId.place.toLowerCase().includes(search.toLowerCase()) ||
        register.outpassId.reason.toLowerCase().includes(search.toLowerCase())
      );
    });

    DisplayData = filteredRegisters.map((register) => {
      return (
        <tr key={register._id}>
          <td>{register.sNo}</td>
          <td>{register.outpassId.studentId.id || ""}</td>
          <td>{register.outpassId.studentId.name || ""}</td>
          <td>{register.outpassId.studentId.dept || ""}</td>
          <td>{register.outpassId.studentId.year || ""}</td>
          <td>{register.outpassId.studentId.room || ""}</td>
          <td>{register.outTime || ""}</td>
          <td>{register.inTime || ""}</td>
          <td>{register.outpassId.place}</td>
          <td>{register.outpassId.reason}</td>
          <td>{register.outpassId._id}</td>
        </tr>
      );
    });
  }

  return (
    <>
      <Navbar
        role={
          userInfo.id[0] === "S"
            ? "student"
            : userInfo.id[0] === "F"
              ? "faculty"
              : userInfo.id[0] === "W"
                ? "warden"
                : userInfo.id[0] === "G"
                  ? "security"
                  : ""
        }
        homeLink={
          userInfo.id[0] === "S"
            ? "/student"
            : userInfo.id[0] === "F"
              ? "/faculty"
              : userInfo.id[0] === "W"
                ? "/warden"
                : userInfo.id[0] === "G"
                  ? "/security"
                  : ""
        }
      />

      <div>
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            position: "sticky",
            top: "0",
            backgroundColor: "none",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid gray",
              width: "300px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            overflow: "auto",
          }}
        >
          <div
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              overflow: "auto",
            }}
          >
            <table
              className="table table-striped"
              style={{
                backgroundColor: "white",
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              {userInfo.id[0] !== "G" && (
                <thead>
                  <tr>
                    {userInfo.id[0] !== "S" && <th>StudentID</th>}
                    {userInfo.id[0] !== "S" && <th>Student Name</th>}
                    {userInfo.id[0] !== "F" && <th>ClassInchargeID</th>}
                    {userInfo.id[0] !== "W" && <th>WardenID</th>}
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Place</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
              )}
              {userInfo.id[0] === "G" && (
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>StudentID</th>
                    <th>Student Name</th>
                    <th>Dept</th>
                    <th>Year</th>
                    <th>Room</th>
                    <th>Out Time</th>
                    <th>In Time</th>
                    <th>Place</th>
                    <th>Reason</th>
                    <th>Outpass ID</th>
                  </tr>
                </thead>
              )}
              <tbody>{DisplayData}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
