export interface AppSidebarProps {
  campaignTitle: string
  role: 'DM' | 'Player'
  sections: Section[];
}
export interface Section {
  id: number
  title: string
  subSections: Section[]
}