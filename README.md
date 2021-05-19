Sunshine react client
======================

The repository for the front-end client of sunshine.stageai.tech

## Running

**NOTICE**: All of the scripts and `yarn` commands in the repo depend on
[`react-scripts`](https://www.npmjs.com/package/react-scripts). You can install it by running:

    yarn add react-scripts

Running a development server:

    yarn start

This will fire up an HTTP server on http://localhost:3000/.

## Building

Then to build the project, run:

    yarn build

### Development lifecycle

New features are develped locally and pushed to gitlab.com/stage-ai/sunshine/sunshine-react in
a new feature branch.
After validating __all__ features (___new___ _and_ ___old___) work as expected locally a __merge request__ to `master` branch
is opened with detailed information on the introduced changes.

### Staging builds

Once a __merge request__ to `master` branch is accepted, an automatic `GitLab CI` pipeline will run automated tests and deploy the project in
`staging` environment by applying the `deplooyment.yaml` file to the configured `Kubernetes deployment`.

### Production builds

To deploy the project in `production` environment a new release `tag` needs to be pushed with a `version-x` string.
Please add a description with the introduced changes from the last version release. A convenient way of getting all
relevant changes is using

    git log --oneline version-0.1.2...origin/HEAD

where `version-0.1.2` is the latest release version.

### Running tests

The tests can be run with:

    yarn test
