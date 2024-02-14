export type CarePlan = {
  id?: string;
  title: string;
  patientName: string;
  userName: string;
  actualStartDateTime: string;
  targetStartDateTime: string;
  reason: string;
  action: string;
  completed?: boolean | undefined;
  endDateTime?: string | null;
  outcome?: string | null;
};
