"use client"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
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

export const description = "A radial chart with stacked sections"

const chartData = [{ 
  month: "january", 
  dry: 320, 
  normal: 450, 
  oily: 280, 
  combination: 380, 
  unknown: 90 
}]

const chartConfig = {
  dry: {
    label: "Dry",
    color: "var(--chart-1)",
  },
  normal: {
    label: "Normal",
    color: "var(--chart-2)",
  },
  oily: {
    label: "Oil",
    color: "var(--chart-3)",
  },
  combination: {
    label: "Combination",
    color: "var(--chart-4)",
  },
  unknown: {
    label: "Unknown",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartSkinTypeDistribution() {
  const totalCustomers = chartData[0].dry + chartData[0].normal + chartData[0].oily + chartData[0].combination + chartData[0].unknown
  
  return (
    <Card className="border-0 shadow-lg overflow-hidden gap-0">
      <CardHeader>
        <CardTitle className="border-b-2 pb-4 dark:border-zinc-600">
          Skin Type Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-full">
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-8 gap-y-2 justify-center text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-chart-1"></div>
              <span>Dry</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-chart-2"></div>
              <span>Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-chart-3"></div>
              <span>Oil</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-chart-4"></div>
              <span>Combination</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-chart-5"></div>
              <span>Unknown</span>
            </div>
          </div>
        </div>
        <ChartContainer
          config={chartConfig}
          className="w-full flex justify-center h-full"
        >
          <div className="w-full max-w-[380px] mx-auto">
            <RadialBarChart
              data={chartData}
              width={380}
              height={380}
              endAngle={180}
              innerRadius={150}
              outerRadius={250}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 0}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {totalCustomers.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 50}
                            className="fill-muted-foreground text-base"
                          >
                          Total count
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="dry"
                stackId="a"
                cornerRadius={0}
                fill="var(--color-dry)"
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="normal"
                fill="var(--color-normal)"
                stackId="a"
                cornerRadius={0}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="oily"
                fill="var(--color-oily)"
                stackId="a"
                cornerRadius={0}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="combination"
                fill="var(--color-combination)"
                stackId="a"
                cornerRadius={0}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="unknown"
                fill="var(--color-unknown)"
                stackId="a"
                cornerRadius={0}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}