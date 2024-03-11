import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Wilfrid Guillaume',
    email: 'admin@mail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },

  {
    name: 'Stoyann Velten',
    email: 'user@mail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Anne-charlotte Wauters',
    email: 'user2@mail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
]

export default users
