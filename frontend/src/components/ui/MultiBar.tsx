"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface BarItem {
  dataKey: string
}

interface MultipleBarProps {
  chartData: any[]
  chartConfig: ChartConfig
  xAxisKey: string
  bars: BarItem[]
  title?: string
  description?: string
  footerTrendText?: string
  footerNote?: string
}

export function MultipleBar({
  chartData,
  chartConfig,
  xAxisKey,
  bars,
  title = "Bar Chart - Multiple",
  description = "January - June 2024",
  footerTrendText = "Trending up by 5.2% this month",
  footerNote = "Showing total visitors for the last 6 months",
}: MultipleBarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {bars.map((bar, index) => {
              const config = chartConfig[bar.dataKey]
              const color = config?.color ?? `hsl(var(--chart-${index + 1}))`
              return (
                <Bar
                  key={bar.dataKey}
                  dataKey={bar.dataKey}
                  fill={color}
                  radius={4}
                />
              )
            })}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {footerTrendText} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">{footerNote}</div>
      </CardFooter>
    </Card>
  )
}
