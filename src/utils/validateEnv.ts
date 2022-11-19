import { cleanEnv, str, port } from 'envalid';

// Validate fields in process.env
function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']  // makes sure NODE_ENV matches dev or prod
        }),
        MONGO_PATH: str(),
        PORT: port({ default: 5000 })
    });
}

export default validateEnv;