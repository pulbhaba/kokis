// src/restApiPanel.ts
import * as vscode from 'vscode';

export class RestApiPanel {
    public static currentPanel: RestApiPanel | undefined;
    private readonly panel: vscode.WebviewPanel;
    private disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel) {
        this.panel = panel;
        this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
    }

    public static createOrShow(extensionUri: vscode.Uri, request: { url: string, method: string }) {
        const panel = vscode.window.createWebviewPanel(
            'restApiRunner', 'API Runner', vscode.ViewColumn.One, { enableScripts: true }
        );
        panel.webview.html = RestApiPanel.getWebviewContent(request);
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

    private static getWebviewContent(request: { url: string, method: string }): string {
        return `<!DOCTYPE html>
        <html>
        <body>
            <h2>API Request</h2>
            <p>URL: ${request.url}</p>
            <button onclick="fetchData()">Run</button>
            <pre id="response"></pre>
            <script>
                async function fetchData() {
                    const res = await fetch('${request.url}', { method: '${request.method}' });
                    const data = await res.text();
                    document.getElementById('response').innerText = data;
                }
            </script>
        </body>
        </html>`;
    }
}
