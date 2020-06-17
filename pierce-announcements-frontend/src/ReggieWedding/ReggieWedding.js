import React, {useRef, useEffect, useState} from 'react';
import { TwitchEmbed, TwitchChat, TwitchClip, TwitchPlayer } from 'react-twitch-embed';
import portrait_mobile from './mountain_portrait_mobile.jpg';
import fancytext from './StefReggGoldRochester.png'
import styles from './stylesheets/ReggieWedding.module.scss';
// var classNames = require('classnames');

function ReggieWedding() {
  const [playerWidth, setPlayerWidth] = useState(300);
  const [playerHeight, setPlayerHeight] = useState(300);
  const playerContainerRef = useRef(null);

  let resizePlayer = function() {
    if(playerContainerRef.current.clientWidth > 960) {
        setPlayerWidth(0.7 * playerContainerRef.current.clientWidth);
    } else {
        setPlayerWidth(playerContainerRef.current.clientWidth);
    }
    setPlayerHeight(9 * playerWidth / 16.0);
  };

  // if you don't use the timeout, the Twitch script won't have loaded by the time the effect fires
  useEffect(() => {
    setTimeout(resizePlayer, 1000);
  });

  window.addEventListener('resize', resizePlayer);

  return (
    <div className={`uk-background-cover ${styles.background}`} >
        <article className={styles.event} uk-height-viewport="offset-top: true">
            <CovidUpdate/>
            <section ref={playerContainerRef}>
                <TwitchEmbed channel="2pierce" withChat={false} width={playerWidth} height={playerHeight}>
                </TwitchEmbed>
            </section>
            <section className="uk-hidden@m">
                <img  className="uk-margin-auto" style={{width:"90%",display:"block"}} src={portrait_mobile} alt="Estefania and Reggie by lake and mountains" />
            </section>
            <section>
                <RWCard>
                    <div className="uk-child-width-expand@s uk-child-width-1-2@m" uk-grid="yes">
                        <h2>The Wedding of <img className={styles.fancytext} src={fancytext} alt="Estefania &amp; Reggie" /></h2>
                        <div style={{paddingTop:"2rem"}}>
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
                    <p className="uk-text-meta">However, if you want to contribute to our honeymoon 
                    <span aria-role="img" aria-description="airplane">🛫</span> or home renovation 
                    <span aria-role="img" aria-description="hammer">🔨</span><span aria-role="img" aria-description="house">🏠</span>, 
                    we accept cash and Lowe's gift cards <span aria-role="img" aria-description="wink">😉</span></p>
                </RWCard>
            </section>
        </article>
    </div>
  );
}

function CovidUpdate(props) {
    return (
        <div className={styles.msgbar}><span aria-role="header" aria-level={2}>Ceremony Livestream:</span> The live stream of the wedding will be shown here, beginning at 10:50am on Saturday, June 20.</div>
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