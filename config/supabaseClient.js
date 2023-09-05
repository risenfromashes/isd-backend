//import dotenv from '../.env'
import { } from 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
//require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
	auth: { persistSession: false },
});
export default supabase;