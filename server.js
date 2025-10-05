const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Helpers no-cache
const staticNoCache = {
  etag: false,
  lastModified: false,
  cacheControl: true,
  maxAge: 0,
  setHeaders: (res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
  }
};

// Servir apenas o que usamos
app.use('/clean', express.static(path.join(__dirname, 'clean'), staticNoCache));
app.use('/img', express.static(path.join(__dirname, 'img'), staticNoCache));

// Middleware para CORS (permitir requests locais)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Rota principal -> redireciona para Clean
app.get('/', (req, res) => res.redirect('/clean/'));

// Atalhos para a nova versão
app.get('/new', (req, res) => res.redirect('/clean/'));
app.get('/clean', (req, res) => res.redirect('/clean/'));

// Endpoint para simular analytics (para futuras integrações)
app.get('/api/analytics', (req, res) => {
  res.json({
    totalViews: Math.floor(Math.random() * 1000),
    totalConversions: Math.floor(Math.random() * 100),
    revenue: Math.floor(Math.random() * 5000),
    timestamp: new Date().toISOString()
  });
});

// Endpoint para simular notificações push
app.post('/api/notifications', express.json(), (req, res) => {
  console.log('📱 Notificação enviada:', req.body);
  res.json({ 
    success: true, 
    sent: true,
    message: 'Notificação enviada com sucesso!'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor do Varejão rodando em http://localhost:${PORT}`);
  console.log(`📊 Sistema de Marketing ativo!`);
  console.log(`🎯 Acesse o painel pelo botão flutuante azul no site`);
});

module.exports = app;