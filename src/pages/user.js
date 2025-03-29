import React from "react";
import "./user.css";
function User() {
    return (
        <div className="container">
            <div class="card1">
                <div class="left-container">
                    <img className="imgProfile" src="https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358__480.jpg" alt="Profile Image" />
                    <h2 class="gradienttext2">John Doe</h2>
                    <p className="roleName">Web Developer</p>
                </div>
                <div class="right-container">
                    <h3 class="gradienttext">Profile Details</h3>
                    <table>
                        <tr>
                            <td>Name :</td>
                            <td>John Doe</td>
                        </tr>
                        <tr>
                            <td>Age :</td>
                            <td>35</td>
                        </tr>
                        <tr>
                            <td>Mobile :</td>
                            <td>+91 XXXXXXXXXX</td>
                        </tr>
                        <tr>
                            <td>Email :</td>
                            <td>john@example.com</td>
                        </tr>
                        <tr>
                            <td>Address :</td>
                            <td>123 Main St, Anytown, USA</td>
                        </tr>
                    </table>
                    <div class="credit">Made with <span style={{ color: "tomato", fontSize: "20px" }}>❤ </span>by<a href="https://www.learningrobo.com/"> Eu</a></div>
                </div>
            </div>
        </div>
    )
}

export default User;