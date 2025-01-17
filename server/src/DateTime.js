class DateTime {
    constructor () {
        this.date = new Date();
    }

    GetDateNow() {
        const year = String(this.date.getFullYear());
        const month = String(this.date.getMonth() + 1).padStart(2, '0'); // Poprawna nazwa zmiennej
        const day = String(this.date.getDate()).padStart(2, '0'); // Poprawna metoda

        return `${year}-${month}-${day}`;
    }

    GetTimeNow() {
        const hour = String(this.date.getHours()).padStart(2, '0');
        const minute = String(this.date.getMinutes()).padStart(2, '0');
        const second = String(this.date.getSeconds()).padStart(2, '0');

        return `${hour}:${minute}:${second}`;
    }
}

module.exports = new DateTime();