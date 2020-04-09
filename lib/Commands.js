class Commands
{
    static extract_command_name(raw_message)
    {
        const first_space_index = raw_message.indexOf(' ');

        if( first_space_index === -1)
        {
            return raw_message.substring(1);
        }

        return raw_message.substring(1,first_space_index);
    }

    static extract_command_argument_string(raw_message)
    {
        const first_space_index = raw_message.indexOf(' ');

        if( first_space_index === -1)
        {
            return '';
        }

        return raw_message.substring(first_space_index + 1);
    }
}

module.exports = Commands;
