/* mock/stub firebase */

//DEFINE INITIAL DATA STORAGE
const MOCK_INITIAL_DATA = {
    allPosts: {}
}

//DEFINE LOGGED IN USER
const MOCK_USER = {
    displayName: "Dr. Mock",
    email: "mock@mock.com",
    photoUrl: null,
    uid: "ABCDEF123456789"
}

/////////////////////////////

class MockDatabase {
    constructor() {
        this.data = MOCK_INITIAL_DATA;
        this.listeners = [];
    }

    register(ref, callback) {
        const index = this.listeners.push({ ref: ref, callback: callback })
        const off = (() => {
            this.listeners[index] = null; //remove
        }).bind(this);
        return off;
    }

    notifyAll() {
        for (const listenerObj of this.listeners) {
            if (listenerObj) {
                listenerObj.callback(new MockSnapshot(listenerObj.ref));
            }
        }
    }

    set(pathSegments, newData) {
        let pointer = this.data;
        for (let i = 0; i < pathSegments.length - 1; i++) {
            pointer = pointer[pathSegments[i]]
        }
        pointer[pathSegments[pathSegments.length - 1]] = newData

        this.notifyAll();
    }

    push(pathSegments, newData) {
        let pointer = this.data;
        for (let i = 0; i < pathSegments.length; i++) {
            pointer = pointer[pathSegments[i]]
        }
        const mockHash = `mock${Object.keys(pointer).length}`
        pointer[mockHash] = newData; //assign!

        this.notifyAll();
    }
}

class MockRef {
    constructor(db, path) {
        this.db = db;
        this.pathSegments = path.split('/');
    }

    register(callback) {
        return this.db.register(this, callback)
    }

    set(obj) {
        this.db.set(this.pathSegments, obj)
    }
    push(obj) {
        this.db.push(this.pathSegments, obj)
    }

    _getPathString() {
        return this.pathSegments.join('/')
    }

}

class MockSnapshot {
    constructor(ref) {
        this.ref = ref
    }

    val() {
        const value = this.ref.pathSegments.reduce((acc, child) => {
            return acc[child]
        }, this.ref.db.data) //access data directly
        return value;
    }
}

jest.mock('firebase/database', () => {

    console.log("initializing mock firebase");

    const db = new MockDatabase();

    const mockDatabase = {
        getDatabase: () => {
            return db; //return object for debugging
        },
        ref: (db, path) => new MockRef(db, path),
        child: (oldRef, path) => new MockRef(oldRef.db, oldRef._getPathString() + "/" + path),
        set: (ref, obj) => {
            return new Promise((resolve, reject) => {
                ref.set(obj)
            })
        },
        push: (ref, obj) => {
            return new Promise((resolve, reject) => {
                ref.push(obj)
            })
        },
        onValue: (ref, callback) => {
            //NOTE: all listeners are at db level, not at reference level
            const off = ref.register(callback)
            callback(new MockSnapshot(ref)); //execute callback initially!
            return off; //off function
        },
        get: (ref) => {
            return new Promise((resolve, reject) => {
                resolve(new MockSnapshot(ref))
            })
        }
    }
    return mockDatabase;
})


class MockAuth { }

jest.mock('firebase/auth', () => {

    const auth = new MockAuth();

    return {
        getAuth: () => {
            return auth;
        },
        onAuthStateChanged: (auth, callback) => {
            callback(MOCK_USER); //"log in" the mock user
            return () => { } //off
        },
        EmailAuthProvider: { PROVIDER_ID: 1 },
        GoogleAuthProvider: { PROVIDER_ID: 2 }
    }
})