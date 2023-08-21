import React, { useState } from "react";
import "./Outpass.css";
import axios from "axios";
import QRCodeDisplay from "./QRCodeDisplay";

export default function Outpass({
  student,
  searchText,
  name,
  appdate,
  fromtime,
  totime,
  block,
  room,
  place,
  status,
  reason,
  dept,
  year,
  id,
  qrCode,
  security = undefined,
  inTime,
}) {
  const [clicked, setClicked] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleQRClick = () => {
    setShowQR(true);
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("qr-overlay")) {
      setShowQR(false);
    }
  };

  const handleApprove = async () => {
    try {
      const response = await axios.put(
        security ? `/api/qr/${id}` : `/api/outpass/${id}/approve`,
        id
      );
      console.log(response.data);
      if (security) {
        alert((inTime ? "In Time" : "Out Time") + "registered");
      }
      setClicked(true); // update state to show Outpass component has been approved
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    if (!security) {
      try {
        const response = await axios.put(`/api/outpass/${id}/reject`);
        console.log(response.data);
        setClicked(true); // update state to show Outpass component has been approved
      } catch (error) {
        console.log(error);
      }
    } else setClicked(true);
  };

  if (clicked) {
    return null; // return null to remove the Outpass component from the DOM
  }

  return (
    <div
      className={`outpasscontainer ${
        status === "REJECTED"
          ? "rejected"
          : status === "APPROVED"
          ? "approved"
          : status === "REQUESTED1"
          ? "requested"
          : status === "INACTIVE"
          ? "inactive"
          : status === "EXPIRED"
          ? "expired"
          : status === "ACTIVE"
          ? "active"
          : ""
      }`}
    >
      <div className="outpasscontainer-row">
        <div className="outpasscontainer-item">
          <div className="label-value">
            <span className="label">Date:</span>
            <h3 className="textcomponent">{appdate}</h3>
          </div>
        </div>
      </div>
      <div className="outpasscontainer-row">
        <div className="outpasscontainer-item">
          <div className="label-value">
            <span className="label">Name:</span>
            <h3 className="textcomponent">{name}</h3>
          </div>
        </div>
        <div className="outpasscontainer-item">
          <div className="label-value">
            <span className="label">Room:</span>
            <h3 className="textcomponent">{room}</h3>
          </div>
        </div>
        <div className="outpasscontainer-item">
          <div className="label-value">
            <span className="label">BR/YR:</span>
            <h3 className="textcomponent">
              {dept}/{year}
            </h3>
          </div>
        </div>
      </div>
      <div className="outpasscontainer-row">
        <div className="outpasscontainer-item">
          <div className="label-value">
            <span className="label">From:</span>
            <h3 className="textcomponent">{fromtime}</h3>
          </div>
        </div>
        <div className="outpasscontainer-item">
          <div className="label-value">
            <span className="label">To:</span>
            <h3 className="textcomponent">{totime}</h3>
          </div>
        </div>
      </div>
      <div className="outpasscontainer-row">
        <div className="outpasscontainer-item">
          <div className="label-value">
            <span className="label">Place:</span>
            <h3 className="textcomponent">{place}</h3>
          </div>
        </div>
      </div>
      <div className="outpasscontainer-row">
        <div className="outpasscontainer-item">
          <div className="label-value">
            <span className="label">Purpose:</span>
            <h3 className="textcomponent">{reason}</h3>
          </div>
        </div>
      </div>
      <div className="outpasscontainer-row">
        <div className="outpasscontainer-item">
          <div className="label-value">
            <span className="label">Status:</span>
            <h3 className="textcomponent">{status}</h3>
          </div>
        </div>
        <div className="outpasscontainer-item">
          <div className="label-value">
            {status === "APPROVED" && (
              <h3
                className="textcomponent"
                style={{ color: "blue" }}
                onClick={handleQRClick}
              >
                Click here for QR
              </h3>
            )}
          </div>
        </div>
      </div>

      {showQR && (
        <QRCodeDisplay text={qrCode} handleOverlayClick={handleOverlayClick} />
      )}

      <div className={`buttoncontainer ${student ? "disabled" : ""}`}>
        {status !== "INACTIVE" && status !== "EXPIRED" && (
          <button className="button" onClick={handleApprove}>
            Approve
          </button>
        )}
        <button className="button" onClick={handleReject}>
          Reject
        </button>
      </div>
    </div>
  );
}
