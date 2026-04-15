"use client"

import * as React from "react"

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Record<string, { label?: string; color?: string }>
  children?: React.ReactNode
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, children, config, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  ),
)
ChartContainer.displayName = "ChartContainer"

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    name?: string
    value?: number
    color?: string
  }>
  label?: string
}

const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-background p-3 shadow-md">
        {label && <p className="text-xs font-medium">{label}</p>}
        {payload.map((item, index) => (
          <p key={index} className="text-xs text-muted-foreground">
            <span style={{ color: item.color }}>{item.name}:</span> R${" "}
            {typeof item.value === "number" ? item.value.toFixed(2) : item.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export { ChartContainer, ChartTooltipContent }
export type { ChartContainerProps, ChartTooltipContentProps }
