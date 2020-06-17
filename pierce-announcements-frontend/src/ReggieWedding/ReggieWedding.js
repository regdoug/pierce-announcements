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
                <RWPlayer />
            </section>
            <section className="uk-hidden@m">
                <img  className="uk-margin-auto" style={{width:"90%",display:"block"}} src={portrait_mobile} alt="Estefania and Reggie by lake and mountains" />
            </section>
            <section>
                <RWCard>
                    <div className="uk-child-width-expand@s uk-child-width-1-2@m" uk-grid>
                        <h2>The Wedding of <img className={styles.fancytext} src={fancytext} alt="Estefania &amp; Reggie" /></h2>
                        <div>
                            <p>will take place on Saturday, June 20, 2020</p>
                            <p>
                                Holy Infancy Church<br />
                                312 E 4th St<br />
                                Bethlehem, PA<br />
                            </p>
                            <p>Mass will be celebrated at eleven o'clock</p>
                        <div className="uk-height-medium">
                            {/*possible improvement: use google-map-react instead of homebrew component*/}
                            {/* <RWMap location="place_id:ChIJxQE5bUM-xIkRLxzvZG-rYkE" /> */}
                            <RWMap location="Holy+Infancy+Church+Bethlehem" />
                        </div>
                        </div>
                    </div>
                </RWCard>
            </section>
            <section>
                <RWCard>
                    <h2>Reception</h2>
                    <p>Since we were not able to have the planned reception this year, a 1 year anniversary celebration will
                        be planned and all who were invited to the reception this year will be invited to the 1 year celebration.
                    </p>
                    <p>
                        We have not yet selected an exact date, but we will let you know as soon as we have more details!
                    </p>
                </RWCard>
            </section>
            <section>
                <RWCard>
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
        <div className={styles.msgbar}><span aria-role="title">Ceremony Livestream:</span> The live stream of the wedding will be shown here, beginning at 10:50am on Saturday, June 20.</div>
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

function RWPlayer(props) {
    var widthClass = props.width ? `uk-width-${props.width}@m` : '';
    return (
      <div className={`uk-card uk-card-default uk-card-body uk-text-center ${widthClass} ${styles.player}`}>
        {props.children}
      </div>
    );
}

export default ReggieWedding;