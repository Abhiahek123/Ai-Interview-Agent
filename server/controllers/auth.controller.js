import genToken from "../config/token.js";
import User from "../models/user.model.js";

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email
      });
    }

    let token = await genToken(user._id);

    // ✅ FIXED - Return token in response body (for cross-origin)
    return res.status(200).json({ user, token });

  } catch (error) {
    return res.status(500).json({ message: `Google auth error ${error}` });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    return res.status(200).json({ message: "Logout Successfully" });

  } catch (error) {
    return res.status(500).json({ message: `Logout error ${error}` });
  }
};