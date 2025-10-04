const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir arquivos estáticos
app.use(express.static('.'));

// Middleware para CORS (permitir requests locais)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

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