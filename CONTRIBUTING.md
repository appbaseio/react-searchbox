# React Searchbox Contribution Guide 🔍

Welcome to the contribution guide! We welcome all contributions. A list of issues is present [here](https://github.com/appbaseio/react-searchbox/issues). If you're interested in picking up something, feel free to start a discussion 😺

## Initial setup

Currently the initial setup is a bit manual which we're planning to improve.

1. Fork the repo in order to send PRs

2. Clone the repo from your profile, use SSH if possible

3. `cd` into the project directory

4. Checkout the `master` branch (should be default)

5. You can then install the dependencies, we recommend `yarn`. Run this from the project root:

```bash
yarn
```

6. You can run the following command from root which will start the watchers and run example from [here](./example). This will let you make changes to these projects on the fly and the files will be transpiled and updated instantly:
```bash
yarn start
```

7. You can also test using `storybook`, by going inside `example` directory and run:
```bash
yarn storybook
```
