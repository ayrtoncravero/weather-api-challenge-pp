import app from './app';
import 'reflect-metadata';

const PORT: string | number = process.env.PORT || 3000;

async function main(): Promise<void> {
  try {
    app.listen(PORT);
    console.log(`⚡️ Server running on port: ${PORT}`);
  } catch(error: any) {
    console.log('error: ', error);
  };
};

main();
