export interface AppSidebarProps {
  campaignTitle: string | undefined;
  role: string | undefined;
  sections: Section[];
}
export interface Section {
  id: number;
  title: string;
  subSections: Section[];
}