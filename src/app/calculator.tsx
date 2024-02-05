"use client";

import styles from "./calculator.module.css";
import routes from "./routes";
import { useState, useRef } from "react";


export default function Calculator() {
    const [volumeString, setVolumeString] = useState('');
    const [collateralString, setCollateralString] = useState('');
    const volume = useRef(0);
    const collateral = useRef(0);
    const [payoutString, setPayoutString] = useState('');
    const start = useRef(routes[0]);
    const destination = useRef(routes[0]);

    function isCharacterValid(character: string): boolean {
        if (!character || parseInt(character) || character === '0') {
            return true;
        }
        return false;
    }

    function formatNumber(number: number): string {
        let numberString = number.toString()
        while (numberString[0] === '0') {
            numberString = numberString.slice(1)
        }
        numberString = numberString.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        return numberString === 'NaN' ? '' : numberString;
    }

    function setPayout(event: any): void {
        event.preventDefault();
        const parsedVolume = volumeString ? volume.current : 0;
        const parsedCollateral = collateralString ? collateral.current : 0;
        const rate = start.current.cost >= destination.current.cost ? start.current.cost : destination.current.cost;
        const payout = (rate * parsedVolume) + (0.03 * parsedCollateral);
        setPayoutString(JSON.stringify(payout).split('.')[0]);
    }

    function changeVolume(event: any): void {
        event.preventDefault();
        const lastDigit = event.target.value[event.target.value.length - 1];
        if (isCharacterValid(lastDigit)) {
            volume.current = parseInt(event.target.value.replace(',', ''));
            setVolumeString(formatNumber(volume.current))
        }
    }

    function changeCollateral(event: any): void {
        event.preventDefault();
        const lastDigit = event.target.value[event.target.value.length - 1];
        if (isCharacterValid(lastDigit)) {
            collateral.current = parseInt(event.target.value.replace(/\,/g,''));
            setCollateralString(formatNumber(collateral.current))
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
                    <label htmlFor="volume">Volume (m3) [MAX 341,000]: </label>
                    <input name="volume" type="text" placeholder="Volume (m3)" className={styles.text_box} value={volumeString} onChange={changeVolume}></input>
                </div>

                <div className={styles.entry}>
                <label htmlFor="collateral">Collateral (ISK) [3% Collateral Value]: </label>
                    <input name="collateral" type="text" placeholder="Collateral (ISK)" className={styles.text_box} value={collateralString} onChange={changeCollateral}></input>
                </div>

                <div className={`${styles.entry} ${styles.entry_span}`}>
                    <button className={styles.submit_button} type="submit" onClick={setPayout}>Get reward price</button>
                </div>

                <div className={`${styles.entry} ${styles.entry_span}`}>
                    {payoutString.length > 1 ? formatNumber(parseInt(payoutString)) + ' ISK' : ''}
                </div>
				
				<div className={styles.entry}>
					<h5>Please make contracts out to Corporation: Jita Jump Junkies</h5>
                </div>
				
				<div className={styles.entry}>
					<h5>Contract Expiration: 3 Days</h5>
					<h5>Days to Complete: 7 Days</h5>
                </div>

            </form>
        </div>
    );
}