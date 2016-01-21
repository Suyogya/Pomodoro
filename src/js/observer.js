let global = (function (){return this;}());

export default class Publisher{
	constructor(){
		this._subscribers = {}
	}

	subscribe(fn, context=global, type='any'){
		let subscribers = this._subscribers[type]
		if(subscribers === undefined){
			subscribers[type] = [];
		}

		subscribers[type].push({method:fn, context: context});
	}

	unsubscribe(fn, context=global, type='any'){
		let subscribers = this._subscribers[type];

		subscribers.forEach(function(subscriber, index, array){
			if(subscriber === fn){
				array.splice(index, 1);
			}
		});
	}

	publish(arg, type='any'){
		let subscribers = this.subscribers[type];

		for(let subscriber of subscribers){
			let method = subscriber.method;
			let context = subscriber.context;
			method.apply(context, arg);
		}
	}
}