import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default async function Home() {
  const { data: traders } = await supabase
    .from("traders")
    .select("*")
    .order("growth", { ascending: false })

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8">FTC Circle Ranking</h1>

      <table className="w-full border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-3 text-left">Rank</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Growth (%)</th>
            <th className="p-3 text-left">Drawdown (%)</th>
          </tr>
        </thead>
        <tbody>
  {traders?.map((trader, index) => {
    const isFirst = index === 0

    return (
      <tr
        key={trader.id}
        className={`border-t border-gray-700 ${
  index === 0
    ? "bg-yellow-900/30 font-bold"
    : index === 1
    ? "bg-gray-600/30"
    : index === 2
    ? "bg-orange-900/30"
    : ""
}`}
      >
        <td className="p-3 font-semibold">
  {index === 0 && "🥇"}
  {index === 1 && "🥈"}
  {index === 2 && "🥉"}
  {index > 2 && index + 1}
</td>

        <td className="p-3">
          <Link
            href={`/trader/${trader.id}`}
            className={`hover:underline ${
              isFirst ? "text-yellow-400" : "text-blue-400"
            }`}
          >
            {trader.name}
          </Link>
        </td>

        <td
          className={`p-3 ${
            isFirst ? "text-yellow-400" : "text-green-400"
          }`}
        >
          {trader.growth}%
        </td>

        <td className="p-3 text-red-400">
          {trader.drawdown}%
        </td>
      </tr>
    )
  })}
</tbody>
      </table>
    </main>
  )
}