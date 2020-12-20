import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const provider = new ChatViewProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(ChatViewProvider.viewType, provider));


}

class ChatViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'chat.viewType';

    private _view?: vscode.WebviewView;

    constructor(
        private readonly _extensionUri: vscode.Uri,
    ) { }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,

            localResourceRoots: [
                this._extensionUri
            ]
        };


        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.type) {

            }
        });
    }

}