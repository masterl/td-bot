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

    describe('extract_command_argument_string',() =>
    {
        describe('for a command alone', () =>
        {
            it('should return empty string', () =>
            {
                const raw_message = '!test';

                expect(Commands.extract_command_argument_string(raw_message)).to.be.equal('');
            });
        });

        describe('for a command with arguments', () =>
        {
            it('should extract the argument string correctly', () =>
            {
                const raw_message = '!test blabla bla';

                expect(Commands.extract_command_argument_string(raw_message)).to.be.equal('blabla bla');
            });
        });
    });
});
