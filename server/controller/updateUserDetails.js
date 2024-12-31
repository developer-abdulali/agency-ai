// import getUserDetailsFromToken from "../helpers/getUserDetailsFromToken.js";
// import UserModel from "../models/UserModel.js";

// const updateUserDetails = async (request, response) => {
//   try {
//     const token = request.cookies.token || "";

//     const user = await getUserDetailsFromToken(token);

//     const { name, profile_pic } = request.body;

//     const updateUser = await UserModel.updateOne(
//       { _id: user._id },
//       {
//         name,
//         profile_pic,
//       }
//     );

//     const userInfomation = await UserModel.findById(user._id);

//     return response.json({
//       message: "user update successfully",
//       data: userInfomation,
//       success: true,
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//     });
//   }
// };

// export default updateUserDetails;

import UserModel from "../models/UserModel.js";

const updateUserDetails = async (req, res) => {
  const { userId, name, email, profile_pic } = req.body;

  try {
    // Fetch user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.profile_pic = profile_pic || user.profile_pic;

    // Save updated user data
    const updatedUser = await user.save();

    // Send back the updated user
    return res.json({
      message: "user update successfully",
      data: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error updating user details", error: error.message });
  }
};

export default updateUserDetails;
