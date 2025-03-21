import { Hono } from 'hono';
import { listlikes, getlikes, createlikes, updatelikes, deletelikes } from './likes.controller'; 
import { zValidator } from '@hono/zod-validator'; 
// import { UsersTableSchema } from '../validator';
// import { adminRoleAuth, bothRoleAuth } from '../middleware/bearAuth'; 

export const likesRouter = new Hono();

// Get all likes
likesRouter.get('/likes', listlikes);

// Get a single like
likesRouter.get('/likes/:id', getlikes);

// Create a like
likesRouter.post(
  '/likes',
  createlikes
);

// Update a like
likesRouter.put(
  '/likes/:id',
  updatelikes
);

// Delete a like
likesRouter.delete('/likes/:id', deletelikes);

export default likesRouter;
