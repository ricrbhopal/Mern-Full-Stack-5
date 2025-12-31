import React from 'react'

const Registration = () => {
  return (
    <>
        <div>
            <h2>Registration Page</h2>
            <form>
                {/* Personal Information */}
                <div>
                    <h3>Personal Information</h3>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                    />
                    <input
                        type="tel"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        maxLength="10"
                        required
                    />
                    <input
                        type="date"
                        name="dateOfBirth"
                        required
                    />
                </div>

                {/* Academic Details */}
                <div>
                    <h3>Academic Details</h3>
                    <select name="lastQualification" required>
                        <option value="">Select Qualification</option>
                        <option value="10th">10th</option>
                        <option value="12th">12th</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                    </select>
                    <input
                        type="text"
                        name="percentageGrade"
                        placeholder="Percentage/Grade"
                        required
                    />
                </div>

                {/* Course Information */}
                <div>
                    <h3>Course Information</h3>
                    <select name="preferredCourse" required>
                        <option value="">Select Course</option>
                        <option value="IIT-JEE">IIT-JEE</option>
                        <option value="NEET">NEET</option>
                        <option value="Banking Exams">Banking Exams</option>
                        <option value="UPSC">UPSC</option>
                    </select>
                    <select name="batchTiming" required>
                        <option value="">Select Batch Timing</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                        <option value="Weekend">Weekend</option>
                    </select>
                </div>

                {/* Address */}
                <div>
                    <h3>Address</h3>
                    <textarea
                        name="residentialAddress"
                        placeholder="Residential Address"
                        rows="3"
                        required
                    ></textarea>
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        required
                    />
                    <input
                        type="text"
                        name="pinCode"
                        placeholder="Pin Code"
                        maxLength="6"
                        required
                    />
                </div>

                {/* Guardian Details */}
                <div>
                    <h3>Guardian Details</h3>
                    <input
                        type="text"
                        name="guardianName"
                        placeholder="Guardian's Full Name"
                        required
                    />
                    <input
                        type="tel"
                        name="guardianContact"
                        placeholder="Guardian's Contact Number"
                        maxLength="10"
                        required
                    />
                </div>

                {/* Additional Information */}
                <div>
                    <h3>Additional Information</h3>
                    <select name="hearAboutUs" required>
                        <option value="">How did you hear about us?</option>
                        <option value="Friends">Friends</option>
                        <option value="Online Ad">Online Ad</option>
                        <option value="Newspaper">Newspaper</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Other">Other</option>
                    </select>
                    <textarea
                        name="specialRequirements"
                        placeholder="Special Requirements (optional)"
                        rows="3"
                    ></textarea>
                </div>

                <button type="submit">Submit Registration</button>
            </form>
        </div>
    </>
  )
}

export default Registration