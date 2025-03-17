import { Context } from 'hono';
import { 
  createAuthUserService, 
  gettokensService, 
  createtokensService, 
  updatetokensService, 
  deletetokensService 
} from './authentications.services';

// List all tokens
export const listtokens = async (c: Context): Promise<Response> => {
  const userData = {}; // Ensure you're passing the required data
  const tokens = await createAuthUserService(userData); // Fixed: Now passing an argument
  return c.json(tokens);
};

// Get a single token by ID
export const gettokens = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const token = await gettokensService(id);
  if (token) {
    return c.json(token);
  }
  return c.json({ message: 'Token not found' }, 404);
};

// Create a new token
export const createtokens = async (c: Context): Promise<Response> => {
  const tokenData = await c.req.json();
  const token = await createtokensService(tokenData);
  return c.json(token, 201);
};

// Update a token
export const updatetokens = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const tokenData = await c.req.json();
  const message = await updatetokensService(id, tokenData);
  return c.json({ message });
};

// Delete a token
export const deletetokens = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const message = await deletetokensService(id);
  return c.json({ message });
};
