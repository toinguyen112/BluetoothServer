import jwt from 'jsonwebtoken';

export const generateToken = (admin) => {
    return jwt.sign(
        {
            name: admin.adName,
            password: admin.adPassword,
        },
        process.env.JWT_SECRET || 'jwtsecret',
        {
            expiresIn: '30d',
        }
    );
}