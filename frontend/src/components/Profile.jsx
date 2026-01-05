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
    <div className="profile-container">
      <div className="profile-content">
        <h2 className="profile-title">My Profile</h2>

        <div className="profile-info">
          <div className="profile-field">
            <span className="field-label">Username:</span>
            <span className="field-value">{profile.username}</span>
          </div>
          <div className="profile-field">
            <span className="field-label">Email:</span>
            <span className="field-value">{profile.email}</span>
          </div>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="edit-button"
        >
          Edit Profile
        </button>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3 className="modal-title">Edit Profile</h3>

              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                />
              </div>

              <hr className="divider" />

              <h4 className="section-title">Change Password (optional)</h4>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-actions">
                <button 
                  onClick={() => setShowModal(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveProfile}
                  className="save-button"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
