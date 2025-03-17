import { Hono } from 'hono';
import { listauthentications, getauthentications, createauthentications, updateauthentications, deleteauthentications } from './authentication.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { TokensSchema } from '../validator'; 
import { adminRoleAuth,bothRoleAuth } from '../middleware/BearAuth';

export const authenticationsRouter = new Hono();

// Get all authentications
authenticationsRouter.get('/authentications',  listauthentications);

// Get a single authentication
authenticationsRouter.get('/authentications/:id', getauthentications);

// Create a authentication
authenticationsRouter.post(
  '/authentications',
  
  createauthentications
);

// Update a authentication
authenticationsRouter.put(
  '/users/:id',
  
   updateauthentications
);

// Delete a authentication
authenticationsRouter.delete('/users/:id',  deleteauthentications);

export default authenticationsRouter;
