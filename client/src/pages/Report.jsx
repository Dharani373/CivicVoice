import { useState } from "react";
import Navbar from "../components/Navbar";
import { MapPin, Upload, FileText, CheckCircle } from "lucide-react";

export default function Report() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Other",
    address: "",
    photo: null,
  });

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateField = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
                <option>Road</option>
                <option>Water</option>
                <option>Streetlight</option>
                <option>Garbage</option>
                <option>Electricity</option>
                <option>Other</option>
              </select>
            </div>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <div className="step-content">
              <button className="location-btn">
                <MapPin size={22} />
                Use My Location
              </button>

              <label>Address</label>

              <input
                type="text"
                name="address"
                placeholder="Enter address manually"
                value={formData.address}
                onChange={updateField}
              />
            </div>
          )}

          {/* STEP 3 */}

          {step === 3 && (
            <div className="step-content">
              <label className="upload-box">
                <Upload size={60} />

                <h3>Click to upload photos</h3>

                <p>Images will be compressed automatically</p>

                <input type="file" hidden />
              </label>
            </div>
          )}

          {/* STEP 4 */}

          {step === 4 && (
            <div className="step-content review">
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
                <strong>Address:</strong> {formData.address}
              </p>
            </div>
          )}

          {/* BUTTONS */}

          <div className="button-row">
            <button
              disabled={step === 1}
              className="back-btn"
              onClick={prevStep}
            >
              Back
            </button>

            {step !== 4 ? (
              <button className="next-btn" onClick={nextStep}>
                Next
              </button>
            ) : (
              <button className="submit-btn">Submit Report</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
