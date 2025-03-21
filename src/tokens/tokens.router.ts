import { Hono } from 'hono';
import { listtokens, gettokens, createtokens, updatetokens, deletetokens } from './tokens.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { TokensSchema } from '../validator'; 
import { adminRoleAuth, bothRoleAuth } from '../middleware/BearAuth';

export const tokensRouter = new Hono();

// Get all tokens
tokensRouter.get('/tokens', listtokens);

// Get a single token
tokensRouter.get('/tokens/:id', gettokens);

// Create a token
tokensRouter.post(
  '/tokens',
  zValidator('json', TokensSchema), // Ensure request body validation
  createtokens
);

// Update a token
tokensRouter.put(
  '/tokens/:id', // Corrected path from "/users/:id" to "/tokens/:id"
  zValidator('json', TokensSchema), 
  updatetokens
);

// Delete a token
tokensRouter.delete('/tokens/:id', deletetokens); // Corrected path

export default tokensRouter;
