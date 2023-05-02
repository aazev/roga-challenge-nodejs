# My Node.js Project

This project is a Node.js application that includes a Dockerized MySQL instance.

## Prerequisites

- Docker
- Make
- Node.js
- pnpm

## Getting Started

Follow these steps to get the project up and running:

1. Start the Dockerized MySQL instance:

```sh
make start
```

2. Create a new `.env` file in the root of the project. Use the `.development.env` file as a template. Ensure you replace any placeholder values with your actual configuration.

```sh
cp .development.env .env
```

3. Install dependencies using pnpm:

```sh
pnpm install
```

4. Start the application:

```sh
pnpm start
```

And voila! Your application should now be running.

## Docker Commands

If you need to stop the Docker container, you can use the following command:

```sh
make stop
```

To reset the Docker database and apply migrations:

```sh
make reset
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
