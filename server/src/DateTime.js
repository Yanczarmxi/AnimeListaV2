class DateTime {
    constructor () {
        this.dt = new Date();
    }

    GetDateNow() {
        const y = this.dt.getFullYear();
        const m = this.dt.getMonth();
        const d = this.dt.getDay();

        return y + '-' + m + '-' + d;
    }

    GetTimeNow() {
        const h = this.dt.getHours();
        const m = this.dt.getMinutes();
        const s = this.dt.getSeconds();

        return h + ':' + m + ':' + s;
    }
}

module.exports = new DateTime();