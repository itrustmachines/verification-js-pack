const path = require('path');
const builder = require('electron-builder');

builder.build({
    projectDir: path.resolve(__dirname),
    win: ['portable', 'nsis'],
    mac: ['dmg'],
    config: {
        'appId': 'com.itrustmachines.spo-verification-server-react',
        'productName': 'Verification',
        'copyright': 'Copyright © 2022 Itrustmachines',
        'directories': {
            'output': 'electron-build/win'
        },
        'win': {
            'icon': path.resolve(__dirname, 'icon.png'), 
        },
        'mac': {
            'icon': path.resolve(__dirname, 'icon.png'),
        },
        'files': [
            'build/**/*',
            'node_modules/**/*',
            'public/**/*',
            'package.json',
        ],
        'extends': null,
    }
}).then(
    (data) => console.log(data),
    (err) => console.error(err)
)