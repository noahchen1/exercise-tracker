import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import { useMediaQuery } from "react-responsive";
import { serverUrl } from "../url/serverUrl";
import { useLoading } from "../contexts/LoadingProvider";

export default function AddUser() {
  // Initiating states for each user input
  const { setIsLoading } = useLoading();
  const [username, setUsername] = useState("");
  const [activityGoal, setActivityGoal] = useState(0);
  const [gender, setGender] = useState("Male");
  const [birthday, setBirthday] = useState(new Date());
  const [weight, setWeight] = useState(0);
  const [heightFt, setHeightFt] = useState(0);
  const [heightIn, setHeightIn] = useState(0);
  const [height, setHeight] = useState(0);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  const isSmallScreen = useMediaQuery({
    query: "(max-width: 999px)",
  });

  // On Submit function to make a post request to the server

  const onSubmit = e => {
    e.preventDefault();

    // Creaating a new user object based on user input, new user is then saved to DB when successfully created.

    const user = {
      username: username,
      activityGoal: activityGoal,
      gender: gender,
      birthday: birthday,
      weight: weight,
      height: height,
    };

    setIsLoading(true);
    axios
      .post(`${serverUrl}/users/add`, user)
      .then(res => console.log(res.data))
      .finally(() => setIsLoading(false));
  };

  // State updating functions based on user inputs
  const onChangeUsername = e => {
    setUsername(e.target.value);
  };

  const onChangeActivityGoal = e => {
    setActivityGoal(e.target.value);
  };

  const onChangeGender = e => {
    setGender(e.target.value);
  };

  const onChangeWeight = e => {
    setWeight(e.target.value);
  };

  const onChangeHeightFt = e => {
    setHeightFt(e.target.value);
  };

  const onChangeHeightIn = e => {
    setHeightIn(e.target.value);
  };

  // function to calculate total height in centimeters based on height in inches and height in feet from user inputs
  function heightInCM(heightInFT, heightInIN) {
    const totalHeight = heightInFT * 30.48 + heightInIN * 2.54;
    return totalHeight;
  }

  // function to calculate total height triggered when changes made to either height in feet or height in inches input element
  useEffect(() => {
    setHeight(heightInCM(heightFt, heightIn));
  }, [heightIn, heightFt]);

  // Element Styles

  const flexContainer = {
    display: "flex",
    justifyContent: "center",
    color: "rgba(0, 0, 0, 0.7)",
  };

  const profileContainerStyle = {
    width: "62%",
    height: "100%",
  };

  const profileContainerStyleSmall = {
    width: "62%",
    minWidth: "200px",
    height: "100%",
  };

  const profileHeaderStyle = {
    color: "rgba(0, 0, 0, 0.7)",
    fontWeight: "600",
    marginBottom: "42px",
  };

  const userPropertyStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  const inputStyle = {
    width: "80px",
    outline: "none",
  };

  const userBioContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 200px)",
    gridTemplateRows: "repeat(4, 40px)",
    justifyContent: "center",
    alignItems: "center",
  };

  const userBioContainerStyleSmall = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 200px)",
    gridTemplateRows: "repeat(4, 40px)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "80px",
  };

  const userPropertyMargin = {
    marginBottom: "33px",
  };

  const userBioPropertyStyle = {
    justifySelf: "end",
    marginRight: "11px",
    color: "rgba(0, 0, 0, 0.7)",
    fontWeight: "600",
  };

  const userBioPropertyInputMargin = {
    marginLeft: "11px",
  };

  const profileSectionTitleStyle = {
    color: "rgba(0, 0, 0, 0.7)",
    fontWeight: "600",
  };

  const saveButtonStyle = {
    padding: "5px 10px",
    borderRadius: "10px",
    backgroundColor: "rgb(68, 68, 68)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    boxShadow: "0px 9px 15px -7px rgba(0, 0, 0, 0.3)",
    marginTop: "33px",
  };

  return (
    <div style={flexContainer}>
      {isDesktop && (
        <form style={profileContainerStyle} onSubmit={onSubmit}>
          <h1 style={profileHeaderStyle}>Profile</h1>

          {/* User name */}
          <div style={userPropertyMargin}>
            <div style={userPropertyStyle}>
              <span style={profileSectionTitleStyle}>User Name</span>
              <input
                type="text"
                placeholder="name"
                value={username}
                style={inputStyle}
                onChange={onChangeUsername}
              />
            </div>
            <hr />
          </div>

          {/* Activity goal */}
          <div style={userPropertyMargin}>
            <div style={userPropertyStyle}>
              <span style={profileSectionTitleStyle}>Activity goal</span>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <input
                  type="text"
                  value={activityGoal}
                  style={{ width: "20%", outline: "none", marginRight: "10px" }}
                  onChange={onChangeActivityGoal}
                />
                <span>cal</span>
              </div>
            </div>
            <hr />
          </div>

          {/* About Section */}
          <div style={userPropertyMargin}>
            <div>
              <span style={profileSectionTitleStyle}>About you</span>
            </div>
            <hr />
          </div>

          {/* Input field for gender, birthday, weight and height */}

          <div style={flexContainer}>
            <div style={userBioContainerStyle}>
              <label style={userBioPropertyStyle}>Gender</label>
              <select
                onChange={onChangeGender}
                style={{ marginLeft: "11px", width: "60px" }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <label style={userBioPropertyStyle}>Birthday</label>
              <div style={userBioPropertyInputMargin}>
                <DateTimePicker
                  onChange={setBirthday}
                  value={birthday}
                  format={"y-MM-dd"}
                />
              </div>
              <label style={userBioPropertyStyle}>Weight</label>
              <div style={userBioPropertyInputMargin}>
                <input
                  type="text"
                  value={weight}
                  style={{ width: "60px" }}
                  onChange={onChangeWeight}
                />
                <span>lbs</span>
              </div>

              <label style={userBioPropertyStyle}>Height</label>
              <div style={{ marginLeft: "11px" }}>
                <input
                  type="text"
                  value={heightFt}
                  style={{ outline: "none", width: "20px" }}
                  onChange={onChangeHeightFt}
                />
                <span>ft</span>
                <input
                  type="text"
                  value={heightIn}
                  style={{ outline: "none", width: "20px", marginLeft: "11px" }}
                  onChange={onChangeHeightIn}
                />
                <span>in</span>
              </div>
            </div>
          </div>

          <div style={flexContainer}>
            <button style={saveButtonStyle}>Save</button>
          </div>

          <div style={{ marginTop: "10%" }}>
            <div style={{ fontSize: "0.8em" }}>
              Note: the average person burns around 1800 calories a day doing
              absolutely nothing. Your activity goal should be higher than 1800.
            </div>
          </div>
        </form>
      )}

      {isSmallScreen && (
        <form style={profileContainerStyleSmall} onSubmit={onSubmit}>
          <h1 style={profileHeaderStyle}>Profile</h1>

          {/* User name */}
          <div style={userPropertyMargin}>
            <div style={userPropertyStyle}>
              <span style={profileSectionTitleStyle}>User Name</span>
              <input
                type="text"
                placeholder="name"
                value={username}
                style={inputStyle}
                onChange={onChangeUsername}
              />
            </div>
            <hr />
          </div>

          {/* Activity goal */}
          <div style={userPropertyMargin}>
            <div style={userPropertyStyle}>
              <span style={profileSectionTitleStyle}>Activity goal</span>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <input
                  type="text"
                  value={activityGoal}
                  style={{ width: "20%", outline: "none", marginRight: "10px" }}
                  onChange={onChangeActivityGoal}
                />
                <span>cal</span>
              </div>
            </div>
            <hr />
          </div>

          {/* About Section */}
          <div style={userPropertyMargin}>
            <div>
              <span style={profileSectionTitleStyle}>About you</span>
            </div>
            <hr />
          </div>

          {/* Input field for gender, birthday, weight and height */}

          <div style={flexContainer}>
            <div style={userBioContainerStyleSmall}>
              <label style={userBioPropertyStyle}>Gender</label>
              <select
                onChange={onChangeGender}
                style={{ marginLeft: "11px", width: "60px" }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <label style={userBioPropertyStyle}>Birthday</label>
              <div style={userBioPropertyInputMargin}>
                <DateTimePicker
                  onChange={setBirthday}
                  value={birthday}
                  format={"y-MM-dd"}
                />
              </div>
              <label style={userBioPropertyStyle}>Weight</label>
              <div style={userBioPropertyInputMargin}>
                <input
                  type="text"
                  value={weight}
                  style={{ width: "60px" }}
                  onChange={onChangeWeight}
                />
                <span>lbs</span>
              </div>

              <label style={userBioPropertyStyle}>Height</label>
              <div style={{ marginLeft: "11px" }}>
                <input
                  type="text"
                  value={heightFt}
                  style={{ outline: "none", width: "20px" }}
                  onChange={onChangeHeightFt}
                />
                <span>ft</span>
                <input
                  type="text"
                  value={heightIn}
                  style={{ outline: "none", width: "20px", marginLeft: "11px" }}
                  onChange={onChangeHeightIn}
                />
                <span>in</span>
              </div>
            </div>
          </div>

          <div style={flexContainer}>
            <button style={saveButtonStyle}>Save</button>
          </div>

          <div style={{ marginTop: "10%" }}>
            <div style={{ fontSize: "0.8em" }}>
              Note: the average person burns around 1800 calories a day doing
              absolutely nothing. Your activity goal should be higher than 1800.
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
