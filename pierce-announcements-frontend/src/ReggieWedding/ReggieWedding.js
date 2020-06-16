import React from 'react';
import portrait_mobile from './mountain_portrait_mobile.jpg';
import fancytext from './StefReggGoldRochester.png'
import styles from './stylesheets/ReggieWedding.module.scss';
// var classNames = require('classnames');

function ReggieWedding() {
  return (
    <div className={`uk-background-cover ${styles.background}`} >
        <article className={styles.event} uk-height-viewport="offset-top: true">
            <CovidUpdate/>
            <section >
                <RWCard width="1-2">
                    <h2>The Wedding of <img style={{maxWidth:"600px"}} className={styles.fancytext} src={fancytext} alt="Estefania &amp; Reggie" /></h2>
                    <div className="uk-visible@m">
                        <h3>To Take Place</h3>
                        <p>June 20th, 2020 at eleven o'clock in the morning</p>
                        <h3>The Wedding Ceremony</h3>
                        <p>Will be held at Holy Infancy Catholic Church, 312 E 4th St, Bethlehem, PA</p>
                    </div>
                </RWCard>
            </section>
            <section className="uk-hidden@m">
                <img  className="uk-margin-auto" style={{width:"90%",display:"block"}} src={portrait_mobile} alt="Estefania and Reggie by lake and mountains" />
            </section>
            <section>
                <RWCard>
                    <h2>Wedding Ceremony Details</h2>
                    <div className="uk-child-width-expand@s uk-child-width-1-2@m" ukGrid>
                        <div>
                            <p>The wedding will take place on Saturday, June 20, 2020</p>
                            <p>
                                Holy Infancy Church<br />
                                312 E 4th St<br />
                                Bethlehem, PA<br />
                            </p>
                            <p>Mass will be celebrated at eleven o'clock</p>
                        </div>
                        <div className="uk-height-large">
                            {/*possible improvement: use google-map-react instead of homebrew component*/}
                            {/* <RWMap location="place_id:ChIJxQE5bUM-xIkRLxzvZG-rYkE" /> */}
                            <RWMap location="Holy+Infancy+Church+Bethlehem" />
                        </div>
                    </div>
                </RWCard>
            </section>
            <section>
                <RWCard>
                    <h2>Lodging</h2>
                    <p>A block of rooms has been set aside for the Estefania Perdomo &amp; Reggie Pierce Wedding
                        at Comfort Suites Bethlehem, 120 West 3rd Street, Bethlehem, PA 18015</p>
                    <p>You can visit the hotel website <a href="#">here</a>, but please call if you want to reserve a room.</p>
                    <h2>Gifts</h2>
                    <p>Just your presense at the wedding will be gift enough for us.</p>
                    <p className="uk-text-meta">However, if you want to contribute to our honeymoon 🛫 or home renovation 🔨🏠, we accept cash and Lowe's gift cards 😉</p>
                </RWCard>
            </section>
        </article>
    </div>
  );
}

function CovidUpdate(props) {
    return (
        <div className={styles.msgbar}><span aria-role="title">COVID-19 Update:</span> The originally planned reception at The Marian Inn will not be happening this year.
        Estefania and Reggie are working to set a date for a 1 year anniversary celebration. There will be a live stream of the wedding ceremony here for all those who cannot attend.</div>
    )
}

function RWCard(props) {
  var widthClass = props.width ? `uk-width-${props.width}@m` : '';
  return (
    <div className={`uk-card uk-card-default uk-card-body uk-text-center ${widthClass} ${styles.card}`}>
        {props.children}
    </div>
  );
}

function RWMap(props) {
    const api_key = "AIzaSyB6I-xjOVJ29vvr0r_Tu_lGwCB9qVafCF8";
    return (
        <iframe
            width="100%"
            height="100%"
            frameBorder="0" style={{border:0}}
            src={`https://www.google.com/maps/embed/v1/search?key=${api_key}&q=${props.location}`} allowFullScreen>
        </iframe>
    );
}

export default ReggieWedding;