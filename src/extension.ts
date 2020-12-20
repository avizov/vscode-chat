import * as vscode from 'vscode';
import { contactsListProvider, Contacts } from './contacts';

export function activate(context: vscode.ExtensionContext) {

    // vscode.window.createTreeView('contactsList', {
    //     treeDataProvider: new contactsListProvider("bamba") //vscode.workspace.rootPath
    // });

    const contactsProvider = new contactsListProvider(""); //vscode.workspace.rootPath
	vscode.window.registerTreeDataProvider('contactsList', contactsProvider);
	vscode.commands.registerCommand('contactsList.refreshEntry', () => contactsProvider.refresh());


    // const provider = new ChatViewProvider(context.extensionUri);
    // context.subscriptions.push(
    //     vscode.window.registerWebviewViewProvider(ChatViewProvider.viewType, provider),
    //     // vscode.commands.registerCommand("extension.chat.openChatPanel", openChatWebview),
    // );        

}


// const openChatWebview = async (chatArgs?: ChatArgs) => {
//     let provider = !!chatArgs ? chatArgs.providerName : undefined;
//     let channelId = !!chatArgs ? chatArgs.channelId : undefined;
//     const source = !!chatArgs ? chatArgs.source : EventSource.command;

//     if (!chatArgs) {
//         const selected = await askForChannel(undefined);

//         if (!!selected) {
//             provider = selected.providerName;
//             channelId = selected.channel.id;
//         }
//     }

//     if (!!provider && !!channelId) {
//         controller.updateCurrentState(provider, channelId, source);
//         controller.loadUi();

//         await setup(true, undefined);
//         await manager.updateWebviewForProvider(provider, channelId);
//         telemetry.record(EventType.viewOpened, source, channelId, provider);
//         manager.loadChannelHistory(provider, channelId);
//     }
// };

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