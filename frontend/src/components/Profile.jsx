import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({ username: "", email: "" });

  const [showModal, setShowModal] = useState(false);

  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // FETCH PROFILE
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProfile(res.data);
        setUsername(res.data.username);
      });
  }, []);

  // SAVE PROFILE (USERNAME + PASSWORD)
  const saveProfile = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/users/profile",
        { username },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (currentPassword && newPassword) {
        await axios.put(
          "http://localhost:5000/api/users/change-password",
          { currentPassword, newPassword },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      alert("Profile updated");
      setShowModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setProfile({ ...profile, username });
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div>
      <h2>My Profile</h2>

      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>

      <button onClick={() => setShowModal(true)}>Edit Profile</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Profile</h3>

            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <hr />

            <h4>Change Password (optional)</h4>

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

            <div className="form-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={saveProfile}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
