up:
	docker-compose up
build:
	docker-compose build
migrate:
	docker-compose exec node-api sh -c "npx sequelize db:migrate"
migrate\:undo:
	docker-compose exec node-api sh -c "npx sequelize db:migrate:undo"