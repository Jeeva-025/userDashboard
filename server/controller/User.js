import User from '../model/User.js';
import Role from '../model/Role.js';


export const getAllUsers = async (req, res) => {
  try {

    const users = await User.findAll({
      attributes:['id','username','email'],
      include:{
        model:Role,
        as: 'role',
        attributes:['role']
      }
    });

    const result = users.map(user => ({
      id:user.id,
      username: user.username,
      email: user.email,
      role: user.role.role 
    }));
    
    res.status(200).json(result);
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

    const roleRecord = await Role.findOne({
      where: { role }, 
    });
    
    if(!roleRecord){
      return res.status(400).json({ message: 'Invalid role. Role must be either "Admin" or "Member".' });
    }

    const newUser = await User.create({
      username,
      email,
      roleId:roleRecord.id
    });

    const user = await User.findOne({
      where: {
        id: newUser.id, 
      },
      attributes: ['id', 'username', 'email'], 
      include: {
        model: Role,
        as: 'role', 
        attributes: ['role'], 
      },
    });
    const result ={
      id:user.id,
      username: user.username,
      email: user.email,
      role: user.role.role 
    };
  
    res.status(201).json(result);
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
      if (role) {
        const roleRecord = await Role.findOne({ where: { role } });
        if (!roleRecord) {
          return res.status(400).json({ message: 'Invalid role. Role must be either "admin" or "member".' });
        }
        user.roleId = roleRecord.id;
      }
       
      user.username = username || user.username;
      user.email = email || user.email;
     
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