const { Temporal } = require('@js-temporal/polyfill');

class K {
    constructor () {
        this.format = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        }

        this.PKConfig = {
            timeZone: 'Asia/Karachi',
            ...this.format
        };

        this.ITConfig = {
            timeZone: 'Europe/Rome',
            ...this.format
        }

        this.GBConfig = {
            timeZone: 'Europe/London',
            ...this.format
        }
    }

    _getTimeStrings() {
        const date = new Date();
        const PKformatter = new Intl.DateTimeFormat([], this.PKConfig);
        const ITformatter = new Intl.DateTimeFormat([], this.ITConfig);
        const GBformatter = new Intl.DateTimeFormat([], this.GBConfig);
        const formattedPKDate = PKformatter.format(date);
        const formattedITDate = ITformatter.format(date);
        const formattedGBDate = GBformatter.format(date);

        const timeStrings = {
            PK: formattedPKDate, 
            IT: formattedITDate, 
            GB: formattedGBDate
        }

        return timeStrings;
    }

    _fixNumber(number) {
        let fixed = number;
        
        if (number < 10) {
            fixed = `0${number}`;
        }

        return fixed;
    }

    _formatDateTemporalToString(date) {
        const day = this._fixNumber(date.day);
        const month = this._fixNumber(date.month);
        const hour = this._fixNumber(date.hour);
        const minute = this._fixNumber(date.minute);
        const second = this._fixNumber(date.second);

        return `${day}/${month}/${date.year}, ${hour}:${minute}:${second}`;
    }

    _getTimeStringsIslamic() {
        const tzPK = Temporal.TimeZone.from('Asia/Karachi');
        const tzIT = Temporal.TimeZone.from('Europe/Rome');
        const tzGB = Temporal.TimeZone.from('Europe/London');

        const now = Temporal.Now.instant().toString();

        const PKTime = tzPK.getPlainDateTimeFor(now).withCalendar('islamic');
        const ITTime = tzIT.getPlainDateTimeFor(now).withCalendar('islamic');
        const GBTime = tzGB.getPlainDateTimeFor(now).withCalendar('islamic');

        const timeStrings = {
            PK: this._formatDateTemporalToString(PKTime), 
            IT: this._formatDateTemporalToString(ITTime), 
            GB: this._formatDateTemporalToString(GBTime)
        }

        return timeStrings;
    }

    _getTimeBoard() {
        const timeStrings = this._getTimeStrings();
        const islamicTimeStrings = this._getTimeStringsIslamic();

        const timeBoard = `
🇵🇰: ✝️ ${timeStrings.PK} - ☪️ ${islamicTimeStrings.PK}
🇮🇹: ✝️ ${timeStrings.IT} - ☪️ ${islamicTimeStrings.IT}
🇬🇧: ✝️ ${timeStrings.GB} - ☪️ ${islamicTimeStrings.GB}
`;

        return timeBoard;
    }
    
    run(msg) {
        const timeBoard = this._getTimeBoard();

        msg.reply(timeBoard);
    }
}

module.exports = new K();