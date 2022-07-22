import { IMeme } from 'project-web-dev'

/**
 * @swagger
 *
 * definitions:
 *   Meme:
 *     type: object
 *     properties:
 *          id:
 *            type: string
 *          name:
 *            type: string
 *          imgUrl:
 *            type: string
 *          categories:
 *            type: array
 *            items:
 *             type: string
 *          creatorId:
 *            type: string
 */

export interface MemeDB extends IMeme { img_url: string, updated_at?: string, created_at?: string, creator_id: string }