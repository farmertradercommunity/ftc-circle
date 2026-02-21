<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

  <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
    <p className="text-gray-400 text-sm">Growth</p>
    <p className="text-2xl font-bold text-green-400">
      {trader.growth}%
    </p>
  </div>

  <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
    <p className="text-gray-400 text-sm">Drawdown</p>
    <p className="text-2xl font-bold text-red-400">
      {trader.drawdown}%
    </p>
  </div>

  <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
    <p className="text-gray-400 text-sm">Equity</p>
    <p className="text-2xl font-bold text-blue-400">
      ${Number(trader.equity).toLocaleString()}
    </p>
  </div>

  <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
    <p className="text-gray-400 text-sm">Balance</p>
    <p className="text-2xl font-bold text-yellow-400">
      ${Number(trader.balance).toLocaleString()}
    </p>
  </div>

</div>