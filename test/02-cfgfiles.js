const parser = require('../parser.js');
const assert = require('assert');

describe('Parse configuration file: Cisco ASA 9.8', ()=> {
    var configFile = __dirname + '/cfg-cisco-asa98-01.cfg'
    it('Understands host parameters', () => {
        parser.parseFirewall(configFile).then(data =>{
            assert.equal(data.host.hostname,'ASATEST')
            assert.equal(data.host.domain,'cisco.local')
            assert.equal(data.host.serial,'AAA123456')
            assert.equal(data.host.model,'ASA5525')
        })
    })

    it('Understands interfaces', () => {
        parser.parseFirewall(configFile).then(data =>{
            assert.equal(data.interfaces.length, 3)
            assert.equal(data.interfaces[0].ip, '10.0.0.1/26')
            assert.equal(data.interfaces[0]['security-level'], '100')
        })
    })

    it('Understands objects', () => {
        parser.parseFirewall(configFile).then(data =>{
            assert.equal(data.objects.length,2)
            assert.equal(parser.selectObject(data,'OBJNETWORK')[0].address, '192.168.0.1')
            assert.equal(parser.selectObjectGroup(data,'SERVICEGROUP')[0].objects[2].port, '>1024')
            assert.equal(parser.selectObjectGroup(data,'OBJGROUP')[0].objects.length, 2)
        })
    })

    it('Understands access lists', () => {
        parser.parseFirewall(configFile).then(data =>{
            assert.equal(data.rules.filter.length, 1)
            assert.equal(data.rules.filter[0].comment, 'ACL Comment')
            assert.equal(data.rules.filter[0].protocol, 'object-group PROTOGROUP')
        })
    })

    it('Understands NAT rules', () => {
        parser.parseFirewall(configFile).then(data =>{
            assert.equal(data.rules.nat.length, 1)
            assert.equal(data.rules.nat[0].realInterface, 'ETH0')
            assert.equal(data.rules.nat[0].mappedInterface, 'ETH1')
        })
    })

    it('Understands DNS servers', () => {
        parser.parseFirewall(configFile).then(data =>{
            assert.equal(data.interfaces[1].dns[0], '10.0.1.1')
            assert.equal(data.interfaces[1].dns[1], '10.0.1.2')
            assert.equal(data.interfaces[1].dns.length, 2)
            assert.equal(data.interfaces[2].dns[0], '8.8.8.8')
        })
    })
})