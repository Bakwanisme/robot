const WebSocket = require('ws');

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
console.log('WebSocket server running on ws://192.168.242.109:8081');