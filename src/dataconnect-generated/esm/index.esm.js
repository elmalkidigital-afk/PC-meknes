import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'pc-meknes',
  location: 'europe-west4'
};

export const listAllComponentTypesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllComponentTypes');
}
listAllComponentTypesRef.operationName = 'ListAllComponentTypes';

export function listAllComponentTypes(dc) {
  return executeQuery(listAllComponentTypesRef(dc));
}

export const myPublicBuildsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MyPublicBuilds');
}
myPublicBuildsRef.operationName = 'MyPublicBuilds';

export function myPublicBuilds(dc) {
  return executeQuery(myPublicBuildsRef(dc));
}

export const createNewUserBuildRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewUserBuild', inputVars);
}
createNewUserBuildRef.operationName = 'CreateNewUserBuild';

export function createNewUserBuild(dcOrVars, vars) {
  return executeMutation(createNewUserBuildRef(dcOrVars, vars));
}

export const addComponentToBuildRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddComponentToBuild', inputVars);
}
addComponentToBuildRef.operationName = 'AddComponentToBuild';

export function addComponentToBuild(dcOrVars, vars) {
  return executeMutation(addComponentToBuildRef(dcOrVars, vars));
}

