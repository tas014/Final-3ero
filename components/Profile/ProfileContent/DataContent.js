import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { db, auth, storage } from '../../../APIs/firebaseConfig'
import { collection, getDocs, getDoc } from 'firebase/firestore'
import { onAuthStateChanged, updatePassword } from 'firebase/auth'
import { ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { updateDoc, doc } from "firebase/firestore";

export default function DataContent () {

    const defaultPfp = 'https://firebasestorage.googleapis.com/v0/b/community-gaming-platform.appspot.com/o/profilePics%2FdefaultUser.png?alt=media&token=eeba24b6-0b30-435f-84fb-6b84e3b9ee0d'

    const [email, setEmail] = useState('default@user.com')
    const [username, setUsername] = useState('John Doe')
    const [password, setPassword] = useState('12345')
    const [authUser, setAuthUser] = useState(null);
    const [userData, setUserData] = useState({});
    const [userImg, setUserImg] = useState(defaultPfp);
    const [selectedImg, setSelectedImg] = useState('');
    const [imgUpload, setImgUpload] = useState(null);
    const [submittable, setSubmittable] = useState(true);
    const [status, setStatus] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setAuthUser(currentUser)
          })
    },[])

    useEffect(() => {

        const callDb = async () =>{
            if (authUser) {
                const docRef = doc(db, 'users', authUser.uid) 
                getDoc(docRef).then((res)=>{
                    setUserData(res.data());
                    updateContent();
                }).catch (ex => console.log('There was an error retrieving user data from database', ex))     
            }  
        } 

        callDb();  
    },[authUser])

    useEffect(() => {
        updateContent();
    }, [userData])

    useEffect(()=>{
        const uploadFile = async () =>{
            if (imgUpload) {
                const fileName = new Date().getTime() + imgUpload.name;
                const storageRef = ref(storage, `profilePics/${fileName}`);
    
                const uploadTask = uploadBytesResumable(storageRef, imgUpload);
    
                uploadTask.on('state_changed', 
                () => {
                    setSubmittable(false);
                }, 
                (error) => {
                    setError(true);
                    console.log(error)
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUserImg(downloadURL);
                        setSubmittable(true);
                    });
                }
                );
            } else return
        }

        uploadFile();
    },[selectedImg])

    const updateContent = () => {
        if (userData){
          if (Object.keys(userData).length > 0){
            setUsername(userData.username);
            setEmail(userData.email);
            setPassword(userData.password);
            setUserImg(userData.imgUrl)  
            }  
        }    
    }

    const handleSubmit = (e) => {
        setStatus(false);
        setError(false);
        e.preventDefault();
        updateUser(authUser.uid)
    }

    const updateUser = async (id) => {
        setSubmittable(false);
        const userDoc = doc(db, 'users', id)
        const newData = {
            ...userData,
            username: username,
            password:password,
            imgUrl: userImg
        }
        if (newData.password != userData.password) {
            const user = auth.currentUser
            try {
                await updatePassword(user, newData.password)
            } catch (ex) {
                console.log(ex);
                setError(true)
            }
            
        }
        if (newData.password != userData.password || newData.username != userData.username || newData.imgUrl != userData.imgUrl) {
            try {
                await updateDoc(userDoc, newData);
                setStatus(true);
                setSubmittable(true);
            } catch (ex) {
                setError(true)
                console.log(ex)
            }
        }
      } 

    const handleImg = ({target}) => {
        setSelectedImg(URL.createObjectURL(target.files[0]));
        setImgUpload(target.files[0]);
    } 
    
      return(
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className='formImgContainer flexcenter'>
                <img src={selectedImg ? selectedImg : userImg} alt='your profile picture' />
                <label htmlFor='fileInput' ><FontAwesomeIcon icon={faUpload} /></label>
                <input id='fileInput' type='file' className='nodisplay' onChange={e => handleImg(e)} />
            </div>
            <div>
                <div className='flex column'>
                    <label htmlFor='Username'>Username</label>
                    <input value={username} id='Username' type="text" onChange={e => setUsername(e.target.value)}></input>
                </div>
                <div className='inputBox'>
                    <label htmlFor='email'>Email</label>
                    <input disabled value={email} id='email' type="email" onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div className='inputBox'>
                    <label htmlFor='Password'>Password</label>
                    <input value={password} id='Password' type="password" onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div className='profileDataButton'>
                    {status ? <span className='success'>Saved changes.</span> : null}
                    {error ? <span className='error'>There was an error saving.</span> : null}
                    <button disabled={!submittable} type='submit'>Save Changes</button>
                </div>
            </div>
        </form>
        )
}