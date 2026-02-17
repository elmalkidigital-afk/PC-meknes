# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAllComponentTypes*](#listallcomponenttypes)
  - [*MyPublicBuilds*](#mypublicbuilds)
- [**Mutations**](#mutations)
  - [*CreateNewUserBuild*](#createnewuserbuild)
  - [*AddComponentToBuild*](#addcomponenttobuild)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAllComponentTypes
You can execute the `ListAllComponentTypes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllComponentTypes(): QueryPromise<ListAllComponentTypesData, undefined>;

interface ListAllComponentTypesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllComponentTypesData, undefined>;
}
export const listAllComponentTypesRef: ListAllComponentTypesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllComponentTypes(dc: DataConnect): QueryPromise<ListAllComponentTypesData, undefined>;

interface ListAllComponentTypesRef {
  ...
  (dc: DataConnect): QueryRef<ListAllComponentTypesData, undefined>;
}
export const listAllComponentTypesRef: ListAllComponentTypesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllComponentTypesRef:
```typescript
const name = listAllComponentTypesRef.operationName;
console.log(name);
```

### Variables
The `ListAllComponentTypes` query has no variables.
### Return Type
Recall that executing the `ListAllComponentTypes` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllComponentTypesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllComponentTypesData {
  componentTypes: ({
    id: UUIDString;
    name: string;
  } & ComponentType_Key)[];
}
```
### Using `ListAllComponentTypes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllComponentTypes } from '@dataconnect/generated';


// Call the `listAllComponentTypes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllComponentTypes();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllComponentTypes(dataConnect);

console.log(data.componentTypes);

// Or, you can use the `Promise` API.
listAllComponentTypes().then((response) => {
  const data = response.data;
  console.log(data.componentTypes);
});
```

### Using `ListAllComponentTypes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllComponentTypesRef } from '@dataconnect/generated';


// Call the `listAllComponentTypesRef()` function to get a reference to the query.
const ref = listAllComponentTypesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllComponentTypesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.componentTypes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.componentTypes);
});
```

## MyPublicBuilds
You can execute the `MyPublicBuilds` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
myPublicBuilds(): QueryPromise<MyPublicBuildsData, undefined>;

interface MyPublicBuildsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MyPublicBuildsData, undefined>;
}
export const myPublicBuildsRef: MyPublicBuildsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
myPublicBuilds(dc: DataConnect): QueryPromise<MyPublicBuildsData, undefined>;

interface MyPublicBuildsRef {
  ...
  (dc: DataConnect): QueryRef<MyPublicBuildsData, undefined>;
}
export const myPublicBuildsRef: MyPublicBuildsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the myPublicBuildsRef:
```typescript
const name = myPublicBuildsRef.operationName;
console.log(name);
```

### Variables
The `MyPublicBuilds` query has no variables.
### Return Type
Recall that executing the `MyPublicBuilds` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MyPublicBuildsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `MyPublicBuilds`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, myPublicBuilds } from '@dataconnect/generated';


// Call the `myPublicBuilds()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await myPublicBuilds();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await myPublicBuilds(dataConnect);

console.log(data.builds);

// Or, you can use the `Promise` API.
myPublicBuilds().then((response) => {
  const data = response.data;
  console.log(data.builds);
});
```

### Using `MyPublicBuilds`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, myPublicBuildsRef } from '@dataconnect/generated';


// Call the `myPublicBuildsRef()` function to get a reference to the query.
const ref = myPublicBuildsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = myPublicBuildsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.builds);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.builds);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNewUserBuild
You can execute the `CreateNewUserBuild` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewUserBuild(vars: CreateNewUserBuildVariables): MutationPromise<CreateNewUserBuildData, CreateNewUserBuildVariables>;

interface CreateNewUserBuildRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewUserBuildVariables): MutationRef<CreateNewUserBuildData, CreateNewUserBuildVariables>;
}
export const createNewUserBuildRef: CreateNewUserBuildRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewUserBuild(dc: DataConnect, vars: CreateNewUserBuildVariables): MutationPromise<CreateNewUserBuildData, CreateNewUserBuildVariables>;

interface CreateNewUserBuildRef {
  ...
  (dc: DataConnect, vars: CreateNewUserBuildVariables): MutationRef<CreateNewUserBuildData, CreateNewUserBuildVariables>;
}
export const createNewUserBuildRef: CreateNewUserBuildRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewUserBuildRef:
```typescript
const name = createNewUserBuildRef.operationName;
console.log(name);
```

### Variables
The `CreateNewUserBuild` mutation requires an argument of type `CreateNewUserBuildVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNewUserBuildVariables {
  name: string;
  description?: string | null;
  isPublic: boolean;
}
```
### Return Type
Recall that executing the `CreateNewUserBuild` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewUserBuildData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewUserBuildData {
  build_insert: Build_Key;
}
```
### Using `CreateNewUserBuild`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewUserBuild, CreateNewUserBuildVariables } from '@dataconnect/generated';

// The `CreateNewUserBuild` mutation requires an argument of type `CreateNewUserBuildVariables`:
const createNewUserBuildVars: CreateNewUserBuildVariables = {
  name: ..., 
  description: ..., // optional
  isPublic: ..., 
};

// Call the `createNewUserBuild()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewUserBuild(createNewUserBuildVars);
// Variables can be defined inline as well.
const { data } = await createNewUserBuild({ name: ..., description: ..., isPublic: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewUserBuild(dataConnect, createNewUserBuildVars);

console.log(data.build_insert);

// Or, you can use the `Promise` API.
createNewUserBuild(createNewUserBuildVars).then((response) => {
  const data = response.data;
  console.log(data.build_insert);
});
```

### Using `CreateNewUserBuild`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewUserBuildRef, CreateNewUserBuildVariables } from '@dataconnect/generated';

// The `CreateNewUserBuild` mutation requires an argument of type `CreateNewUserBuildVariables`:
const createNewUserBuildVars: CreateNewUserBuildVariables = {
  name: ..., 
  description: ..., // optional
  isPublic: ..., 
};

// Call the `createNewUserBuildRef()` function to get a reference to the mutation.
const ref = createNewUserBuildRef(createNewUserBuildVars);
// Variables can be defined inline as well.
const ref = createNewUserBuildRef({ name: ..., description: ..., isPublic: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewUserBuildRef(dataConnect, createNewUserBuildVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.build_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.build_insert);
});
```

## AddComponentToBuild
You can execute the `AddComponentToBuild` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addComponentToBuild(vars: AddComponentToBuildVariables): MutationPromise<AddComponentToBuildData, AddComponentToBuildVariables>;

interface AddComponentToBuildRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddComponentToBuildVariables): MutationRef<AddComponentToBuildData, AddComponentToBuildVariables>;
}
export const addComponentToBuildRef: AddComponentToBuildRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addComponentToBuild(dc: DataConnect, vars: AddComponentToBuildVariables): MutationPromise<AddComponentToBuildData, AddComponentToBuildVariables>;

interface AddComponentToBuildRef {
  ...
  (dc: DataConnect, vars: AddComponentToBuildVariables): MutationRef<AddComponentToBuildData, AddComponentToBuildVariables>;
}
export const addComponentToBuildRef: AddComponentToBuildRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addComponentToBuildRef:
```typescript
const name = addComponentToBuildRef.operationName;
console.log(name);
```

### Variables
The `AddComponentToBuild` mutation requires an argument of type `AddComponentToBuildVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddComponentToBuildVariables {
  buildId: UUIDString;
  componentId: UUIDString;
  quantity: number;
}
```
### Return Type
Recall that executing the `AddComponentToBuild` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddComponentToBuildData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddComponentToBuildData {
  buildComponent_insert: BuildComponent_Key;
}
```
### Using `AddComponentToBuild`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addComponentToBuild, AddComponentToBuildVariables } from '@dataconnect/generated';

// The `AddComponentToBuild` mutation requires an argument of type `AddComponentToBuildVariables`:
const addComponentToBuildVars: AddComponentToBuildVariables = {
  buildId: ..., 
  componentId: ..., 
  quantity: ..., 
};

// Call the `addComponentToBuild()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addComponentToBuild(addComponentToBuildVars);
// Variables can be defined inline as well.
const { data } = await addComponentToBuild({ buildId: ..., componentId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addComponentToBuild(dataConnect, addComponentToBuildVars);

console.log(data.buildComponent_insert);

// Or, you can use the `Promise` API.
addComponentToBuild(addComponentToBuildVars).then((response) => {
  const data = response.data;
  console.log(data.buildComponent_insert);
});
```

### Using `AddComponentToBuild`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addComponentToBuildRef, AddComponentToBuildVariables } from '@dataconnect/generated';

// The `AddComponentToBuild` mutation requires an argument of type `AddComponentToBuildVariables`:
const addComponentToBuildVars: AddComponentToBuildVariables = {
  buildId: ..., 
  componentId: ..., 
  quantity: ..., 
};

// Call the `addComponentToBuildRef()` function to get a reference to the mutation.
const ref = addComponentToBuildRef(addComponentToBuildVars);
// Variables can be defined inline as well.
const ref = addComponentToBuildRef({ buildId: ..., componentId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addComponentToBuildRef(dataConnect, addComponentToBuildVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.buildComponent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.buildComponent_insert);
});
```

