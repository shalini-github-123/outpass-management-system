
import React, { useEffect, useState } from 'react';
import Outpass from '../../components/Outpass'
import {  useNavigate } from "react-router-dom";
import Mainscreen from "../../components/Mainscreen";
import { useDispatch, useSelector } from "react-redux";
import { listOutpassWarden } from "../../actions/outpassActions";
import { logout } from "../../actions/userActions"
import './Warden.css'
import Navbar from '../../components/Navbar';

const Warden = () => {

  const dispatch = useDispatch();
  const outpassList = useSelector((state) => state.outpassList);
  const { loading, error, outpasses = [] } = outpassList;

  // when user logouts , it should go back to login page
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/")
  };


  const [userDetails, setUserDetails] = useState({})
  console.log("Warden outpass", outpasses);

  const navigate = useNavigate();
  // useeffect is used to get the notes data after page is rendered
  useEffect(() => {
    console.log("Warden.js: here");
    dispatch(listOutpassWarden(userInfo.objectId));
    if (!userInfo) {
      navigate("/");
    }


  }, [dispatch, navigate, userInfo]);

  console.log("USERDETAILS", userDetails);
  return (
    <>
      <Navbar role="warden" homeLink={"/"} />
      <Mainscreen title={`Welcome Back ${userInfo && userInfo.name}`}>

        {/* Cannot read properties of undefined (reading 'map')
      TypeError: Cannot read properties of undefined (reading 'map')
      After adding a '?' , the problem got solved  */}
        {outpasses ? outpasses.reverse().map((outpass) => (
          <Outpass
            key={outpass._id}
            id={outpass._id}
            student={false}
            name={outpass.studentId.name}
            dept={outpass.studentId.dept}
            year={outpass.studentId.year}
            room={outpass.studentId.room}
            fromtime={outpass.from.slice(0, 10)}
            totime={outpass.to.slice(0, 10)}
            place={outpass.place}
            reason={outpass.reason}
            status={outpass.status}
            appdate={outpass.createdAt.slice(0, 10)}
          />
        )) : (
          <p className="no-outpasses-message" style={{ textAlign: "center", color: "red" }}>No outpasses, come back later</p>
        )}
      </Mainscreen>


    </>
  )
}

export default Warden;
