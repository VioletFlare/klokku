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

    _getTimeBoard() {
        const timeStrings = this._getTimeStrings();
        const timeBoard = `
🇵🇰: ${timeStrings.PK}
🇮🇹: ${timeStrings.IT}
🇬🇧: ${timeStrings.GB}
`;

        return timeBoard;
    }
    
    run(msg) {
        const timeBoard = this._getTimeBoard();

        msg.reply(timeBoard);
    }
}

module.exports = new K();