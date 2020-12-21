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
    switch (node.UserName) {
        case "alex.avizov@sap.com":
            vscode.env.openExternal(vscode.Uri.parse("http://acb07b9efce7e4e1f81044de161e4d97-1175142219.eu-central-1.elb.amazonaws.com/direct/ckNuzPx28v4yXFcWbxm5afP9Z4oRM34JiH"));
            break;
        case "yariv.lifchuk@sap.com":
            vscode.env.openExternal(vscode.Uri.parse("http://acb07b9efce7e4e1f81044de161e4d97-1175142219.eu-central-1.elb.amazonaws.com/group/fiori"));
            break;
        case "rony.horvitz@sap.com":
            vscode.env.openExternal(vscode.Uri.parse("http://acb07b9efce7e4e1f81044de161e4d97-1175142219.eu-central-1.elb.amazonaws.com/direct/EjLmaZhXfM7SocH7YckNuzPx28v4yXFcWb"));
            break;
        case "raja.nasrallah@sap.com":
            vscode.env.openExternal(vscode.Uri.parse("http://acb07b9efce7e4e1f81044de161e4d97-1175142219.eu-central-1.elb.amazonaws.com/direct/EjLmaZhXfM7SocH7YckNuzPx28v4yXFcWb"));
            break;
        case "shimon.tal@sap.com":
            vscode.env.openExternal(vscode.Uri.parse("http://acb07b9efce7e4e1f81044de161e4d97-1175142219.eu-central-1.elb.amazonaws.com/direct/ckNuzPx28v4yXFcWbdKf5aLQf5E2h4kHmh"));
            break;
        default:
            vscode.env.openExternal(vscode.Uri.parse("http://acb07b9efce7e4e1f81044de161e4d97-1175142219.eu-central-1.elb.amazonaws.com/channel/general"));
            break;
    }
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
        case "HANA":
            vscode.env.openExternal(vscode.Uri.parse("http://acb07b9efce7e4e1f81044de161e4d97-1175142219.eu-central-1.elb.amazonaws.com/channel/hana"));
            break;
        case "SME":
            vscode.env.openExternal(vscode.Uri.parse("http://acb07b9efce7e4e1f81044de161e4d97-1175142219.eu-central-1.elb.amazonaws.com/channel/sme"));
            break;
        case "MOBILE":
            vscode.env.openExternal(vscode.Uri.parse("http://acb07b9efce7e4e1f81044de161e4d97-1175142219.eu-central-1.elb.amazonaws.com/channel/mobile"));
            break;
        default:
            vscode.env.openExternal(vscode.Uri.parse("http://acb07b9efce7e4e1f81044de161e4d97-1175142219.eu-central-1.elb.amazonaws.com/channel/general"));
            break;
    }
}