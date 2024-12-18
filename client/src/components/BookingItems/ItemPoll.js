import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemPoll = (booking, owner) => {
    const navigate = useNavigate();

    return (
        <>
        <h1>{booking.booking.title} with {owner}</h1>
        </>
    );
};

export default ItemPoll;
