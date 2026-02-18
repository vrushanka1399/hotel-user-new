import axios from "axios";

const API_KEY="AIzaSyDks0TAzbSkH_kzGrqdHQR1cxa_v-Yy0Gs";
const PROJECT_ID="ecompract";

/* USER AUTH */

export const signupUser=(email,password)=>{
 return axios.post(
  `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
  {email,password,returnSecureToken:true}
 );
};

export const loginUser=(email,password)=>{
 return axios.post(
  `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
  {email,password,returnSecureToken:true}
 );
};

/* GET HOTELS */

export const getHotels=()=>{
 return axios.get(
  `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/listings`
 );
};

/* CREATE BOOKING */

export const addBooking=(data)=>{
 return axios.post(
  `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/bookings`,
  {
   fields:{
    email:{stringValue:data.email},
    hotel:{stringValue:data.hotel},
    price:{integerValue:data.price},
    address:{stringValue:data.address},
    city:{stringValue:data.city},
    pincode:{stringValue:data.pincode},
    guests:{integerValue:data.guests},
    checkIn:{stringValue:data.checkIn},
    checkOut:{stringValue:data.checkOut},
    status:{stringValue:"pending"},
    image:{stringValue:data.image}
   }
  }
 );
};

/* USER BOOKINGS */

export const getBookings=()=>{
 return axios.get(
  `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/bookings`
 );
};
