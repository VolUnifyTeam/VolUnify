import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {

    const [session, setSession] = useState(undefined);




    //Create ACC

    const signUpNewUser = async (email, password) => {
        const {data, error} = await supabase.auth.signUp({

            email: email,

            password: password,

               
        });

        if (error) {
            console.error("there was a problem signing up:", error);
            return {success: false, error};
        }
        return {success: true, data};
    };


    //Sign In


    const signInUser = async(email, password) => {

        try{

            const {data , error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,

            });

        if (error) {
            console.error('sign in error occured: ', error );
            return {success: false, error: error.message};
        }
        console.log("sign in success: ", data); // remove data from console log when deploying 
        return {success: true, data}; 

        } catch(error){
            console.error("an error occurred: ", error);
        }

    };



    useEffect (() => {

        supabase.auth.getSession().then(({data: {session}}) => {

            setSession(session);
        } );

        supabase.auth.onAuthStateChange((_event, session ) => {
            setSession(session);
        });
    }, []);


    // Sign Out Func 21:10 on vid

    const signOut = () => {
        const { error } = supabase.auth.signOut();
        if (error) {
            console.error("there was an error: ", error);
        }
    };


    return (
        <AuthContext.Provider 
            value= {{session, signUpNewUser, signInUser,signOut}}
        > 
        {children} 
        </AuthContext.Provider>


    );

};

export const UserAuth = () => {

    return useContext(AuthContext);

};

