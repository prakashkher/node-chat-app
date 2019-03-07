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
});