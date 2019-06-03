exports.config = {
    http_server_port: 3030,
    tempVideoPath : 'output/',
    hlsPlaylistBaseName: 'playlist.m3u8',  //Must be .m3u8 extension
    liveOutputPath: '/live',
    //CREDENTIALS TO USED STREAMING SERVER. SET THESE VALUES BEFORE LAUNCHING
    httpAuthUser: '',
    httpAuthPassword: ''
}
