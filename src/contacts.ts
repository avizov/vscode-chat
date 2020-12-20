import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class contactsListProvider implements vscode.TreeDataProvider<Contacts> {

	private _onDidChangeTreeData: vscode.EventEmitter<Contacts | undefined | void> = new vscode.EventEmitter<Contacts | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<Contacts | undefined | void> = this._onDidChangeTreeData.event;

	constructor(private workspaceRoot: string) {
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: Contacts): vscode.TreeItem {
		return element;
	}

	getChildren(element?: Contacts): Thenable<Contacts[]> {
		if (!this.workspaceRoot) {
			vscode.window.showInformationMessage('No contacts in empty workspace');
			return Promise.resolve([]);
		}

		if (element) {
			return Promise.resolve(this.getContactsList(path.join(this.workspaceRoot, element.contactId)));
		} else {
			return Promise.resolve(this.getContactsList(path.join(this.workspaceRoot)));			
		}
	}

	/**
	 * Given the path to package.json, read all its dependencies and devDependencies.
	 */
	private getContactsList(contactId: string): Contacts[] {
        const contact1 = new Contacts("1", "Alex", "Alex Avizov", "alex.avizov@sap.com", vscode.TreeItemCollapsibleState.Collapsed);
        const contact2 = new Contacts("2", "Shimi", "Shimon Tal", "shimon.tal@sap.com", vscode.TreeItemCollapsibleState.Collapsed);
        let contactsList : Contacts[] = [];
        contactsList.push(contact1);        
        contactsList.push(contact2);
        return contactsList;				
	}
}

export class Contacts extends vscode.TreeItem {

	constructor(
		public readonly contactId: string,
        public readonly contactName: string,
        public readonly contactFullName: string,
		public readonly contactEmail: string,
		//public readonly directLinkToChat: vscode.Uri,
		//public readonly channelList: [string],
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(contactId, collapsibleState);

		this.tooltip = `${this.contactId}-${this.contactName}`;
		this.description = this.contactFullName;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'rocketchat.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'rocketchat.svg')
	};

	contextValue = 'contacts';
}