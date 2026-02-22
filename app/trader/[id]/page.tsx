import { supabase } from "@/lib/supabase"
import EquityChart from "./EquityChart"
import Link from "next/link"

export default async function TraderDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: trader, error } = await supabase
    .from("traders")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !trader) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        Trader not found
      </div>
    )
  }

  const { data: history } = await supabase
    .from("equity_history")
    .select("*")
    .eq("trader_id", id)
    .order("created_at", { ascending: true })

  

  return (
    <main className="min-h-screen px-4 py-6 sm:p-10">
<div className="mb-6">
  <Link
    href="/"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 transition text-sm"
  >
    ← Kembali ke Ranking
  </Link>
</div>
      {/* METRIC GRID DI SINI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:scale-[1.02] transition duration-300">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
            Growth
          </p>
          <p className={`text-3xl font-bold ${
            trader.growth >= 0 ? "text-green-400" : "text-red-400"
          }`}>
            {trader.growth}%
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:scale-[1.02] transition duration-300">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
            Drawdown
          </p>
          <p className="text-3xl font-bold text-red-400">
            {trader.drawdown}%
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:scale-[1.02] transition duration-300">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
            Equity
          </p>
          <p className="text-3xl font-bold text-blue-400">
            ${Number(trader.equity).toLocaleString()}
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:scale-[1.02] transition duration-300">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
            Balance
          </p>
          <p className="text-3xl font-bold text-yellow-400">
            ${Number(trader.balance).toLocaleString()}
          </p>
        </div>

      </div>
         
      <div className="mt-6 bg-gray-900 rounded-2xl p-4 sm:p-6 border border-gray-800">
  <EquityChart data={history || []} />
      </div>

    </main>
    
  )
}