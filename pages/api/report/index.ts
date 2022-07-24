import prisma from '@lib/prisma'
import { getSession } from 'next-auth/react'
import apiHandler from '@pages/api/util';

import type { Prisma, Report } from '@prisma/client';
import type { DbAction} from "@pages/api/util";
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Session } from 'next-auth';

// POST /api/report
// Required fields in body: title
// Optional fields in body: content
export default async function handleReport(req: NextApiRequest, res: NextApiResponse) {
  function getReport(req: NextApiRequest, session: Session) {
      const { latitude, longitude, save = false } = req.body;
      const userEmail = session.user?.email || undefined;
      return prisma.report.create({
        data: {
          published: Boolean(save),
          user: {
              connect: {
                  email: userEmail
              }
          },
          location: {
              connectOrCreate: {
                  where: {
                      latitude_longitude: {
                          latitude: Number(latitude),
                          longitude: Number(longitude)
                      }
                  },
                  create: {
                      latitude: Number(latitude),
                      longitude: Number(longitude)
                  }
              }
          }
        },
      });
  };

  function updateReport(req: NextApiRequest, _session: Session) {
      const id = Number(req.query.id) || undefined;
      const { save = false } = req.body;
      return prisma.report.update({
        where: {
          id
        }, 
        data: {
          published: save
        }
      });
  }

  switch(req.method) {
    case "POST": {
      await apiHandler(req, res, getReport, (error) => {
          res.status(400).send({
            message: error.message
          });
      }, true);
    }
    case "PUT": {
      await apiHandler(req, res, updateReport, (error) => {
        res.status(400).send({
            message: error.message
        });
      })
    }
    default: {
      res.status(405).send({ message: "Method Not Supported" });
    }
  }
}


