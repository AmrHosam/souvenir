import bcrypt from 'bcrypt'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    tel : '01234567891',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    tel : '01234567891',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    tel : '012345678913242',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
