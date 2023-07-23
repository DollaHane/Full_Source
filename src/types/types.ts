export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export enum SelectedPage {
  Home = "home",
  Services = "services",
  Projects = "projects",
  ContactUs = "contactus",
}
