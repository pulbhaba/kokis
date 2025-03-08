import * as vscode from 'vscode';
import { RestApiPanel } from './restApiPanel';
import { RestApiTreeProvider } from './restApiTreeProvider';

export function activate(context: vscode.ExtensionContext) {
	const treeDataProvider = new RestApiTreeProvider(context);
	vscode.window.registerTreeDataProvider('kokisExplorer', treeDataProvider);

	// Register the command for adding a request
	context.subscriptions.push(
		vscode.commands.registerCommand('kokis.addRequest', () => treeDataProvider.addRequest()),
		vscode.commands.registerCommand('kokis.runRequest', (request) => RestApiPanel.createOrShow(context.extensionUri, request))
	);

	// Add the button to the Explorer view's toolbar
	vscode.window.createTreeView('kokisExplorer', {
		treeDataProvider: treeDataProvider,
		showCollapseAll: true
	});
}

export function deactivate() { }
