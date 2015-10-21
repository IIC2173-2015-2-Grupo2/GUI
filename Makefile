NAME = newsify-gui

docker-build:
	docker build -t $(NAME) .

# Start application on port 6060
docker-run:
	docker run --publish 6060:8000 --name $(NAME) --rm $(NAME)

# Build and run
docker:
	make docker-build
	make docker-run
