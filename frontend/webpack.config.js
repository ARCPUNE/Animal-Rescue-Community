// webpack.config.js
import { DefinePlugin } from 'webpack';
require('dotenv').config();

export const plugins = [
    new DefinePlugin({
        'process.env': JSON.stringify(process.env),
    }),
];
