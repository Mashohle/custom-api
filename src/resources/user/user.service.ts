import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';

class UserService {
    private user = UserModel;

    /**
     * 
     * @param username 
     * @param email 
     * @param password 
     * @param role 
     * @returns the users access token upon successful registration
     */
    public async register(username: string, email: string, password: string, role: string): Promise<string | Error> {
        try {
            const user = await this.user.create({ username, email, password, role});
            const accessToken = token.createToken(user);

            return accessToken;
        } catch (error: any) {
            throw new Error('Unable to create user');
        }
    }

    /**
     * 
     * @param email 
     * @param password 
     * @returns the users access token upon successful registration
     */
    public async login(email: string, password: string): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email});

            if (!user) {
                throw new Error('Unable to find user with that email');
            }

            if(await user.isValidPassword(password)) {
                return token.createToken(user)
            } else {
                throw new Error('Invalid credentials provided');
            }
        } catch (error) {
            throw new Error('Unable to login user || Invalid Credentials');
        }
    }
}

export default UserService;