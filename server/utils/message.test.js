const expect = require('expect');
const message = require('./message');

describe('Utils Tests',()=>{
    it('should generate the Message Object',()=>{
        var text = 'Hello';
        var from = 'user1';

        var msg = message.generateMessage(from,text);

        expect(msg.from).toBe(from);
        expect(msg.text).toBe(text);
        expect(typeof msg.createdAt).toBe('number');
    });

    it('should generate location object',()=>{
        var from = 'User';
        var url = 'https://www.google.com/maps?q=1,1';

        var locationMsg = message.generateLocationMessage(from,1,1);

        expect(locationMsg.from).toBe(from);
        expect(locationMsg.url).toBe(url);
        expect(typeof locationMsg.createdAt).toBe('number');
    });
});