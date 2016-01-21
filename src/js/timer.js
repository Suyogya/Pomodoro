import Publisher from "Publisher";

var Timer = (function () {
    var updateCurrentTime = Symbol();
    
    class Timer extends Publisher {
        constructor() {
            super();
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
        
        [updateCurrentTime](value){
            this._currentTime = value;
        }
    }
    return Timer;
} ());

export default Timer