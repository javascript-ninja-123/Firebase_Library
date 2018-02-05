"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
class Firebase {
    constructor(config) {
        this.config = config;
        this.config = config;
        this.app = firebase.initializeApp(config);
        this.ref = '';
        this.transferRef = '';
    }
    createRef(refName) {
        this.ref = this.app.database().ref(refName);
    }
    createTransferRef(refName) {
        this.transferRef = this.app.database().ref(refName);
    }
    //it returns its unique key
    addData(data) {
        const push = this.ref.push(data);
        return push.key;
    }
    updateData(id, data) {
        this.ref.child(id).update(data);
    }
    deleteData(id) {
        this.ref.child(id).remove();
    }
    //you can even crate && add unique key to your data
    createUniqueKey() {
        return this.ref.push().key;
    }
    fetchData(realtime, fn) {
        return __awaiter(this, void 0, void 0, function* () {
            if (realtime) {
                this.ref.on('value', (snap) => {
                    const snapshot = snap.val();
                    return fn(snapshot);
                });
            }
            else {
                const snap = yield this.ref.once('value');
                return snap.val();
            }
        });
    }
    transferDataAndUpdateOriginal(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const snap = yield this.ref.child(id).once('value');
            const snapshot = snap.val();
            yield this.transferRef.push(snapshot);
            this.updateData(id, data);
        });
    }
    transferDataAndDeleteOriginal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const snap = yield this.ref.child(id).once('value');
            const snapshot = snap.val();
            yield this.transferRef.push(snapshot);
            this.deleteData(id);
        });
    }
}
const testFirebase = new Firebase(config);
testFirebase.createRef('users');
const key = testFirebase.addData({ name: 'boba', age: 22 });
const getData = (snapshot) => {
    const newArray = Object.keys(snapshot);
    console.log(newArray);
};
testFirebase.fetchData(true, getData);
testFirebase.createTransferRef('oldUser');
testFirebase.transferDataAndDeleteOriginal('-L4_2-YcK-0w0IS9kzn9');
