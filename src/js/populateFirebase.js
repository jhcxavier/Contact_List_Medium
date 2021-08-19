const firebase = require("firebase")
const fetch = require("node-fetch")
require("firebase/firestore")
const url = "https://assets.breatheco.de/apis/fake/contact/";
console.log("hello")
let contacts=[
    {
    
      full_name: 'Bob Dylan',
      email: 'Bobdylan@Bobby.com',
      phone: '3058675309',
      address: 'Baltimore, MD',
    },
    {
      
      
      full_name: 'jake',
      email: 'j@j.com',
      phone: '2223334456',
      address: 'cooper city',
    }
  ]

const getContacts = () => {
    fetch(url + "agenda/downtown_xii")
    .then(response => response.json())
    .then(result => {
        contacts = result;
    }).then(()=>console.log(contacts))
    
}
getContacts()

var firebaseConfig = {
	apiKey: "AIzaSyCJU14PyFLPryviHIc7TrGegTh9KHOg_t8",
	authDomain: "mdc-14-authentication.firebaseapp.com",
	projectId: "mdc-14-authentication",
	storageBucket: "mdc-14-authentication.appspot.com",
	messagingSenderId: "537038399314",
	appId: "1:537038399314:web:20dd8eef512ceaf34c7c8b",
	measurementId: "G-DKVGMCZFGS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db  = firebase.firestore()

setInterval(()=>{
    function populateCollection(collectionName, items){
        return Promise.all(
            items&&items.map((item)=>{
                const {id, ...data} = item;
                return db.collection(collectionName).doc(id).set(data)
            })
        )
    }
    Promise.all([
        populateCollection("contacts", contacts)
    ]).then(()=>{
        console.log("done")
        process.exit(0)
    }).catch((err)=>{
        console.log(err)
    })
},2000)