import express, { Router } from "express";
import {
  admitUser,
  getUserById,
  getUsers,
  getUserTeam,
  rejectUser,
} from "../controllers/UsersController";
import { asyncCatch } from "../util/asyncCatch";
import { isAdmin, isOwnerOrAdmin } from "./middleware";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Users Module
 *  description: Endpoints to manage users.
 */

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Query list of users
 *    security:
 *    - apiKeyAuth: []
 *    tags: [Users Module]
 *    description: Retrieves list of all users in the database. Access - Admin
 *    responses:
 *      200:
 *        description: Success.
 *      403:
 *        description: Forbidden.
 *      500:
 *        description: Internal Server Error.
 */
router.get("/", isAdmin, asyncCatch(getUsers));

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: Query user by user ID
 *    security:
 *    - apiKeyAuth: []
 *    tags: [Users Module]
 *    description: Retrieves user info by user ID, Access - Admin or Owner
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success.
 *      403:
 *        description: Forbidden.
 *      500:
 *        description: Internal Server Error.
 */
router.get("/:id", isOwnerOrAdmin, asyncCatch(getUserById));

/**
 * @swagger
 * /users/{id}/admit:
 *  post:
 *    summary: Admit user by ID
 *    security:
 *    - apiKeyAuth: []
 *    tags: [Users Module]
 *    description: Admit user by ID, Access - Admin
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success.
 *      403:
 *        description: Forbidden.
 *      404:
 *        description: User not found.
 *      500:
 *        description: Internal Server Error.
 */
router.post("/:id/admit", isAdmin, asyncCatch(admitUser));

/**
 * @swagger
 * /users/{id}/reject:
 *  post:
 *    summary: Reject user by ID
 *    security:
 *    - apiKeyAuth: []
 *    tags: [Users Module]
 *    description: Reject user by ID, Access - Admin
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success.
 *      403:
 *        description: Forbidden.
 *      404:
 *        description: User not found.
 *      500:
 *        description: Internal Server Error.
 */
router.post("/:id/reject", isAdmin, asyncCatch(rejectUser));

/**
 * @swagger
 * /users/{id}/team:
 *  get:
 *    summary: Get a user's team
 *    security:
 *    - apiKeyAuth: []
 *    tags: [Users Module]
 *    description: Get a user's team, Access - Admin or Owner
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success.
 *      400:
 *        description: User does not have a team
 *      403:
 *        description: Forbidden.
 *      404:
 *        description: User not found.
 *      500:
 *        description: Internal Server Error.
 */
router.get("/:id/team", isOwnerOrAdmin, asyncCatch(getUserTeam));

export default router;
