const premissionsFile = require("../DAL/PremissionsFile");

const getAllPermissions = async () => {
  const premissions = await premissionsFile.getAllPermissions();
  return premissions;
};

const getPremissionById = async (pId) => {
  //Get the existing preemissions data from json file
  const allPremissions = await premissionsFile.getAllPermissions();

  // Find premission index
  const index = allPremissions.findIndex(p => p.id === pId)
  if(index === -1) return "no premission found"
const premis = allPremissions[index]

  return premis

}

const addNewPremission = async (userIs, arr) => {
  //Get the existing premissions data from the json file
  const existPremissions = await premissionsFile.getAllPermissions();

  // Creat object with the relevent data for the premissionsJson
  const premissionsForJson = {
    id: userIs,
    permissions: arr,
  };
  

  //Append the premissions data
  existPremissions?.push(premissionsForJson);

  //Save the newUser
  const status = await premissionsFile.addPermission(existPremissions);

  return status;
};

const updatePremissions = async (pId, pObj) => {
  //Get the existing premissions data from the json file
  const existPremissions = await premissionsFile.getAllPermissions();

  // Find the premission Index by the id
  const index = existPremissions?.findIndex((prem) => prem.id === pId);

  // Change the user object in the exist Users array
  const prem = { id: pId, ...pObj };
  existPremissions[index] = prem;

  // Update the premissions in jsonFile
  await premissionsFile.addPermission(existPremissions)
  return "Premissions updated";
};
const DeletePremissions = async (pId) => {
  //Get the existing premissions data from the json file
  const existPremissions = await premissionsFile.getAllPermissions();

    // Find the premission Index by the id
    const index = existPremissions?.findIndex((prem) => prem.id === pId);
    if(index === -1) return "no premissions found"

    // Remove premissions from the premissions array
    existPremissions.splice(index,1)

    // Rewrite permissions json File without the delete permission
     await premissionsFile.addPermission(existPremissions)
     

     return "Premission deleted"

};


module.exports = {
  getAllPermissions,
  getPremissionById,
  addNewPremission,
  updatePremissions,
  DeletePremissions
};
