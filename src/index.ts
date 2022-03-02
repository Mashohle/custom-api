import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';

validateEnv();

// Initialize the Server
const app = new App([], Number(process.env.PORT))

// Start the server
app.listen();