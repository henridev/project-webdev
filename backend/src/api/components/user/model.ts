/**
* @swagger
* tags:
*   name: User
*   description: user
*/


/**
 * @swagger
 *
 * definitions:
 *   Role :
 *     type: string
 *     pattern: '^(^ADMIN|USER$)$'
 */
export type Role = 'ADMIN' | 'USER'

export enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

/**
* @swagger
*
* definitions:
*   User:
*     type: object
*     required :
*       - id
*       - username
*       - email
*     properties :
*       id :
*         type : string
*       username :
*         type : string
*       email :
*         type : string
*       password :
*         type : string
*       passwordHash :
*         type : string
*       avatarUrl :
*         type : string
*       heroUrl :
*         type : string
*       roles :
*         items:
*           $ref: '#/definitions/Role'
*/
export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  passwordHash?: string;
  roles?: Role[] | string
  avatarUrl?: string
  heroUrl?: string
}


export interface UserDB extends User { avatar_url: string, hero_url?: string, password_hash: string }