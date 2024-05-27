import { createClient } from 'redis';

export const connect = async () => {
    const client = createClient();

    client.on('error', error => console.log('redis error: ', error));

    console.log('redis success');

    await client.connect();

    return client;
};
