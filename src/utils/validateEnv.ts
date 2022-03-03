import { cleanEnv, str, port } from 'envalid';

// validate my environment variables

function validateEnv(): void {
    cleanEnv(process.env, {
        // Pass in the choices of node environment (where if we pass what is not a choice then it wont go through)
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        MONGO_URI: str(),
        JWT_SECRET: str(),
        PORT: port({ default: 3000 }),
    })
}

export default validateEnv;