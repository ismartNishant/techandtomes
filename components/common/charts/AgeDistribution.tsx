"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { ageGroup: "18-24", users: 120 },
  { ageGroup: "25-32", users: 180 },
  { ageGroup: "33-50", users: 95 },
  { ageGroup: "51-more", users: 40 },
  { ageGroup: "Unknown", users: 25 },
]

const chartConfig = {
  users: {
    label: "Users",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function AgeDistribution() {
  return (
    <Card className="border-0 shadow-lg justify-between">
      <CardHeader>
        <CardTitle className="border-b-2 pb-4 dark:border-zinc-600">
          Age Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pr-4">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid
                horizontal
                vertical={false}
                strokeDasharray="4 4"
                stroke="#d1d5db"
              />
              <XAxis
                dataKey="ageGroup"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                allowDecimals={false}
              />
              <ChartTooltip
                cursor={{ fill: "transparent" }}
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey="users"
                fill="var(--chart-1)"
                radius={[8, 8, 0, 0]}
                barSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
