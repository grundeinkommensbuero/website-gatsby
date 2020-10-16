# Expedition Grundeinkommen

Frontend for _Volksinitiativen_ Platform for Expedition Grundeinkommen.

Stack:

- React
- Gatsby
- Contentful
- Wordpress
- Netlify

## Code of Conduct

[Here](codeofconduct.md)

## Development Environment

### Install dependencies

```
npm i
```

### Run dev server

```
npm start
```

### Dev best practices

#### Git

You can either rebase when merging if it is important to keep the commits of the pr. When merging pull requests (without rebasing) merge commit messages should have the following structure: Merged #155: Short description

#### Linting and formatting

A `.prettierrc` file is included. You can install a Prettier plugin in your text editor, it will automatically detect the `.prettierrc`. It can be set to format according to these settings on save (in VS Code this is enabled by default).

## Integrations

The frontend interacts with Content APIs (run at build time), and with our own APIs, as defined in our [backend](https://github.com/grundeinkommensbuero/backend).

**None of the integrations have a local development environment.** The development environment gets this data from development instances of the hosted services.

### Content services

Content APIS are loaded at build time. Their configurations are defined in `gatsby-config.js`.

The general pipeline of static data loading and querying in Gatsby is as follows:

1. Gatsby runs the plugins defined in `gatsby-config.js`, which queries the content.
2. Gatsby runs the configuration in `gatsby-node.js`. This builds the static pages from the content.
3. `useStaticQuery` is used in the Layout component in order to get data from the Gatsby data layer.

#### Contentful

- Used for static content (pages):
  - A static page has multiple sections
  - All the sections of the different pages are defined in static sites.
  - `rich-text-react-renderer` can check they type of the content inside of embeds and then conditionally return components for that embedded content.
  - use `useStaticQuery` when you need to query something that comes from contentful.
  - The Contentful definition contains sections, which get passed to the `Section` component, which render all the possible configurations of a section.

#### Wordpress

- Used for blog posts

### API

The API runs on the Serverless Framework, deployed on AWS. The URL for accessing the API is configured in `aws-config.js`, which uses the dev or prod endpoints depending on the environment variable.

Use the endpoints like this:

```js
import CONFIG from '../../../aws-config';

const url = `${CONFIG.API.INVOKE_URL}/analytics/signatures`,

fetch(url, {...});
```

#### User Management

- Handled by Cognito.
- Uses Amplify frontend library for connecting to Cognito.
- Implemented in the Authentication context and the Authentication hook.
- User table in the database is linked to Cognito user database by the cognito id.

#### Database

- Uses Dynamo DB
- Tables:
  - Signatures
  - Users
