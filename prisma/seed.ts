
// import * as assert from 'node:assert/strict';
// import {parseArgs} from 'node:util';
import { PrismaClient } from '@prisma/client'
import { parseArgs } from 'util';
import { clientSeed } from './seeds/client.seed';
import { settingsSeed } from './seeds/settings.seed';
const prisma = new PrismaClient()

type IOptions = {
    environment: any
}
const options : IOptions = {
  environment: {
    type: 'string',
  },
};

async function main() {

  const {
    values: args,
  } = parseArgs({options})

  switch (args.environment) {
    case 'development':
     console.log("START SEED FOR DEV")
      await clientSeed(prisma)
      await settingsSeed(prisma)
    break
    case 'test':
      break
    default:
      break
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })