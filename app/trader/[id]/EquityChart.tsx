"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface EquityData {
  day: string
  equity: number
}

export default function EquityChart({ data }: { data: EquityData[] }) {
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#888888" />
          <YAxis stroke="#888888" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="equity"
            stroke="#22c55e"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}