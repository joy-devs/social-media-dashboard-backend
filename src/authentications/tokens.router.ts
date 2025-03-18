import { Hono } from 'hono';
import { listtokens, gettokens, createtokens, updatetokens, deletetokens } from './tokens.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { TokensSchema } from '../validator'; 
import { adminRoleAuth,bothRoleAuth } from '../middleware/BearAuth';

export const tokensRouter = new Hono();

// Get all tokens
tokensRouter.get('/tokens',  listtokens);

// Get a single token
tokensRouter.get('/tokens/:id', gettokens);

// Create a token
tokensRouter.post(
  '/tokens',
  
  createtokens
);

// Update a token
tokensRouter.put(
  '/users/:id',
  
   updatetokens
);

// Delete a token
tokensRouter.delete('/users/:id',  deletetokens);

export default tokensRouter;
