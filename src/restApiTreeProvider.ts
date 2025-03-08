// src/restApiTreeProvider.ts
import * as vscode from 'vscode';

export class RestApiTreeProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    readonly onDidChangeTreeData: vscode.Event<void> = this._onDidChangeTreeData.event;
    private requests: { label: string, url: string, method: string }[] = [];

    constructor(private context: vscode.ExtensionContext) { }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(): vscode.TreeItem[] {
        return this.requests.map(req => {
            const item = new vscode.TreeItem(req.label, vscode.TreeItemCollapsibleState.None);
            item.command = { command: 'restApiRunner.runRequest', title: 'Run Request', arguments: [req] };
            return item;
        });
    }

    addRequest() {
        vscode.window.showInputBox({ prompt: 'Enter API URL' }).then(url => {
            if (url) {
                this.requests.push({ label: url, url, method: 'GET' });
                this._onDidChangeTreeData.fire();
            }
        });
    }
}