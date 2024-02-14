const handleSocketConnection = (io) => {
    const numOfConnectionsPerCodeBlock = {};
    let mentorSocket = null;

io.on('connection', (socket) => {
    socket.on('codeblockNumConnection', (codeblockNum) => {
        socket.codeblockNum = codeblockNum;
        numOfConnectionsPerCodeBlock[codeblockNum] = ((+numOfConnectionsPerCodeBlock[codeblockNum]) || 0) + 1;
        if ((+numOfConnectionsPerCodeBlock[codeblockNum]) === 1) { 
            console.log('a mentor connected');
            socket.emit('role', 'mentor'); 
        } else {  
            console.log('a student connected');
            socket.emit('role', 'student'); 
        }
        console.log('connect:', numOfConnectionsPerCodeBlock);
    });

    socket.on('solution', (solution) => {
        io.emit('solution', solution);
    });

    socket.on('disconnect', () => {
        if (socket.codeblockNum !== undefined) {
            numOfConnectionsPerCodeBlock[socket.codeblockNum] = Math.max(0, (numOfConnectionsPerCodeBlock[socket.codeblockNum] || 1) - 1);
        }

        console.log('User disconnected');
        if (socket === mentorSocket) {
            mentorSocket = null; // reset mentorSocket if the mentor disconnects
        }
    });
});

};

module.exports = handleSocketConnection;