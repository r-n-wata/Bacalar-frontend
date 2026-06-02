import { createClient } from '@supabase/supabase-js'
import type { PrepareTourSubmissionUploadResponse } from '../types/submission'

let supabaseClient: ReturnType<typeof createClient> | null = null

function getSupabaseUploadClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Image uploads are not configured right now.')
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  return supabaseClient
}

export async function uploadSubmissionImage(
  target: PrepareTourSubmissionUploadResponse,
  file: File,
) {
  const supabase = getSupabaseUploadClient()
  const { error } = await supabase.storage
    .from(target.bucketName)
    .uploadToSignedUrl(target.objectKey, target.uploadToken, file)

  if (error) {
    throw new Error(error.message || 'Image upload failed.')
  }
}
