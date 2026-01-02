import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [profile, setProfile] = useState({
        username: "",
        email: ""
    });

    useEffect(() => {
        axios.get("http://localhost:5000/api/users/profile", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => setProfile(res.data));
    }, []);

    const handleChange = e => {
        setProfile({ ...profile, username: e.target.value });
    };

    const saveProfile = async () => {
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
        </div>
    );
};

export default Profile;
