import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class contactsListProvider implements vscode.TreeDataProvider<ContactsTI | ContactDetailsTI | PacksTI | ExtensionsTI> {

	private _onDidChangeTreeData: vscode.EventEmitter<ContactsTI | ContactDetailsTI | PacksTI | ExtensionsTI | undefined | void> = new vscode.EventEmitter<ContactsTI | ContactDetailsTI | PacksTI | ExtensionsTI | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<ContactsTI | ContactDetailsTI | PacksTI | ExtensionsTI | undefined | void> = this._onDidChangeTreeData.event;
	private contactsList : ContactsTI[] = [];

	constructor(private workspaceRoot: string) {
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: ContactsTI | ContactDetailsTI | PacksTI | ExtensionsTI): vscode.TreeItem {
		return element;
	}

	getChildren(element?: ContactsTI | ContactDetailsTI | PacksTI | ExtensionsTI): Thenable<ContactsTI[] | ContactDetailsTI[] | PacksTI[] | ExtensionsTI[]> {
		if (!this.workspaceRoot) {
			vscode.window.showInformationMessage('No contacts in empty workspace');
			return Promise.resolve([]);
		}

		if (element) {
			return Promise.resolve(this.getTreeItemList(element));
		} else {
			return Promise.resolve(this.getTreeItemList());			
		}
	}

	private getTreeItemList(element?: ContactsTI | ContactDetailsTI | PacksTI | ExtensionsTI): ContactsTI[] | ContactDetailsTI[] | PacksTI[] | ExtensionsTI[] {
		if (this.contactsList.length === 0) {
			let userList = JSON.parse(fs.readFileSync(path.join(__filename, '..', '..',"mockData.json"), 'utf8'));
			for (let i = 0; i < userList.length; i++) {
				const userListItem = userList[i];
				const contact = new ContactsTI(
					userListItem.userName, 
					userListItem.active, 
					userListItem.lastConnected, 
					userListItem.level, 
					userListItem.wsCount,
					userListItem.packs, 
					userListItem.optExtensions, 
					vscode.TreeItemCollapsibleState.Collapsed
				);
				this.contactsList.push(contact);
			}			    
			return this.contactsList;
		}
		if (element instanceof ContactsTI && !!element.UserName) {
			let ContactDetailsTIList: ContactDetailsTI[] = []; 
			let _foundContactDetailsItem = element.ContactDetails.find(element => {
				if (element.UserName == element.UserName) {
					return element;
				}
			});
			if (_foundContactDetailsItem) {
				ContactDetailsTIList.push(_foundContactDetailsItem);
				return ContactDetailsTIList;
			}
		} 
		if (element instanceof ContactDetailsTI) {
			let _foundContactPacks = element.ContactPacks.filter(element => {
				if (element.UserName == element.UserName) {
					return element;
				}
			});
			return _foundContactPacks;
		}
		return [];           				
	}
}

export class ContactsTI extends vscode.TreeItem {
	public ContactDetails: ContactDetailsTI[] = [];

	constructor(
		public readonly UserName: string,
		public readonly Active: boolean,
		public readonly LastConnected: Date,
		public readonly Level: string,
		public readonly WorkspacesCount: number,
		public readonly PackList: string[],
		public readonly ExtensionList: string[],
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
	) {
		super(UserName, collapsibleState);
		this.ContactDetails.push(new ContactDetailsTI(UserName, WorkspacesCount, LastConnected, Level, PackList, ExtensionList, vscode.TreeItemCollapsibleState.Expanded, this));
		this.description = "The user " + this.UserName + " is active: " + this.Active;
		if (this.Active) {
			this.iconPath = this.iconPathActive;
		} else {
			this.iconPath = this.iconPathInactive;
		}
	}

	iconPathActive = {
		light: path.join(__filename, '..', '..', 'resources', 'Green_sphere.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'Green_sphere.svg')
	};

	iconPathInactive = {
		light: path.join(__filename, '..', '..', 'resources', 'Red_sphere.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'Red_sphere.svg')
	};

	contextValue = 'contacts';
}

export class ContactDetailsTI extends vscode.TreeItem {
	public ContactPacks: PacksTI[] = [];
	public ContactExtensions: ExtensionsTI[] = [];

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
			this.ContactPacks.push(new PacksTI(UserName, element, vscode.TreeItemCollapsibleState.None, this));
		});
		ExtensionList.forEach(element => {
			this.ContactExtensions.push(new ExtensionsTI(UserName, element, vscode.TreeItemCollapsibleState.None, this));
		});
		this.description = "," + this.WorkspacesCount + " devSpace, " + this.Level + " , LastConected: " + this.LastConnected;
		this.iconPath = this.iconPath;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'contactDetails.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'contactDetails.svg')
	};

	contextValue = 'contactsDetails';
}

export class PacksTI extends vscode.TreeItem {
	constructor( 
		public readonly UserName: string,
		public readonly packName: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly parent: ContactDetailsTI
	) {
		super(packName, collapsibleState)
		this.label = "Use " + packName + " dev space";

	
	this.iconPath = this.iconPath;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'Package.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'Package.svg')
	};
	contextValue = 'PacksDetails';
}

export class ExtensionsTI extends vscode.TreeItem {
	constructor( 
		public readonly UserName: string,
		public readonly extensionName: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly parent: ContactDetailsTI
	) {
		super(extensionName, collapsibleState)
		this.label = "Uses optional extension " + extensionName;

	}
	contextValue = 'OptionalExtensionsDetails';
}