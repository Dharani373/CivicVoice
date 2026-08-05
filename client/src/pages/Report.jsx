import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";

import { MapPin, Upload } from "lucide-react";

export default function Report() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Other",
    latitude: "",
    longitude: "",
    image: null,
  });

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const updateField = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5 MB.");
      return;
    }

    setFormData({
      ...formData,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;

        const longitude = position.coords.longitude;

        setFormData((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));
      },

      () => {
        alert("Unable to fetch location.");
      },
    );
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.title.trim()) {
        alert("Please enter a title.");
        return false;
      }

      if (!formData.description.trim()) {
        alert("Please enter a description.");
        return false;
      }
    }

    if (step === 2) {
      if (!formData.latitude || !formData.longitude) {
        alert("Please provide the location.");
        return false;
      }
    }

    if (step === 3) {
      if (!formData.image) {
        alert("Please upload an image.");
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const submitReport = async () => {
    if (loading) return;
    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);
      data.append("image", formData.image);

      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/reports", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Report submitted successfully!");

      setFormData({
        title: "",
        description: "",
        category: "Other",
        latitude: "",
        longitude: "",
        image: null,
      });

      setPreview("");

      setStep(1);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to submit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="report-page">
        <div className="report-box">
          <h1>Report an Issue</h1>

          {/* STEP INDICATOR */}

          <div className="stepper">
            <div className={`step ${step >= 1 ? "active" : ""}`}>
              <div className="circle">1</div>
              <span>Details</span>
            </div>

            <div className={`line ${step >= 2 ? "active" : ""}`} />

            <div className={`step ${step >= 2 ? "active" : ""}`}>
              <div className="circle">2</div>
              <span>Location</span>
            </div>

            <div className={`line ${step >= 3 ? "active" : ""}`} />

            <div className={`step ${step >= 3 ? "active" : ""}`}>
              <div className="circle">3</div>
              <span>Photos</span>
            </div>

            <div className={`line ${step >= 4 ? "active" : ""}`} />

            <div className={`step ${step >= 4 ? "active" : ""}`}>
              <div className="circle">4</div>
              <span>Review</span>
            </div>
          </div>

          {/* STEP 1 */}

          {step === 1 && (
            <div className="step-content">
              <label>Title *</label>

              <input
                type="text"
                name="title"
                placeholder="Brief title for the issue"
                value={formData.title}
                onChange={updateField}
              />

              <label>Description *</label>

              <textarea
                rows="6"
                name="description"
                placeholder="Describe the issue in detail..."
                value={formData.description}
                onChange={updateField}
              />

              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={updateField}
              >
                <option value="Road">Road</option>
                <option value="Water">Water</option>
                <option value="Streetlight">Streetlight</option>
                <option value="Garbage">Garbage</option>
                <option value="Electricity">Electricity</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <div className="step-content">
              <button
                type="button"
                className="location-btn"
                onClick={getLocation}
              >
                <MapPin size={22} />
                Use My Current Location
              </button>

              <label>Location *</label>

              <input
                type="text"
                name="location"
                placeholder="Enter location manually"
                value={
                  formData.latitude && formData.longitude
                    ? `${formData.latitude}, ${formData.longitude}`
                    : ""
                }
                onChange={updateField}
              />
            </div>
          )}

          {/* STEP 3 */}

          {step === 3 && (
            <div className="step-content">
              <label className="upload-box">
                <Upload size={60} />

                <h3>Click to Upload an Image</h3>

                <p>Supported: JPG, PNG, JPEG</p>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImage}
                />
              </label>

              {preview && (
                <div className="image-preview">
                  <img src={preview} alt="Preview" />
                </div>
              )}
            </div>
          )}
          {/* STEP 4 */}

          {step === 4 && (
            <div className="step-content review">
              <h2>Review Your Report</h2>

              <p>
                <strong>Title:</strong> {formData.title}
              </p>

              <p>
                <strong>Description:</strong> {formData.description}
              </p>

              <p>
                <strong>Category:</strong> {formData.category}
              </p>

              <p>
                <strong>Location:</strong> {formData.location}
              </p>

              {preview && (
                <div className="review-image">
                  <img src={preview} alt="Preview" />
                </div>
              )}
            </div>
          )}

          {/* BUTTONS */}

          <div className="button-row">
            <button
              className="back-btn"
              disabled={step === 1 || loading}
              onClick={prevStep}
            >
              Back
            </button>

            {step !== 4 ? (
              <button
                className="next-btn"
                onClick={nextStep}
                disabled={loading}
              >
                Next
              </button>
            ) : (
              <button
                className="submit-btn"
                onClick={submitReport}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Report"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
