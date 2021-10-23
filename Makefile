up:
	docker-compose up
build:
	docker-compose build
migrate:
	docker exec smk-api bash -c "cd smk-api && npx sequelize db:migrate"