import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import Storage from '../Storage'

let _imgData = [];

class EmojiStore extends EventEmitter {
  constructor(){
    super();
    AppDispatcher.register(action => {
      switch(action.type) {
        case 'GOT_IMGDATA':
        _imgData = action.payload;
        this.emit('CHANGE');
        break;
      }
    })
  }

  startListening(cb){
    this.on('CHANGE',cb);
  }

  stopListening(cb){
    this.removeListener('CHANGE',cb)
  }

  getImgData(){
    return _imgData;
  }

}

export default new EmojiStore();
