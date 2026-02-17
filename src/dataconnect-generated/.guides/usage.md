# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { listAllComponentTypes, myPublicBuilds, createNewUserBuild, addComponentToBuild } from '@dataconnect/generated';


// Operation ListAllComponentTypes: 
const { data } = await ListAllComponentTypes(dataConnect);

// Operation MyPublicBuilds: 
const { data } = await MyPublicBuilds(dataConnect);

// Operation CreateNewUserBuild:  For variables, look at type CreateNewUserBuildVars in ../index.d.ts
const { data } = await CreateNewUserBuild(dataConnect, createNewUserBuildVars);

// Operation AddComponentToBuild:  For variables, look at type AddComponentToBuildVars in ../index.d.ts
const { data } = await AddComponentToBuild(dataConnect, addComponentToBuildVars);


```