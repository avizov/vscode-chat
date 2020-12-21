import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class contactsListProvider implements vscode.TreeDataProvider<ContactsTI> {

	private _onDidChangeTreeData: vscode.EventEmitter<ContactsTI | undefined | void> = new vscode.EventEmitter<ContactsTI | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<ContactsTI | undefined | void> = this._onDidChangeTreeData.event;
	private contactsList : ContactsTI[] = [];

	constructor(private workspaceRoot: string) {
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: ContactsTI): vscode.TreeItem {
		return element;
	}

	getChildren(element?: ContactsTI): Thenable<ContactsTI[]> {
		if (!this.workspaceRoot) {
			vscode.window.showInformationMessage('No contacts in empty workspace');
			return Promise.resolve([]);
		}

		if (element) {
			return Promise.resolve(this.getContactsList(element.UserName));
		} else {
			return Promise.resolve(this.getContactsList());			
		}
	}

	/**
	 * Given the path to package.json, read all its dependencies and devDependencies.
	 */
	private getContactsList(UserName?: string): ContactsTI[] {
		if (this.contactsList.length === 0) {
			const contact1 = new ContactsTI(
				"alex.avizov@sap.com", 
				true, 
				new Date(Date.now()), 
				"biginner", 
				3,
				["Fiori", "CAP"], 
				["FioriElementExtension", "MobileExtension"], 
				vscode.TreeItemCollapsibleState.Collapsed
			);
			const contact2 = new ContactsTI(
				"shimon.tal@sap.com", 
				true, 
				new Date(Date.now()), 
				"expert",
				8, 
				["Fiori", "CAP"], 
				["FioriElementExtension", "MobileExtension"], 
				vscode.TreeItemCollapsibleState.Collapsed
			);
			this.contactsList.push(contact1);        
			this.contactsList.push(contact2);
			return this.contactsList;
		}
		if (!!UserName) {
			this.contactsList.find(element => {
				if (UserName == element.UserName) {
					return element;
				}
			});
		} 
		return [];           				
	}
}

export class ContactsTI extends vscode.TreeItem {
	constructor(
		public readonly UserName: string,
		public readonly Active: boolean,
		public readonly LastConnected: Date,
		public readonly Level: string,
		public readonly WorkspacesCount: number,
		public readonly PackList: string[],
		public readonly ExtensionList: string[],
		//public readonly directLinkToChat: vscode.Uri,
		//public readonly channelList: [string],
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
	) {
		super(UserName, collapsibleState);
		new ContactDetailsTI(UserName, WorkspacesCount, LastConnected, Level, PackList, ExtensionList, vscode.TreeItemCollapsibleState.Expanded, this);
		//this.description = this.UserName;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'rocketchat.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'rocketchat.svg')
	};

	contextValue = 'contacts';
}

export class ContactDetailsTI extends vscode.TreeItem {
	constructor(
		public readonly UserName: string,
		public readonly WorkspacesCount: number,
		public readonly LastConnected: Date,
		public readonly Level: string,
		public readonly PackList: string[],
		public readonly ExtensionList: string[],
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly parent: ContactsTI,
		public readonly command?: vscode.Command
	) {
		super(UserName, collapsibleState);
		PackList.forEach(element => {
			new PacksTI(element, vscode.TreeItemCollapsibleState.None, this);
		});
		ExtensionList.forEach(element => {
			new ExtensionsTI(element, vscode.TreeItemCollapsibleState.None, this);
		});
	}
	contextValue = 'contactsDetails';
}

export class PacksTI extends vscode.TreeItem {
	constructor( 
		public readonly packName: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly parent: ContactDetailsTI
	) {
		super(packName, collapsibleState)
	}
	contextValue = 'PacksDetails';
}

export class ExtensionsTI extends vscode.TreeItem {
	constructor( 
		public readonly extensionName: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly parent: ContactDetailsTI
	) {
		super(extensionName, collapsibleState)
	}
	contextValue = 'OptionalExtensionsDetails';
}