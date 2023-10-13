import { PrismaClient } from '@prisma/client'
export  async function clientSeed(prisma : PrismaClient) {
    
    await prisma.client.upsert({
        where: {
            id: 1
        },
        update: {},
        create: {
            name: "Trenton Brown",
            document: "73324747945",
            status: 'ACTIVE',
            address: {
                create: {
                    state: "Rio de Janeiro",
                    stateCode: "RJ",
                    country: "Brazil",
                    postalCode: "22981082",
                    city: "Reichelton",
                    street: "664 Elenor Trail"
                }
            },
            wallet: {
                create: {
                    balance: 1000
                }
            },
            metadatas: {
                createMany: {
                    data: [
                        {
                            key: "contact.phone_number",
                            value: "21966666666"
                        },
                        {
                            key: "contact.email",
                            value: "frankie_kozey20@yahoo.com"
                        }
                    ]
                }
            }
        }
    })
    
    await prisma.client.upsert({
        where: {
            id: 2
        },
        update: {},
        create: {
            name: "Cleta Durgan",
            document: "41544099991",
            status: 'ACTIVE',
            address: {
                create: {
                    state: "Rio de Janeiro",
                    stateCode: "RJ",
                    country: "Brazil",
                    postalCode: "47576858",
                    city: "Nonaburgh",
                    street: "6739 Frances Estates"
                }
            },
            wallet: {
                create: {
                    balance: 55.50
                }
            },
            metadatas: {
                createMany: {
                    data: [
                        {
                            key: "contact.phone_number",
                            value: "21966666666"
                        },
                        {
                            key: "contact.email",
                            value: "dominick96@hotmail.com"
                        }
                    ]
                }
            }
        }
        
    })

    await prisma.client.upsert({
        where: {
            id: 3
        },
        update: {},
        create: {
            name: "Mireya Keeling",
            document: "05253868313",
            status: 'ACTIVE',
            address: {
                create: {
                    state: "Rio de Janeiro",
                    stateCode: "RJ",
                    country: "Brazil",
                    postalCode: "35905469",
                    city: "South Payton",
                    street: "8657 Rashawn Inlet"
                }
            },
            wallet: {
                create: {
                    balance: 0
                }
            },
            metadatas: {
                createMany: {
                    data: [
                        {
                            key: "contact.phone_number",
                            value: "21966666666"
                        },
                        {
                            key: "contact.email",
                            value: "glenda_rodriguez@yahoo.com"
                        }
                    ]
                }
            }
        }
        
    })
}