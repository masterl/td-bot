const CommandUtilities = rfr('lib/CommandUtilities');

describe('CommandUtilities',() =>
{
    describe('extract_command_name',() =>
    {
        describe('for a command alone', () =>
        {
            it('should extract the name correctly', () =>
            {
                const raw_message = '!test';

                expect(CommandUtilities.extract_command_name(raw_message)).to.be.equal('test');
            });
        });

        describe('for a command with arguments', () =>
        {
            it('should extract the name correctly', () =>
            {
                const raw_message = '!test blabla blabla';

                expect(CommandUtilities.extract_command_name(raw_message)).to.be.equal('test');
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

                expect(CommandUtilities.extract_command_argument_string(raw_message)).to.be.equal('');
            });
        });

        describe('for a command with arguments', () =>
        {
            it('should extract the argument string correctly', () =>
            {
                const raw_message = '!test blabla bla';

                expect(CommandUtilities.extract_command_argument_string(raw_message)).to.be.equal('blabla bla');
            });
        });
    });
});
