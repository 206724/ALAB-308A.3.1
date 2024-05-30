// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.mjs";

 async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };
  try{
    //determine which database to use for the give ID
     const valueReturnedFromCentral = await central(id);   
 
    if (!dbs[valueReturnedFromCentral]) throw new Error (`Database ${valueReturnedFromCentral} not found`);
     //fetch data from both database in parallel
     const [userBasicData,userPersonalData] =
     await Promise.all([dbs[valueReturnedFromCentral](id),vault(id)]);


     //    const userBasicData =await dbs[valueReturnedFromCentral](id);
//    const userPersonalData =await vault(id);
// 
    return {
           id:id,
           name:userPersonalData.name,
           username:userBasicData.username,
           email:userPersonalData.email,
           address:{
                   street:userPersonalData.address.street,
                   suite:userPersonalData.address.suite,
                   city:userPersonalData.address.city,
                   zipcode:userPersonalData.address.zipcode,
                        geo:{
                       late:userPersonalData.address.geo.late,
                       lng:userPersonalData.address.geo.lng,
                            }
                    },
            phone:userBasicData.phone,
            website:userBasicData.website,
            company:{
            name:userBasicData.company.name,
            catchPhase:userBasicData.company.catchPhase,
            bs:userBasicData.company.bs,
                    },                  
          };
        
} catch (error) {
    return Promise.reject(`Error retrieving user data :${error.message}`);
 }
}


