import appInitialization from './app';

const bootstrap = async function () {
    try {
        // We must listen on the port/host defined from ENV
        const port = Number(process.env.SERVER_PORT);
        const host = process.env.SERVER_HOST;

        const app = await appInitialization();
        const address = await app.listen(port, host);
        console.log(`Server listening at ${address} 🤘`);
        console.log(`Running environment is ${process.env.NODE_ENV}`);
    } catch (error) {
        console.error(`Program terminated unexpectedly`, error);
        process.exit(1);
    }
};

const handleShutdown = function () {
    process.stdout.write('Termination signal received. Shutting down.');
    // destroyAliveConnections();
    // src.close();
    // parseServer.handleShutdown();
};

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);

if (require.main === module) {
    bootstrap();
}
