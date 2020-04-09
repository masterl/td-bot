const Commands = rfr('lib/Commands');

describe('Commands',() =>
{
    describe('extract_command_name',() =>
    {
        describe('for a command alone', () =>
        {
            it('should extract the name correctly', () =>
            {
                const raw_message = '!test';

                expect(Commands.extract_command_name(raw_message)).to.be.equal('test');
            });
        });

        describe('for a command with arguments', () =>
        {
            it('should extract the name correctly', () =>
            {
                const raw_message = '!test blabla blabla';

                expect(Commands.extract_command_name(raw_message)).to.be.equal('test');
            });
        });
    });
});
