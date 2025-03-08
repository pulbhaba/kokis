// src/extension.ts
import * as vscode from 'vscode';
import { RestApiPanel } from './restApiPanel';
import { RestApiTreeProvider } from './restApiTreeProvider';

export function activate(context: vscode.ExtensionContext) {
	const treeDataProvider = new RestApiTreeProvider(context);
	vscode.window.registerTreeDataProvider('restApiExplorer', treeDataProvider);

	context.subscriptions.push(
		vscode.commands.registerCommand('restApiRunner.addRequest', () => treeDataProvider.addRequest()),
		vscode.commands.registerCommand('restApiRunner.runRequest', (request) => RestApiPanel.createOrShow(context.extensionUri, request))
	);
}

export function deactivate() { }