import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Upload,
  Avatar,
  Button,
  Modal,
  message,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useAuth } from "@/context/AuthContext"; // Import the AuthContext
import { fetchUserDataFromFirestore } from "./utils"; // Import the fake fetch function

const EditProfile = ({ user, setUser, setIsEditing }) => {
  const { sendOtp, verifyOtp, updateUserProfile } = useAuth(); // Use AuthContext functions
  const [form] = Form.useForm();
  const [isOTPModalVisible, setIsOTPModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpDestination, setOtpDestination] = useState("");
  const [otpType, setOtpType] = useState("");
  const [tempMobile, setTempMobile] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [isMobileEditable, setIsMobileEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Fetch initial user data from Firestore (fake call)
  useEffect(() => {
    fetchUserDataFromFirestore().then((data) => {
      setUser((prev) => ({ ...prev, ...data }));
      form.setFieldsValue(data); // Set form values with fetched data
    });
  }, [form, setUser]);

  // Handle photo upload
  const handlePhotoUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUser({ ...user, photo: e.target.result });
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload behavior
  };

  // Handle save button click
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setUser({ ...user, ...values });
      setIsEditing(false);
      setIsMobileEditable(false);
      setIsEmailEditable(false);
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error("Validation failed. Please check your inputs.");
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setIsEditing(false);
    setIsMobileEditable(false);
    setIsEmailEditable(false);
    setMobileError("");
    setEmailError("");
    form.resetFields();
  };

  // Handle OTP verification
  const handleOTPVerification = async () => {
    const isOtpValid = await verifyOtp(otp);
    if (isOtpValid) {
      message.success("OTP verified successfully!");
      setIsOTPModalVisible(false);
      setOtp("");
      // Update the user state with the new mobile or email
      if (otpType === "mobile") {
        await updateUserProfile({ mobile: tempMobile });
        setUser((prev) => ({ ...prev, mobile: tempMobile }));
      } else if (otpType === "email") {
        await updateUserProfile({ email: tempEmail });
        setUser((prev) => ({ ...prev, email: tempEmail }));
      }
    } else {
      message.error("Invalid OTP. Please try again.");
      // Revert to previous values if OTP verification fails
      if (otpType === "mobile") {
        form.setFieldsValue({ mobile: user.mobile });
      } else if (otpType === "email") {
        form.setFieldsValue({ email: user.email });
      }
    }
  };

  // Handle OTP send for mobile/email
  const handleSendOTP = async (type, value) => {
    if (type === "mobile") {
      setTempMobile(value);
    } else if (type === "email") {
      setTempEmail(value);
    }
    setOtpDestination(value);
    setOtpType(type);
    await sendOtp(value, type);
    setIsOTPModalVisible(true);
  };

  // Validate mobile number
  const validateMobile = (value) => {
    if (!/^\d{10}$/.test(value)) {
      setMobileError("Please enter a valid 10-digit mobile number!");
      return false;
    }
    setMobileError("");
    return true;
  };

  // Validate email
  const validateEmail = (value) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Please enter a valid email!");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Handle "Change" button click for mobile or email
  const handleChangeButtonClick = (type) => {
    if (type === "mobile") {
      setIsMobileEditable(true);
      setIsEmailEditable(false); // Disable email field
      form.setFieldsValue({ mobile: "" }); // Reset mobile field
    } else if (type === "email") {
      setIsEmailEditable(true);
      setIsMobileEditable(false); // Disable mobile field
      form.setFieldsValue({ email: "" }); // Reset email field
    }
  };

  return (
    <Form form={form} initialValues={user} layout="vertical">
      {/* Profile Photo Upload */}
      <Form.Item>
        <div className="flex flex-col items-center gap-4">
          <Upload
            name="photo"
            listType="picture"
            beforeUpload={handlePhotoUpload}
            showUploadList={false}
          >
            <Avatar
              src={user.photo}
              size={100}
              icon={<UserOutlined />}
              className="border-2 border-gray-300"
            />
          </Upload>
          <Button
            icon={<UploadOutlined />}
            className="whitespace-nowrap text-gray-800"
          >
            Upload Photo
          </Button>
        </div>
      </Form.Item>

      {/* Name Field (Non-editable) */}
      <Form.Item label={<span className="font-bold text-gray-800">Name</span>}>
        <Input
          value={user.name}
          disabled
          className="bg-white border-gray-300 text-gray-800" // Less gray background
        />
      </Form.Item>

      {/* JEE Mains Application Number (Non-editable) */}
      <Form.Item label={<span className="font-bold text-gray-800">JEE Mains Application Number</span>}>
        <Input
          value={user.jeeApplicationNumber}
          disabled
          className="bg-white border-gray-300 text-gray-800" // Less gray background
        />
      </Form.Item>

      {/* Mobile Number Field */}
      <Form.Item
        name="mobile"
        label={<span className="font-bold text-gray-800">Mobile Number</span>}
        validateStatus={mobileError ? "error" : ""}
        help={mobileError}
      >
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Enter your mobile number"
            disabled={!isMobileEditable}
            onChange={(e) => {
              form.setFieldsValue({ mobile: e.target.value });
              validateMobile(e.target.value);
            }}
            className="flex-1 bg-white border-gray-300 text-gray-800" // Less gray background
          />
          <Button
            type="primary"
            onClick={() => {
              if (!isMobileEditable) {
                handleChangeButtonClick("mobile");
              } else {
                const mobileValue = form.getFieldValue("mobile");
                if (validateMobile(mobileValue)) {
                  handleSendOTP("mobile", mobileValue);
                }
              }
            }}
            disabled={isMobileEditable && !!mobileError}
            className="flex-shrink-0 whitespace-nowrap text-gray-800" // Prevent text overflow
          >
            {isMobileEditable ? "Send OTP" : "Change"}
          </Button>
        </div>
      </Form.Item>

      {/* Email Field */}
      <Form.Item
        name="email"
        label={<span className="font-bold text-gray-800">Email</span>}
        validateStatus={emailError ? "error" : ""}
        help={emailError}
      >
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Enter your email"
            disabled={!isEmailEditable}
            onChange={(e) => {
              form.setFieldsValue({ email: e.target.value });
              validateEmail(e.target.value);
            }}
            className="flex-1 bg-white border-gray-300 text-gray-800" // Less gray background
          />
          <Button
            type="primary"
            onClick={() => {
              if (!isEmailEditable) {
                handleChangeButtonClick("email");
              } else {
                const emailValue = form.getFieldValue("email");
                if (validateEmail(emailValue)) {
                  handleSendOTP("email", emailValue);
                }
              }
            }}
            disabled={isEmailEditable && !!emailError}
            className="flex-shrink-0 whitespace-nowrap text-gray-800" // Prevent text overflow
          >
            {isEmailEditable ? "Send OTP" : "Change"}
          </Button>
        </div>
      </Form.Item>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button onClick={handleCancel} className="text-gray-800">Cancel</Button>
        <Button type="primary" onClick={handleSave} className="text-gray-800">
          Save Changes
        </Button>
      </div>

      {/* OTP Verification Modal */}
      <Modal
        title="OTP Verification"
        visible={isOTPModalVisible}
        onCancel={() => setIsOTPModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsOTPModalVisible(false)} className="text-gray-800">
            Cancel
          </Button>,
          <Button key="verify" type="primary" onClick={handleOTPVerification} className="text-gray-800">
            Verify
          </Button>,
        ]}
      >
        <p className="text-gray-800 font-bold">
          Enter the OTP sent to your {otpType === "mobile" ? "phone" : "email"}:
        </p>
        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="mt-2 bg-white border-gray-300 text-gray-800" // Less gray background
        />
      </Modal>
    </Form>
  );
};

export default EditProfile;