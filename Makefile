prisma-reset: 
	@npx prisma format \
	&& npx prisma migrate reset --force

prisma-migrate:
	npx prisma generate \
	&& npx prisma migrate dev

prisma-seed:
	npx prisma db seed -- --environment development