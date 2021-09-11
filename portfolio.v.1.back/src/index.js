import {server} from './server'

server.start({port: 3100}, ({port}) => {
    console.log('Server on port', port)
})