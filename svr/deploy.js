const deploy = {
    dev: {
        world: {
            addr: 'http://127.0.0.1',
            name: 'Test001',
            port: 12306
        },
        game: [{
            addr: 'http://127.0.0.1',
            name: 'Server1',
            port: 12307
        }],
        chat: {
            addr: 'http://127.0.0.1',
            name: 'Server1',
            port: 12308
        },
        gameAgent: {
            addr: '127.0.0.1',
            port: 12309
        },
        worldAgent: {
            addr: '127.0.0.1',
            port: 12310
        },
        staticAgent: {
            addr: 'http://127.0.0.1',
            port: 12311
        },
    },
    production: {
        world: {
            addr: 'http://127.0.0.1',
            name: 'Default',
            port: 12306
        },
        game: [{
            addr: 'http://127.0.0.1',
            name: 'Server1',
            port: 12307
        }],
        chat: {
            addr: 'http://127.0.0.1',
            name: 'Server1',
            port: 12308
        },
        gameAgent: {
            addr: '127.0.0.1',
            port: 12309
        },
        worldAgent: {
            addr: '127.0.0.1',
            port: 12310
        },
        staticAgent: {
            addr: '127.0.0.1',
            port: 12311
        },
    }
}
module.exports = process.env.NODE_ENV == 'production' ? deploy.production : deploy.dev