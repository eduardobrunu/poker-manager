import { createClient } from '@supabase/supabase-js';

// Validação das variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '⚠️ Erro: Credenciais do Supabase não configuradas!\n\n' +
    'Por favor, siga os passos em SETUP-SUPABASE.md:\n' +
    '1. Crie uma conta gratuita em https://supabase.com\n' +
    '2. Crie um novo projeto\n' +
    '3. Copie as credenciais para .env.local\n'
  );
}

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
