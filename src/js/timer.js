import Publisher from "Publisher";

let updateCurrentTime = Symbol();
let updateStatus = Symbol();

let STATUS = {
    RESET: 0,
    STARTED: 1,
    PAUSED: 2,
    STOPPED: 3,
    DONE: 4
};

export class Timer extends Publisher {
    constructor(_totalTime) {
        super();
        this.totalTime = _totalTime;
        this.STATUS = STATUS;
        this[updateStatus](STATUS.RESET);
    }

    get currentTime() {
        return this._currentTime;
    }

    get totalTime() {
        return this._totalTime;
    }

    set totalTime(value) {
        this._totalTime = value >= 0 ? value : 0;
        this[updateCurrentTime](this._totalTime);
    }

    [updateCurrentTime](value) {
        this._currentTime = value;

        if (value === 0) {
            clearInterval(this._intervalMethod);
            this[updateStatus](STATUS.DONE);
        }

        this.publish(this.currentTime, 'currentTime');
    }

    get status() {
        return this._status;
    }

    [updateStatus](value) {
        this._status = value;
        this.publish(this.status, 'status');
    }

    start() {
        clearInterval(this._intervalMethod);
        this._intervalMethod = this.timerRun();
        this[updateStatus](STATUS.STARTED);
    }

    timerRun() {
        return setInterval(() => this[updateCurrentTime](this.currentTime - 1), 1000);
    }
};