const firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBSetmFNZLfOeuiTTtxQqQXPb02DsyKoBg",
  authDomain: "library-c5ba6.firebaseapp.com",
  databaseURL: "https://library-c5ba6.firebaseio.com",
  projectId: "library-c5ba6",
  storageBucket: "",
  messagingSenderId: "280031633735"
};

class Firebase{
    protected app:any;
    public ref:any;
    public transferRef:any;
  constructor(
    private config:{
      apiKey:string,
      authDomain:string,
      databaseURL:string,
      projectId:string,
      storageBucket:string,
      messagingSenderId:string
    }
    ){
    this.config = config;
    this.app = firebase.initializeApp(config)
    this.ref='';
    this.transferRef = ''
  }
  public createRef(refName:string):void{
    this.ref = this.app.database().ref(refName)
  }
  public createTransferRef(refName:string):void{
    this.transferRef = this.app.database().ref(refName)
  }
  //it returns its unique key
  public addData(data:any):string{
    const push = this.ref.push(data);
    return push.key;
  }
  public updateData(id:string, data:any){
    this.ref.child(id).update(data);
  }
  public deleteData(id:string){
    this.ref.child(id).remove()
  }
  //you can even crate && add unique key to your data
  public createUniqueKey():string{
    return this.ref.push().key;
  }
  public async fetchData(realtime:boolean,fn:any){
    if(realtime){
         this.ref.on('value',(snap:any) => {
          const snapshot = snap.val();
          return fn(snapshot);
      });
    }
    else{
      const snap = await this.ref.once('value');
      return snap.val();
    }
  }
  public async transferData(id:string){
    const snap = await this.ref.child(id).once('value');
    const snapshot = snap.val();
    await this.transferRef.push(snapshot)
  }
  public async transferDataAndUpdateOriginal(id:string,data:any){
    await this.transferData(id)
    this.updateData(id,data)
  }
  public async transferDataAndDeleteOriginal(id:string){
    await this.transferData(id)
    this.deleteData(id)
  }
}



///testing
const testFirebase = new Firebase(config);
testFirebase.createRef('users');
const key = testFirebase.addData({name:'boba',age:22})

const getData = (snapshot:any) => {
  const newArray = Object.keys(snapshot);
  console.log(newArray)
};
testFirebase.fetchData(true,getData)
testFirebase.createTransferRef('oldUser');
testFirebase.transferDataAndDeleteOriginal('-L4_2-YcK-0w0IS9kzn9')
