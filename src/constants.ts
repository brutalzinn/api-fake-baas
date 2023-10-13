export const Constants = {
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
    JWT_SECRET: process.env.SECRET || 'babayaga',
    JWT_EXPIRE_TIME: { expiresIn: '500s' },
    TRANSACTION_QUEUE_NAME: "transactions-queue"
}