import { getSession } from 'next-auth/react'


import type { NextApiRequest, NextApiResponse } from 'next'
import type { Session } from "next-auth";
import type {Prisma } from "prisma/prisma-client"

export type DbAction = (req: NextApiRequest, session?: Session) => Promise<any>;
export type DbErrorHandling = (err: any) => void;

export default async function apiHandler<T>(
    req: NextApiRequest, 
    res: NextApiResponse, 
    dbAction: Prisma.PromiseReturnType<DbAction>, 
    errorHandler: DbErrorHandling, 
    withAuth = false
) {
    try {
        const session = await getSession({req});
        if (withAuth) {
            if (session) {
                const result = await dbAction(req, session);
                res.json(result);
            } else {
                return res.status(401).send({ message: 'Unauthorized' });
            }
        } else {
            const result = await dbAction(req);
            res.json(result);
        }
    } catch (apiError) {
        if (apiError instanceof Error) {
            errorHandler(apiError);
        }
    }
}