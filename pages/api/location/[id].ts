import prisma from "@lib/prisma";

import apiHandler from "../util";

import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/location/[id]
export default async function getLocationById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await apiHandler(
    req,
    res,
    (req: NextApiRequest) => {
      const id = Number(req.query.id) ?? null;
      return prisma.location.findFirst({
        where: {
          id,
        },
        include: {
          report: {
            where: {
              published: true,
            },
            include: {
              fieldReports: {
                include: {
                  field: {
                    select: {
                      id: true,
                      type: true,
                      value: true,
                      mediaUpload: true,
                    },
                    include: {
                      mediaUpload: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    },
    () => {
      res.status(404).send({ message: "No Reports Found On Location" });
    },
    false
  );
}
