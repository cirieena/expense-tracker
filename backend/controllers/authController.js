const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    // Validation: Check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All required fields are required" });
    }

    // ИСПРАВЛЕНО: Добавлена проверка минимальной длины пароля
    if (password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long"
        });
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Create the user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        // ИСПРАВЛЕНО: Убираем пароль из объекта пользователя перед отправкой на фронтенд
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            id: user._id,
            user: userResponse,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });

        // Проверка существования пользователя и корректности пароля
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Убираем пароль из объекта ответа
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            id: user._id,
            user: userResponse,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error logining user", error: err.message });
    }
};

// Get User Info
exports.getUserInfo = async (req, res) => {
    try {
        // .select("-password") гарантирует, что поле пароля не придет из базы
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error getting user", error: err.message });
    }
};