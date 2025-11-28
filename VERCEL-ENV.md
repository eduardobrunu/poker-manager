# Configurar Variáveis de Ambiente na Vercel

## Passo a Passo

1. **Acesse seu projeto na Vercel:**
   - https://vercel.com/dashboard

2. **Entre no projeto `poker-manager`**

3. **Vá em Settings → Environment Variables**

4. **Adicione as seguintes variáveis:**

### Variável 1: next_public_supabase_url
- **Name:** `next_public_supabase_url`
- **Value:** `https://vslytqfjgcxwqeqhaemy.supabase.co`
- **Environment:** Production, Preview, Development (marque todos)

### Variável 2: next_public_supabase_anon_key
- **Name:** `next_public_supabase_anon_key`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzbHl0cWZqZ2N4d3FlcWhhZW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3NTg2MTksImV4cCI6MjA0ODMzNDYxOX0.uSaKBbJqiC-DfxAT7ovUUNe3mMqSJWa-JGO4VsX3nMY`
- **Environment:** Production, Preview, Development (marque todos)

5. **Clique em "Save" para cada variável**

6. **Faça um novo deploy:**
   - Vá em "Deployments"
   - Clique nos 3 pontinhos do último deployment
   - Clique em "Redeploy"

## Verificação

Após o deploy, acesse:
- https://poker-manager.vercel.app/login

O sistema deve funcionar normalmente.

## Segurança

- A `ANON_KEY` é pública e pode ser exposta no frontend
- A segurança real está nas **RLS Policies** do Supabase
- Nunca exponha a `SERVICE_ROLE_KEY` (essa é privada)
