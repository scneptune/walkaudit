import prisma from '@lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import apiHandler from '@pages/api/util';

// GET /api/location/
export default async function getLocation(req: NextApiRequest, res: NextApiResponse) {
  await apiHandler(req, res, () => {
    return prisma.location.findMany({
          include: {
              report: {
                where: {
                    published: true
                },
              }
          }
      });
  }, () => res.status(404).send({ message: 'No Locations Found' }), false);
}