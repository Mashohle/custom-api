import jwt from 'jsonwebtoken';
import User from '@/resources/user/user.interface';
import Token from '@/utils/interfaces/token.interface';

/**
 * 
 * @param user model
 * @returns then jwt token generated
 */
export const createToken = (user: User): string => {
    return jwt.sign(
        {id: user.id},
        process.env.JWT_KEY as jwt.Secret,
        {
            expiresIn: '1d'
        }
    )
};

/**
 * 
 * @param token jwt
 * @returns payload of the valid token || err if token is invalid
 */
export const verifyToken = async (token: string): Promise<jwt.VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token, 
            process.env.JWT_KEY as jwt.Secret,
            (err, payload) => {
                if (err) return reject(err);

                resolve(payload as Token);
            }
        );
    })
}

export default { createToken, verifyToken }