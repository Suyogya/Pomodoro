import Timer from "js/timer.js";

describe("Timer class test suite", function (){
    let timer;
    
    before('Testing timer', function (){
        timer = new Timer();
    });
    
    it('should be a timer object', function (){
        
        timer.should.be.a.Timer
    });
    
    it('should have a writable totalTime property', function (){
        timer.should.have.property('totalTime');
        
        timer.totalTime = 50;
        timer.totalTime.should.be.equal(50);
    });
    
    it('should set totalTime to zero when totalTime is negative', function (){
        timer.totalTime = -100;
        timer.totalTime.should.be.equal(0);
    });
    
    it('should have a read only currentTime property', function (){
        timer.should.have.property('currentTime');
        (()=>timer.currentTime = 60).should.throw(Error);
    });
    
    it('should set currentTime to totalTime when totalTime is updated', function (){
        timer.totalTime = 100;
        timer.currentTime.should.be.equal(timer.totalTime);
        
        timer.totalTime = 200;
        timer.currentTime.should.be.equal(timer.totalTime);
        
        timer.totalTime = -100;
        timer.currentTime.should.be.equal(timer.totalTime);
    });
});