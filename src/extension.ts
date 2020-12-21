import * as vscode from 'vscode';
import { contactsListProvider, ContactsTI } from './contacts';

export function activate(context: vscode.ExtensionContext) {

    vscode.window.createTreeView('contactsList', {
        treeDataProvider: new contactsListProvider("bamba") //vscode.workspace.rootPath
    });

}