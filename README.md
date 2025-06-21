# Rest API Runner Extension

## Overview
The **Rest API Runner** is a Visual Studio Code extension designed to streamline REST API testing directly within your workspace. With an intuitive sidebar interface, it enables developers to efficiently manage, group, and execute their API requests without having to leave the editor. The extension facilitates rapid API testing by allowing you to save frequent requests into organized collections, execute them instantly, and conveniently view responses in an embedded webview panel.

This tool is ideal for developers looking for a quick, integrated way to interact with APIs during development, debugging, and collaboration.

## Features
- Add API requests to a collection
- Run API requests with a single click
- View responses directly in a webview panel
- Supports basic HTTP methods

## Installation
1. Clone or download the repository.
2. Open the project in VS Code.
3. Install dependencies (if required):
   ```sh
   npm install
   ```
4. Run the extension in a new VS Code window by pressing `F5`.

## Usage
### Adding an API Request
1. Open the **Rest API Explorer** view in the Activity Bar.
2. Click on the **Add Request** button.
3. Enter the API URL.
4. The request will be added to the tree view.

### Running an API Request
1. Click on a request in the **Rest API Explorer**.
2. The request will open in a webview panel.
3. Click the **Run** button to execute the request.
4. The response will be displayed in the panel.

## Extension Structure
- `extension.ts`: Main entry point, registers commands and tree provider.
- `restApiTreeProvider.ts`: Manages API request collection in the sidebar.
- `restApiPanel.ts`: Handles running requests in a webview.

## Future Improvements
- Support for different HTTP methods (POST, PUT, DELETE, etc.)
- Request headers and body customization
- Response formatting and syntax highlighting
- Import/export API collections

## Contributing
Feel free to fork the repository and submit pull requests with improvements!

## License
MIT License

