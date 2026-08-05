import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );

      // save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      //alert(error.response?.data?.message || "Login failed");

      console.log("Full Error:", error);
      console.log("Response:", error.response);

      alert(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2 className="auth-title">Login</h2>

        <input
          className="auth-input"
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Gmail Address"
          onChange={handleChange}
        />

        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className="auth-btn">Login</button>
        <p className="auth-switch-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="auth-link">
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
