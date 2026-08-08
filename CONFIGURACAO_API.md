# 🔧 Como Configurar a API - Guia Completo

## ⚡ Status Atual
**MODO DEMO ATIVO** - O site está funcionando com dados simulados.

## 📝 Passo a Passo para API Real

### **1️⃣ Obter API Key (GRÁTIS)**

1. Acesse: **https://openweathermap.org/api**
2. Clique em **"Sign Up"** (Criar Conta)
3. Preencha:
   - Nome de utilizador
   - Email
   - Password
4. Confirme o email que receberá
5. Faça login em **https://home.openweathermap.org/**
6. Vá em **"My API Keys"** ou **"API keys"**
7. **Copie** a sua API key (algo como: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

⏱️ **IMPORTANTE**: A chave pode levar até 2 horas para ser ativada!

---

### **2️⃣ Configurar no Projeto**

1. **Abra o arquivo**: `script.js`
2. **Procure a linha 2** que tem:
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```
3. **Substitua** por:
   ```javascript
   const API_KEY = 'a_sua_chave_aqui';
   ```

**Exemplo:**
```javascript
// ANTES
const API_KEY = 'YOUR_API_KEY_HERE';

// DEPOIS (com sua chave real)
const API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
```

---

### **3️⃣ Testar**

1. **Salve** o arquivo `script.js`
2. **Atualize** a página no navegador (F5)
3. A notificação "MODO DEMO" **não aparecerá mais**
4. **Teste a busca** por qualquer cidade do mundo!
5. **Teste o botão** de localização GPS

---

## 🎯 O que funciona com API Real

### ✅ Com API Configurada:
- 🔍 Busca por **qualquer cidade do mundo**
- 📍 Detecção automática de **localização GPS**
- 🌡️ Dados **reais e atualizados** de temperatura
- ⏰ Previsão **horária precisa**
- 📅 Previsão de **7 dias** real
- 💨 **Vento, humidade, pressão** reais
- 🌅 Horário real de **nascer/pôr do sol**
- 🌦️ **Fundo animado** muda com clima real

### 🎮 Sem API (Modo Demo):
- ✅ Visual funciona 100%
- ✅ Animações e efeitos
- ✅ Dados simulados de Lisboa
- ❌ Não pesquisa outras cidades
- ❌ Não usa localização GPS
- ❌ Dados aleatórios

---

## ❓ Problemas Comuns

### **Erro: "Invalid API key"**
- ✅ Verifique se copiou a chave completa
- ✅ Aguarde até 2 horas após criar a conta
- ✅ Certifique-se que não tem espaços extras

### **Erro: "City not found"**
- ✅ Tente o nome em inglês (ex: "Lisbon" em vez de "Lisboa")
- ✅ Verifique a ortografia
- ✅ Para cidades menores, adicione o país: "Porto,PT"

### **Erro de Conexão**
- ✅ Verifique sua internet
- ✅ Desative extensões de bloqueio (AdBlock, etc.)
- ✅ Aguarde ativação da API key

---

## 🆓 Limites da API Gratuita

A conta **gratuita** da OpenWeatherMap inclui:

- ✅ **60 chamadas por minuto**
- ✅ **1.000.000 chamadas por mês**
- ✅ Dados atuais
- ✅ Previsão de 5 dias
- ✅ Histórico de 1 dia

**Mais que suficiente para uso pessoal!** 🎉

---

## 🔒 Segurança

⚠️ **NUNCA compartilhe sua API key publicamente!**

Se for colocar o código no GitHub:
1. Crie um arquivo `.env` (não incluído no repositório)
2. Ou use variáveis de ambiente
3. Adicione `script.js` no `.gitignore` se tiver a chave lá

---

## 🎨 Personalizar Cidade Padrão

No arquivo `script.js`, procure a linha:

```javascript
fetchWeatherByCity('Lisboa');
```

Troque `'Lisboa'` pela cidade que preferir! 🌍

---

## 📞 Precisa de Ajuda?

- 📖 Documentação oficial: https://openweathermap.org/api
- 💬 FAQ: https://openweathermap.org/faq
- 📧 Suporte: https://home.openweathermap.org/questions

---

**Criado com 🤖 | CyberWeather**
