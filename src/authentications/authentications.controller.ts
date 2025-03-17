
import { Context } from 'hono';
import {AuthenticationTableService, getAuthenticationTableService, createAuthenticationTableService, updateAuthenticationTableService, deleteAuthenticationTableService } from './authentications.services';

// List all authentications
export const listauthentications = async (c: Context): Promise<Response> => {
  const authentications = await AuthenticationTableService();
  return c.json(authentications);
};

// Get a single authentication by ID
export const getauthentications = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const authentication = await getAuthenticationTableService(id);
  if (authentication) {
    return c.json(authentication);
  }
  return c.json({ message: 'authentication not found' }, 404);
};

// Create a new authentication
export const createauthentications = async (c: Context): Promise<Response> => {
  const authenticationData = await c.req.json();
  const authentication = await createAuthenticationTableService(authenticationData);
  return c.json(authentication, 201);
};

// Update a authentication
export const updateauthentications = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const authenticationData = await c.req.json();
  const message = await updateAuthenticationTableService(id, authenticationData);
  return c.json({ message });
};

// Delete a authentication
export const deleteauthentications = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const message = await deleteAuthenticationTableService(id);
  return c.json({ message });
};
