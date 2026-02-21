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
    // <main className="min-h-screen p-10">

    //   {/* METRIC GRID DI SINI */}
    //   <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

    //     <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:scale-[1.02] transition duration-300">
    //       <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
    //         Growth
    //       </p>
    //       <p className={`text-3xl font-bold ${
    //         trader.growth >= 0 ? "text-green-400" : "text-red-400"
    //       }`}>
    //         {trader.growth}%
    //       </p>
    //     </div>

    //     <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:scale-[1.02] transition duration-300">
    //       <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
    //         Drawdown
    //       </p>
    //       <p className="text-3xl font-bold text-red-400">
    //         {trader.drawdown}%
    //       </p>
    //     </div>

    //     <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:scale-[1.02] transition duration-300">
    //       <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
    //         Equity
    //       </p>
    //       <p className="text-3xl font-bold text-blue-400">
    //         ${Number(trader.equity).toLocaleString()}
    //       </p>
    //     </div>

    //     <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:scale-[1.02] transition duration-300">
    //       <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
    //         Balance
    //       </p>
    //       <p className="text-3xl font-bold text-yellow-400">
    //         ${Number(trader.balance).toLocaleString()}
    //       </p>
    //     </div>

    //   </div>

    //   <EquityChart data={history || []} />

    // </main>
    <div className="min-h-screen bg-black text-white p-10">
    ID dari URL: {id}
  </div>
  )
}