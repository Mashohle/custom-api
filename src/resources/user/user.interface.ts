// An interface that describes the properties
// that a User Document has (Can include default fields like title and timestamps here)
import { Document } from 'mongoose';

interface UserDoc extends Document {
    email: string;
    username: string;
    password: string;
    role: string;

    isValidPassword(password: string): Promise<Error | boolean>;
}

export default UserDoc;