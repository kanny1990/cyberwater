# 🌐 CyberWeather

<div align="center">

![CyberWeather](https://img.shields.io/badge/CyberWeather-v1.0-00f0ff?style=for-the-badge)
![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-8b5cf6?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Site de previsão do tempo com estética cyberpunk futurista**

[🌐 Ver Demo](https://kanny1990.github.io/cyberwater/) • [📖 Documentação](#funcionalidades) • [🚀 Instalação](#-instalação)

</div>

---

## ✨ Funcionalidades

### 🌦️ **Previsão Meteorológica Completa**
- 🌡️ **Temperatura atual** com sensação térmica
- ⏰ **Previsão horária** (próximas 24-48h)
- 📅 **Previsão de 7 dias** com máximas e mínimas
- 🌍 **Qualquer cidade do mundo**
- 📍 **Detecção automática** via GPS

### 🎨 **Visual Cyberpunk Futurista**
- 🌈 **Paleta neon** (Ciano #00f0ff + Roxo #8b5cf6)
- ✨ **Efeitos glassmorphism** em todos os cards
- 💫 **Partículas flutuantes** animadas
- 🔲 **Linhas de scan** estilo CRT
- ⚡ **Efeito glitch** no logo

### 🌈 **Fundos Animados Dinâmicos**
O fundo muda automaticamente baseado no clima real:
- ☀️ **Sol** → Raios brilhantes pulsantes
- 🌧️ **Chuva** → 150 gotas caindo
- ❄️ **Neve** → 100 flocos com deriva
- ☁️ **Nuvens** → Nuvens flutuando

### ⏰ **Relógio Analógico Inteligente**
- 🕐 Mostra horário **real da cidade pesquisada**
- 🌍 Ajusta automaticamente para **fuso horário correto**
- 💎 Design futurista com ponteiros neon
- 🔢 Display digital UTC+X

### 🌓 **Modo Noite Automático**
- Detecta **dia/noite** na cidade pesquisada
- Muda tema baseado no **nascer/pôr do sol** local
- Toggle manual disponível

### 📊 **Métricas Avançadas**
Indicadores radiais animados para:
- ☀️ Índice UV
- 💨 Velocidade do vento
- 💧 Humidade relativa
- 🌡️ Pressão atmosférica
- 🌅 Nascer do sol
- 🌇 Pôr do sol

### ♿ **Acessibilidade Total**
- ⌨️ **Navegação por teclado** completa
- 🔊 **Leitores de tela** compatíveis
- 🎯 **Estados de foco** visíveis
- 📱 **Totalmente responsivo**

---

## 🚀 Instalação

### **1. Clone o repositório**
```bash
git clone https://github.com/SEU_USUARIO/cyberweather.git
cd cyberweather
```

### **2. Configure a API Key**

1. Obtenha uma chave **gratuita** em [OpenWeatherMap](https://openweathermap.org/api)
2. Abra `script.js`
3. Na **linha 2**, substitua:
```javascript
const API_KEY = 'SUA_CHAVE_AQUI';
```

### **3. Abra o projeto**
```bash
# Abra o index.html no navegador
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

**Pronto!** 🎉

---

## 📖 Como Usar

### **Buscar Cidade**
1. Digite o nome da cidade no campo de busca
2. Clique em 🔍 ou pressione **Enter**
3. Veja o clima e horário local!

### **Usar Localização GPS**
1. Clique no botão 📍
2. Permita acesso à localização
3. Veja o clima da sua cidade!

### **Alternar Unidades**
- Clique em **°C** ou **°F** para trocar
- Todas as temperaturas atualizam automaticamente

### **Modo Noite**
- Clique no botão **◐** no canto superior direito
- Ou deixe ajustar automaticamente por cidade!

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|------------|-----|
| **HTML5** | Estrutura semântica |
| **CSS3** | Animações e efeitos avançados |
| **JavaScript (Vanilla)** | Lógica e interatividade |
| **Canvas API** | Animações de fundo dinâmicas |
| **OpenWeatherMap API** | Dados meteorológicos reais |
| **Geolocation API** | Detecção de localização |

---

## 🎯 Estrutura do Projeto

```
cyberweather/
├── index.html              # Estrutura principal
├── style.css               # Estilos e animações
├── script.js               # Lógica e API
├── README.md               # Documentação
├── CONFIGURACAO_API.md     # Guia de configuração
├── MELHORIAS_APLICADAS.md  # Log de melhorias
└── .gitignore              # Arquivos ignorados
```

---

## 🌟 Destaques Técnicos

### **Performance**
- ⚡ Animações com `requestAnimationFrame`
- ⚡ `will-change` para otimização CSS
- ⚡ Lazy loading de dados
- ⚡ Apenas 30 partículas para melhor FPS

### **Segurança**
- 🔒 Validação de elementos DOM
- 🔒 Tratamento robusto de erros
- 🔒 Sanitização de entradas

### **Compatibilidade**
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (com prefixos webkit)
- ✅ Mobile (iOS/Android)

---

## 📱 Screenshots

### Desktop
```
┌─────────────────────────────────────────┐
│  🌐 CYBERWEATHER        ⏰ 14:30    ◐  │
├─────────────────────────────────────────┤
│  🔍 [Digite a cidade...]    📍         │
├─────────────────────────────────────────┤
│        LISBOA                           │
│        24°C  ☀️                        │
│        Céu Limpo                        │
│        UTC+0                            │
├─────────────────────────────────────────┤
│  [Previsão Horária ═══════════════════]│
│  [Previsão 7 Dias ════════════════════]│
│  [Métricas ═══════════════════════════]│
└─────────────────────────────────────────┘
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📝 Roadmap

- [ ] Gráficos interativos de temperatura
- [ ] Mapa de radar de chuva
- [ ] Notificações de alertas meteorológicos
- [ ] Histórico de localizações
- [ ] Múltiplos idiomas (i18n)
- [ ] Temas personalizados
- [ ] Modo offline com cache
- [ ] App mobile (PWA)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

**Desenvolvido com 🤖 por IA**

---

## 🙏 Agradecimentos

- [OpenWeatherMap](https://openweathermap.org/) - API de dados meteorológicos
- [Google Fonts](https://fonts.google.com/) - Tipografia (Orbitron, Space Grotesk)
- Inspiração: Blade Runner, Cyberpunk 2077

---

<div align="center">

**⭐ Se gostou do projeto, deixe uma estrela! ⭐**

[⬆ Voltar ao topo](#-cyberweather)

</div>
