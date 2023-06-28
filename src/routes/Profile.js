import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const Auth = getAuth();
    const navigate = useNavigate();
    const onLogOutClick = () => {
        signOut(Auth);
        navigate("/", {replace:true});
    };
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}

export default Profile;