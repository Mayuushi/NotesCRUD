import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [profile, setProfile] = useState({
        username: "",
        email: ""
    });

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/users/profile", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => setProfile(res.data));
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, username: e.target.value });
    };

    const saveProfile = async () => {
        try {
            await axios.put(
                "http://localhost:5000/api/users/profile",
                { username: profile.username },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            alert("Profile updated");
        } catch (err) {
            alert("Failed to update profile");
        }
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await axios.put(
                "http://localhost:5000/api/users/change-password",
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            alert("Password changed successfully");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to change password");
        }
    };

    return (
        <div>
            <h2>My Profile</h2>

            <label>Username</label>
            <input
                value={profile.username}
                onChange={handleChange}
            />

            <label>Email</label>
            <input
                value={profile.email}
                disabled
            />

            <button onClick={saveProfile}>Save</button>

            <h3>Change Password</h3>

            <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <button onClick={handleChangePassword}>
                Change Password
            </button>
        </div>
    );
};

export default Profile;
