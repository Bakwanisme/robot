const WebSocket = require('ws');

// Gunakan port dari environment variable, default ke 8081 jika lokal
const PORT = process.env.PORT || 8081;

// Buat server WebSocket
const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Tangani pesan dari klien
    ws.on('message', (message) => {
        const parsedMessage = message.toString(); // Ubah buffer menjadi string
        console.log('Received:', parsedMessage);
    
        // Kirim pesan ke semua klien yang terhubung
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(parsedMessage); // Kirim pesan yang sudah diubah menjadi string
            }
        });
    });    

    // Tangani klien yang terputus
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log(`WebSocket server running on port ${PORT}`);