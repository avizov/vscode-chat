import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class contactsListProvider implements vscode.TreeDataProvider<Contacts> {

	private _onDidChangeTreeData: vscode.EventEmitter<Contacts | undefined | void> = new vscode.EventEmitter<Contacts | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<Contacts | undefined | void> = this._onDidChangeTreeData.event;
	private contactsList : Contacts[] = [];

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
			return Promise.resolve(this.getContactsList(element.contactId));
		} else {
			return Promise.resolve(this.getContactsList());			
		}
	}

	/**
	 * Given the path to package.json, read all its dependencies and devDependencies.
	 */
	private getContactsList(contactId?: string): Contacts[] {
		if (this.contactsList.length === 0) {
			const contact1 = new Contacts("1", "Alex", "Alex Avizov", vscode.TreeItemCollapsibleState.Collapsed, new ContactDetails("1", "alex.avizov@sap.com", "active", vscode.TreeItemCollapsibleState.Expanded));
			const contact2 = new Contacts("2", "Shimi", "Shimon Tal", vscode.TreeItemCollapsibleState.Collapsed, new ContactDetails("2", "shimon.tal@sap.com", "active", vscode.TreeItemCollapsibleState.Expanded));
			this.contactsList.push(contact1);        
			this.contactsList.push(contact2);
			return this.contactsList;
		}
		if (!!contactId) {
			this.contactsList.find(element => {
				if (contactId == element.contactId) {
					return element;
				}
			});
		} 
		return [];           				
	}
}

export class Contacts extends vscode.TreeItem {

	constructor(
		public readonly contactId: string,
        public readonly contactName: string,
        public readonly contactFullName: string,
		//public readonly directLinkToChat: vscode.Uri,
		//public readonly channelList: [string],
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly contactdetails: ContactDetails
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

export class ContactDetails extends vscode.TreeItem {
	constructor(
		public readonly contactId: string,
		public readonly contactEmail: string,
		public readonly status: string,

		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(contactId, collapsibleState);
	}
	contextValue = 'contactsDetails';

}