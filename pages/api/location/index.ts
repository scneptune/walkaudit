import prisma from "@lib/prisma";
import apiHandler from "@pages/api/util";

import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/location/
export default async function getLocation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await apiHandler(
    req,
    res,
    () => {
      return prisma.location.findMany({
        include: {
          report: {
            where: {
              published: true,
            },
          },
        },
      });
    },
    () => res.status(404).send({ message: "No Locations Found" }),
    false
  );
}
