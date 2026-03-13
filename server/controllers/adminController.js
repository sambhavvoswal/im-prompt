import jwt from 'jsonwebtoken';

const ADMIN_USERNAME = "theAdmin";
const ADMIN_PASSWORD = "adminDoesn'tExist@54321";

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = (req, res) => {
    try {
        const { username, password } = req.body;

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Generate token
            const token = jwt.sign(
                { role: 'admin' },
                process.env.JWT_SECRET || 'secret_admin_key_for_im_prompt_123',
                { expiresIn: '24h' }
            );

            return res.status(200).json({
                success: true,
                token
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
};
