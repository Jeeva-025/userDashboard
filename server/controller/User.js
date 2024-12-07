import User from '../model/User.js';


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching users',
      error: error.message
    });
  }
};



export const createUser = async (req, res) => {
  const { username, email, role } = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      role
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creating user',
      error: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      await user.destroy();
      res.status(200).json({
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error deleting user',
        error: error.message
      });
    }
  };

  export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }    
      user.username = username || user.username;
      user.email = email || user.email;
      user.role = role || user.role;
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error updating user',
        error: error.message
      });
    }
  };