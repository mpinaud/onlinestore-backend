# 🚀 Deployment

## Getting Started

If you have not done so already, you will need to install the Prisma CLI globally with `npm install -g prisma`, and have access to the [Prisma Cloud](https://app.prisma.io/login)

## Deployment Process

## Prisma Server

This service contains the PostgreSQL database. Deploy this service to make structural changes to the database.

You can manage the service and the database via the [Prisma Cloud](https://app.prisma.io/login). Click on the `default` service to get the the database Prisma Cloud Admin, where you can manage all the data directly. If there are 0 services, or you do not see the service for the correct environment, run:

```bash
prisma login
```

For deployment, because we are deploying from a custom env file, you must run:

```bash
prisma deploy --env-file variables.env
```