"use client";

import styles from "./calculator.module.css";
import routes from "./routes";
import { useState, useRef } from "react";


export default function Calculator() {
    const [volume, setVolume] = useState('');
    const [collateral, setCollateral] = useState('');
    const [payoutString, setPayoutString] = useState('');
    const start = useRef(routes[0]);
    const destination = useRef(routes[0]);

    function isCharacterValid(character: string): boolean {
        if (!character || parseInt(character) || character === '0') {
            return true;
        }
        return false;
    }

    function setPayout(event: any): void {
        event.preventDefault();
        const parsedVolume = volume ? parseInt(volume) : 0;
        const parsedCollateral = collateral ? parseInt(collateral) : 0;
        const rate = start.current.cost >= destination.current.cost ? start.current.cost : destination.current.cost;
        const payout = (rate * parsedVolume) + (0.03 * parsedCollateral);
        console.log(payout, rate, volume, collateral)
        setPayoutString(JSON.stringify(payout).split('.')[0]);
    }

    function changeVolume(event: any): void {
        event.preventDefault();
        const lastDigit = event.target.value[event.target.value.length - 1];
        if (isCharacterValid(lastDigit)) {
            setVolume(event.target.value);
        }
    }

    function changeCollateral(event: any): void {
        event.preventDefault();
        const lastDigit = event.target.value[event.target.value.length - 1];
        if (isCharacterValid(lastDigit)) {
            setCollateral(event.target.value);
        }
    }

    function setStartSystem(event: any): void {
        event.preventDefault();
        start.current = routes.filter(route => {
            return route.system === event.target.value;
        })[0]
    }

    function setDestinationSystem(event: any): void {
        event.preventDefault();
        destination.current = routes.filter(route => {
            return route.system == event.target.value;
        })[0]
    }

    return (
        <div className={styles.calculator}>
            <form className={styles.form} onSubmit={setPayout}>

                <div className={styles.entry}>
                    <label htmlFor="start">Pickup station: </label>
                    <select name="start" className={styles.dropdown} onChange={setStartSystem}>
                        {routes.map(route => {
                            return (
                                <option value={route.system} key={route.system}>
                                    {route.system} ({route.cost}ISK/m3)
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className={styles.entry}>
                    <label htmlFor="destination">Destination: </label>
                    <select name="destination" className={styles.dropdown} onChange={setDestinationSystem}>
                        {routes.map(route => {
                            return (
                                <option value={route.system} key={route.system}>
                                    {route.system} ({route.cost}ISK/m3)
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className={styles.entry}>
                    <input type="text" placeholder="Volume (m3)" className={styles.text_box} value={volume} onChange={changeVolume}></input>
                </div>

                <div className={styles.entry}>
                    <input type="text" placeholder="Collateral (ISK)" className={styles.text_box} value={collateral} onChange={changeCollateral}></input>
                </div>

                <div className={styles.entry}>
                    <button type="submit" onClick={setPayout}>Get reward price</button>
                </div>

                <div className={styles.payout}>
                    {payoutString ? payoutString + ' ISK' : ''}
                </div>

            </form>
        </div>
    );
}