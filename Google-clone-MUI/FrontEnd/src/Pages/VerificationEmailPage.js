/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
    CssBaseline,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import { useLocation } from "react-router-dom";
import axios from "axios";

const VerificationEmailPage = () => {
    const token = useLocation().search.split("=").at(1)  // to retrive token from link sent through email
    const [verify, setVerify] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        if (token) {
            axios.get(`/api/email/verify?token=${token}`)
                .then(res => {
                    setVerify(true)
                }).catch(err => {
                    console.log(err.response);
                })
        }
    }, [])
    if (!token) {
        setError("Error in verification of email..please try again")
        return (
            <p>Invalid Token..!</p>
        )
    }

    return (
        <>
            <CssBaseline />
            <div>
                <Box component="form" sx={{ textAlign: "center" }}>
                    <Typography variant="h3" color={blue[400]} marginTop={5}>
                        {verify && !error ? "Your email is verified ✔"
                            :
                            error ? error :
                                "Verifying, please wait..! "}
                    </Typography>
                </Box>
            </div>
        </>
    );
};

export default VerificationEmailPage;
