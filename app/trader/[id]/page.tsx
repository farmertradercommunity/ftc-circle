import { supabase } from "@/lib/supabase"
import EquityChart from "./EquityChart"

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
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">
        {trader.name} Performance
      </h1>

      <div className="bg-gray-900 p-6 rounded-lg mb-6">
        <p>
          Growth:{" "}
          <span className="text-green-400">
            {trader.growth}%
          </span>
        </p>
        <p>
          Drawdown:{" "}
          <span className="text-red-400">
            {trader.drawdown}%
          </span>
        </p>
        <p>
          Equity:{" "}
          <span className="text-blue-400">
            ${trader.equity}
          </span>
        </p>
        <p>
          Balance:{" "}
          <span className="text-yellow-400">
            ${trader.balance}
          </span>
        </p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <p className="mb-4">Equity Curve</p>
        <EquityChart data={history || []} />
      </div>
    </main>
  )
}