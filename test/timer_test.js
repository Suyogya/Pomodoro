import Timer from "js/timer.js";

describe("Timer class test suite", function (){
    this.timeout(10000);
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
    
    it('should have a constructor that takes a parameter to set totalTime', function (){
        let timer = new Timer(100);
        
        timer.totalTime.should.be.equal(100);       
    });
    
    it('should have a start method that will start the timer and set status to STARTED', function (){
        let startValue = 5;
        timer.totalTime = startValue;
        timer.start();
        
        timer.status.should.be.equal(timer.STATUS.STARTED);
    });
    
    it('should stop after currentTime reaches zero and set status to DONE', function (done){
        let startValue = 5;
        timer.totalTime = startValue;
        timer.start();
        
        timer.subscribe(()=>{
            startValue--;
            console.log(timer.currentTime);
            timer.currentTime.should.be.equal(startValue);
        }, this, 'currentTime');
        
        setTimeout(()=>{
            timer.currentTime.should.be.equal(0);
            done();
        }, 6000);
    })
});