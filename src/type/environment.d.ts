declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DEBUG: string;
            NODE_ENV: string;
            DOCKER_ENV: string;
            SERVER_PORT: string;
            SERVER_HOST: string;
            BASE_URL: string;
            POSTGRES_HOST: string;
            POSTGRES_USER: string;
            POSTGRES_PASSWORD: string;
            POSTGRES_DB: string;
        }
    }
}

// This is module augmentation. Files containing module augmentation must be domain (as opposed to scripts).
// The difference between domain and scripts is that domain have at least one import/export statement.

// In order to make TypeScript treat your file as a module, we need just add one import statement to it.
// It can be anything. Even export {} will do.
export {}
