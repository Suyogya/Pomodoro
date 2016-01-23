"use strict";

let global = (function (){return this;}());

export default class Publisher{
	constructor(){
		this._subscribers = {}
	}

	subscribe(fn, context=global, type='any'){
		let subscribers = this._subscribers[type];
		if(subscribers === undefined){
			this._subscribers[type] = [];
		}

		this._subscribers[type].push({method:fn, context: context});
	}

	unsubscribe(fn, context=global, type='any'){
		let subscribers = this._subscribers[type];

		if(subscribers === undefined){
			return;
		}

		subscribers.forEach(function(subscriber, index, array){
			if(subscriber.method === fn, subscriber.context === context){
				array.splice(index, 1);
			}
		});
	}

	publish(arg, type='any'){
		let subscribers = this._subscribers[type];

        if(subscribers === undefined){
            return;
        }

		for(let subscriber of subscribers){
			let method = subscriber.method;
			let context = subscriber.context;
			method.call(context, arg);
		}
	}
}