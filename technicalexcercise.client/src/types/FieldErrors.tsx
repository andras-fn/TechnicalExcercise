export type FieldError = {
  [key: string]: string | null;
  title: string | null;
  patientName: string | null;
  userName: string | null;
  actualStartDateTime: string | null;
  targetStartDateTime: string | null;
  reason: string | null;
  action: string | null;
  completed: string | null;
  endDateTime: string | null;
  outcome: string | null;
};
