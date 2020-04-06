/*
IRC doc: https://modern.ircdocs.horse/

  message     =  [ "@" tags SPACE ] [ ":" prefix SPACE ] command
                 [ params ] crlf

  tags        =  tag *[ ";" tag ]
  tag         =  key [ "=" value ]
  key         =  [ vendor "/" ] 1*( ALPHA / DIGIT / "-" )
  value       =  *valuechar
  valuechar   =  <any octet except NUL, BELL, CR, LF, semicolon (`;`) and SPACE>
  vendor      =  hostname

 => prefix      =  servername / ( nickname [ [ "!" user ] "@" host ] )

  command     =  1*letter / 3digit

  params      =  *( SPACE middle ) [ SPACE ":" trailing ]
  nospcrlfcl  =  <any octet except NUL, CR, LF, colon (`:`) and SPACE>
  middle      =  nospcrlfcl *( ":" / nospcrlfcl )
  trailing    =  *( ":" / " " / nospcrlfcl )

  SPACE       =  %x20 *( %x20 )   ; space character(s)
  crlf        =  %x0D %x0A        ; "carriage return" "linefeed"
*/

const parse_irc_tags = message_parts =>
{
    if (message_parts[0][0] !== '@')
    {
        return;
    }

    const raw_tags = message_parts[0].substring(1).split(';');

    message_parts.shift();

    return raw_tags.reduce((acc, raw_tag) =>
    {
        const [
            key,
            value
        ] = raw_tag.split('=');

        acc[key] = value;

        return acc;
    }, {
    });
};

const parse_irc_prefix = message_parts =>
{
    if (message_parts[0][0] !== ':')
    {
        return;
    }

    const raw_prefix = message_parts[0].substring(1);

    message_parts.shift();

    const prefix = {
    };

    if (raw_prefix.indexOf('@') !== -1)
    {
        const [
            prefix_remainder,
            host
        ] = raw_prefix.split('@');

        prefix.host = host;

        if(prefix_remainder.indexOf('!') !== -1)
        {
            const [
                nickname,
                user
            ] = prefix_remainder.split('!');

            prefix.nickname = nickname;
            prefix.user = user;
        }
        else
        {
            prefix.nickname = prefix_remainder;
        }
    }
    else
    {
        prefix.servername = raw_prefix;
    }

    return prefix;
};

const parse_irc_command = raw_message =>
{
    const command = raw_message[0];

    raw_message.shift();

    return command;
};

const find_trailing_start_index = message_parts =>
{
    for (let i = 0; i < message_parts.length;++i)
    {
        if(message_parts[i][0] === ':')
        {
            return i;
        }
    }

    return -1;
};

const parse_irc_params = message_parts =>
{
    console.log('PARAMS');
    console.log(message_parts);
    const trailing_start = find_trailing_start_index(message_parts);

    return {
        trailing: message_parts.slice(trailing_start).join(' '),
        middle:   message_parts.slice(0,trailing_start)
    };
};

// params      =  *( SPACE middle ) [ SPACE ":" trailing ]
// nospcrlfcl  =  <any octet except NUL, CR, LF, colon (`:`) and SPACE>
// middle      =  nospcrlfcl *( ":" / nospcrlfcl )
// trailing    =  *( ":" / " " / nospcrlfcl )

const parse_irc_message = raw_message =>
{
    const message_parts = raw_message.split(' ');

    const tags = parse_irc_tags(message_parts);
    const prefix = parse_irc_prefix(message_parts);
    const command = parse_irc_command(message_parts);
    const params = parse_irc_params(message_parts);

    return {
        tags,
        prefix,
        command,
        middle: params.middle,
        body:   params.trailing
    };
};

module.exports = {
  parse_irc_message,
  parse_irc_tags,
  parse_irc_prefix,
  parse_irc_command,
  parse_irc_params,
  find_trailing_start_index
};