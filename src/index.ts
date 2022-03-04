import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import PostController from '@/resources/post/post.controller';
import UserController from '@/resources/user/user.controller';

validateEnv();

// Initialize the Server
const app = new App([
    new PostController(),
    new UserController()
], Number(process.env.PORT));

// Start the server
app.listen();