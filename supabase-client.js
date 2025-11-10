// supabase-client.js
// Creates and exports a configured Supabase client singleton for the app.
// The client is created using values injected by Vite at build/runtime.

// Import the Supabase client factory from the official JS SDK.
import {createClient} from "@supabase/supabase-js"

// Read the Supabase project URL and anon/public key from Vite env vars.
// Note: Vite exposes only variables prefixed with VITE_ to client-side code.
// The variable name `supabaseURl` uses a capital 'L' at the end — this matches
// the existing variable name and should work, but it may be a typo. Consider
// renaming to `supabaseUrl` for clarity.
const supabaseURl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// Create a Supabase client instance using the URL and key. This instance
// provides access to auth, realtime, storage and query helpers.
const supabase = createClient(supabaseURl,supabaseKey)

// Export the configured client as the default export so other modules can
// import it easily (singleton pattern).
export default supabase
