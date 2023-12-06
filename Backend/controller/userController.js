import { User, validate } from '../models/user.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
    try {
        console.log("kkkkkk")
        // const { error } = validate(req.body);
        // if (error) {
        //     return res.status(400).send({ message: error.details[0].message });
        // }

        const user = await User.findOne({ email: req.body.email });
        console.log(user)
        if (user) {
            return res.status(409).send({ message: "User with given email already exists" });
        }
        console.log(req.body)
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        
        

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User Created successfully" });

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: "Internal Server error" });
    }
};
