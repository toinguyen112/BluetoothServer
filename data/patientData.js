import bcrypt from 'bcryptjs';

const patientData = [
    {
        cccd: '2384623834',
        name: 'Đỗ Hùng Dũng',
        phone: '0922334455',
        address: '135 Đ. Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh',
        password: bcrypt.hashSync('1234', 8)
    },
    {
        cccd: '23846237864',
        name: 'Văn Quyến',
        phone: '0274987534',
        address: '135 Đ. Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh',
        password: bcrypt.hashSync('1234', 8)
    },
    {
        cccd: '8934569463',
        name: 'Hoàng Đức',
        phone: '0263487623',
        address: '135 Đ. Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh',
        password: bcrypt.hashSync('1234', 8)
    },
];

export default patientData;