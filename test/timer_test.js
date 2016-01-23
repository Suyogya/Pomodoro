import {Timer} from "js/timer.js";

describe("Timer class test suite", function () {
    this.timeout(10000);
    let timer;

    before('Testing timer', function () {
        timer = new Timer();
    });

    it('should be a timer object', function () {

        timer.should.be.a.Timer
    });

    it('should have a writable totalTime property', function () {
        timer.should.have.property('totalTime');

        timer.totalTime = 50;
        timer.totalTime.should.be.equal(50);
    });

    it('should set totalTime to zero when totalTime is negative', function () {
        timer.totalTime = -100;
        timer.totalTime.should.be.equal(0);
    });

    it('should have a read only currentTime property', function () {
        timer.should.have.property('currentTime');
        (() => timer.currentTime = 60).should.throw(Error);
    });

    it('should set currentTime to totalTime when totalTime is updated', function () {
        timer.totalTime = 100;
        timer.currentTime.should.be.equal(timer.totalTime);

        timer.totalTime = 200;
        timer.currentTime.should.be.equal(timer.totalTime);

        timer.totalTime = -100;
        timer.currentTime.should.be.equal(timer.totalTime);
    });

    it('should have a constructor that takes a parameter to set totalTime', function () {
        let timer = new Timer(100);

        timer.totalTime.should.be.equal(100);
    });

    it('should have a start method that will start the timer and set status to STARTED', function (done) {
        let startValue = 5;
        timer.totalTime = startValue;
        let assertTest = (status) => {
            status.should.be.equal(timer.STATUS.STARTED);
            timer.unsubscribe(assertTest, this, 'status');
            done();
        };

        timer.subscribe(assertTest, this, 'status');

        timer.start();
    });

    it('should stop after currentTime reaches zero and set status to DONE', function (done) {
        timer.totalTime = 2;
        timer.start();
        let assertTest = (status) => {
            if (timer.status === timer.STATUS.DONE) {
                timer.currentTime.should.be.equal(0);
                timer.unsubscribe(assertTest, this, 'status');
                done();
            }
        };

        timer.subscribe(assertTest, this, 'status');
    });

    describe("Test stop pause method", function () {
        beforeEach(function () {
            timer.totalTime = 5;
            timer.start();
        });

        it('should have a pause method that pauses timer and sets status to PAUSED', function (done) {
            let assertTest = (status) => {
                timer.status.should.be.equal(timer.STATUS.PAUSED);
                timer.unsubscribe(assertTest, this, 'status');
                done();
            };

            timer.subscribe(assertTest, this, 'status');

            timer.pause();
        });

        it('should have a stop method that resets the timer and sets status to STOPPED', function (done) {
            let assertTest = (status) => {
                timer.status.should.be.equal(timer.STATUS.STOPPED);
                timer.currentTime.should.be.equal(timer.totalTime);
                timer.unsubscribe(assertTest, this, 'status');
                done();
            };

            timer.subscribe(assertTest, this, 'status');

            timer.stop();
        });
    });

    describe("Test add and reduce minute methods", function () {

        beforeEach(function(){
            timer.stop();
            timer.totalTime = 100;
        })

        it('should have addMinute method to add a minute (60 seconds) to total time', function () {
            timer.addMinute();
            timer.totalTime.should.be.equal(160);
        });

        it('should not allow adding a minute if timer is started', function () {
            timer.start();
            timer.addMinute();
            timer.totalTime.should.be.equal(100);
        });

        it('should not allow adding a minute if timer is paused', function () {
            timer.start();
            timer.pause();
            timer.addMinute();
            timer.totalTime.should.be.equal(100);
        });

        it('should have reduceMinute method to reduce a minute from total time but not below zero', function () {
            timer.reduceMinute();
            timer.totalTime.should.be.equal(40);
            timer.reduceMinute();
            timer.totalTime.should.be.equal(0);
        });

        it('should not allow reducing a minute if timer is started', function () {
            timer.start();
            timer.reduceMinute();
            timer.totalTime.should.be.equal(100);
        });

        it('should not allow reducing a minute if timer is paused', function () {
            timer.start();
            timer.pause();
            timer.reduceMinute();
            timer.totalTime.should.be.equal(100);
        });
    });
});;