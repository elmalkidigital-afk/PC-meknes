import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddComponentToBuildData {
  buildComponent_insert: BuildComponent_Key;
}

export interface AddComponentToBuildVariables {
  buildId: UUIDString;
  componentId: UUIDString;
  quantity: number;
}

export interface BuildComponent_Key {
  buildId: UUIDString;
  componentId: UUIDString;
  __typename?: 'BuildComponent_Key';
}

export interface Build_Key {
  id: UUIDString;
  __typename?: 'Build_Key';
}

export interface ComponentType_Key {
  id: UUIDString;
  __typename?: 'ComponentType_Key';
}

export interface Component_Key {
  id: UUIDString;
  __typename?: 'Component_Key';
}

export interface CreateNewUserBuildData {
  build_insert: Build_Key;
}

export interface CreateNewUserBuildVariables {
  name: string;
  description?: string | null;
  isPublic: boolean;
}

export interface ListAllComponentTypesData {
  componentTypes: ({
    id: UUIDString;
    name: string;
  } & ComponentType_Key)[];
}

export interface MyPublicBuildsData {
  builds: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    user: {
      displayName: string;
    };
  } & Build_Key)[];
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface ListAllComponentTypesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllComponentTypesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllComponentTypesData, undefined>;
  operationName: string;
}
export const listAllComponentTypesRef: ListAllComponentTypesRef;

export function listAllComponentTypes(): QueryPromise<ListAllComponentTypesData, undefined>;
export function listAllComponentTypes(dc: DataConnect): QueryPromise<ListAllComponentTypesData, undefined>;

interface MyPublicBuildsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MyPublicBuildsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<MyPublicBuildsData, undefined>;
  operationName: string;
}
export const myPublicBuildsRef: MyPublicBuildsRef;

export function myPublicBuilds(): QueryPromise<MyPublicBuildsData, undefined>;
export function myPublicBuilds(dc: DataConnect): QueryPromise<MyPublicBuildsData, undefined>;

interface CreateNewUserBuildRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewUserBuildVariables): MutationRef<CreateNewUserBuildData, CreateNewUserBuildVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewUserBuildVariables): MutationRef<CreateNewUserBuildData, CreateNewUserBuildVariables>;
  operationName: string;
}
export const createNewUserBuildRef: CreateNewUserBuildRef;

export function createNewUserBuild(vars: CreateNewUserBuildVariables): MutationPromise<CreateNewUserBuildData, CreateNewUserBuildVariables>;
export function createNewUserBuild(dc: DataConnect, vars: CreateNewUserBuildVariables): MutationPromise<CreateNewUserBuildData, CreateNewUserBuildVariables>;

interface AddComponentToBuildRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddComponentToBuildVariables): MutationRef<AddComponentToBuildData, AddComponentToBuildVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddComponentToBuildVariables): MutationRef<AddComponentToBuildData, AddComponentToBuildVariables>;
  operationName: string;
}
export const addComponentToBuildRef: AddComponentToBuildRef;

export function addComponentToBuild(vars: AddComponentToBuildVariables): MutationPromise<AddComponentToBuildData, AddComponentToBuildVariables>;
export function addComponentToBuild(dc: DataConnect, vars: AddComponentToBuildVariables): MutationPromise<AddComponentToBuildData, AddComponentToBuildVariables>;

