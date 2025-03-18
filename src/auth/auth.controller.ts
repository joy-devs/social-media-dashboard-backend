import "dotenv/config";
import { Context } from "hono";
import { createAuthUserService, userLoginService } from "./auth.service";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";

// import assert from "assert";

// Ensure JWT_SECRET is set in the environment variables
// assert(process.env.JWT_SECRET, "JWT_SECRET is not set in the .env file");

export const registerUser = async (c: Context) => {
    
        try {
            const user = await c.req.json();
            const pass = user.password;
            const hashedPassword = await bcrypt.hash(pass, 10);
            user.password = hashedPassword;
            console.log(user)
            const createdUser = await createAuthUserService(user);
            if (!createdUser) return c.text("User not created", 404);
            return c.json({ msg: createdUser }, 201);


    

    // // Send email after successful user creation.
    // await sendEmail(user.email, subject, html);

    return c.json({ msg: "User created successfully" }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
    


export const loginUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        console.log(user)
        // Check if user exists
        const userExist = await userLoginService(user);
        if (!userExist) {
            return c.json({ error: "User not found" }, 404);
        }

        // Compare passwords
        const userMatch = await bcrypt.compare(user.password, userExist.password as string);
        if (!userMatch) {
            return c.json({ error: "Invalid credentials" }, 401);
        }

        // Create JWT payload
        const payload = {
            sub: userExist.username,
            role: userExist.role,
            exp: Math.floor(Date.now() / 1000) + (60 * 180),  
        };

        const secret = process.env.JWT_SECRET as string;
        const token = await sign(payload, secret);

        return c.json({ token, user: { username: userExist.username,id:userExist.id ,role: userExist.role } }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}


