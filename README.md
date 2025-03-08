# Rest API Runner Extension

## Overview
The **Rest API Runner** extension for Visual Studio Code allows users to run REST API requests directly from VS Code. It provides a simple way to manage and group API requests in collections.

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

