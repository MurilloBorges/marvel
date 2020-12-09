import 'dotenv/config';
import md5 from 'md5';
import moment from 'moment';

class Authentication {
  constructor() {
    this._ts = moment().format('llll');
    this._apikey = process.env.MARVEL_PUBLIC_KEY;
    this._hash = md5(
      this._ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY
    );
  }

  get ts() {
    return this._ts;
  }

  get apikey() {
    return this._apikey;
  }

  get hash() {
    return this._hash;
  }
}

export default new Authentication();
