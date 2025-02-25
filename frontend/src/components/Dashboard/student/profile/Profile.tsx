import React, { useState, useEffect } from "react";
import { Card, Button, Avatar, Spin, Typography } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import EditProfile from "./EditProfile"; // Import the EditProfile component
import { fetchUserDataFromFirestore } from "./utils"; // Import the fake fetch function

const { Title, Text } = Typography;

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    photo: "https://via.placeholder.com/150",
    jeeApplicationNumber: "",
    mobile: "",
    email: "",
    course: "", // New field
    allotedBranch: "", // New field
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data from Firestore (fake call)
  useEffect(() => {
    fetchUserDataFromFirestore().then((data) => {
      setUser((prev) => ({ ...prev, ...data }));
      setLoading(false);
    });
  }, []);

  // Handle edit button click
  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      {/* Conditionally render the title based on isEditing state */}
      <Title level={1} className="text-center mb-6 text-gray-800">
        {isEditing ? "Edit Profile" : "Profile"}
      </Title>
      <Card
        className="shadow-2xl hover:shadow-3xl hover:scale-[1.01] transition-all duration-1000 ease-in-out 
        bg-gradient-to-br from-gray-200 to-gray-200 border-gray-200"
        bordered={false}
      >
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : isEditing ? (
          <EditProfile
            user={user}
            setUser={setUser}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            {/* Profile Information Display */}
            <div className="flex flex-col items-center mb-6">
              <Avatar
                src={user.photo}
                size={120}
                icon={<UserOutlined />}
                className="border-4 border-gray-300 mb-4 shadow-lg"
              />
              <Title level={2} className="text-gray-800">
                {user.name}
              </Title>
            </div>

            {/* Responsive Details Section */}
            <div className="w-full space-y-4">
              <DetailItem label="JEE Mains Application" value={user.jeeApplicationNumber} />
              <DetailItem label="Mobile Number" value={user.mobile} />
              <DetailItem label="Email" value={user.email} />
              <DetailItem label="Course" value={user.course} />
              <DetailItem label="Alloted Branch" value={user.allotedBranch} />
            </div>

            {/* Centered Edit Button */}
            <div className="flex justify-center mt-6">
              {/* <Button
                type="primary"
                icon={<EditOutlined />}
                className="bg-blue-600 hover:bg-blue-900 border-blue-900 shadow-md"
                onClick={handleEdit}
              >
                Edit Profile
              </Button> */}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

// Reusable DetailItem Component
const DetailItem = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 shadow-sm">
    <Text strong className="text-gray-800 sm:w-1/4">
      {label}
    </Text>
    <Text className="text-gray-700 break-words flex-1 sm:text-right">
      {value}
    </Text>
  </div>
);

export default Profile;