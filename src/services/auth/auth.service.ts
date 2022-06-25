import { IUser } from "../../api/types/user.type";
import { User } from "../../entity/User";
import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";


export const saveUser = async (newUser: IUser): Promise<User> => {
    try {
        const userRepository = getRepository(User);

        const userToSave = new User();
        userToSave.email = newUser.email;
        userToSave.firstName = newUser.firstName;
        userToSave.lastName = newUser.lastName;
        userToSave.type = newUser.type;
        userToSave.phoneNumber = newUser.phoneNumber;
        userToSave.age = newUser.age;
        userToSave.fees = newUser.fees;
        userToSave.country = newUser.country;
        userToSave.experience = newUser.experience;
        userToSave.password = await bcrypt.hash(newUser.password, 10);
        
        const createdUser = await userRepository.save(userToSave);

        if (createdUser) {
            return Promise.resolve(createdUser);
        } else {
            return Promise.reject(null);
        }
    } catch (error) {
        throw error;
    }
}

export const login = async (password: string, phoneNumber: string): Promise<User> => {
    try {
        const userRepository = getRepository(User);
        const foundUser = await userRepository.findOne({
            where: {
                phoneNumber
            }
        });

        if (foundUser) {
            await validateUserPassword(foundUser.password, password);
            const token = generateJwt(phoneNumber, foundUser.email);
            foundUser.token = token;
            return Promise.resolve(foundUser);
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

const generateJwt = (phoneNumber: string, email: string): string => { 
    try {
        const key = "N3wKe4F0rLo9!n";
        const tokenPayLoad = {phoneNumber, email};
        const token = jwt.sign(tokenPayLoad, key);
        return token;
    } catch (error) {
        throw error;
    }
}

const validateUserPassword = async (userPassword: string, entertedPassword: string)  => {
    try {
        const isPasswordCorrect = await bcrypt.compare(entertedPassword, userPassword);
        if (!isPasswordCorrect) {
            throw new Error("Wrong Password");
        }    
    } catch (error) {
        throw error;
    }
}