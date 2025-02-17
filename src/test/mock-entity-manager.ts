// import { EntityManager } from "typeorm";

// export async function mockEntityManager() {
//   const entityManager = {} as EntityManager;

//   entityManager.save = function save(_entity: any): Promise<any> {
//     return Promise.resolve(true);
//   };

//   entityManager.update = function update(
//     _entity: any,
//     _update: any,
//   ): Promise<any> {
//     return Promise.resolve(true);
//   };

//   entityManager.findOne = function findOne(_query: any): Promise<any> {
//     return Promise.resolve(true);
//   };

//   entityManager.find = function find(_query?: any): Promise<Array<any>> {
//     return Promise.resolve([]);
//   };

//   entityManager.delete = function del(_query: any): Promise<any> {
//     return Promise.resolve(true);
//   };

//   entityManager.getRepository = jest.fn().mockReturnValue({
//     save: jest.fn().mockImplementation(entityManager.save),
//     update: jest.fn().mockImplementation(entityManager.update),
//     findOne: jest.fn().mockImplementation(entityManager.findOne),
//     find: jest.fn().mockImplementation(entityManager.find),
//     delete: jest.fn().mockImplementation(entityManager.delete),
//   });

//   // eslint-disable-next-line prefer-rest-params
//   //   await arguments[0](entityManager);
// }
