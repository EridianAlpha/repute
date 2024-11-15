# Repute - A reputation based dispute resolution protocol

An EthGlobal Bangkok 2024 hackathon project.

## Installation

### Install Dependencies

Install the dependencies using the following command:

```bash
yarn
```

### Development Commands

This section explains the available scripts in the `package.json` file and their usage during development.

-   `yarn dev`  
    This command starts the development server using the `node server.js` script. Use this command during development to see live updates as you make changes to the project.

-   `yarn lint`  
    This command checks the code quality and adherence to coding standards using the `next lint` command. It is recommended to run this command before committing changes to ensure code consistency and maintainability.

## Production

### Production Commands

This section explains the available scripts in the `package.json` file and their usage during production deployments.

-   `yarn build`  
    This command builds the static site for production using the `next build` command. It generates an optimized build of the site that is suitable for deployment.

-   `yarn export`  
    This command exports the static site for production using the `next export` command. It generates an optimized build of the site that is suitable for deployment. The exported site is saved in the `out` directory.

-   `yarn start`  
    This command first runs `yarn build` to generate an optimized build of the site and then starts the production server using the `next start` command. Use this command to test the site in a production-like environment locally.

## Authors

-   [Eridian](https://github.com/EridianAlpha)
-   [Caron](https://github.com/CaronSch)

## License

[MIT](https://choosealicense.com/licenses/mit/)
