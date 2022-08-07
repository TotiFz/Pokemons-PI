import React from "react";
import { Link } from 'react-router-dom';
import mainPokeImg from '../../Images/mainPokeImg.jpg';
import logo from '../../Images/logo-main.jpg';
import './LandingPage.css';

export default function landingPage() {
    return (
        <div className="landing">
        <img src={mainPokeImg} alt='Landing Poke' className="lImg"/>
        <h1 className="Wc">Henry-Pokemons</h1>
        <img className='logo' src={logo} alt='logo' />
        <Link to='/home'>
            <button className="btn">Entry</button>
        </Link>
        </div>
    )
}