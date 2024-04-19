const { execSync } = require("child_process");

const command = process.argv[2];
const concatenatedCommand = `${command}` || 'migration';

execSync(
  `npm run typeorm -- migration:generate src/migrations/${concatenatedCommand}`,
  { stdio: "inherit" },
);
