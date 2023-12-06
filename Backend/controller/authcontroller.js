import joi from 'joi';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
console.log(req.body)
        const { error } = validate({ email, password });
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email }); // Find user by email
    console.log.log(user)

        if (!user) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        // If login successful, generate token or perform any necessary action
        const token = user.generateAuthToken(); // Replace with your token generation logic

        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
};

const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password")
    });

    return schema.validate(data);
};

export { login };
