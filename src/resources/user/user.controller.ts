import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middleware/authenticated.middleware';

class UserController implements Controller {
    public path = '/users';
    public router = Router(); 
    private UserService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );

        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        )

        this.router.get(
            `${this.path}`,
            authenticated,
            this.getUser
        )
    }

    private register = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { username, email, password } = req.body;

            // Service helps us seperate the functionality from the request handler
            const token = await this.UserService.register(username, email, password, 'user');
            
            res.status(201).json({ token });
        } catch (error: any) {
            // Sends http exception to our error handler
            next(new HttpException(400, error.message));
        }
    }

    private login = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            // Service helps us seperate the functionality from the request handler
            const token = await this.UserService.login(email, password);
            
            res.status(200).json({ token });
        } catch (error: any) {
            // Sends http exception to our error handler
            next(new HttpException(400, error.message));
        }
    }

    private getUser = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        if (!req.user) {
            return next(new HttpException(400, 'User not found!'));
        }

        res.status(200).json({ 
            user: req.user
        })
    }
};

export default UserController;