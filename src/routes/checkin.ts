import express, { Router } from "express";
import {
  addNewCheckInItem,
  editCheckInItem,
} from "../controllers/CheckInController";
import { isAdmin } from "./middleware";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Check In Module
 *  description: Endpoints to manage check in items and histories.
 */

/**
 * @swagger
 * /check-in:
 *   post:
 *     summary: Add new Check In item
 *     security:
 *     - apiKeyAuth: []
 *     tags: [Check In Module]
 *     description: Creates new Check in Item. Access - Admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startTime:
 *                 type: number
 *               endTime:
 *                 type: number
 *               points:
 *                 type: number
 *               accessLevel:
 *                 type: string
 *               enableSelfCheckIn:
 *                 type: boolean
 *     responses:
 *       200:
 *          description: Success.
 *       400:
 *          description: Bad request
 *       401:
 *          description: Unauthorized.
 *       500:
 *          description: Internal Server Error.
 */
router.post("/", isAdmin, addNewCheckInItem);

/**
 * @swagger
 * /check-in/{id}:
 *   patch:
 *     summary: Edit check in item
 *     security:
 *     - apiKeyAuth: []
 *     tags: [Check In Module]
 *     description: Edit existing check in item information. All body parameters are optional. If unspecified, the parameters are not updated. Access - Admin.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Schedule Item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startTime:
 *                 type: number
 *               endTime:
 *                 type: number
 *               points:
 *                 type: number
 *               accessLevel:
 *                 type: string
 *               enableSelfCheckIn:
 *                 type: boolean
 *     responses:
 *       200:
 *          description: Success.
 *       400:
 *          description: Bad request
 *       401:
 *          description: Unauthorized.
 *       500:
 *          description: Internal Server Error.
 */
router.patch("/:id", isAdmin, editCheckInItem);

export default router;
