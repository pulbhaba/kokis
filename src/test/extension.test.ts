// src/test/extension.test.ts
import * as assert from 'assert';
import * as vscode from 'vscode';
import { RestApiPanel } from '../restApiPanel';
import { RestApiTreeProvider } from '../restApiTreeProvider';

describe('RestApiRunner Extension', () => {
	it('should activate extension', async () => {
		const extension = vscode.extensions.getExtension('your-extension-id');
		assert.ok(extension);
		await extension?.activate();
		assert.ok(extension.isActive);
	});

	it('should add an API request to the tree', async () => {
		const context = {} as vscode.ExtensionContext;
		const provider = new RestApiTreeProvider(context);
		provider.addRequest();
		assert.strictEqual(provider.getChildren().length, 1);
	});

	it('should create a webview panel for API requests', () => {
		const request = { url: 'https://jsonplaceholder.typicode.com/todos/1', method: 'GET', headers: [], body: "" };
		const panel = RestApiPanel.createOrShow(vscode.Uri.parse(''), request);
		assert.ok(panel);
	});
});