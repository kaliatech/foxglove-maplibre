# Foxglove MapLibre Extension

[Foxglove](https://foxglove.dev) allows developers to create [extensions](https://docs.foxglove.dev/docs/visualization/extensions/introduction). This repo contains source for an extension that provides a panel for displaying positional data using MapLibre.

## Development

### Prerequisites
Recent versions of Node and NPM are required to get started. A node environment manager,
like [nvm](https://github.com/nvm-sh/nvm), [fnm](https://github.com/Schniz/fnm),
or [asdf](https://asdf-vm.com/), is recommended.

Assuming fnm is installed:

```shell
# Install node
fnm install 20
fnm use 20
fnm default 20
```

### Installs

```shell
# Clone the repo
git clone https://github.com/kaliatech/foxglove-maplibre

# Make sure correct version of node and NPM are available. If using fnm:
fnm use # will install/use version according .nvmrc in this repo

# Verify
node --version # example: v20.12.2
npm --version # example: v10.7.0

# Install dependencies
npm install
```

### Building
```shell
# Lint (expect zero warnings or errors)
npm run lint

# Format with prettier (do this before pushing)
npm run format

# Check all types and build
npm run build
```

### Deployment
```shell
# Deploy to local Foxglove installation
npm run local-install

# Rebuild and redeploy on any change
# TODO: add script using something like nodemon

```

After local-install, restart the Foxglove desktop or `ctrl-r` to refresh if it is already open.

Debug inside Foxglove using `ctrl-i` to open dev console.


## Distribution

```shell
# Package as .foxe
npm run package

# Release
# This is done automatically via git tags and github actions
```