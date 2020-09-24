import Eris from 'eris';
import MongoProvider from './Structures/Database/MongoProvider';
import { AxonOptions, ADBProvider } from 'axoncore';

console.log(MongoProvider instanceof ADBProvider); // Expected: True
// Got: False

import Client from './Structures/Client';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import botConfig from '../configs/config.json'; // @ts-ignore
import secret from '../configs/secret.json';
import lang from '../configs/lang.json';

import MyUtils from './MyUtils';

const axonOptions = new AxonOptions( {
    prefixes: botConfig.prefixes,
    settings: botConfig.settings,
    lang,
    logo: null,

    info: botConfig.info,
    staff: botConfig.staff,
    template: botConfig.template,
    custom: { },
},
// webhooks
secret.webhooks,
// extensions
{
    utils: MyUtils, // use your own Utils
    logger: null, // custom Logger
    DBProvider: MongoProvider, // custom DB Service
} );

/**
 * new AxonClient(token, erisOptions, AxonOptions, modules)
 *
 * new Client(token, erisOptions, AxonOptions) => Modules imported in Client
 */
const client = new Eris.Client(
    secret.bot.token,
    {
        autoreconnect: true,
        defaultImageFormat: 'png',
        defaultImageSize: 512,
        getAllUsers: false,
        messageLimit: 1000,
        restMode: true,
        disableEvents: {
            TYPING_START: true,
        },
    },
);

const Bot = new Client(
    client,
    axonOptions,
);

export default Bot;