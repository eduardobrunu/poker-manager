import { createClient } from '@supabase/supabase-js';

// Variáveis de ambiente (usa valores vazios se não configuradas para permitir build)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 
                    process.env.next_public_supabase_url || 
                    'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
                        process.env.next_public_supabase_anon_key || 
                        'placeholder-anon-key';

// Cliente Supabase compartilhado (singleton)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Helper: Obter usuário atual
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Erro ao obter usuário:', error);
    return null;
  }
  
  return user;
};

// Helper: Fazer logout
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
};
