function connect()  {
    // Connect to twtich IRC via WebScoket.
    // Create a new WebSocket object.
    const socket = new WebSocket('wss://irc-ws.chat.twitch.tv');
    
    socket.onopen = function() 
    {
    /* On open, send the following commands to the server.
       PASS oauth: is the password for the bot.
       NICK is the nickname of the bot.
       JOIN #channel is the channel to join.
    */
        console.log('Connected to Twitch IRC');
        socket.send('PASS oauth:');
        socket.send('NICK justinfan123');
        socket.send('JOIN #dirtex808');
        
    };
    
    socket.onmessage = (e) => 
    {
        if(e.data.includes('PING'))
        {
            socket.send('PONG :tmi.twitch.tv');
        }
        else if(e.data.includes('PRIVMSG'))
        {
            const { message, username } = parseMessage(e.data);
            console.log(message, username);
            renderMessage(message, username);
            limitMessage();
        }
    };

    socket.onclose = function() 
    {
        console.log('Disconnected from Twitch IRC');
        setTimeout(connect, 1000);
    };

    socket.onerror = function(error) 

    {
        console.error('Error:', error);
    };
   
}


function parseMessage(messageStr)
{
    const command = messageStr.substring(messageStr.indexOf('#'));
    const message = command.substring(command.indexOf(':') + 1);
    const username = messageStr.substring(1, messageStr.indexOf('!'));
    return { message, username };
}

function renderMessage(message, username){
    const $chatContainer = document.querySelector('.chat-container');

    const $messageBox = document.createElement('div');
    $messageBox.classList.add('message-box');
    $chatContainer.appendChild($messageBox);

    const $username = document.createElement('span')
    $username.classList.add('username'); 
    $username.textContent = username;
    $messageBox.prepend($username);

    const $message = document.createElement('p');
    $message.classList.add('message'); 
    $message.textContent = message;  
    $messageBox.appendChild($message);
}

function limitMessage()
{
    const $chatContainer = document.querySelector('.chat-container');
     
    while($chatContainer.scrollHeight > $chatContainer.clientHeight)
        {
            $chatContainer.firstElementChild.remove()
        }
   
}


function setTheme()
{
const url = window.location.search;
if (url.includes('theme=dark'))
    {
        document.documentElement.classList.add('dark');
        console.log('Dark theme active');
    }
else if (url.includes('theme=light'))
    {   
    document.documentElement.classList.remove('dark')
    console.log('Light theme active');  
    }
else 
    {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    {
        document.documentElement.classList.add('dark');
        console.log('System preference — Dark theme active');
    } 
    else
        {
        document.documentElement.classList.remove('dark')
        console.log('System preference — Light theme active');  
        }
    }   
}
setTheme()
connect(); 