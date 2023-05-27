# Zoho API Client

npm version

The Zoho API Client is an NPM package that provides a convenient way to interact with Zoho's APIs. It abstracts away the complexities of authentication and API calls, allowing you to focus on integrating Zoho's services into your applications.

## Features

Simplified authentication process for Zoho APIs.
Easy-to-use methods for making API requests.
Supports a variety of Zoho services and modules.

## Installation

You can install the Zoho API Client package using NPM:

```bash
npm install @zohoapis/crm
```

## Getting Started

To use the Zoho API Client, you'll need to have a Zoho account and create an API client. Follow these steps to get started:

1. Sign in to your Zoho account and navigate to the **Developer Console**.
2. Create a new **Client Secret** and **Client ID** for your application.
3. Make note of the **Client ID** and **Client Secret** as you'll need them for authentication.

## Usage

Here's a basic example of how to use the Zoho API Client:

```javascript
const { Records, RelatedRecords } = require("@zohoapis/crm");

Records.authToken = "";

//List records and return requested fields
Records.getRecords("Accounts", { fields: "id" });
//Get a specific record
Records.getRecords("Accounts", "");
//Get a specific record and return requested fields
Records.getRecords("Accounts", "", { fields: "id" });
```

## API Reference

The Zoho API Client provides a set of methods to interact with Zoho's APIs. Refer to the [API reference documentation]() for detailed information about the available methods and their usage.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please submit a pull request. Make sure to follow the [contribution guidelines]().

## License

This project is licensed under the [MIT License]().

## Acknowledgements

- The Zoho API Client package was inspired by the need for a simplified interface to interact with Zoho's APIs.
- Thanks to the contributors who have helped improve this package.

## Support

If you have any questions, feel free to reach out to our support team at [support@example.com]().
