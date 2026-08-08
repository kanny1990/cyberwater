# 🌐 Como Publicar o CyberWeather

## 📋 Guia Passo a Passo para GitHub Pages

### **Método 1: Via Interface do GitHub (Mais Fácil)**

1. **Acesse seu repositório:**
   - Vá para: https://github.com/kanny1990/cyberwater

2. **Abra as Configurações:**
   - Clique em ⚙️ **Settings** (no menu superior)

3. **Vá para Pages:**
   - No menu lateral esquerdo, clique em **Pages**

4. **Configure o Deploy:**
   - **Source**: Selecione `Deploy from a branch`
   - **Branch**: Selecione `main`
   - **Folder**: Selecione `/ (root)`
   - Clique em **Save**

5. **Aguarde o Deploy:**
   - Levará 1-2 minutos
   - A página atualizará automaticamente
   - Verá uma mensagem: "Your site is live at..."

6. **Acesse seu site:**
   - URL: **https://kanny1990.github.io/cyberwater/**
   - 🎉 Pronto! Site publicado!

---

### **Método 2: Via GitHub Actions (Automático)**

Se o método acima não funcionar, use Actions:

1. Vá em **Settings** → **Pages**
2. **Source**: Selecione `GitHub Actions`
3. Procure por **"Static HTML"**
4. Clique em **Configure**
5. Clique em **Commit changes**
6. Aguarde o deploy (check verde ✅)

---

## 🔑 Configurar API Key no Site Publicado

### **Opção 1: Instruir Visitantes**

O site funcionará em **modo demo** por padrão. Adicione instruções no README:

```markdown
## 🌐 Site Publicado

Acesse: https://kanny1990.github.io/cyberwater/

**Nota**: O site roda em modo demo. Para dados reais:
1. Obtenha uma API key gratuita em https://openweathermap.org/api
2. Clone o repositório e configure sua chave
```

### **Opção 2: Usar Variáveis de Ambiente (Avançado)**

Para produção com sua API key:

1. Crie uma branch `gh-pages`
2. Configure secrets no GitHub
3. Use GitHub Actions para injetar a key

---

## 🎨 Personalizar Domínio (Opcional)

Se tiver um domínio próprio:

1. Vá em **Settings** → **Pages**
2. Em **Custom domain**, digite: `seudominio.com`
3. Clique em **Save**
4. Configure DNS do seu domínio:
   - Tipo: `CNAME`
   - Nome: `www`
   - Valor: `kanny1990.github.io`

---

## 📊 Monitorar o Deploy

### Verificar Status:
1. Vá em **Actions** no repositório
2. Verá o workflow `pages build and deployment`
3. ✅ Verde = Sucesso
4. ❌ Vermelho = Erro (clique para ver logs)

### Forçar Novo Deploy:
```bash
# Faça qualquer mudança e commit
git commit --allow-empty -m "Trigger deploy"
git push
```

---

## 🚀 Após Publicação

### **Teste o site:**
- ✅ Busca de cidades
- ✅ Localização GPS (requer HTTPS)
- ✅ Modo noite
- ✅ Troca de unidades
- ✅ Responsividade mobile
- ✅ Fundo animado

### **Compartilhe:**
- Twitter/X
- LinkedIn
- Portfolio
- README do GitHub

---

## 🔧 Troubleshooting

### Site não carrega:
- Aguarde 2-3 minutos após configurar
- Limpe cache do navegador (Ctrl+F5)
- Verifique em modo anônimo

### API não funciona:
- Geolocation requer HTTPS (GitHub Pages tem)
- Verifique console do navegador (F12)
- Modo demo funcionará sempre

### Mudanças não aparecem:
- Aguarde o Actions completar (1-2 min)
- Force refresh: Ctrl+Shift+R
- Verifique se fez push: `git status`

---

## 📱 Tornar PWA (Progressive Web App)

Para instalar no celular:

1. Crie `manifest.json`
2. Adicione Service Worker
3. Configure ícones
4. Visitantes poderão "Adicionar à tela inicial"

---

## 🎯 URLs Importantes

- **Repositório**: https://github.com/kanny1990/cyberwater
- **Site Publicado**: https://kanny1990.github.io/cyberwater/
- **Settings**: https://github.com/kanny1990/cyberwater/settings/pages
- **Actions**: https://github.com/kanny1990/cyberwater/actions

---

## ✨ Próximos Passos

1. [ ] Publicar no GitHub Pages
2. [ ] Adicionar badge no README: ![Live Demo](https://img.shields.io/badge/demo-live-success)
3. [ ] Adicionar link no About do repositório
4. [ ] Compartilhar nas redes sociais
5. [ ] Adicionar ao portfolio
6. [ ] Considerar domínio próprio

---

**🎉 Boa sorte com a publicação!**
