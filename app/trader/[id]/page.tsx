import { supabase } from "@/lib/supabase"
import EquityChart from "./EquityChart"

export default async function TraderDetail({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id

console.log("========== DEBUG START ==========")
console.log("PARAM ID FROM URL:", id)

const { data, error } = await supabase
  .from("traders")
  .select("*")
  .eq("id", id)

console.log("SUPABASE ERROR:", error)
console.log("SUPABASE DATA:", data)

const trader = data?.[0]

console.log("FINAL TRADER:", trader)
console.log("========== DEBUG END ==========")

  const { data: history } = await supabase
    .from("equity_history")
    .select("*")
    .eq("trader_id", id)
    .order("created_at", { ascending: true })

  if (!trader) {
    return <div className="text-white p-10">Trader not found</div>
  }

  return (
    <main className="min-h-screen p-10">

      {/* METRIC GRID DI SINI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

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

      <EquityChart data={history || []} />

    </main>
  )
}