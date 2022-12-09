import bcrypt from 'bcryptjs'

const adminData = [
    {
        email: 'doctor@gmail.com',
        password: bcrypt.hashSync('doctor', 8),
    }
]

export default adminData;