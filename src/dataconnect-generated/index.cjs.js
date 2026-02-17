const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'pc-meknes',
  location: 'europe-west4'
};
exports.connectorConfig = connectorConfig;

const listAllComponentTypesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllComponentTypes');
}
listAllComponentTypesRef.operationName = 'ListAllComponentTypes';
exports.listAllComponentTypesRef = listAllComponentTypesRef;

exports.listAllComponentTypes = function listAllComponentTypes(dc) {
  return executeQuery(listAllComponentTypesRef(dc));
};

const myPublicBuildsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MyPublicBuilds');
}
myPublicBuildsRef.operationName = 'MyPublicBuilds';
exports.myPublicBuildsRef = myPublicBuildsRef;

exports.myPublicBuilds = function myPublicBuilds(dc) {
  return executeQuery(myPublicBuildsRef(dc));
};

const createNewUserBuildRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewUserBuild', inputVars);
}
createNewUserBuildRef.operationName = 'CreateNewUserBuild';
exports.createNewUserBuildRef = createNewUserBuildRef;

exports.createNewUserBuild = function createNewUserBuild(dcOrVars, vars) {
  return executeMutation(createNewUserBuildRef(dcOrVars, vars));
};

const addComponentToBuildRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddComponentToBuild', inputVars);
}
addComponentToBuildRef.operationName = 'AddComponentToBuild';
exports.addComponentToBuildRef = addComponentToBuildRef;

exports.addComponentToBuild = function addComponentToBuild(dcOrVars, vars) {
  return executeMutation(addComponentToBuildRef(dcOrVars, vars));
};
