import { dbService } from "fBase";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [ntweet, setNtweet] = useState("");
    const [ntweets, setNtweets] = useState([]);
    const getNtweets = async () => {
        const dbNtweets = await getDocs(collection(dbService, "ntweets"));
        dbNtweets.forEach((document) => {
            const ntweetObject = {
                ...document.data(),
                id: document.id,
            }
            setNtweets((prev) => [document.data(), ...prev]);
        });
    };
    useEffect(() => {
        getNtweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "ntweets"), {
            ntweet,
            createdAt: serverTimestamp(),
        })
        setNtweet("");
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNtweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={ntweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Ntweet" />
            </form>
            {ntweets.map(ntweet => <div key={ntweet.id}>
                <h4>{ntweet.ntweet}</h4>
            </div>
            )}
        </div>
    );

};
export default Home;