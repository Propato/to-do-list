import { compare, genSalt, hash } from "bcryptjs";

const RAND_ROUNDS = 8;

const hashPassword = async (password: string): Promise<string>  => {
    
    const passCode = await genSalt(RAND_ROUNDS);
    return await hash(password, passCode);
}

const comparePassword = async (password: string, hashPassword: string): Promise<boolean>  => {
    return await compare(password, hashPassword);
}

export const Crypto = {
    hashPassword,
    comparePassword
}