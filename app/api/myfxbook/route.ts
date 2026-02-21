import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
export async function GET(request: Request) {
  // ambil secret dari header
const authHeader = request.headers.get("authorization")

// ambil secret dari query param
const { searchParams } = new URL(request.url)
const querySecret = searchParams.get("secret")

// validasi
const valid =
  authHeader === `Bearer ${process.env.SYNC_SECRET}` ||
  querySecret === process.env.SYNC_SECRET

if (!valid) {
  return Response.json({ error: "Unauthorized" }, { status: 401 })
}

//lanjut login myfxbook dan update database
  const email = process.env.MYFXBOOK_EMAIL
  const password = process.env.MYFXBOOK_PASSWORD

  if (!email || !password) {
    return Response.json({ error: "Missing credentials" })
  }
console.log("SYNC STARTED")

  // LOGIN
  const loginRes = await fetch(
  `https://www.myfxbook.com/api/login.json?email=${email}&password=${password}`,
  {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  }
)

  const loginData = await loginRes.json()
    console.log("LOGIN RESPONSE:", loginData)
  if (!loginData.session) {
    return Response.json({ error: "Login failed", loginData })
  }

  const session = loginData.session

  // GET ACCOUNTS
  const accountsRes = await fetch(
  `https://www.myfxbook.com/api/get-my-accounts.json?session=${session}`,
  {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  }
)

  const accountsData = await accountsRes.json()
console.log("ACCOUNTS RESPONSE:", accountsData)

  const accounts = accountsData.accounts || []
  //NGASIH LOG AKUNTS RAW DAN TOTALNYA
console.log("ACCOUNTS RAW:", accounts)
    // NGASIH LOG JUMLAH AKUNTS
console.log("TOTAL ACCOUNTS:", accounts.length)

  // LOOP UPDATE DATABASE
  for (const account of accounts) {
    //NGASIH TAU PROSES AKUNTS APA
    console.log("PROCESSING ACCOUNT:", account.name)
  const name = account.name
  const growth = account.gain
  const drawdown = account.drawdown

  console.log("SYNCING:", name, growth, drawdown)

  const { data, error } = await supabase
  .from("traders")
  .upsert(
    {
      id: account.name.toLowerCase().replace(/\s/g, "-"),
      name: account.name,
      growth: account.gain,
      drawdown: account.drawdown,
    },
    { onConflict: "id" }
  )

if (error) {
  console.log("SUPABASE ERROR:", error)
} else {
  console.log("UPSERT SUCCESS:", data)
}
}

  // LOGOUT
  await fetch(
    `https://www.myfxbook.com/api/logout.json?session=${session}`
  )

  return Response.json({ success: true, updated: accounts.length })
}