// Survey data type
export type Survey = {
  id: string
  surveyName: string
  category: string
  status: "Active" | "Draft" | "Closed"
  startDate: string
  endDate: string
  respondents: string
  cost: string
}

export interface DashboardOverview {
  totalClients: number
  activeClients: number
  maleClients: number
  femaleClients: number
}
