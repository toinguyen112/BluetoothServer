import bcrypt from 'bcryptjs'

const adminData = [
    {
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin', 8),
    }
]

export default adminData;