import { hdEvents, hdPlatforms } from "@hd/core-contracts";

export const webCoreAlignment = {
  platform: hdPlatforms.web,
  events: {
    leadCreated: hdEvents.webLeadCreated,
    auditActionRecorded: hdEvents.auditActionRecorded
  }
} as const;
