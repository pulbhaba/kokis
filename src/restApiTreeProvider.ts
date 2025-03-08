import * as vscode from 'vscode';
import yargs from 'yargs';

// Define a flexible tree item class
class ApiRequestTreeItem extends vscode.TreeItem {
  constructor(
    label: string,
    url: string,
    method: string,
    iconPath: vscode.Uri | string,
    headers: string[],
    body: string
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.url = url;
    this.method = method;
    this.iconPath = "iconPath";
    this.headers = headers;
    this.body = body;
    this.command = {
      command: 'kokis.runRequest',
      title: 'Run Request',
      arguments: [{ label, url, method, headers, body }]
    };
  }

  url: string;
  method: string;
  headers: string[];
  body: string;
}


// The tree provider class
export class RestApiTreeProvider implements vscode.TreeDataProvider<ApiRequestTreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData: vscode.Event<void> = this._onDidChangeTreeData.event;
  private requests: { label: string, url: string, method: string, headers: string[], body: string }[] = [];

  constructor(private context: vscode.ExtensionContext) { }

  getTreeItem(element: ApiRequestTreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(): ApiRequestTreeItem[] {
    return this.requests.map(req => {
      // Decide on an icon based on the request method
      let iconPath: vscode.Uri | string;
      if (req.method === 'GET') {
        iconPath = vscode.Uri.parse('file://./media/dark/get.svg');
      } else if (req.method === 'POST') {
        iconPath = vscode.Uri.parse('file://./media/dark/post.svg');
      } else if (req.method === 'PATCH') {
        iconPath = vscode.Uri.parse('file://./media/dark/patch.svg');
      } else if (req.method === 'PUT') {
        iconPath = vscode.Uri.parse('file://./media/dark/put.svg');
      } else {
        iconPath = vscode.Uri.parse('file://./media/dark/delete.svg');
      }

      return new ApiRequestTreeItem(req.label, req.url, req.method, iconPath, req.headers, req.body);
    });
  }

  addRequest() {
    vscode.window.showInputBox({ prompt: 'Enter a curl command' }).then(curlCommand => {
      if (!curlCommand) {
        throw new Error('Invalid curl command.');
      }
      // Remove "curl" part of the command
      const cleanedCommand = curlCommand.replace(/^curl\s+/g, '');

      // Use yargs to parse the cleaned curl command
      const parsed = yargs(cleanedCommand)
        .option('X', { type: 'string', alias: 'method' })
        .option('H', { type: 'array', alias: 'headers' })
        .option('data-raw', { type: 'string', alias: 'body' })
        .parse() as { [key: string]: any };

      // Extract parameters with TypeScript support
      const method: string = parsed.method || 'GET';
      const url: string = parsed._[0]?.replace(/^['"]|['"]$/g, '') || '';
      const headers: [] = parsed.headers || [];
      const body: string = parsed.body || '';

      if (url) {
        this.requests.push({ label: url, url, method, headers, body });
        this._onDidChangeTreeData.fire();
      } else {
        throw new Error('Invalid curl command. Could not extract URL.');
      }
    });
  }
}