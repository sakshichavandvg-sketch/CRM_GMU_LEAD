import API_ENDPOINTS from "@/utils/apiEndpoints";
import { env } from "@/config/env";
import { reportsData } from "../reports/data";

const getScenarioResponse = (successData) => {
  const scenario = env.MOCK_SCENARIO;
  switch (scenario) {
    case "unauthorized": return [401, { success: false, message: "Unauthorized access" }];
    case "forbidden": return [403, { success: false, message: "Forbidden" }];
    case "validation": return [400, { success: false, message: "Validation failed" }];
    case "server-error": return [500, { success: false, message: "Internal server error" }];
    case "success":
    default: return [200, successData];
  }
};

export const setupReportHandlers = (mock) => {
  mock.onGet(API_ENDPOINTS.REPORTS.USERS).reply(() => {
    return getScenarioResponse({ success: true, message: "Report users fetched", data: reportsData.users });
  });

  mock.onGet(API_ENDPOINTS.REPORTS.DATE_DETAILS).reply(() => {
    return getScenarioResponse({ success: true, message: "Date details fetched", data: reportsData.dateDetails });
  });

  mock.onGet(API_ENDPOINTS.REPORTS.INDIVIDUAL).reply(() => {
    return getScenarioResponse({ success: true, message: "Individual report fetched", data: reportsData.individual });
  });

  mock.onGet(API_ENDPOINTS.REPORTS.SOURCE_LEADS).reply(() => {
    return getScenarioResponse({ success: true, message: "Source leads report fetched", data: reportsData.sourceLeads });
  });

  mock.onGet(API_ENDPOINTS.REPORTS.DATEWISE_SUMMARY).reply(() => {
    return getScenarioResponse({ success: true, message: "Datewise summary fetched", data: reportsData.datewiseSummary });
  });
};
