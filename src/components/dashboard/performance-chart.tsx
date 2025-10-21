"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { vendors } from "@/lib/data";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const chartData = vendors.map(vendor => ({
  name: vendor.name,
  performance: vendor.performanceScore,
}));

export function PerformanceChart() {
  return (
    <div className="h-[350px] w-full">
      <ChartContainer
        config={{
          performance: {
            label: "Performance",
            color: "hsl(var(--primary))",
          },
        }}
        className="h-full w-full"
      >
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              stroke="#888888"
              fontSize={12}
              tickFormatter={(value) => value.split(' ')[0]}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="#888888"
              fontSize={12}
            />
             <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="performance" fill="var(--color-performance)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
