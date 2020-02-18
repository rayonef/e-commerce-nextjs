import User from '../../models/User';
import connectDb from '../../utils/connectDb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb()

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(404).send('User not found');
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
      res.status(200).json(token)
    } else {
      res.status(401).send('Invalid credentials')
    }


  } catch (error) {
    res.status(500).send('Something went wrong, try again later');
  }
}