# 🌐 CyberWeather - Site de Clima Futurista

Um site de previsão do tempo com estética cyberpunk-minimalista e design futurista.

## ✨ Características

### Design
- **Paleta Escura**: Base em preto/azul-marinho profundo (#0a0e17)
- **Acentos Neon**: Ciano neon (#00f0ff) e roxo elétrico (#8b5cf6)
- **Efeitos Glassmorphism**: Cards com vidro fosco e blur
- **Animações**: Partículas flutuantes, linhas de scan, pulsos de luz
- **Tipografia Tech**: Orbitron e Space Grotesk para visual futurista

### Funcionalidades
- 🔍 Busca por cidade
- 📍 Detecção de localização automática
- 🌡️ Temperatura atual com sensação térmica
- ⏰ Previsão horária (próximas 24h)
- 📅 Previsão de 7 dias
- 📊 Métricas avançadas:
  - Índice UV com indicador radial
  - Velocidade do vento
  - Humidade relativa
  - Pressão atmosférica
  - Nascer e pôr do sol
- 🌓 Modo dia/noite
- °C/°F Alternância entre unidades

## 🚀 Como Usar

### Opção 1: Com API Real (Recomendado)

1. **Obter API Key da OpenWeatherMap**:
   - Aceda a [https://openweathermap.org/api](https://openweathermap.org/api)
   - Crie uma conta gratuita
   - Obtenha a sua API key

2. **Configurar o projeto**:
   - Abra o ficheiro `script.js`
   - Na linha 2, substitua `'YOUR_API_KEY_HERE'` pela sua chave:
   ```javascript
   const API_KEY = 'a_sua_chave_aqui';
   ```

3. **Abrir o site**:
   - Abra o ficheiro `index.html` no seu navegador
   - O site irá detectar a sua localização automaticamente
   - Ou pesquise por qualquer cidade

### Opção 2: Modo Demo (Sem API)

Se não tiver uma API key, pode usar dados de demonstração:

1. Abra o ficheiro `script.js`
2. Vá até a última linha e remova o comentário:
   ```javascript
   setTimeout(() => useDemoData(), 1000);
   ```
3. Abra o `index.html` no navegador

## 🎨 Personalização

### Alterar Cores

Edite as variáveis CSS em `style.css`:

```css
:root {
    --bg-primary: #0a0e17;
    --cyan-neon: #00f0ff;
    --purple-electric: #8b5cf6;
    /* ... mais cores ... */
}
```

### Ajustar Animações

As partículas e animações podem ser ajustadas em:
- `script.js` → função `initParticles()` para quantidade de partículas
- `style.css` → keyframes `@keyframes float` para comportamento

### Adicionar Mais Métricas

Edite a secção "Métricas Avançadas" em `index.html` e adicione novos cards com a classe `.metric-card`.

## 📱 Responsivo

O site é totalmente responsivo e adapta-se a:
- 📱 Smartphones
- 📲 Tablets
- 💻 Desktops
- 🖥️ Monitores grandes

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Animações e efeitos avançados
- **JavaScript (Vanilla)**: Lógica e chamadas API
- **OpenWeatherMap API**: Dados meteorológicos reais

## 🎯 Estrutura de Ficheiros

```
.
├── index.html      # Estrutura principal
├── style.css       # Estilos e animações
├── script.js       # Lógica e API
└── README.md       # Este ficheiro
```

## 🌟 Funcionalidades Avançadas

### Efeitos Visuais
- Partículas flutuantes tipo "dados no ar"
- Linhas de scan estilo CRT
- Efeito glitch no logo
- Transições suaves entre estados
- Glow neon nos elementos interativos

### Interatividade
- Hover effects com micro-animações
- Indicadores radiais animados
- Scroll horizontal suave para previsão horária
- Feedback visual em todas as interações

## 📝 Notas

- A API gratuita da OpenWeatherMap tem limite de 60 chamadas/minuto
- Os dados são atualizados a cada pesquisa de cidade
- O modo demo gera dados aleatórios para demonstração
- Todos os textos estão em português

## 🤝 Melhorias Futuras

- [ ] Gráficos de temperatura interativos
- [ ] Mapa de radar de chuva
- [ ] Alertas meteorológicos em tempo real
- [ ] Histórico de localizações pesquisadas
- [ ] Previsão de qualidade do ar
- [ ] Notificações push

## 📄 Licença

Este projeto é de uso livre para fins educacionais e pessoais.

---

**Criado com 🤖 por IA | Design Cyberpunk-Futurista**
