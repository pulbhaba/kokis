import * as path from 'path';
import * as vscode from 'vscode';

export class RestApiPanel {
  public static currentPanel: RestApiPanel | undefined;
  private readonly panel: vscode.WebviewPanel;
  private disposables: vscode.Disposable[] = [];
  private static _extensionUri: vscode.Uri;

  private constructor(panel: vscode.WebviewPanel) {
    this.panel = panel;
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
  }

  public static createOrShow(extensionUri: vscode.Uri, request: { url: string, method: string, headers: string[], body: string }) {
    RestApiPanel._extensionUri = extensionUri;
    const panel = vscode.window.createWebviewPanel(
      'kokis', 'API Runner', vscode.ViewColumn.One, { enableScripts: true }
    );
    panel.webview.html = RestApiPanel.getWebviewContent(panel.webview, request);
    RestApiPanel.currentPanel = new RestApiPanel(panel);
  }

  public dispose() {
    RestApiPanel.currentPanel = undefined;
    this.panel.dispose();
    while (this.disposables.length) {
      const disposable = this.disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private static getWebviewContent(webview: vscode.Webview, request: { url: string, method: string, headers: string[], body: string }): string {

    const jsFile = webview.asWebviewUri(
      vscode.Uri.joinPath(RestApiPanel._extensionUri, "dist", "webview", "index.js")
    );

    const cssFile = webview.asWebviewUri(
      vscode.Uri.joinPath(RestApiPanel._extensionUri, "dist", "webview", "index.css")
    );

    return `<!DOCTYPE html>
            <html>

            <head>
                <title>API Runner</title>
                <script>
                  window.apiRequest = ${JSON.stringify(request)};
                </script>
                <script type="module" src="${jsFile}"></script>
                <link rel="stylesheet" href="${cssFile}">
            </head>

            <body>
                <div id="app"></div>
            </body>

            </html>`;
  }
}