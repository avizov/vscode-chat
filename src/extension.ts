import * as vscode from 'vscode';
import { contactsListProvider, ContactsTI } from './contacts';

export function activate(context: vscode.ExtensionContext) {
    vscode.window.createTreeView('contactsList', {
        treeDataProvider: new contactsListProvider("bamba") //vscode.workspace.rootPath
    });
    vscode.commands.registerCommand('contactsList.openChat', cbOpenChat);
    vscode.commands.registerCommand('contactsList.openChannelChat', cbOpenChannelChat);
}
function cbOpenChat (node: ContactsTI) {
    vscode.window.showInformationMessage(`Successfully called open chat ` + node.label)
}

function cbOpenChannelChat (node: ContactsTI) {
    vscode.window.showInformationMessage(`Successfully called open channel chat ` + node.label)
}