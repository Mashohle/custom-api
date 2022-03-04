import UserDoc from "@/resources/user/user.interface";

// Adds User type definition to the express type request
declare global {
    namespace Express {
        export interface Request {
            user: UserDoc;
        }
    }
}