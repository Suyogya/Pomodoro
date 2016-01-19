let Timer = null;

System.import("Publisher")
	.then(()=> Timer = TimerClass());

function TimerClass(){

	class Timer extends Publisher{
		constructor(){
			super();
		}
	}

	return Timer;
}