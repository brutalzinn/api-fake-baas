import { PrismaClient } from '@prisma/client'
export  async function settingsSeed(prisma : PrismaClient) {

    // 0 will disable this
    await prisma.settings.upsert({
        where: { id: 1 },
        update: {},
        create: {
            key: "delete_account_inactive_idle_days",
            value: "30",
            enviroment: 'SYSTEM'
        }
    })

    await prisma.settings.upsert({
        where: { id: 2 },
        update: {},
        create: {
            key: "enable_register_account_owner",
            value: "true",
            enviroment: 'SYSTEM'
        }
    })

    await prisma.settings.upsert({
        where: { id: 3 },
        update: {},
        create: {
            key: "max_value_transaction",
            value: "100",
            enviroment: 'SYSTEM'
        }
    })

    await prisma.settings.upsert({
        where: { id: 4 },
        update: {},
        create: {
            key: "max_clients_by_account_owner",
            value: "10",
            enviroment: 'SYSTEM'
        }
    })

      await prisma.settings.upsert({
        where: { id: 5 },
        update: {},
        create: {
            key: "system_default_balance",
            value: "0",
            enviroment: 'SYSTEM'
        }
    })
}