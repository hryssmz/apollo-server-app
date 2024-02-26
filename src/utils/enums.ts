// utils/enums.ts
export const defaultPrivacyLevelChoices = [
  "public",
  "private",
  "contacts",
] as const;

export const transactionRequestStatusChoices = [
  "pending",
  "accepted",
  "rejected",
] as const;

export const transactionStatusChoices = [
  "pending",
  "incomplete",
  "complete",
] as const;
