import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://uebmhmsquzupcdrtybxw.supabase.co"
const supabaseAnonKey = "sb_publishable_7-4TL_HVoDlZWoYbgR_41Q_OHYKSfD8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)