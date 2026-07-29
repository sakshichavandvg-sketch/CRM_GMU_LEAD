import LeadInfoTab from "../components/details/tabs/LeadInfoTab";
import LeadTimelineTab from "../components/details/tabs/LeadTimelineTab";
import LeadNotesTab from "../components/details/tabs/LeadNotesTab";
import LeadDocumentsTab from "../components/details/tabs/LeadDocumentsTab";
import LeadActivityTab from "../components/details/tabs/LeadActivityTab";
import ContactSection from "../components/details/sections/ContactSection";
import LeadInformationSection from "../components/details/sections/LeadInformationSection";
import AssignmentSection from "../components/details/sections/AssignmentSection";
import AdminActionsCard from "../components/details/sections/AdminActionsCard";

export const TABS_CONFIG = [
  { id: "info", label: "Overview", component: LeadInfoTab },
  { id: "timeline", label: "Timeline", component: LeadTimelineTab },
  { id: "notes", label: "Notes", component: LeadNotesTab }
];

export const INFO_SECTIONS = [
  { id: "contact", title: "Contact Details", component: ContactSection },
  { id: "lead", title: "Lead Information", component: LeadInformationSection },
  { id: "assignment", title: "Assignment", component: AssignmentSection },
  { id: "admin", title: "Admin Actions", component: AdminActionsCard }
];
