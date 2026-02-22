import { supabase } from "@/lib/supabase"
import Link from "next/link"
export const dynamic = "force-dynamic"
export default async function Home() {
  const { data: traders, error } = await supabase
    .from("traders")
    .select("*")
    .order("growth", { ascending: false })

  if (error) {
    console.error(error)
    return <div>Error loading data</div>
  }

  return (
  <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white px-4 py-6 sm:p-10">
    <div className="max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold tracking-tight mb-2">
        FTC Circle Ranking
      </h1>
      <p className="text-gray-400 mb-8">
        Live Performance Leaderboard
      </p>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="md:hidden space-y-4">
  {traders && traders.map((trader, index) => (
    <Link key={trader.id} href={`/trader/${trader.id}`}>
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
        <div className="flex justify-between items-center">
          <span className="font-semibold">
            #{index + 1} {trader.name}
          </span>
          <span className={`${trader.growth >= 0 ? "text-green-400" : "text-red-400"}`}>
            {trader.growth}%
          </span>
        </div>

        <div className="text-sm text-gray-400 mt-1">
          Drawdown: {trader.drawdown}%
        </div>
      </div>
    </Link>
  ))}
</div>
        <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-gray-400 text-sm">
              <th className="px-6 py-4 text-left">Rank</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Growth</th>
              <th className="px-6 py-4 text-left">Drawdown</th>
            </tr>
          </thead>

          <tbody>
            {traders && traders.map((trader, index) => {

              return (
                <tr
                  key={trader.id}
                  className="border-t border-gray-800 hover:bg-gray-800/60 transition"
                >
                  <td className="px-6 py-4 font-semibold">
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                    {index > 2 && index + 1}
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/trader/${trader.id}`}
                      className="text-blue-400 hover:text-blue-300 transition"
                    >
                      {trader.name}
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    <span className={
                      trader.growth >= 0
                        ? "text-green-400 font-semibold"
                        : "text-red-400 font-semibold"
                    }>
                      {trader.growth}%
                    </span>
                  </td>

                  <td className="px-6 py-4 text-red-400 font-semibold">
                    {trader.drawdown}%
                  </td>
                </tr>
              )
            })}
          </tbody>

        </table>
      </div>
      </div>

    </div>
  </main>
  )
}