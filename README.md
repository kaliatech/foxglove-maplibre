# Foxglove MapLibre Extension

This repo contains source for an [extension](https://docs.foxglove.dev/docs/visualization/extensions/introduction) that can be installed in [Foxglove](https://foxglove.dev) that provides a map panel based on MapLibre. The default map panel in Foxglove uses [Leaflet](https://leafletjs.com/).

## Screenshot

Default map panel is in the center. Map panel from this extension is on the right using a maptiler tileset, with a tilted camera and 3D buildings.

![Screenshot 001](docs/i/screenshot-20241008-001.avif)

## TODO

As of 2024-10-08, this extension is not complete and has not yet been released.

TODO - v1 (for initial release)

- [x] Implement basic map panel showing all `LocationFix` messages for a single topic
- [x] Implement current location indicator
- [x] Add hover/select interaction like seen in default map panel
- [ ] Implement settings panel
  - [ ] Custom map tile source settings
  - [ ] For predefined Maptiler tile source, support api key
  - [ ] Support custom topic subscription for LocationFix
- [ ] Setup CI/CD for automated releases
- [ ] Submit PR/issue to Foxglove for the webpack config workaround

TODO - 2.0.0

- [ ] Support more than one topic subscription, custom color per
- [ ] Support custom (possibly predefined) markers
- [ ] Add trailing/fading history of location markers (optional)
- [ ] Add dynamic marker sizing according to zoom level
- [ ] Submit to foxglove extension registry

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

### Deploy (local)

```shell
# Deploy to local Foxglove installation
npm run local-install

# Rebuild and redeploy upon any source change (experimental)
npm run dev

```

After local-install, restart the Foxglove desktop or `ctrl-r` to refresh if it is already open.

Debug inside Foxglove using `ctrl-i` to open dev console.

### Package and Publish

```shell
# Package as .foxe
npm run package

# Release
# This is done automatically via git tags and github actions
```

Publishing:

https://docs.foxglove.dev/docs/visualization/extensions/publish/#packaging-your-extension
