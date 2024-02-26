// mocks/utils.ts
import { faker } from "@faker-js/faker";

export const getTimestamps = () => {
  const time1 = faker.date
    .between({ from: "2014-01-01T00:00:00Z", to: "2024-01-01T00:00:00Z" })
    .getTime();
  const time2 = faker.date
    .between({ from: "2014-01-01T00:00:00Z", to: "2024-01-01T00:00:00Z" })
    .getTime();
  return {
    createdAt: new Date(Math.min(time1, time2)),
    modifiedAt: new Date(Math.max(time1, time2)),
  };
};
