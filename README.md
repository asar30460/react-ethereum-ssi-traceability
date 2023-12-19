# React Ethereum SSI Traceability

This project was bootstrapped with CRA. Simply complianted with ERC-1056 standard to implement basic SSI operations and have a simple testing traceability scenerio.<br><br>
Warning: The devlopement of this project is in progress, and so is this doc.

## Installation

After cloning this project, you must run the following instructions:

1. Create "yarn.lock" in directory.
2. Run `yarn install` to install all necessary dependencies.
3. Go https://app.tryethernal.com/ sign up an account and create a project. After that, edit ".env" add your **ETHERNAL_API_TOKEN** and **ETHERNAL_EMAIL**.

```
REACT_APP_DID_REGISTRY=0xabcdef123456...
ETHERNAL_API_TOKEN=eyAbC123Def456...
```

4. Install Metamask extension in your browser.
5. Run `yarn start` to start the project.
6. Go to "開發工具" page to deploy ERC-1056 contract.
7. Edit ".env" add the contract address in **REACT_APP_DID_REGISTRY**

```
REACT_APP_DID_REGISTRY=0xe7f1725e7734ce...
```

8. Restart the project.

## Legecy Doc

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
