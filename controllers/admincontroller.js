
    const db = require('../models');
    const User = db.user;



    // Admin: Get all users
    exports.getAllUsers = async (req, res) => {
        try {
            const users = await User.findAll({
                attributes : {exclude : ['password']}
            });

            res.json(users);
            
        } catch (error) {
            res.status(500).json({error : error.message});
            
        }
    }

    // Admin: Get single user by ID

    exports.getUserById = async (req, res) => {
    try {
        const singleUser = await User.findByPk(req.params.id, {
            attributes : {exclude : ['password']}
        });

        if(!singleUser){
            return res.status(404).json({message : "User Not Found"})
        }

        res.json(singleUser);
    } catch (error) {
        res.status(500).json({error : error.message})
    }

    }


    //  superAdmin: Delete a user
    exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (!deleted) {
        return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    //SuperAdmin: Change user role

    exports.changeUserRole = async (req, res) => {
    try {
        
        const { role} = req.body;
        const userId = req.params.id;

        // Find the user
        const userToUpdate = await User.findByPk(userId);

        if (!userToUpdate) {
            return res.status(404).json({message: 'User not found' })
        }

        userToUpdate.role = role;
        await userToUpdate.save();

        res.json({message : `User role update to ${role}`, user :userToUpdate});

    } catch (error) {
        res.status(500).json({error : error.message})
    }

    }
