import { Client, Databases, Users, Account, Storage, Avatars, Functions, Role, Permission, Query, ID, AppwriteException, Graphql, Locale, Teams, Health, InputFile } from 'node-appwrite'

class AppwriteServer {
  client: Client;
  users: Users;
  databases: Databases;
  account: Account;
  storage: Storage;
  avatars: Avatars;
  functions: Functions;
  role: Role;
  permission: Permission;
  query: Query;
  id: ID;
  appwriteException: any;
  graphql: Graphql;
  locale: Locale;
  teams: Teams;
  health: Health;
  inputFile: InputFile;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(process.env.APPWRITE_ENDPOINT || '') // Your API Endpoint
      .setProject(process.env.APPWRITE_PROJECT_ID || '') // Your project ID
      .setKey(process.env.APPWRITE_API_KEY || '') // Your secret API key
    this.databases = new Databases(this.client);
    this.users = new Users(this.client)
    this.account = new Account(this.client);
    this.storage = new Storage(this.client);
    this.avatars = new Avatars(this.client);
    this.functions = new Functions(this.client);
    this.role = Role;
    this.permission = Permission;
    this.query = Query;
    this.id = ID;
    this.appwriteException = AppwriteException;
    this.graphql = new Graphql(this.client);
    this.locale = new Locale(this.client);
    this.teams = new Teams(this.client);
    this.health = new Health(this.client);
    this.inputFile = InputFile;
  }
}

/**
 * Use the current Appwrite Server instance
 * @returns Client, Databases, Users, Account, Storage, Avatars, Functions, Role, Permission
 */
const useAppwriteServer = () => {
  return new AppwriteServer()
}

export default useAppwriteServer
