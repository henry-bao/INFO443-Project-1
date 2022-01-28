import React, { useEffect } from 'react';
import { useState } from 'react';
import 'firebase/database';
import firebase from 'firebase';
import 'firebase/firestore';

export function AddGoalForm() {
    // File Rendering
    const db = firebase.firestore();
    const [fileUrl, setFileUrl] = React.useState(null);
    const [users, setUsers] = React.useState([]); // eslint-disable-line no-unused-vars
    const [url, setUrl] = React.useState('');

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);

        try {
            await fileRef.put(file);
            setFileUrl(
                await fileRef.getDownloadURL().then((url) => {
                    setUrl(url);
                })
            );
        } catch (e) {
            console.error(e);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        if (!username || !fileUrl) {
            return;
        }
        await db.collection('users').doc(username).set({
            name: username,
            avatar: fileUrl,
        });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = await db.collection('users').get();
            setUsers(
                usersCollection.docs.map((doc) => {
                    return doc.data();
                })
            );
        };
        fetchUsers();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // submit button only appears when all info is filled
    const isFormValid = () => {
        return (
            inputOneWord.length > 0 &&
            inputCategory.length > 0 &&
            inputDuration.length > 0 &&
            inputDescription.length > 0 &&
            inputEmail.length > 0
        );
    };

    // 	//opening and closing form
    function openForm() {
        document.getElementById('myForm').style.display = 'block';
    }

    function closeForm() {
        document.getElementById('myForm').style.display = 'none';
    }

    // 	// Initialize Firebase
    // if (!firebase.apps.length) {
    //     firebase.initializeApp(firebaseConfig);
    // } else {
    //     firebase.app(); // if already initialized, use that one
    // }
    
    firebase.analytics();
    // firebase.initializeApp(firebaseConfig);

    let messagesRef = firebase.database().ref('Goals');
    // 	//Manipulating form data from here on

    function submitForm(e) {
        e.preventDefault();

        //Get values
        let name = inputOneWord;
        // let fullName = inputFullName;
        let category = inputCategory;
        let duration = inputDuration;
        let description = inputDescription;
        let email = inputEmail;

        saveMessage(name, description, category, duration, url, email);
        setAlert('alert-warning alert alert-dismissible fade show');

        setInputOneWord('');
        setInputDuration('');
        setInputDescription('');
    }

    // 	//save message to firebase
    function saveMessage(name, description, category, duration, url, email) {
        if (
            inputOneWord.length === 0 ||
            inputDuration.length === 0 ||
            inputDescription.length === 0 ||
            inputEmail.length === 0 ||
            url.length === 0
        ) {
            setAlertM('Please fill out everything!');
        } else {
            setAlertM('Your Goal has been submitted!');

            let newMessageRef = messagesRef.push();
            newMessageRef.set({
                title: name,
                description: description,
                cate: category,
                date: Date.now() + duration * 86400000,
                img: url,
                contact: email,
                people: 1,
            });
        }
    }

    const [inputOneWord, setInputOneWord] = useState('');
    // const [inputFullName, setInputFullName] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const [inputDuration, setInputDuration] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [inputEmail, setInputEmail] = useState('');

    const [alertM, setAlertM] = useState('Your Goal has been submitted!');

    const [alert, setAlert] = useState('d-none');

    // Show alert
    setTimeout(function () {
        setAlert('d-none');
    }, 3000);

    return (
        <section>
            <button className="open-button" onClick={openForm}>
                Publish Now!
            </button>

            <div className="chat-popup" id="myForm">
                <form id="goalForm" className="form-container" onSubmit={onSubmit}>
                    {/* alert message */}
                    <div className={alert}>{alertM}</div>
                    {/* One Word Description */}
                    <label htmlFor="msg">
                        <b>Describe your Goal in one word</b>
                    </label>
                    <input
                        className="form-control-sm"
                        type="text"
                        onChange={(event) => setInputOneWord(event.target.value)}
                        required
                    ></input>

                    {/* Full Name of goal
					<label htmlFor="msg">
						<b>Enter Goal Name in full</b>
					</label>
					<input
						className="form-control"
						type="text"
						onChange={(event) => setInputFullName(event.target.value)}
						required
					></input> */}

                    {/* Category */}
                    <label htmlFor="msg">
                        <b>Select a category for your Goal</b>
                    </label>
                    <select
                        className="custom-select"
                        value={inputCategory}
                        onChange={(event) => setInputCategory(event.target.value)}
                    >
                        <option value="Health">Health</option>
                        <option value="Career">Career</option>
                        <option defaultValue="Hobby">Hobby</option>
                        <option value="School">School</option>
                    </select>
                    <br></br>

                    {/* Duration */}
                    <label htmlFor="msg">
                        <b>How many days do you expect the Goal will take?</b>
                    </label>
                    <input
                        className="form-control-sm"
                        type="text"
                        onChange={(event) => setInputDuration(event.target.value)}
                        required
                    ></input>

                    {/* Description */}
                    <label htmlFor="msg">
                        <b>Enter Description</b>
                    </label>
                    {/* <textarea placeholder="Type message.." name="msg" required></textarea> */}
                    <input
                        type="text"
                        id="goalDescription"
                        className="form-control-lg"
                        onChange={(event) => setInputDescription(event.target.value)}
                        required
                    ></input>

                    <label htmlFor="msg">
                        <b>Contact Info</b>
                    </label>
                    <br></br>
                    <input
                        type="text"
                        className="form-control-sm"
                        id="inputEmail4"
                        onChange={(event) => setInputEmail(event.target.value)}
                        required
                    />

                    <label htmlFor="msg">
                        <b>Choose an Image Cover that others will see</b>
                    </label>
                    <div className="custom-file">
                        <input type="file" id="customFile" onChange={onFileChange} required />
                        {/* <label className="custom-file-label" htmlFor="customFile">
							Upload an image
						</label> */}
                    </div>
                    <br></br>

                    <button
                        type="submit"
                        className="btn"
                        disabled={!isFormValid}
                        onClick={submitForm}
                    >
                        Send
                    </button>
                    <button type="button" className="btn cancel" onClick={closeForm}>
                        Close
                    </button>
                </form>
            </div>
        </section>
    );
}
