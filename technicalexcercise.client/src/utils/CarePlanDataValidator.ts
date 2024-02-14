import { z } from "zod";

export const dataValidator = z.object({
    id: z.string().uuid().optional(),
    title: z.string().min(1).max(450),
    patientName: z.string().min(1).max(450),
    userName: z.string().min(1).max(450),
    //actualStartDateTime: z.string().datetime(),
    actualStartDateTime: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/)
      .refine(
        (value) => {
          return typeof value === "string" && !isNaN(Date.parse(value));
        },
        {
          message:
            "Invalid datetime format, it should be YYYY-MM-DDTHH:MM:SS or YYYY-MM-DDTHH:MM",
        }
      ),
    targetStartDateTime: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/)
      .refine(
        (value) => {
          return typeof value === "string" && !isNaN(Date.parse(value));
        },
        {
          message:
            "Invalid datetime format, it should be YYYY-MM-DDTHH:MM:SS or YYYY-MM-DDTHH:MM",
        }
      ),
    reason: z.string().min(1).max(1000),
    action: z.string().min(1).max(1000),
    completed: z.boolean().optional(),
    endDateTime: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/)
      .refine(
        (value) => {
          return typeof value === "string" && !isNaN(Date.parse(value));
        },
        {
          message:
            "Invalid datetime format, it should be YYYY-MM-DDTHH:MM:SS or YYYY-MM-DDTHH:MM",
        }
      )
      .optional(),
    outcome: z.string().min(1).max(1000).optional(),
  });
