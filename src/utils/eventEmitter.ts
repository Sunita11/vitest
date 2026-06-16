/* 
* 𝗥𝗼𝘂𝗻𝗱 𝟭: 𝗕𝘂𝗶𝗹𝗱 𝗮𝗻 𝗘𝘃𝗲𝗻𝘁 𝗘𝗺𝗶𝘁𝘁𝗲𝗿 𝗦𝘆𝘀𝘁𝗲𝗺 𝗶𝗻 𝗥𝗲𝗮𝗰𝘁 𝗣𝗿𝗼𝗯𝗹𝗲𝗺 𝗦𝘁𝗮𝘁𝗲𝗺𝗲𝗻𝘁:
    * You are tasked with designing and implementing a lightweight event emitter system for a React 
    * application. This system should enable components to communicate in a decoupled manner without 
    * relying on prop drilling or external state management libraries.

* 𝗥𝗲𝗾𝘂𝗶𝗿𝗲𝗺𝗲𝗻𝘁𝘀: Design and implement an event emitter module with the following methods: 
    * a. on(eventName, callback) — Subscribe to an event. 
    * b. off(eventName, callback) — Unsubscribe from an event. 
    * c. emit(eventName, payload) — Emit an event with an optional payload to all registered listeners.
 */
interface EventI {
  [key: string]: ((arg?: any) => void)[];
}
class EventEmitter {
  events: EventI;
  constructor() {
    this.events = {};
  }

  on(eventName: string, cb: (arg?: any) => void) {
    let exists = false;
    for (let key in this.events) {
      if (key === eventName) {
        exists = true;
        this.events[key].push(cb);
      }
    }

    if (!exists) {
      this.events[eventName] = [cb];
    }
  }

  off(eventName: string, cb: (arg?: any) => void) {
    if (!this.events[eventName] || !Array.isArray(this.events[eventName]))
      return;
    const ev = this.events[eventName];

    let index = -1;
    for (let i = 0; i < ev.length; i++) {
      if (ev[i].toString() === cb.toString()) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      this.events[eventName].splice(index, 1);
    }
    if (this.events[eventName].length === 0) {
      delete this.events[eventName];
    }
  }

  emit(eventName: string, payload: any) {
    const ev = this.events[eventName];

    if (!Array.isArray(ev)) return;
    for (let i = 0; i < ev.length; i++) {
      ev[i](payload);
    }
  }
}

const nEv = new EventEmitter();
nEv.on("add", (p) => console.log("0: ", p));
nEv.on("add", (p) => console.log("1: ", p));
nEv.on("sunita", (p) => console.log("0: ", p));
console.log(nEv.events);

nEv.emit("add", 12);
//0:  12
// 1:  12

nEv.off("add", (p) => console.log("0: ", p)); // remove 1st cb

nEv.emit("add", 15); // 1:  15
