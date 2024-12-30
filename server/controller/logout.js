const logoutUser = async (request, response) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      expires: new Date(0),
    };

    response.cookie("token", "", cookieOptions);

    return response.status(200).json({
      message: "Session ended successfully",
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "An error occurred during logout",
      error: true,
    });
  }
};

export default logoutUser;
