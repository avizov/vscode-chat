import * as vscode from 'vscode';
import { contactsListProvider, ContactsTI, PacksTI } from './contacts';

export function activate(context: vscode.ExtensionContext) {
    vscode.window.createTreeView('contactsList', {
        treeDataProvider: new contactsListProvider(vscode.workspace.rootPath!) 
    });
    vscode.commands.registerCommand('contactsList.openChat', cbOpenChat);
    vscode.commands.registerCommand('contactsList.openChannelChat', cbOpenChannelChat);
}
function cbOpenChat (node: ContactsTI) {
    vscode.window.showInformationMessage(`Successfully called open chat with user ` + node.label)
}

function cbOpenChannelChat (node: PacksTI) {
    switch (node.packName) {
        case "Basic":
            vscode.env.openExternal(vscode.Uri.parse("http://acb07b9efce7e4e1f81044de161e4d97-1175142219.eu-central-1.elb.amazonaws.com/channel/basic"));
            break;
        case "SAPFiori":
            vscode.env.openExternal(vscode.Uri.parse("http://acb07b9efce7e4e1f81044de161e4d97-1175142219.eu-central-1.elb.amazonaws.com/group/fiori"));
            break;
        case "CAP":
            vscode.env.openExternal(vscode.Uri.parse("http://acb07b9efce7e4e1f81044de161e4d97-1175142219.eu-central-1.elb.amazonaws.com/channel/cap"));
            break;
        default:
            vscode.env.openExternal(vscode.Uri.parse("http://acb07b9efce7e4e1f81044de161e4d97-1175142219.eu-central-1.elb.amazonaws.com/channel/general"));
            break;
    }
}