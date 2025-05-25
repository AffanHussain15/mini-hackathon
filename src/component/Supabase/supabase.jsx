import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://whipwxpijuurdarimieh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoaXB3eHBpanV1cmRhcmltaWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNjU4OTIsImV4cCI6MjA2Mzc0MTg5Mn0.h4L4y_jzQrcX73kep_9pqNrLGUYCjU2_QIzJ4ZTQ8Uk'
const Supabase = createClient(supabaseUrl, supabaseKey);

export default Supabase;