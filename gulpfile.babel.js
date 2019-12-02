import gulp from 'gulp';
import Bluebird from 'bluebird';
import requireDir from 'require-dir';
import { install } from 'source-map-support';

// Enable source map support
install();
requireDir('./gulp', { recurse: false });

global.Promise = Bluebird;
